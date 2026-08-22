/**
 * GoDaddy Node.js Apps / Passenger startup file.
 * Set Application startup file to: server.js
 */
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOST || "0.0.0.0";
const port = Number(process.env.PORT) || 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    createServer((req, res) => {
      const parsedUrl = parse(req.url || "/", true);
      handle(req, res, parsedUrl);
    }).listen(port, hostname, () => {
      console.log(`S V Healthcare ready on http://${hostname}:${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start Next.js server", error);
    process.exit(1);
  });
