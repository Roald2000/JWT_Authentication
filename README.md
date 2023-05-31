# Project README

This is a Node.js project that provides an authentication system using JSON Web Tokens (JWT). It includes user registration, login, and logout functionalities. The project uses an Express.js server and MySQL database for storing user information.

## Prerequisites

Before running this project, make sure you have the following installed on your system:

- Node.js
- MySQL

## Installation

1. Clone the repository:

   ```shell
   git clone <repository-url>
   ```
2. Navigate to the project directory:

   ```shell
   cd <project-directory>
   ```
3. Install the dependencies:

   ```shell
   npm install
   ```
4. Create a `.env` file in the project root directory and add the following environment variables with your own values:

   ```plaintext
   DB_HOST="localhost"
   DB_PORT=3306
   DB_USER="root"
   DB_PASS=""
   DB_NAME="jwt_auth_db"
   SECRET_KEY="your-secret-key"
   REFRESH_KEY="your-refresh-key"
   TEST_PORT=9090
   ```

   Make sure to replace `"your-secret-key"` and `"your-refresh-key"` with your own secret keys.
5. Set up the MySQL database by importing the `database.sql` file included in the project.

## Usage

To start the server, run the following command:

```shell
npm start
```

The server will start running on `http://localhost:9090` (or the port specified in the `.env` file).

## API Endpoints

The following API endpoints are available:

### User Registration

- **Endpoint:** `POST /api/users/register`
- **Request Body:**
  - `username` (string): User's username
  - `password` (string): User's password
- **Response:**
  - `message` (string): Success message
  - `access_key` (string): JWT access token
  - `refresh_key` (string): JWT refresh token

### User Login

- **Endpoint:** `POST /api/users/login`
- **Request Body:**
  - `username` (string): User's username
  - `password` (string): User's password
- **Response:**
  - `message` (string): Success message
  - `access_key` (string): JWT access token
  - `refresh_key` (string): JWT refresh token

### User Logout

- **Endpoint:** `PATCH /api/users/logout/:username`
- **Request Parameters:**
  - `username` (string): User's username
- **Response:**
  - Success response with status code 200

### Test Endpoint

- **Endpoint:** `GET /api/users/test`
- **Headers:**
  - `Authorization` (string): Bearer token
- **Response:**
  - Success response with status code 200 and message "You made a Request"

## Project Structure

- `index.js`: Main entry point of the application. It sets up the Express server and defines the middleware.
- `Routes/UserRouter.js`: Defines the routes for user-related operations.
- `controller/UserController.js`: Contains the controller functions for user authentication.
- `Authentication/jwtAuthentication.js`: Handles JSON Web Token generation and verification.
- `config.js`: Contains the configuration settings, including database connection details and secret keys.
- `utility.js`: Contains utility functions used in the project.
