import mysql from "mysql2";

// manage environment variables
import * as dotenv from "dotenv";
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}


// create the connection to database
const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});


db.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

export default db;