import assert from "node:assert/strict";
import test from "node:test";
import {
  addWishlistItem,
  clearWishlists,
  getWishlist
} from "../src/wishlist-store.js";

test.beforeEach(clearWishlists);

test("stores unique wishlist items per user", () => {
  addWishlistItem("demo-user", 1);
  addWishlistItem("demo-user", 1);
  assert.deepEqual(getWishlist("demo-user"), [1]);
});
