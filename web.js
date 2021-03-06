#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require("./app.js");
var debug = require("debug")("backe:server");
var http = require("http");

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT||"8001");
app.set("port", port);
if(process.env.NODE_ENV==='production'){
  app.use()
}

/**
 * Create HTTP server.
 */
const webSocket = require("./socket");
var server = http.createServer(app);

webSocket(server);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
// var io = require('socket.io')(server);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}

//socket.io
// var io = require('socket.io')(server);

// io.on('connection', function(socket) {
//   console.log(socket.id)
//   socket.on('event_name', function(data) {
//       // io.emit('MESSAGE', data)
//       console.log('Message from Client: ' + data);
//     });
// });
