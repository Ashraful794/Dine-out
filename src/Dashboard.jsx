import { useState } from "react";
import Navbar from "./Navbar";
import OrderForm from "./OrderForm";
import chickenIcon from "./assets/chicken.svg";
import hamburgerIcon from "./assets/hamburger.svg";
import pizzaIcon from "./assets/pizza.svg";
import submarineIcon from "./assets/submarine.svg";
import OrderList from "./OrderList";
import OrderSummary from "./OrderSummary";
import OrderFilter from "./OrderFilter";

function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState("All");
  const items = [
    {
      id: 1,
      name: "Hamburger",
      price: 200,
      icon: hamburgerIcon,
    },
    {
      id: 2,
      name: "Chicken Nuggets",
      price: 200,
      icon: chickenIcon,
    },
    {
      id: 3,
      name: "Submarine Sandwich",
      price: 300,
      icon: submarineIcon,
    },
    {
      id: 4,
      name: "Pizza slices",
      price: 400,
      icon: pizzaIcon,
    },
  ];

  const filterOrders = orders.filter((order) => {
    if (filterCriteria === "All") return true;
    return order.status === filterCriteria;
  });

  const handleSubmitOrders = (order) => {
    setOrders((prevOrders) => {
      const maxId =
        prevOrders.length > 0
          ? Math.max(...prevOrders.map((o) => parseInt(o.id || 0)))
          : 0;
      const newOrder = { ...order, id: maxId + 1 };
      return [...prevOrders, newOrder];
    });
  };

  const handleDeliverOrder = (orderId, status) => {
    setOrders((prevOrders) => {
      return prevOrders.map((order) => {
        if (order.id === orderId) {
          return {
            ...order,
            status: status,
          };
        } else {
          return order;
        }
      });
    });
  };
  const handleDelete = (orderId) => {
    setOrders((prevOrders) => {
      return prevOrders.filter((order) => order.id !== orderId);
    });
  };

  return (
    <div className="text-white bg-background">
      <div className="container mx-auto px-4 h-screen flex flex-col">
        <Navbar />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 flex-grow">
          <OrderForm items={items} onSubmit={handleSubmitOrders} />

          <div className="md:col-span-2 h-[calc(100vh_-_130px)]">
            <OrderSummary orders={orders} />

            <div>
              <OrderFilter onFilter={setFilterCriteria} />

              <OrderList
                orders={filterOrders}
                onDelivered={handleDeliverOrder}
                onDelete={handleDelete}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
