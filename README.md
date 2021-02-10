# READ ME

## Setup for the demo:

Make sure you have [npm](npmjs.com), then go and setup the development server as illustrated below. Now open a new terminal and type the following commands:

- Change into the demo directory:

  ```bash
  cd demo
  ```

- Install npm libraries:

  ```bash
  npm install # if it doesn't work, search for the command for Windows.
  ```

- Run the front-end server:

  ```bash
  npm run start
  ```

The server will run on [http://localhost:3000/](http://localhost:3000/)

## Setup for development:

Make sure you have `Python` >= 3.8, and any api testing tool like [Postman](https://www.postman.com) or [Insomnia](https://insomnia.rest/) (Make sure you install Insomnia Core, not Insomnia Designer). Download this code, or clone the repository. Open a terminal or cmd, go to the project directory, and type the following commands:

- Create a Python virtual environment:

  ```bash
  python -m venv env
  ```

- Activate the virtual environment:

  ```
  .\env\Scripts\activate # if you're using Windows.
  ```

  ```bash
  source env/bin/activate # if you're using Linux or MacOs
  ```

- Install the libraries from `requirement.txt`:

  ```bash
  pip install -r requirements.txt
  ```

- Run the database migrations:

  ```bash
  python manage.py migrate
  ```

- Run the development server:

  ```bash
  python manage.py runserver
  ```

Now your development server will run on [http://localhost:8000/](http://localhost:8000/). Use your api testing tool to test all the api endpoints.

To access the admin panel, stop the server using CTRL-C and type the following command:

```bash
python manage.py createsuperuser
```

Type your credentials and then run the development server again. Then go to [http://localhost:8000/admin/](http://localhost:8000/admin/) and use the credentials to login.

---

## Documentation:

The documentation is written in the [wiki](https://github.com/AbdelazizWael/ieee_nu/wiki).