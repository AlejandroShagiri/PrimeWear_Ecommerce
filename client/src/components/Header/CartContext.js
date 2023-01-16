import { createContext, useReducer } from "react";

export const CartContext = createContext();
// context for quantity and numInStock
const intitialState = {

  items: [],

  id: "",
};
const reducer = (state = intitialState, action) => {
  switch (action.type) {
    // product info for quantity and numInStock without any changes
    case "set-product-info": {
      return {
        items: state.items.map((items) =>
          items.itemId === action.items ? { ...items, selected: true } : items
        ),
      };
    }
    // changes the quantity
    case "set-quantity": {
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.itemId === action.updatingItem.itemId) {
            item.quantity = action.updatingItem.quantity;
          }
        }),
      };
    }
    //deletes the quantity
    case "set-delete-quantity": {
      return {
        ...state,
        id: action.id,
      };
    }

    default:
      throw new Error(`Unrecognized action: ${action.type}`);
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, intitialState);

  // function to get the whole Item array
  const setProductInfo = (data) => {
    dispatch({ type: "set-product-info", ...data });
  };

  // function to modify only the quantity based on item Id
  const setQuantity = (updatingItem) => {
    dispatch({ type: "set-quantity", updatingItem });
  };

  //function to delete Item
  const setDeleteQuantity = (id) => {
    dispatch({ type: "set-delete-quantity", id });
  };

  return (
    <CartContext.Provider
      value={{
        state,
        action: { setProductInfo, setQuantity, setDeleteQuantity },
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
