import { getConnectionObject } from "../configs/DbConfig.js";

// CREATE - Add Bus
export async function addBus(request, response) {
  try {
    const connection = await getConnectionObject();
    const data = request.body;

    const qry = `INSERT INTO buses (bus_name, source, destination, departure_time, arrival_time, date, price)
                 VALUES ('${data.bus_name}', '${data.source}', '${data.destination}', '${data.departure_time}', '${data.arrival_time}', '${data.date}', ${data.price})`;

    const [resultSet] = await connection.query(qry);

    if (resultSet.affectedRows === 1)
      response.status(200).send({ message: "Bus added successfully" });
    else
      response.status(500).send({ message: "Failed to add bus" });
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: "Something went wrong" });
  }
}

// READ ALL - Get all Buses
export async function getAllBuses(request, response) {
  try {
    const connection = await getConnectionObject();
    const [rows] = await connection.query("SELECT * FROM buses");
    response.status(200).send(rows);
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: "Something went wrong" });
  }
}

// READ ONE - Get Bus by ID
export async function getBusById(request, response) {
  try {
    const connection = await getConnectionObject();
    const [rows] = await connection.query(`SELECT * FROM buses WHERE id=${request.params.id}`);
    if (rows.length === 0)
      response.status(404).send({ message: "Bus not found" });
    else
      response.status(200).send(rows[0]);
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: "Something went wrong" });
  }
}

// UPDATE - Update Bus details
export async function updateBus(request, response) {
  try {
    const connection = await getConnectionObject();
    const { bus_name, source, destination, departure_time, arrival_time, date, price } = request.body;

    const qry = `UPDATE buses 
                 SET bus_name='${bus_name}', source='${source}', destination='${destination}', 
                     departure_time='${departure_time}', arrival_time='${arrival_time}', 
                     date='${date}', price=${price}
                 WHERE id=${request.params.id}`;

    const [resultSet] = await connection.query(qry);

    if (resultSet.affectedRows === 1)
      response.status(200).send({ message: "Bus updated successfully" });
    else
      response.status(404).send({ message: "Bus not found" });
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: "Something went wrong" });
  }
}

//DELETE - Delete Bus by ID
export async function deleteBus(req, res) {
  try {
    const connection = await getConnectionObject();
    const { id } = req.params;

    const [result] = await connection.query("DELETE FROM buses WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).send({ message: "Bus not found" });
    }

    res.status(200).send({ message: "Bus deleted successfully" });
  } catch (error) {
    console.error("Delete Bus Error:", error);
    res.status(500).send({ message: "Failed to delete bus", error });
  }
}



