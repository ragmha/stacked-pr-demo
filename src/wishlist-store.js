const wishlists = new Map();

export function addWishlistItem(userId, productId) {
  const items = wishlists.get(userId) ?? [];
  if (!items.includes(productId)) {
    items.push(productId);
  }
  wishlists.set(userId, items);
  return [...items];
}

export function getWishlist(userId) {
  return [...(wishlists.get(userId) ?? [])];
}

export function clearWishlists() {
  wishlists.clear();
}
