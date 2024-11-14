const API_URL =
  "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/receipts";
const API_KEY = "yum-1Cqgm3S6nlMechWO";

export async function fetchReceipt(orderId: string): Promise<Receipt> {
  const RECEIPT_URL = `${API_URL}/${orderId}`;
  try {
    const response = await fetch(RECEIPT_URL, {
      method: "GET",
      headers: { "Content-Type": "application/json", "x-zocom": API_KEY },
    });

    if (!response.ok) {
      throw new Error(`Error getting receipt! status: ${response.status}`);
    }

    const data = await response.json();
    return data.receipt as Receipt;
  } catch (error) {
    console.error("Error getting receipt", error);
    throw error;
  }
}
