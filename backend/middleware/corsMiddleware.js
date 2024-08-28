const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:3000", // Replace with your frontend URL
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

module.exports = cors(corsOptions);
