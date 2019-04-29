var express = require('express');
var router = express.Router();
var ans;
////////////////////////////////////////////////////
var bodyParser = require("body-parser");
var app = require("express")();
var MongoClient = require("mongodb").MongoClient;
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

MongoClient.connect("mongodb://localhost:27017", (err, client) => {
    // MongoClient.connect("mongorestore --host Cluster0-shard-0/cluster0-shard-00-00-7bgga.gcp.mongodb.net:27017,cluster0-shard-00-01-7bgga.gcp.mongodb.net:27017,cluster0-shard-00-02-7bgga.gcp.mongodb.net:27017 --ssl --username user1234 --password pass1234 --authenticationDatabase admin ", (err, client) => {

    if (err) throw err;

    var db = client.db("webpro");

    app.get("/", function(req, res, next) {
        res.render("login", {});
    });
    app.get("/login", function(req, res, next) {
        res.render("login", {});
    });
    app.get("/login", function(req, res, next) {
        res.render("login", {});
    });
    app.post("/result", (req, res) => {
        db.collection("MST_Employee").findOne({
                user: req.body.user,
                password: req.body.pass
            },
            (err, result) => {
                if (err) return res.status(500).send(err.toString());
                if (result) {
                    res.render("result", {
                        doctype: result.doctype
                    });
                } else {
                    res.render("result", {
                        doctype: "ERROR"
                    });

                }
            }
        );
    });
    app.listen(3001, () => {
        console.log("  App is running at http://localhost:3001");
    });
});

module.exports = app;