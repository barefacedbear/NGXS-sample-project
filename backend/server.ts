import http from 'http';
import { App } from './src/app';

const app = new App();
const normalizePort = (val:any) => {
  var port = parseInt(val, 10);

  if (isNaN(port))
    return val;

  if (port >= 0)
    return port;

  return false;
};

const onError = (error:any) => {
  if (error.syscall !== "listen")
    throw error;

  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
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
};

const onListening = () => {
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  console.log("Listening on " + bind);
};

const port = normalizePort(process.env.PORT || "3000");
app.app.set("port", port);

const server = http.createServer(app.app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);