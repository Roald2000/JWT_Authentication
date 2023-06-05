
import { generateAccessToken, generateRefreshToken } from "../Authentication/jwtAuthentication.js";
import { exequteQuery, sanitizeString, setResponse } from "../utility.js";

const userLogin = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const inputParamValues = [sanitizeString(username), sanitizeString(password)];

        // Query the database to check if the user exists
        const result = await exequteQuery(`SELECT username,password FROM login_tbl WHERE username = ? LIMIT 1`, inputParamValues);

        // Check if user exists and password matches
        if (result.length === 1 && result[0].password === password) {
            // Generate access token and refresh token
            const accessToken = generateAccessToken(username);
            const refreshToken = generateRefreshToken(username);

            setResponse(res, 200, "Login Successful", { access_key: accessToken, refresh_key: refreshToken });
        } else {
            // User not found or incorrect password
            setResponse(res, 401, "Invalid credentials");
        }
    } catch (error) {
        next(error);
    }
};

const registerUser = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const inputParamValues = [sanitizeString(username), sanitizeString(password)];

        // Check if the user already exists in the database
        const result = await exequteQuery(`SELECT username FROM login_tbl WHERE username = ? LIMIT 1`, [inputParamValues[0]]);

        if (result.length === 0) {
            // User does not exist, proceed with registration
            await exequteQuery(`INSERT INTO login_tbl (username, password) VALUES (?, ?)`, inputParamValues);

            // Generate access token and refresh token
            const accessToken = generateAccessToken(username);
            const refreshToken = generateRefreshToken(username);

            setResponse(res, 200, "Registration Successful", { access_key: accessToken, refresh_key: refreshToken });
        } else {
            // User already exists
            setResponse(res, 409, "User already exists");
        }
    } catch (error) {
        next(error);
    }
};

const userLogout = async (req, res, next) => {
    try {
        const { username } = req.params;

        // Delete the refresh token from the database
        await exequteQuery(`DELETE FROM refresh_tokens WHERE username = ?`, [sanitizeString(username)]);

        setResponse(res, 200, "Logout Successful");
    } catch (error) {
        next(error);
    }
};


const refreshToken = () =>{

}

export { userLogin, registerUser, userLogout };