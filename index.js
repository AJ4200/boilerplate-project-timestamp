var express = require("express");
var app = express();

var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// Updated route with :date parameter
app.get("/api/:date", function (req, res) {
  const { date } = req.params;

  if (!date) {
    // If no date parameter is provided, return the current time
    const currentTime = new Date();
    res.json({ unix: currentTime.getTime(), utc: currentTime.toUTCString() });
  } else {
    // Attempt to parse the provided date
    const timestamp = new Date(date).getTime();

    if (!isNaN(timestamp)) {
      // If the date is valid, return the timestamp and UTC time
      res.json({ unix: timestamp, utc: new Date(timestamp).toUTCString() });
    } else if (!isNaN(Number(date))) {
      // If the date is a Unix timestamp, convert and return the result
      const timestamp = Number(date);
      res.json({ unix: timestamp, utc: new Date(timestamp).toUTCString() });
    } else {
      // If the date is invalid, return an error message
      res.json({ error: "Invalid Date" });
    }
  }
});

// Example endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
