export const getItemQuantity = (id: number, cartOrder: number[]): number => {
  return cartOrder.filter((itemId) => itemId === id).length;
};

export const calculateTotal = (
  items: MenuItem[],
  cartOrder: number[]
): number => {
  return items.reduce((sum, item) => {
    const quantity = getItemQuantity(item.id, cartOrder);
    return sum + item.price * quantity;
  }, 0);
};

export const calculateTimeRemaining = (eta: string): number => {
  const currentTimeUTC = Date.now();
  const completeTime = new Date(eta).getTime();

  const diffInMs = completeTime - currentTimeUTC;
  const minutes = Math.ceil(diffInMs / (60 * 1000));

  if (minutes <= 0) {
    return 0;
  }

  return minutes;
};
