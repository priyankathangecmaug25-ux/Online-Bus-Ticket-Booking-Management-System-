import { compareSync } from "bcrypt";
import { getConnectionObject } from "../configs/DbConfig.js";
import { ROLES } from "../constants/RoleConstants.js";
import jwt from "jsonwebtoken";

export async function login(req, res) {
  try {
    const connection = await getConnectionObject();
    const { email, password, role } = req.body;

    // Select table based on role
    const tableName = role === ROLES.ADMIN ? "admin" : "users";
    const qry = `SELECT * FROM ${tableName} WHERE email = ?`;
    const [rows] = await connection.query(qry, [email]);


    if (rows.length === 0) {
      return res.status(400).send({ message: "Login failed, email not found" });
    }

    const user = rows[0];

    
    const isPasswordValid =
      user.password === password || compareSync(password, user.password);

    
    if (!isPasswordValid) {
      return res.status(400).send({ message: "Invalid password" });
    }

    
    const token = jwt.sign(
      { userId: user.id, role },
      "user1234" 
    );

    // Success response
    res.status(200).send({
      token,
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name || user.fullname,
        email: user.email,
        role,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).send({ message: "Something went wrong" });
  }
}
