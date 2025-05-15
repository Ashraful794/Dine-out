import { useState } from "react";

function OrderForm({ items, onSubmit }) {
  const [itemQuantities, setItemQuantities] = useState({});
  const [customerName, setCustomerName] = useState("");

  // Function to handle increment
  const incrementQuantity = (itemId) => {
    setItemQuantities((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  // Function to handle decrement
  const decrementQuantity = (itemId) => {
    setItemQuantities((prev) => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 0) - 1, 0),
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
    const order = {
      customerName: customerName,
      items: orderItems,
      amount: totalPrice,
      status: "PENDING",
    };
    onSubmit(order);
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
                <div
                  key={item.id}
                  className="bg-gray-700 bg-opacity-30 rounded-md p-3 mb-3 flex justify-between items-center hover:bg-opacity-40 transition-all duration-300"
                >
                  <div className="flex items-center">
                    <div className="w-12 h-12   flex items-center justify-center mr-3">
                      <img
                        src={item.icon}
                        alt="Hamburger"
                        className="w-10 h-10"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-xs text-gray-400">BDT {item.price}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-5 justify-center">
                    <button
                      type="button"
                      className="w-8 h-8 bg-gray-800 hover:bg-primary rounded-full flex items-center justify-center transition-colors duration-300"
                      onClick={() => incrementQuantity(item.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-green-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>

                    <span>{itemQuantities[item.id] || 0}</span>

                    <button
                      type="button"
                      class="w-8 h-8 bg-gray-800 hover:bg-primary rounded-full flex items-center justify-center transition-colors duration-300"
                      onClick={() => decrementQuantity(item.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-red-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
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
