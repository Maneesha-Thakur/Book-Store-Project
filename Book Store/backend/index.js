import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { PORT, mongoDBURL } from "./config.js";
import booksRouter from "./routes/booksRoute.js";

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.use(cors())

// CORS middleware
// app.use(cors({
//   origin: 'http://localhost:3000',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type']
// }));

// Route for root
app.get('/', (req, res) => {
  res.status(200).send('Welcome to MERN Stack');
});

// Route for books
app.use('/books', booksRouter);

// Connect to MongoDB
mongoose.connect(mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
    // Start the server after successfully connecting to MongoDB
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error("MongoDB connection error:", error);
  });
  