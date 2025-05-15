import React from "react";

function OrderList({ orders, onDelivered, onDelete }) {
  const sortedOrders = [...orders].sort((a, b) => b.id - a.id);
  return (
    <div className="bg-cardbg rounded-lg p-4">
      <div className="reports-container">
        <table className="min-w-full">
          <thead>
            <tr className="text-left text-sm">
              <th className="pb-3 font-medium">ID</th>
              <th className="pb-3 font-medium">Customer Name</th>
              <th className="pb-3 font-medium">Items</th>
              <th className="pb-3 font-medium">Amount</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {sortedOrders.map((order) => {
              return (
                <tr className="border-t border-gray-700" key={order.id}>
                  <td className="py-3">{order.id}</td>
                  <td className="py-3">{order.customerName}</td>
                  <td className="py-3">{order.items}</td>
                  <td className="py-3">{order.amount}</td>
                  <td className="py-3">
                    <span
                      className={`text-${
                        order.status === "PENDING" ? "red" : "green"
                      }-500`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3">
                    <button
                      className="bg-gray-800 hover:bg-red-600 text-xs px-3 py-1 rounded-full mr-1 transition-colors duration-300"
                      onClick={() => onDelete(order.id)}
                    >
                      Delete
                    </button>
                    {order.status === "PENDING" && (
                      <button
                        className="bg-gray-800 hover:bg-green-600 text-xs px-3 py-1 rounded-full transition-colors duration-300"
                        onClick={() => onDelivered(order.id, "DELIVERED")}
                      >
                        DELIVER
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderList;
