/*  This utility resembles Go-style error-first destructuring of a promise.
    Example usage: 
    const [err, data] = await User.create(req.body)  
*/
const withCatch = promise =>
	promise.then(data => [null, data]).catch(error => [error, null]);

/*  This utility allows you to remove the try/catch block from an await call. 
    You can instead pass in a callback to handle the error in place of the catch block. Example usage: 
    const newUser = await catchErrors(
            User.create(req.body), 
            err => console.error(error)
    )
*/
const catchErrors = (promise, errorHandler) =>
	promise.then(data => data).catch(errorHandler);

// Omit specified fields from an object.
const omit = (fields, obj) => {
	const newObj = { ...obj };

	for (let key of fields) {
		delete newObj[key];
	}
	return newObj;
};

module.exports = {
	withCatch,
	catchErrors,
	omit,
};
