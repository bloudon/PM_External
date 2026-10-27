import app from "./app";
import { logger } from "./lib/logger";

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (!Number.isInteger(port) || port <= 0 || port > 65535) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const host = process.env["HOST"]?.trim();
if (process.env.NODE_ENV === "production" && host !== "127.0.0.1") {
  throw new Error("Production mail service requires HOST=127.0.0.1 behind Nginx.");
}

const onListen = () => {
  logger.info({ port, host }, "Server listening");
};

const server = host
  ? app.listen(port, host, onListen)
  : app.listen(port, onListen);

server.on("error", (err) => {
  logger.error({ err, port, host }, "Error listening on port");
  process.exit(1);
});
