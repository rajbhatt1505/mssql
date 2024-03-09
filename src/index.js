import { createRequire } from 'module';
const require = createRequire(import.meta.url);

global.require = require;
import userRouter from './routes/user.routes.js'
// Import the express module
const express = require('express');
// Create an instance of express
const app = express();
import cors from "cors"                                       
import cookieParser from "cookie-parser"
app.use("/api/v1/users", userRouter)

// Importing and configuring dotenv
require('dotenv').config();
require('dotenv').config({ path: '/path/to/.env' });

// Accessing environment variables
const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbDatabase = process.env.DB_DATABASE;

// Example usage
console.log('DB_HOST:', dbHost);
console.log('DB_USER:', dbUser);
console.log('DB_PASSWORD:', dbPassword);
console.log('DB_DATABASE:', dbDatabase);

// Use these variables in your database connection logic

// Define a route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Define the port
const port = 3000;

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

const sql = require('mssql');


app.use(cors())
app.use(cookieParser())


//these are security practice
app.use(express.json({limit: "16kb"}))                          
app.use(express.urlencoded({extended: true, limit: "16kb"}))    
app.use(express.static("public"))                             

// Database connection configuration
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: true, // For secure connections
    trustServerCertificate: true // Change this to false if you're on Windows Azure
  }
};
// Create a connection pool
const pool = new sql.ConnectionPool(config);

// Function to connect to the database and execute a query
async function executeQuery(query) {
  try {
    await pool.connect();
    const result = await pool.request().query(query);
    return result.recordset;
  } catch (err) {
    console.error('SQL Error:', err);
    throw err;
  } finally {
    // Close the connection pool after query execution
    pool.close();
  }
}

// Example usage
async function main() {
  try {
    // Connect to the database and execute a query
    const queryResult = await executeQuery('SELECT * FROM Users');
    console.log('Query Result:', queryResult);
  } catch (err) {
    console.error('Error:', err);
  }
}
main();