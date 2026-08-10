import assert from "node:assert/strict";
import test from "node:test";
import { listProducts } from "../src/catalog.js";

test("lists products", () => {
  assert.equal(listProducts().length, 2);
});
