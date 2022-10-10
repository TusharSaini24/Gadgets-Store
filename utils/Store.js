import { createContext, useReducer } from "react";
import Cookies from "js-cookie";

export const Store = createContext();

const initialState = {
  cart: Cookies.get("cart")
    ? JSON.parse(Cookies.get("cart"))
    : { cartItems: [] },
  user: Cookies.get("user") ? JSON.parse(Cookies.get("user")) : {},
};

function reducer(state, action) {
  switch (action.type) {
    case "CART_ADD_ITEM": {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.name === existItem.name ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      Cookies.set("cart", JSON.stringify({ ...state.cart, cartItems }));
      return { cart: { ...state.cart, cartItems } };
    }
    case "REMOVE_ITEM_FROM_CART": {
      Cookies.set(
        "cart",
        JSON.stringify({
          ...state.cart,
          cartItems: [
            ...state.cart.cartItems.filter(
              (item) => action.payload._id !== item._id
            ),
          ],
        })
      );
      return {
        cart: {
          ...state.cart,
          cartItems: [
            ...state.cart.cartItems.filter(
              (item) => action.payload._id !== item._id
            ),
          ],
        },
      };
    }
    case "CLEAR_CART": {
      Cookies.remove("cart");

      return {
        ...state,
        cart: {
          cartItems: [],
        },
      };
    }
    case "USER_LOGIN": {
      Cookies.set("user", JSON.stringify({ ...action.payload }));
      return {
        ...state,
        user: {
          ...action.payload,
        },
      };
    }

    default:
      return state;
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
}
