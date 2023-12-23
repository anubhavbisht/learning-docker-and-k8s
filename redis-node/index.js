const express = require("express");
const redis = require("redis");

const app = express();
const client = redis.createClient({
  host: "redis-server",
  port: 6379,
});
client.set("visits", 0);

app.get("/", (req, res) => {
  client.get("visits", (err, visits) => {
    res.status(200).send(`Number of visits is ->${visits}`);
    client.set("visits", Number(visits) + 1);
  });
});

app.listen(8081, () => {
  console.log("Server is listening on port 8081");
});
