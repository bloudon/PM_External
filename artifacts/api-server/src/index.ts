import app from "./app";
import { logger } from "./lib/logger";

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const host = process.env["HOST"]?.trim();

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
