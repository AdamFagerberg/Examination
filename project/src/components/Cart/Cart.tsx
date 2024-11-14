import "./Cart.css";
import { useCart } from "../../context/CartContext";
import { getItemQuantity, calculateTotal } from "../../utils/helpers/helpers";
import { useEffect, useRef } from "react";
import CartButton from "../CartButton/CartButton";
import { sendOrder } from "../../utils/api/orders";
import { useNavigate } from "react-router-dom";

type CartProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Cart({ isOpen, onClose }: CartProps) {
  const { cartItems, cartOrder, addToCart, removeFromCart, clearCart } =
    useCart();
  const dialogRef = useRef<HTMLDialogElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  async function handleCheckout() {
    try {
      const response = await sendOrder(cartOrder);
      clearCart();
      onClose();

      navigate(`/confirmation/${response.id}`);
    } catch (error) {
      console.error("Error processing order:", error);
    }
  }

  const total = calculateTotal(cartItems, cartOrder.items);

  return (
    <dialog ref={dialogRef} className="cart-modal" onClose={onClose}>
      <header className="cart-header">
        <CartButton onClick={onClose} cartCount={false}></CartButton>
      </header>

      {cartItems.length === 0 ? (
        <div className="cart-empty">Cart is Empty</div>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => {
              const quantity = getItemQuantity(item.id, cartOrder.items);

              return (
                <li key={item.id} className="cart-item">
                  <div className="cart-item-upper">
                    <h2 className="cart-item-name">{item.name}</h2>
                    <span className="cart-dotted-line"></span>
                    <p className="cart-item-price">
                      {item.price * quantity} SEK
                    </p>
                  </div>
                  <div className="cart-item-lower">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="cart-button"
                    >
                      -
                    </button>
                    <p className="cart-item-quantity">{quantity} stycken</p>
                    <button
                      onClick={() => addToCart(item)}
                      className="cart-button"
                    >
                      +
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="cart-price-container">
            <div className="cart-price-text">
              <h2>TOTALT</h2>
              <p>ink 20% moms</p>
            </div>
            <h2 className="cart-total">{total} SEK</h2>
          </div>

          <div className="cart-checkout-container">
            <button className="cart-checkout" onClick={handleCheckout}>
              TAKE MY MONEY!
            </button>
          </div>
        </>
      )}
    </dialog>
  );
}
