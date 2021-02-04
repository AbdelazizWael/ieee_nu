# READ ME

## Setup for the demo:

Make sure you have [npm](npmjs.com), then go and setup the development server as illustrated below. Now open a new terminal and type the following commands:

- Change into the demo directory:

  ``` : bash
  cd demo
  ```

- Install npm libraries:

  ``` : bash
  npm install # if it doesn't work, search for the command for Windows.
  ```

- Run the front-end server:

  ``` : bash
  npm run start
  ```

The server will run on [http://localhost:3000/](http://localhost:3000/)

## Setup for development:

Make sure you have `Python` >= 3.8, and any api testing tool like [Postman](https://www.postman.com) or [Insomnia](https://insomnia.rest/) (Make sure you install Insomnia Core, not Insomnia Designer). Download this code, or clone the repository. Open a terminal or cmd, go to the project directory, and type the following commands:

- Create a Python virtual environment:

  ``` : bash
  python -m venv env
  ```

- Activate the virtual environment:

  ``` : bash
  .\env\Scripts\activate # if you're using Windows.
  ```

  ``` : bash
  source env/bin/activate # if you're using Linux or MacOs
  ```

- Install the libraries from `requirement.txt`:

  ``` : bash
  pip install -r requirements.txt
  ```

- Run the database migrations:

  ``` : bash
  python manage.py migrate
  ```

- Run the development server:

  ``` : bash
  python manage.py runserver
  ```

Now your development server will run on [http://localhost:8000/](http://localhost:8000/). Use your api testing tool to test all the api endpoints.

To access the admin panel, stop the server using CTRL-C and type the following command:

``` : bash
python manage.py createsuperuser
```

Type your credentials and then run the development server again. Then go to [http://localhost:8000/admin/](http://localhost:8000/admin/) and use the credentials to login.
___

## References:

- `pk` refers to the primary key or the id of the user on the database. Two or more users can't have the same `pk`.
- `key` in the authentication endpoints is the token associated with the user. To authenticate requests sent to the server, add the following header to the request in this exact format: <br>

  ``` : JSON
  {'Authorization': 'Token exampleKeyToken123456'}
  ```

- The API endpoints adhere to standard HTTP methods in their functions. `GET` is used to list model instances or retrieve a detailed model object. `POST` is used to create a new model instance. `PUT` and `PATCH` are used for updating existing objects, `PUT` for full updates, and `PATCH` for partial updates. A `PUT` endpoint could receive old data with partial updates and would treat them as a full update, all data fields have to be present though. Finally, `DELETE` is used to delete objects from the database.
- In the API, there are two main types of URLs, `example.com/api/model/` and `example.com/api/model/:id`. The first type can accept `GET`, `POST`, or `DELETE` requests. `GET` will list all items in the model, while `POST` will create a new object in the model, and `DELETE` will delete *all* the objects in the model. The second type can accept `GET`, `PUT`, `PATCH`, or `DELETE`. `GET` will retrieve the object with the id of `:id`, while `PUT` and `PATCH` will update that object, and `DELETE` will delete it. This applies to any url that has the `Model` keyword alongside the requests that are allowed. Any exception to this rule will be explicitly mentioned.
- The `Access` keyword defines user access to different urls. If a user attempted to access a route that doesn't allow it, The response will be `401 Unauthorized` or `403 Forbidden`.
- All api endpoints that have an associated `Model` is subject to pagination. This means that requesting data from the urls that list objects (i.e. `example.com/api/model/`) will give a response with the following format:

  ``` : JSON
  {
    "count":  // Number of pages.
    "next":  // A link to the next page.
    "previous":  // A link to the previous page.
    "results": [
      // The requested data.
    ]
  }
  ```

  The return values mentioned in the api documentations are all inside the `results` field.

___

## API Documentation

### The base URL of all api endpoints is `[websiteDomain]/api/`

<br>

### Authentication endpoints:

- auth/register/ (POST) `[Access: Anyone]`
  - first_name
  - last_name
  - email
  - password1
  - password2
  > Returns `key`.

- auth/login/ (POST) `[Access: Anyone]`
  - email
  - password
  > Returns `key`.

- auth/logout/ (POST) `[Access: User]`

- auth/password/reset/ (POST) `[Access: Anyone]`
  - email
  > Sends an email to the user with instructions to reset its password.

- auth/password/reset/confirm/ (POST) `[Access: Anyone]`
  - uid
  - token
  - new_password1
  - new_password2
  > `uid` and `token` are obtained from the email. User have to log in afterwards.

- auth/password/change/ (POST) `[Access: User]`
  - new_password1
  - new_password2
  - old_password
  > This would reset the user's password without logging out.

- /auth/user/ (GET, PUT, PATCH) `[Access: User]`
  >Returns `pk`, `email`, `first_name`, `last_name` of the logged in user.

- /auth/users/ (GET) `[Model: User]` `[Access: Staff]`
  > Returns all the registered users.

<br>

## Store endpoints:

- store/categories/ (GET) `[Access: Anyone]`
  > Returns a list of categories.

- store/products/ (GET) `[Model: Product]` `[Access: Anyone]`
  > Returns a list of all the products. See the details below.

  - Products can be searched using the following query parameters:
    - `q`: Can only be one parameter to search the name of the product. For example: `store/products/?q=Nokia`.
    - `category`: Can be many parameters to filter by categories. For example: `store/products/?category=Arduino&category=Sensor`.
  
    Both parameters can be used together.

- store/products/:id/ (GET) `[Model: Product]` `[Access: Anyone]`
  > Returns `id`, `name`, `description`, `price`, `image`, and `count`.
  
  > The value of `image` is a link to the actual image file.

- store/cart/ (GET, POST, DELETE) `[Model: Cart]` `[Access: User]`
  - product_id
  - count
  > Returns a list of all the cart items. See the details below.

- store/cart/:id/ (GET, PUT, PATCH, DELETE) `[Model: Cart]` `[Access: User]`
  - count
  > Returns `id`, `product`, `count`, `added`, `compound_price`.

  > `product` is a subset of the Product model. `added` is a read-only timestamp.

- store/orders/ (GET) `[Model: Order]` `[Access: User]`
  > Returns a list of all user orders. See below for details.

- store/orders/:id/ (GET) `[Model: Order]` `[Access: User]`
  > Returns `carts`, `full_price`, `placed`, `delivery_time`.

  > `carts` is a list of all the carts in the order, `placed` is a timestamp for the order, and `delivery_time` is when the user have to go and get the order. The order expires after 7 days of `delivery_time`.

- store/place-order/ (POST) `[Access: User]`
  > A url to place the order of a user. The cart objects will be locked and linked to an order object. Returns an object with the same fields as `store/orders/:id/`.

- store/history/ (GET) `[Model: History]` `[Access: User]`
  > Returns a list of all user history. See below for details.

- store/history/:id/ (GET) `[Model: History]` `[Access: User]`
  > Returns `products`, `full_price`, `verified_on`.

  > `products` is a json string with the products information, and `verified_on` is timestamp of order delivery.

- store/verify-order/ (POST) `[Access: Staff]`
  - order_id
  > Verifies that the order has been delivered and creates a history record.

- store/all-orders/ (GET) `[Model: Order]` `[Access: Staff]`
  > Returns the orders of all users. See below for details.

- store/all-orders/:id/ (GET) `[Model: Order]` `[Access: Staff]`
  > Returns `carts`, `full_price`, `customer`, `placed`, `delivery_time`.

- store/all-history/ (GET) `[Model: History]` `[Access: Staff]`
  > Returns the history of all users. See below for details.

- store/all-history/:id/ (GET) `[Model: History]` `[Access: Staff]`
  > Returns `products`, `full_price`, `customer`, `verified_on`, `verified_by`.