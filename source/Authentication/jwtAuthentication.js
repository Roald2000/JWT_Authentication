
import jwt from 'jsonwebtoken';
import { SECRET_KEY, REFRESH_KEY } from '../config.js';

const generateAccessToken = (username) => {
    const accessToken = jwt.sign({ username }, SECRET_KEY, { expiresIn: '15m' });
    return accessToken;
};

const generateRefreshToken = (username) => {
    const refreshToken = jwt.sign({ username }, REFRESH_KEY);
    return refreshToken;
};

const validateAccessToken = (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];
    const token = authorizationHeader && authorizationHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access token not found' });
    }

    jwt.verify(token, SECRET_KEY, (error, decodedToken) => {
        if (error) {
            return res.status(403).json({ message: 'Invalid access token' });
        }

        req.user = decodedToken.username;
        next();
    });
};

export { generateAccessToken, generateRefreshToken, validateAccessToken };