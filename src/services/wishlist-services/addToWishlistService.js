import axios from "axios";

export const addToWishlistService = async (product) => {
  return await axios.post("/api/user/wishlist", { product: { ...product } });
};
