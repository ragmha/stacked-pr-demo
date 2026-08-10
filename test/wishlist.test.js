import assert from "node:assert/strict";
import test from "node:test";
import {
  addWishlistItem,
  clearWishlists,
  getWishlist
} from "../src/wishlist-store.js";
import { renderWishlist } from "../src/wishlist-view.js";

test.beforeEach(clearWishlists);

test("stores and renders a wishlist", () => {
  addWishlistItem("demo-user", 1);
  assert.deepEqual(getWishlist("demo-user"), [1]);
  assert.match(renderWishlist([1]), /Product 1/);
});
