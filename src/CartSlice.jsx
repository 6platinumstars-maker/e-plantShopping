import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
     const plant = action.payload;
      // name をキーに同じ植物が既にあるか探す
     const existingItem = state.items.find(
     (item) => item.name === plant.name
     );
     if (existingItem) {
      // すでにカートにある → 数量だけ増やす
      existingItem.quantity += 1;
     } else {
      // 初めての追加 → quantity を 1 にして追加
      state.items.push({
       ...plant,
      quantity: 1,
     });
    }

    },
    removeItem: (state, action) => {
      const nameToRemove = action.payload;
       state.items = state.items.filter(
      (item) => item.name !== nameToRemove
    );
    },

    updateQuantity: (state, action) => {
     const { name, amount } = action.payload;
     const item = state.items.find(
     (item) => item.name === name
     );
      if (item) {
       item.quantity = amount;
     }
    
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
