import { useEffect, useState } from "react";
import "./Receipt.css";
import { fetchReceipt } from "../../utils/api/reciepts";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

type ReceiptProps = {
  orderId: string;
  isOpen: boolean;
  onClose: () => void;
};

export default function Receipt({ orderId, isOpen }: ReceiptProps) {
  const [receipt, setReceipt] = useState<Receipt | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      const fetchData = async () => {
        const data = await fetchReceipt(orderId);
        setReceipt(data);
      };
      fetchData();
    }
  }, [isOpen, orderId]);

  function newOrder() {
    navigate("/");
  }

  return (
    <dialog open={isOpen} className="receipt-modal">
      {receipt ? (
        <>
          <header className="receipt-header">
            <img src={logo} alt="Logo" className="receipt-logo" />
            <h2>KVITTO</h2>
            <p className="receipt-id">#{orderId}</p>
          </header>

          <ul>
            {receipt.items.map((item) => (
              <li key={item.id} className="receipt-item">
                <div className="receipt-item-upper">
                  <h2>{item.name}</h2>
                  <span className="receipt-dotted-line"></span>
                  <p className="receipt-item-price">{item.price} SEK</p>
                </div>
                <div className="receipt-item-lower">
                  <p>{item.quantity} stycken</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="receipt-total-container">
            <div className="receipt-text-container">
              <h3 className="receipt-total-text">TOTALT</h3>
              <p className="receipt-total-vat">inkl 20% moms</p>
            </div>
            <p className="receipt-total-value">{receipt.orderValue} SEK</p>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
      <button className="new-order-button" onClick={newOrder}>
        GÖR EN NY BESTÄLLNING
      </button>
    </dialog>
  );
}
