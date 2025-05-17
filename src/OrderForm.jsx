import { useState } from "react";
import ItemCard from "./ItemCard";

function OrderForm({ items, onSubmit }) {
  const [itemQuantities, setItemQuantities] = useState({});
  const [customerName, setCustomerName] = useState("");

  const updateItemQuantity = (itemId, num) => {
    setItemQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: Math.max((prevQuantities[itemId] || 0) + num, 0),
    }));
  };

  const calculateTotalPrice = () => {
    return Object.keys(itemQuantities).reduce((total, itemId) => {
      const item = items.find((item) => item.id === parseInt(itemId));
      return total + item.price * itemQuantities[itemId];
    }, 0);
  };

  const totalPrice = calculateTotalPrice();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (customerName.trim() === "" || totalPrice === 0) {
      return;
    }
    const orderItems = Object.values(itemQuantities).reduce(
      (total, itemCount) => {
        return total + itemCount;
      },
      0
    );
    onSubmit({
      customerName: customerName,
      items: orderItems,
      amount: totalPrice,
      status: "PENDING",
    });
    setCustomerName("");
    setItemQuantities({});
  };

  return (
    <div className="bg-cardbg rounded-lg p-6 h-[calc(100vh_-_130px)]">
      <h2 className="text-xl font-bold mb-1">CREATE ORDER</h2>
      <p className="text-gray-400 text-sm mb-4">
        Accurately fulfill customer orders based on a precise understanding of
        their requirements.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Customer Name
          </label>
          <input
            type="text"
            className="w-full bg-gray-700 bg-opacity-50 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Choose Items</label>
          <div className="items-container">
            {items.map((item) => {
              return (
                <ItemCard
                  key={item.id}
                  item={item}
                  quantity={itemQuantities[item.id] || 0}
                  onIncrement={() => updateItemQuantity(item.id, 1)}
                  onDecrement={() => updateItemQuantity(item.id, -1)}
                />
              );
            })}
          </div>
        </div>

        <button className="w-full bg-primary hover:bg-opacity-90 text-white font-medium py-3 rounded-full transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
          Place Order (BDT {totalPrice})
        </button>
      </form>
    </div>
  );
}

export default OrderForm;
