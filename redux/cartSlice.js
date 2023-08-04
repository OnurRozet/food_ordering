
const { createSlice } = require("@reduxjs/toolkit");

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
      state.quantity += action.payload.quantity;
      state.total += action.payload.price;
    },
    reset:(state,action)=>{
      state.products=[],
      state.quantity=0,
      state.total=0
    },
    deleteProduct: (state, action) => {
      const deletedProduct = state.products.find(item => item._id === action.payload);
      if (deletedProduct) {
        state.products = state.products.filter(item => item._id !== action.payload);
        state.quantity -= deletedProduct.quantity;
        state.total -= deletedProduct.price ;
      }
    },
    increase:(state,action)=>{
      const increasedProduct=state.products.find((item)=>item._id === action.payload)
   
      if(increasedProduct){
        increasedProduct.quantity++;
        state.quantity++;
        state.total+=increasedProduct.price;
      }
    },
    decrease:(state,action)=>{
      const decreasedProduct=state.products.find((item)=>item._id === action.payload)
   
      if(decreasedProduct){
        decreasedProduct.quantity--;
        state.quantity--;
        state.total-=decreasedProduct.price;
      }

      if(decreasedProduct.quantity === 0){
       state.products.pop(decreasedProduct._id)
      }
    }
  },
});

export const { addProduct,reset,deleteProduct,increase ,decrease} = cartSlice.actions;
export default cartSlice.reducer
