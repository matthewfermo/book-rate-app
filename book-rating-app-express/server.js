const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;

var db, collection;

const url =
  "mongodb+srv://demo:demo@cluster0-q2ojb.mongodb.net/test?retryWrites=true";
const dbName = "demo";

app.listen(3000, () => {
  MongoClient.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (error, client) => {
      if (error) {
        throw error;
      }
      db = client.db(dbName);
      console.log("Connected to `" + dbName + "`!");
    }
  );
});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  db.collection("messages")
    .find()
    .sort({ likes: -1 })
    .toArray((err, result) => {
      console.log(result);
      if (err) return console.log(err);
      res.render("index.ejs", { messages: result });
    });
});

app.post("/messages", (req, res) => {
  db.collection("messages").insertOne(
    {
      author: req.body.author.trim(),
      title: req.body.title.trim(),
      thumbUp: 0,
      thumbDown: 0,
    },
    (err, result) => {
      if (err) return console.log(err);
      console.log("saved to database");
      res.redirect("/");
    }
  );
});

app.put("/messages", (req, res) => {
  console.log(req);
  db.collection("messages").findOneAndUpdate(
    { author: req.body.author.trim(), title: req.body.title.trim() },
    {
      $set: {
        thumbUp: req.body.thumbUp + 1,
      },
    },
    {
      sort: { _id: -1 },
    },
    (err, result) => {
      if (err) return res.send(err);
      res.send(result);
    }
  );
});
app.put("/messages/thumbDown", (req, res) => {
  db.collection("messages").findOneAndUpdate(
    { author: req.body.author.trim(), title: req.body.title.trim() },
    {
      $set: {
        thumbUp: req.body.thumbUp - 1,
      },
    },
    {
      sort: { _id: -1 },
    },
    (err, result) => {
      if (err) return res.send(err);
      res.send(result);
    }
  );
});
app.put("/messages/edit", (req, res) => {
  db.collection("messages").findOneAndUpdate(
    { _id: ObjectID(req.body.id) },
    {
      $set: {
        author: req.body.author.trim(),
        title: req.body.title.trim(),
      },
    },
    (err, result) => {
      if (err) return res.send(err);
      res.send(result);
    }
  );
});

app.delete("/messages", (req, res) => {
  console.log(req.body);
  db.collection("messages").findOneAndDelete(
    { _id: ObjectID(req.body.id) },
    (err, result) => {
      if (err) return res.send(500, err);
      res.send("Message deleted!");
    }
  );
});
