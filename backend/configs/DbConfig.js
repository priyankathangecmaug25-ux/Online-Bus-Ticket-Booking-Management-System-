
import mysql2 from "mysql2/promise";

let connection = null;

export async function connectDb() {
  try {
    connection = await mysql2.createConnection({
      host: "localhost",
      user: "root",
      password: "12345",         
      database: "online_booking_system", 
      port: 3306                 
    });
    console.log(" Database connected successfully");
  } catch (error) {
    console.error(" Error in DB connection:", error.message);
  }
  return connection;
}

export function getConnectionObject() {
  return connection;
}
