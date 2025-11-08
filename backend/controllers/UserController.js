import { compareSync, hashSync } from "bcrypt";
import { getConnectionObject } from "../configs/DbConfig.js";
import jwt from "jsonwebtoken";

//  Register new user
export async function registerUser(request, response) {
  try {
    const connection = await getConnectionObject();
    const { fullname, email, password } = request.body;

    
    const encryptedPassword = hashSync(password, 12);

    
    const qry = "INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)";
    const [resultSet] = await connection.query(qry, [fullname, email, encryptedPassword]);

    if (resultSet.affectedRows === 1) {
      response.status(200).send({ message: "Registration successful. You can now login." });
    } else {
      response.status(500).send({ message: "User registration failed" });
    }
  } catch (error) {
    console.error(error);
    response.status(500).send({ message: "Something went wrong" });
  }
}


