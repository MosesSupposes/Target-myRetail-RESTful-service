const { TestScheduler } = require("jest");

const { omit } = require("../index");

test("it should remove the specified fields from a given object", () => {
	// Arrange
	const obj = { a: 1, b: 2, c: 3, d: 4, e: 5 };
	const obj2 = { 1: "ok", 2: "foo" };
	// Act
	const objWithoutAAndB = omit(["a", "b"], obj);
	const objWithNumberedKey = omit([1], obj2);
	// Assert
	expect(Object.keys(objWithoutAAndB)).toEqual(["c", "d", "e"]);
	expect(objWithNumberedKey).toEqual({ 2: "foo" });
});
