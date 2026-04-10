const CART_KEY = "buzzbuy_cart";
const WISHLIST_KEY = "buzzbuy_wishlist";
const USER_KEY = "buzzbuy_user";
const ORDERS_KEY = "buzzbuy_orders";

const readStorage = (key, fallbackValue) => {
  const savedValue = window.localStorage.getItem(key);

  if (!savedValue) {
    return fallbackValue;
  }

  try {
    return JSON.parse(savedValue);
  } catch (error) {
    return fallbackValue;
  }
};

const writeStorage = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const getStoredCart = () => readStorage(CART_KEY, []);
export const getStoredWishlist = () => readStorage(WISHLIST_KEY, []);
export const getStoredUser = () => readStorage(USER_KEY, null);
export const getStoredOrders = () => readStorage(ORDERS_KEY, []);

export const storeCart = (cartItems) => writeStorage(CART_KEY, cartItems);
export const storeWishlist = (wishlistItems) => writeStorage(WISHLIST_KEY, wishlistItems);
export const storeUser = (user) => writeStorage(USER_KEY, user);
export const storeOrders = (orders) => writeStorage(ORDERS_KEY, orders);
