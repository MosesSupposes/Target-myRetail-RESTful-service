/**
 * Imports
 */

const axios = require("axios");
const { Product } = require("./product.model");

/**
 * Controllers
 */

const getMany = async (req, res) => {};
const getOne = (req, res) => {
	axios
		.get(
			`https://redsky.target.com/v3/pdp/tcin/${req.params.id}?excludes=taxonomy,price,promotion,bulk_ship,rating_and_review_reviews,rating_and_review_statistics,question_answer_statistics&key=candidate`
		)
		.then(
			async function onResolve(response) {
				const existingCopyOfProduct = await Product.findOne({
					productId: req.params.id,
				})
					.lean()
					.exec();
				// if it's in our copy of the database
				if (existingCopyOfProduct) {
					res.status(200).json({ data: existingCopyOfProduct });
				} else {
					// else save it to our copy of the database
					const newCopyOfProdcut = await Product.create(
						parseToProductSchema(response)
					);
					res.status(200).json({ data: newCopyOfProdcut });
				}
			},
			function onReject(error) {
				console.error(error);
				res.status(400).end(); // Bad request
			}
		);
};
const create = async (req, res) => {};
const update = async (req, res) => {};
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
