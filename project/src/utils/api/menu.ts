const API_URL = "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/menu";
const API_KEY = "yum-1Cqgm3S6nlMechWO";

export async function fetchMenu(): Promise<MenuData> {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: { "Content-Type": "application/json", "x-zocom": API_KEY },
    });

    if (!response.ok) {
      throw new Error(`HTTP error fetching menu! status: ${response.status}`);
    }

    const data = await response.json();
    return data.items as MenuData;
  } catch (error) {
    console.error("Error fetching menu:", error);
    throw error;
  }
}

export async function fetchMenuItem(itemId: string): Promise<MenuItem> {
  const ITEM_URL = `${API_URL}/menu/${itemId}`;
  try {
    const response = await fetch(ITEM_URL, {
      method: "GET",
      headers: { "Content-Type": "application/json", "x-zocom": API_KEY },
    });

    if (!response.ok) {
      throw new Error(`HTTP error fetching item! status: ${response.status}`);
    }

    const data = await response.json();
    return data as MenuItem;
  } catch (error) {
    console.error("Error fetching item:", error);
    throw error;
  }
}
