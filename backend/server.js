const http = require('http');
const app = require('./app');
const debug = require("debug")("node-angular");
const socketIO=require('socket.io');

// const io =require("socket.io")
// introduction
// const port=process.env.PORT || 3000;
// app.set('port',port);
// const server = http.createServer(app);
// server.listen(port);

// we want to listen app for all incoming requests--> just pass it to createServer
const normalizePort = val => {
  var port = parseInt(val, 10);
  if (isNaN(port)) {
    //named pipe
    return val;
  }

  if (port >= 0) {
    //port number
    return port;
  }
  return false;
}

const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof addr === "string" ? "pipe" + addr : "port" + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + "requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + "is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }


};
const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe" + addr : "port" + port;
  debug("Listening on" + bind);
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);
const server = http.createServer(app);
server.on("error", onError);
// const io = require("socket.io")(server_http);
const io =socketIO(server);
require('./socket_chat/groupchat')(io); // to be able to use io in groupchat files

//-------------------------------------
const server_listening = server.listen(port, () => {
  console.log("welcome to", server.address().port);
});

