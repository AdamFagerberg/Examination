type OrderConfirmation = {
  id: string;
  items: MenuItem[];
  orderValue: number;
  eta: string;
  timestamp: string;
  state: "waiting" | "processing" | "done";
};

type OrderBody = {
  items: number[];
};

type Receipt = {
  id: string;
  orderValue: number;
  timestamp: string;
  items: ReceiptItem[];
};

type ReceiptItem = {
  id: number;
  name: string;
  type: "wonton" | "dip" | "drink";
  quantity: number;
  price: number;
};

type CartContext = {
  cartOrder: CartOrder;
  cartItems: MenuItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
};

type CartOrder = {
  items: number[];
};
