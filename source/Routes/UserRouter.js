
import { Router } from "express";
import {  registerUser, userLogin, userLogout } from "../controller/UserController.js";
import { validateAccessToken } from "../Authentication/jwtAuthentication.js";
import { setResponse } from "../utility.js";

const routerUser = Router();

// User Login Route
// POST /api/users/login
// Request Body:
// - username (string): User's username
// - password (string): User's password
// Response:
// - message (string): Success message
// - access_key (string): JWT access token
// - refresh_key (string): JWT refresh token
routerUser.post('/api/users/login', userLogin);

// User Registration Route
// POST /api/users/register
// Request Body:
// - username (string): User's username
// - password (string): User's password
// Response:
// - message (string): Success message
// - access_key (string): JWT access token
// - refresh_key (string): JWT refresh token
routerUser.post('/api/users/register', registerUser);

// User Logout Route
// PATCH /api/users/logout/:username
// Request Parameters:
// - username (string): User's username
// Response:
// - Success response with status code 200
routerUser.patch('/api/users/logout/:username', userLogout);

// Test Endpoint
// GET /api/users/test
// Headers:
// - Authorization (string): Bearer token
// Response:
// - Success response with status code 200 and message "You made a Request"
routerUser.get('/api/users/test', validateAccessToken, (req, res, next) => { setResponse(res, 200, "You made a Request") });

export { routerUser };