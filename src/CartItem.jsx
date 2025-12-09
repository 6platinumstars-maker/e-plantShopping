import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";
import "./CartItem.css"; // もともとあるCSSに合わせて

const CartItem = ({ onContinueShopping }) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  // カート内の全アイテム合計金額
  const calculateTotalAmount = () => {
    return items.reduce((total, item) => {
      const price = parseFloat(item.cost.substring(1)); // "$15" → 15
      return total + price * item.quantity;
    }, 0);
  };

  // 各アイテムの小計
  const calculateItemSubtotal = (item) => {
    const price = parseFloat(item.cost.substring(1));
    return price * item.quantity;
  };

  const totalAmount = calculateTotalAmount();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  // 「買い物を続ける」ボタン
  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping(e); // 親(ProductList)からもらった関数を呼ぶ
  };

  // Checkout（今回はアラートだけ）
  const handleCheckoutShopping = (e) => {
    e.preventDefault();
    alert("Functionality to be added for future reference");
  };

  // 数量＋1
  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        name: item.name,
        amount: item.quantity + 1,
      })
    );
  };

  // 数量−1 or 0になったら削除
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({
          name: item.name,
          amount: item.quantity - 1,
        })
      );
    } else {
      // 1 → 0 になる場合はカートから削除
      dispatch(removeItem(item.name));
    }
  };

  // 完全にカートから削除
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>

      <div className="cart-summary">
        <p>Total items: {totalItems}</p>
        <p>Total amount: ${totalAmount.toFixed(2)}</p>
      </div>

      <div className="cart-items">
        {items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          items.map((item) => (
            <div className="cart-card" key={item.name}>
              <img
                src={item.image}
                alt={item.name}
                className="cart-image"
              />
              <div className="cart-info">
                <h3>{item.name}</h3>
                <p>Unit price: {item.cost}</p>
                <p>
                  Subtotal: ${calculateItemSubtotal(item).toFixed(2)}
                </p>

                <div className="cart-quantity-controls">
                  <button onClick={() => handleDecrement(item)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncrement(item)}>+</button>
                </div>

                <button
                  className="cart-remove-button"
                  onClick={() => handleRemove(item)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="cart-actions">
        <button onClick={handleContinueShopping}>
          Continue Shopping
        </button>
        <button onClick={handleCheckoutShopping}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
