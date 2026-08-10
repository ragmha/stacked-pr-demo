import { createServer } from "node:http";
import { listProducts } from "./catalog.js";

export function startServer(port = 3000) {
  return createServer((request, response) => {
    if (request.url === "/api/products") {
      response.writeHead(200, { "content-type": "application/json" });
      response.end(JSON.stringify(listProducts()));
      return;
    }

    response.writeHead(404);
    response.end("Not found");
  }).listen(port);
}
