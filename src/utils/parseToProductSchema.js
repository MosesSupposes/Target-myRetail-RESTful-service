const parseToProductSchema = jsonResponse => ({
	productId: jsonResponse.product.available_to_promise_network.product_id,
	name: jsonResponse.product.item.product_description.title,
	productDescription:
		jsonResponse.product.item.product_description.downstream_description,
	buyUrl: jsonResponse.product.item.buy_url,
});
module.exports = {
	parseToProductSchema,
};
