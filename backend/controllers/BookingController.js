import { getConnectionObject } from "../configs/DbConfig.js";

// CREATE - Add a new booking

export async function addBooking(request, response) {
  try {
    const connection = await getConnectionObject();
    const { user_id, bus_id, seats, status } = request.body;
    const [busRows] = await connection.query(
      `SELECT price FROM buses WHERE id = ?`,
      [bus_id]
    );

    if (busRows.length === 0) {
      return response.status(404).send({ message: "Bus not found" });
    }

    const price = busRows[0].price;
    const total_amount = price * seats;

    const qry = `INSERT INTO bookings (user_id, bus_id, seats, total_amount, status)
                 VALUES (?, ?, ?, ?, ?)`;

    const [result] = await connection.query(qry, [
      user_id,
      bus_id,
      seats,
      total_amount,
      status,
    ]);

    if (result.affectedRows === 1)
      response.status(200).send({ message: "Booking created successfully", total_amount });
    else
      response.status(500).send({ message: "Failed to create booking" });

  } catch (error) {
    console.error(error);
    response.status(500).send({ message: "Something went wrong" });
  }
}


// READ ALL - Get all bookings 
export async function getAllBookings(request, response) {
  try {
    const connection = await getConnectionObject();
    const qry = `
      SELECT 
        b.id AS booking_id,
        u.fullname AS user_name,
        bs.bus_name,
        bs.source,
        bs.destination,
        b.seats,
        b.total_amount,
        b.status
      FROM bookings b
      JOIN users u ON b.user_id = u.id
      JOIN buses bs ON b.bus_id = bs.id;
    `;
    const [rows] = await connection.query(qry);
    response.status(200).send(rows);
  } catch (error) {
    console.error(error);
    response.status(500).send({ message: "Something went wrong" });
  }
}

//  READ ONE - Get booking by ID
export async function getBookingById(request, response) {
  try {
    const connection = await getConnectionObject();
    const qry = `
      SELECT 
        b.id AS booking_id,
        u.fullname AS user_name,
        bs.bus_name,
        bs.source,
        bs.destination,
        b.seats,
        b.total_amount,
        b.status
      FROM bookings b
      JOIN users u ON b.user_id = u.id
      JOIN buses bs ON b.bus_id = bs.id
      WHERE b.id = ${request.params.id};
    `;
    const [rows] = await connection.query(qry);

    if (rows.length === 0)
      response.status(404).send({ message: "Booking not found" });
    else
      response.status(200).send(rows[0]);
  } catch (error) {
    console.error(error);
    response.status(500).send({ message: "Something went wrong" });
  }
}

//  UPDATE - Update booking
export async function updateBooking(request, response) {
  try {
    const connection = await getConnectionObject();
    const { user_id, bus_id, seats, status } = request.body;

    // Get price of bus
    const [busRows] = await connection.query(
      `SELECT price FROM buses WHERE id = ?`,
      [bus_id]
    );

    if (busRows.length === 0) {
      return response.status(404).send({ message: "Bus not found" });
    }

    const price = busRows[0].price;
    const total_amount = price * seats;

    const qry = `UPDATE bookings 
                 SET user_id=?, bus_id=?, seats=?, total_amount=?, status=?
                 WHERE id=?`;

    const [result] = await connection.query(qry, [
      user_id,
      bus_id,
      seats,
      total_amount,
      status,
      request.params.id
    ]);

    if (result.affectedRows === 1)
      response.status(200).send({ message: "Booking updated successfully" });
    else
      response.status(404).send({ message: "Booking not found" });
  } catch (error) {
    console.error(error);
    response.status(500).send({ message: "Something went wrong" });
  }
}


//  DELETE - Delete booking by ID
export async function deleteBooking(request, response) {
  try {
    const connection = await getConnectionObject();
    const [result] = await connection.query(`DELETE FROM bookings WHERE id=${request.params.id}`);

    if (result.affectedRows === 1)
      response.status(200).send({ message: "Booking deleted successfully" });
    else
      response.status(404).send({ message: "Booking not found" });
  } catch (error) {
    console.error(error);
    response.status(500).send({ message: "Something went wrong" });
  }
}

//  READ BY USER - Get bookings for a specific user
export async function getBookingsByUser(req, res) {
  try {
    const { userId } = req.params;
    const connection = await getConnectionObject();
    const [rows] = await connection.query(
      "SELECT b.*, bs.bus_name, b.created_at FROM bookings b JOIN buses bs ON b.bus_id = bs.id WHERE b.user_id = ?",
      [userId]
    );
    res.status(200).send(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Failed to fetch user bookings" });
  }
}

