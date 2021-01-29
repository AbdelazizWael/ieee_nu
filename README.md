# API Documentation

### The base URL of all api endpoints is `[websiteDomain]/api/`
<br>

### References:
- `pk` refers to the primary key or the id of the user on the database. Two or more users can't have the same `pk`.
- `key` in the authentication endpoints is the token associated with the user. To authenticate requests sent to the server, add the following header to the request in this exact format. <br>
`{'Authorization': 'Token exampleKeyToken123456'}`

## Authentication endpoints:

- auth/register/ (POST)
  - first_name
  - last_name
  - email
  - password1
  - password2
  > Returns `key`.

- auth/login/ (POST)
  - email
  - password
  > Returns `key`.

- auth/logout/ (POST)

- auth/password/reset/ (POST)
  - email
  > Sends an email to the user with instructions to reset its password.

- auth/password/reset/confirm/ (POST)
  - uid
  - token
  - new_password1
  - new_password2
  > `uid` and `token` are obtained from the email. User have to login afterwards.

- /auth/user/ (GET)
  >Returns `pk`, `email`, `first_name`, `last_name`.

<br>

## Store endpoints:
- store/products/ (GET)
  > Returns a list view of all the products. See the product fields below.

- store/products/:id (GET)
  > Returns a detailed view of the product with the id of `:id`. Product fields are `id`, `name`, `description`, `price`, `image`, and `count`. The value of `image` is a link to the actual image file.
