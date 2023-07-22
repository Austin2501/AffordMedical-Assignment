// Vineet Rawat
// 2000320100191
// C.S.E, ABES Engineering College
const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3000;

app.get("/numbers", async (req, res) => {
  const urls = req.query.url;

  if (!urls || !Array.isArray(urls)) {
    return res.status(400).json({ error: "bad query." });
  }

  const result = new Set();

  try {
    const fetchNumbers = async (url) => {
      try {
        const response = await axios.get(url);
        if (response.data && Array.isArray(response.data.numbers)) {
          response.data.numbers.forEach((number) => {
            result.add(number);
          });
        }
      } catch (error) {
        console.error("Error fetching numbers from", url, error);
      }
    };

    const requests = urls.map(fetchNumbers);
    await Promise.all(requests);

    const endResult = Array.from(result).sort((a, b) => a - b);
    return res.json({ numbers: endResult });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "error occurred." });
  }
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT} is running`);
});
