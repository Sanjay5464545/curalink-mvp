require("dotenv").config();
const express = require("express");
const cors = require("cors");

const aiRoutes = require('./routes/ai');

const app = express();
app.use(cors());
app.use(express.json());

// simple test route
app.get("/", (req, res) => {
  res.send("CuraLink backend is running ✅");
});

// mount AI routes
app.use('/api/ai', aiRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
