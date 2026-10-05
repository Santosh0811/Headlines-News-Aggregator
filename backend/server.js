const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5001;
const API_KEY = process.env.NEWS_API;

app.use(cors({ origin: process.env.MY_FRONTEND_ORIGIN }));
app.use(express.json());

// Allowed categories
const categories = [
  "general",
  "business",
  "sports",
  "entertainment",
  "health",
  "technology",
  "science",
];

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "Headline Haven API is running 🚀",
  });
});

// News route
app.get("/:category", async (req, res) => {
  const { category } = req.params;
  const page = Number(req.query.page) || 1;

  // Safety check: API key
  if (!API_KEY) {
    return res.status(500).json({
      message: "API configuration error",
    });
  }

  // Safety check: category
  if (!categories.includes(category)) {
    return res.status(400).json({
      message: "Invalid news category",
    });
  }

  // Safety check: page
  if (page < 1 || !Number.isInteger(page)) {
    return res.status(400).json({
      message: "Page must be a positive number",
    });
  }

  try {
    const response = await axios.get(
      "https://newsapi.org/v2/top-headlines",
      {
        params: {
          country: "us",
          category: category,
          page: page,
          pageSize: 6,
          apiKey: API_KEY,
        },
        timeout: 10000,
      }
    );

    res.json(response.data);

  } catch (error) {
    console.error("News API error:", error.message);

    res.status(500).json({
      message: "Unable to fetch news",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
