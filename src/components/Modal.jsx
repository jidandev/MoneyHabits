import { useState, useEffect } from "react";
import db from "../db";
import { format } from "date-fns"

export default function Modal({ type, modalOpen, setModalOpen, editingItem, date }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  // Kalau ada editingItem, isi input otomatis
  useEffect(() => {
    if (editingItem) {
      setTitle(editingItem.title);
      setAmount(editingItem.amount);
    } else {
      setTitle("");
      setAmount("");
    }
  }, [editingItem]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !amount) return;

    if (editingItem) {
      // Edit mode
      await db[type].update(editingItem.id, {
        title,
        amount: Number(amount),
      });
    } else {
      // Add mode
      await db[type].add({
        title,
        amount: Number(amount),
        date: format(date, "MMMM yyyy"),
      });
    }

    setTitle("");
    setAmount("");
    setModalOpen(false);
  };

  if (!modalOpen) return null;

  return (
    <div
      onClick={() => setModalOpen(false)}
      className="z-20 fixed w-full h-full inset-0 bg-black bg-opacity-50 flex items-center justify-center px-10"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-4 rounded-lg flex flex-col w-full max-w-sm"
      >
        <label className="text-sm font-medium mb-1" htmlFor="title">
          Title
        </label>
        <input
          className="bg-gray-200 rounded-md h-8 text-xs p-2"
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Input title"
        />

        <label className="text-sm font-medium mb-1 mt-5" htmlFor="amount">
          Amount
        </label>
        <input
          className="bg-gray-200 rounded-md h-8 text-xs p-2"
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Input amount"
        />

        <button
          onClick={handleSubmit}
          className="mt-4 bg-green-400 rounded-md text-sm font-medium py-2"
        >
          {editingItem ? "Edit" : "Add"}
        </button>
      </div>
    </div>
  );
}