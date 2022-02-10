import { CLEAR_CART, GET_TOTALS, REMOVE, TOGGLE_AMOUNT } from "./actions";
import cartItems from "./cart-items";
// INCRESE,DECREASE

const initialStore = {
  cart: cartItems,
  total: 0,
  amount: 0,
};
function reducer(state = initialStore, action) {
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] };
  }
  // if (action.type === INCREASE) {
  //   console.log("your incresed amount");
  //   let tempCart = state.cart.map((item) => {
  //     if (item.id === action.payload.id) {
  //       item = { ...item, amount: item.amount + 1 };
  //     }
  //     return item;
  //   });

  //   return { ...state, cart: tempCart };
  // }
  // if (action.type === DECREASE) {
  //   // console.log("you decrese amount");
  //   // let tempCart = [];
  //   // if (action.payload.amount === 1) {
  //   //   tempCart = state.cart.filter((item) => item.id !== action.payload.id);
  //   // } else {
  //   let tempCart = state.cart.map((item) => {
  //     if (item.id === action.payload.id) {
  //       item = { ...item, amount: item.amount - 1 };
  //     }
  //     return item;
  //   });
  //   // }
  //   return { ...state, cart: tempCart };
  // }

  if (action.type === REMOVE) {
    // console.log("remove item from cart",action.payload);
    return {
      ...state,
      cart: state.cart.filter((item) => item.id !== action.payload.id),
    };
  }

  if (action.type === GET_TOTALS) {
    let { total, amount } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { price, amount } = cartItem;
        const itemTotal = price * amount;

        cartTotal.total += itemTotal;
        cartTotal.amount += amount;
        return cartTotal;
      },
      { total: 0, amount: 0 }
    );
    total = parseFloat(total.toFixed(2));
    return { ...state, total, amount };
  }
  // const newTotal = state.cart
  //   .map((item) => {
  //     // console.log(item.amount);
  //     return item.price * item.amount;
  //   })
  //   .reduce((a, b) =>{ return a + b},0);
  //   const newAmount=state.cart.map((item)=>item.amount).reduce((a,b)=>{return a+b},0)
  // console.log(newTotal);
  // return { ...state, total: newTotal,amount:newAmount };
  // }

  if (action.type === TOGGLE_AMOUNT) {
    return {
      ...state,
      cart: state.cart.map((item) => {
        if (item.id === action.payload.id) {
          if (action.payload.toggle === "inc") {
            return (item = { ...item, amount: item.amount + 1 });
          }
          if (action.payload.toggle === "dec") {
            return (item = { ...item, amount: item.amount - 1 });
          }
        }
        return item;
      }),
    };
  }
  return state;
}
export default reducer;

// switch (action.type) {
//   case CLEAR_CART:
//     return { ...state, cart: [] };
//   default:
//     return state;
// }
