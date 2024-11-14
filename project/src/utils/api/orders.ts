/* Tenant ID "f3sj"; */
const API_URL =
  "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/f3sj/orders";
const API_KEY = "yum-1Cqgm3S6nlMechWO";

export async function sendOrder(
  cartOrder: CartOrder
): Promise<OrderConfirmation> {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-zocom": API_KEY },
      body: JSON.stringify(cartOrder),
    });

    if (!response.ok) {
      throw new Error(`Error sending order! status: ${response.status}`);
    }

    const data = await response.json();
    return data.order as OrderConfirmation;
  } catch (error) {
    console.error("Error sending order", error);
    throw error;
  }
}

export async function fetchOrders(): Promise<OrderConfirmation[]> {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: { "Content-Type": "application/json", "x-zocom": API_KEY },
    });

    if (!response.ok) {
      throw new Error(`Error getting orders! status: ${response.status}`);
    }

    const data = await response.json();
    return data as OrderConfirmation[];
  } catch (error) {
    console.error("Error getting orders", error);
    throw error;
  }
}

export async function fetchOrder(orderId: string): Promise<OrderConfirmation> {
  const ORDER_URL = `${API_URL}/${orderId}`;

  try {
    const response = await fetch(ORDER_URL, {
      method: "GET",
      headers: { "Content-Type": "application/json", "x-zocom": API_KEY },
    });

    if (!response.ok) {
      throw new Error(`Error getting order! status: ${response.status}`);
    }

    const data = await response.json();
    return data.order as OrderConfirmation;
  } catch (error) {
    console.error("Error getting order", error);
    throw error;
  }
}
