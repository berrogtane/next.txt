// pages/api/write-data.js
const fs = require("fs");

export default (req, res) => {
  if (req.method === "POST") {
    // parse the POST request body
    let body = "";
    req.on("data", chunk => {
      body += chunk.toString(); // convert Buffer to string
    });
    req.on("end", () => {
      // extract the data from the request body
      const data = JSON.parse(body).data;
      // write the data to a .txt file using the fs module
      fs.appendFile("data.txt", data + "\n", err => {
        if (err) {
          res.status(500).send("Error writing to file");
        } else {
          res.status(200).send("Data written to file");
        }
      });
    });
  } else {
    res.status(405).send("Method not allowed");
  }
};
