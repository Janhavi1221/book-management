const express = require("express");
const dbConnect = require("./database");
const router = require("./routes/bookRoute");
const cors = require("cors");

const port = 8000;

dbConnect();

const app = express();

// Enable CORS for all routes
app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:5174", "http://127.0.0.1:5174", "http://localhost:5175", "http://127.0.0.1:5175", "http://localhost:5176", "http://127.0.0.1:5176", "http://localhost:5177", "http://127.0.0.1:5177", "http://localhost:5178", "http://127.0.0.1:5178", "http://localhost:5179", "http://127.0.0.1:5179"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Define routes BEFORE listen
app.get("/", (req, res) => {
    res.send("Book Management backend is working");
});

app.use("/book", router);

// Start server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});