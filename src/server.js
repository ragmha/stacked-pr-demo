import { createServer } from "node:http";
import { listProducts } from "./catalog.js";
import { addWishlistItem, getWishlist } from "./wishlist-store.js";
import { renderWishlist } from "./wishlist-view.js";

export function startServer(port = 3000) {
  return createServer((request, response) => {
    if (request.url === "/api/products") {
      response.writeHead(200, { "content-type": "application/json" });
      response.end(JSON.stringify(listProducts()));
      return;
    }

    if (request.url === "/api/wishlist" && request.method === "GET") {
      response.writeHead(200, { "content-type": "application/json" });
      response.end(JSON.stringify(getWishlist("demo-user")));
      return;
    }

    if (request.url === "/api/wishlist/1" && request.method === "POST") {
      response.writeHead(201, { "content-type": "application/json" });
      response.end(JSON.stringify(addWishlistItem("demo-user", 1)));
      return;
    }

    if (request.url === "/wishlist") {
      response.writeHead(200, { "content-type": "text/html" });
      response.end(renderWishlist(getWishlist("demo-user")));
      return;
    }

    response.writeHead(404);
    response.end("Not found");
  }).listen(port);
}
