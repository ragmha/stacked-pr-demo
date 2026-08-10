export function renderWishlist(productIds) {
  if (productIds.length === 0) {
    return "<p>Your wishlist is empty.</p>";
  }

  return `<ul>${productIds.map((id) => `<li>Product ${id}</li>`).join("")}</ul>`;
}
