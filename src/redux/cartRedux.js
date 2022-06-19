
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
     name: "cart",
     initialState: {
          products: [],
          quantity: 0,
          total: 0,
     },
     reducers: {
          addProduct: (state, action) => {
               state.quantity += 1;
               //the payload is pointing to the new product in the cart
               //before
               // state.products.push(action.payload.product);
               //now
                state.products.push(action.payload);
               state.total += action.payload.price * action.payload.quantity;
          }
     }
})

export const { addProduct } = cartSlice.actions;
export default cartSlice.reducer;