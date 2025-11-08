
import express from "express";
import cors from "cors";
import UserRoutes from "./routes/UserRoutes.js";
import busRoutes from "./routes/BusRoutes.js";
import { connectDb } from "./configs/DbConfig.js";
import BookingRoutes from "./routes/BookingRoutes.js";
import adminRoutes from "./routes/AdminRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

//  Connect to MySQL FIRST, then start the server
async function startServer() {
  try {
    await connectDb(); 
    console.log("Connected to MySQL database");

    
    app.get("/", (req, res) => {
      res.send(" Online Bus Ticket Booking API is running...");
    });
    
    app.use("/users", UserRoutes);

   
    app.use("/buses", busRoutes);
   
    
    app.use("/bookings", BookingRoutes);

    
   app.use("/admin", adminRoutes);
   
    // Start server
    const PORT = 1234;
    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(" Failed to start server:", error.message);
  }
}

startServer();
