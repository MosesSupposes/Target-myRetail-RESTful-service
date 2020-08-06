/**
 * Imports
 */

const axios = require("axios");
const { Product } = require("./product.model");

/**
 * Controllers
 */

const getMany = (req, res) => {
	Product.find()
		.lean()
		.exec()
		.then(products => {
			res.status(200).json({ data: products });
		})
		.catch(error => {
			console.error(error);
			res.status(400).end();
		});
};

const getOne = (req, res, next) => {
	axios
		.get(
			`https://redsky.target.com/v3/pdp/tcin/${req.params.id}?excludes=taxonomy,price,promotion,bulk_ship,rating_and_review_reviews,rating_and_review_statistics,question_answer_statistics&key=candidate`
		)
		.then(async function onResolve(response) {
			try {
				// Lookup the product in our copy of the database.
				const existingCopyOfProduct = await Product.findOne({
					productId: req.params.id,
				})
					.lean()
					.exec();
				// If it exists, send it in the response
				if (existingCopyOfProduct) {
					res.status(200).json({ data: existingCopyOfProduct });
				} else {
					// Otherwise, copy the requested resource into our copy of the database, then respond with the result.
					const newCopyOfProdcut = await Product.create(
						parseToProductSchema(response)
					);
					res.status(200).json({ data: newCopyOfProdcut });
				}
			} catch (error) {
				// If there was a problem either querying the copy of the product or inserting a new copy into the db...
				console.error(error);
				const serverError = new Error(
					"There was a problem querying your request."
				);
				serverError.status = 500;
				// propogate the error to the next error handler
				next(serverError);
			}
		})
		.catch(function onReject(error) {
			console.error(error);
			res.status(400).end();
		});
};

const create = (req, res) => {
	Product.create(req.body)
		.then(newProduct => {
			res.status(201).json({ data: newProduct });
		})
		.catch(error => {
			console.error(error);
			res.status(400).end();
		});
};

const update = (req, res) => {
	Product.findOneAndUpdate({ productId: req.params.id }, req.body, {
		new: true,
	})
		.lean()
		.exec()
		.then(updatedProduct => {
			res.status(200).json({ data: updatedProduct });
		})
		.catch(error => {
			console.error(error);
			res.status(400).end();
		});
};

const remove = async (req, res) => {};

/**
 * Helpers
 */

function parseToProductSchema(jsonResponse) {
	return {
		productId:
			jsonResponse.data.product.available_to_promise_network.product_id,
		name: jsonResponse.data.product.item.product_description.title,
		productDescription:
			jsonResponse.data.product.item.product_description.downstream_description,
		buyUrl: jsonResponse.data.product.item.buy_url,
	};
}

/**
 * Exports
 */

module.exports = {
	getMany,
	getOne,
	create,
	update,
	remove,
};
