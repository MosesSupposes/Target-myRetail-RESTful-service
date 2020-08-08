# Target-myRetail-RESTful-service

A case study challenge for Target's hiring process. The task is to build a CRUD API for a mock retail chain.

## How to set up project

The first step to setting up this project locally on your machine is to have Node.js installed. Visit [this link](https://nodejs.org/en/download) to download it for any OS.

Once you have Node.js installed, open up your terminal and run the following command to install all dependencies:

`npm install`

Now, to run the API, run the following command in your terminal:

`npm start`

You should now have the API running on [http://localhost:3000](http://localhost:3000).

**Note**: _You need to set up environment variables -- which are sort of like private keys -- in order for this project to work properly. For instance, you won't be able to connect to the database without them. Ask me for them and I will be happy to provide them for you._

## API Documentation

To access any of the resources on this API, you need to be authenticated beforehand. This API uses Json Web Tokens to achieve authentication. Once you obtain a token, you need to send it for each request to the server under a header labeled `authorization`.
You can obtain a token by either registering an account or logging in. Tokens last for 3 hours, so you must log back in once it expires. The endpoints for obtaining a token will be listed first, then the rest of the endpoints in this section will assume that you have a token on your requests' headers.

### Authentication

**POST /api/users/register**

Register an account. The response will include a token that you can use to interact with the other endpoints on this API.

- Your request's body must contain these fields:

```json
{
	"fullName": "string",
	"email": "string",
	"password": "string"
}
```

**POST /api/users/login**

Login to an existing account. The response will include a token that you can use to interact with the other endpoints on this API.

- Your request's body must contain these fields:

```json
{
	"email": "string",
	"password": "string"
}
```

---

### Products

**GET /api/products**

Retrieve all products from all locations of the myRetail store chain.

**GET /api/products/:id**

Retrieve a single product where `:id` is the ID of the product.

**POST /api/products**

Create a new product.

- Your request's body must contain these fields:

```json
{
	"productId": "string",
	"name": "string",
	"productDescription": "string",
	"buyUrl": "string"
}
```

- Note that each product you create gets a unique ID automatically generated under the `_id` field. The `productId` that you have to specify is a separate ID that's recongnized by the parent Redsky.target API.

- the `buyUrl` field is the public URL you can visit to buy the product. The typical location for this is the `www.target.com` domain.

**PUT /api/products/:id**

Update the details of a specific product where `:id` is the ID of the product you'd like to update.

- The fields that are available for updating are as follows:

```json
{
	"productId": "string",
	"name": "string",
	"productDescription": "string",
	"buyUrl": "string"
}
```

**DELETE /api/products/:id**

Remove a specific product from the database where `:id` is the ID of the product you'd like to remove.

---

### Users

**GET /api/users**

Retrieve the information of all users of this API.

**GET /api/users/:id**

Retrieve the information of a specific user of this API where `:id` is the ID of the user whose information you'd like to retrieve.

**PUT /api/users/:id**

Update the information of a specific user of this API where ':id` is the ID of the user whose information you'd like to update.

- The fields you can update are as follows:

```json
{
	"fullName": "string",
	"email": "string",
	"password": "string"
}
```

**DELETE /api/users/:id**

Remove a user from the database where `:id` is the ID of the user you'd like to remove.
