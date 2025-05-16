import React from "react";

function ItemCard({ key, item, quantity, onIncrement, onDecrement }) {
  return (
    <div
      key={key}
      className="bg-gray-700 bg-opacity-30 rounded-md p-3 mb-3 flex justify-between items-center hover:bg-opacity-40 transition-all duration-300"
    >
      <div className="flex items-center">
        <div className="w-12 h-12   flex items-center justify-center mr-3">
          <img src={item.icon} alt="Hamburger" className="w-10 h-10" />
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
          onClick={onIncrement}
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

        <span>{quantity}</span>

        <button
          type="button"
          className="w-8 h-8 bg-gray-800 hover:bg-primary rounded-full flex items-center justify-center transition-colors duration-300"
          onClick={onDecrement}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-red-500"
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
}

export default ItemCard;
