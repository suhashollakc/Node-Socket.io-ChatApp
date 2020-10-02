var express = require("express");
var http = require("http");

var app = express();
var server = http.Server(app);
var io = require("socket.io")(server);
var users = [];

server.listen(3333, function() {

    console.log("the development server is running");
});

app.get("/", function(req, res) {

    res.sendFile(__dirname + "/index.html");

});

app.get("/css/style.css", function(req, res) {

    res.sendFile(__dirname + "/css/style.css");

});

io.on("connection", function(socket) {

    var name = "";

    socket.on("has connected", function(username) {
        name = username;
        users.push(username);

        io.emit("has connected", { username: name, usersList: users });

    });
    socket.on("disconnect", function() {

        users.splice(users.indexOf(name), 1);
        io.emit("has disconnected", { username: name, usersList: users });

    });

    socket.on("new message", function(data) {
        io.emit("new message", data);
    });

});