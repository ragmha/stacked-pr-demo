import assert from "node:assert/strict";
import test from "node:test";
import { renderWishlist } from "../src/wishlist-view.js";

test("renders wishlist product identifiers", () => {
  assert.match(renderWishlist([1]), /Product 1/);
});

test("renders an empty state", () => {
  assert.match(renderWishlist([]), /empty/);
});
