import express from 'express';
import cors from 'cors';
import { TEST_PORT } from './config.js';
import { setResponse } from './utility.js';
import { routerUser } from './Routes/UserRouter.js';

const app = express();

const allowedHeaders = ['authorization', 'content-type'].join(",");
const allowedMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].join(",");

app.use(cors({ allowedHeaders: allowedHeaders, methods: allowedMethods }));
app.use(express.json());

// Routes
app.use(routerUser);

// Invalid Route Middleware
app.use((req, res, next) => {
  const InvalidRouteError = new Error("Invalid Route");
  InvalidRouteError.status = 404;
  next(InvalidRouteError);
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  const errMessage = err.message || "Internal Server Error";
  const errCode = err.status || 500;
  console.log(errMessage);
  setResponse(res, errCode, errMessage);
});

app.listen(TEST_PORT, () => {
  console.log(`Now Serving @ http://localhost:${TEST_PORT}`);
});