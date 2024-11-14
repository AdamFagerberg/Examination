import { useNavigate, useParams } from "react-router-dom";
import "./Confirmation.css";
import { fetchOrder } from "../../utils/api/orders";
import { useEffect, useState } from "react";
import { calculateTimeRemaining } from "../../utils/helpers/helpers";
import boxtop from "../../assets/boxtop.png";
import Receipt from "../../components/Receiept/Receipt";

function ConfirmationPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState<OrderConfirmation | null>(null);
  const [isReceiptOpen, setIsReceiptOpen] = useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const data = await fetchOrder(orderId!);
      setOrder(data);
    };

    fetchData();
  }, [orderId]);

  useEffect(() => {
    if (!order) return;

    const initialRemaining = calculateTimeRemaining(order.eta);
    setTimeRemaining(initialRemaining);

    if (initialRemaining <= 0) return;

    const timer = setInterval(() => {
      const remaining = calculateTimeRemaining(order.eta);
      setTimeRemaining(remaining);

      if (remaining <= 0) {
        clearInterval(timer);
      }
    }, 60000);

    return () => clearInterval(timer);
  }, [order]);

  function makeNewOrder() {
    navigate("/");
  }

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <main className="confirmation-main">
      <header>
        <img src={boxtop} alt="Image of wonton box" className="box-image" />
        <h1 className="order-title">
          DINA WONTONS
          <br />
          TILLAGAS!
        </h1>
      </header>
      <article className="order-status">
        {timeRemaining > 0 ? (
          <p className="eta-text">ETA {timeRemaining} MIN</p>
        ) : (
          <p className="eta-text">Order Complete!</p>
        )}
        <p className="order-id">#{orderId}</p>
      </article>
      <nav className="confirmation-buttons-container">
        <button
          className="confirmation-button"
          onClick={() => setIsReceiptOpen(true)}
        >
          SE KVITTO
        </button>
        <button className="confirmation-button" onClick={makeNewOrder}>
          GÖR EN NY BESTÄLLNING
        </button>
      </nav>

      <Receipt
        orderId={orderId!}
        isOpen={isReceiptOpen}
        onClose={() => setIsReceiptOpen(false)}
      />
    </main>
  );
}

export default ConfirmationPage;
