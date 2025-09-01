import { House, TrendDown, TrendUp } from "phosphor-react";
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import db from "./db";
import Modal from "./Modal";

export default function Layout() {
  const location = useLocation();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Tentuin table sesuai page aktif
  let type;
  if (location.pathname === "/income") type = "income";
  else if (location.pathname === "/expense") type = "expense";
  else type = "income";

  const openAddModal = () => {
    setEditingItem(null);
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen relative">
      {/* Modal */}
      <Modal
        type={type}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        editingItem={editingItem}
      />

      {/* Navbar */}
      <div className="z-30 fixed bottom-0 left-0 w-full flex justify-between items-center px-10">
        <button
          onClick={openAddModal}
          className="w-12 h-12 rounded-full bg-black shadow flex justify-center items-center text-white text-2xl"
        >
          +
        </button>
        <nav className="bg-white w-full h-14 shadow-[0_-1px_3px_rgba(0,0,0,0.1)] flex justify-center items-center gap-20">
          <House size={30} weight="fill" />
          <TrendUp size={30} weight="fill" />
          <TrendDown size={30} weight="fill" />
        </nav>
      </div>

      {/* Halaman */}
      <div className="pt-6">
        <Outlet context={{ openEditModal, type }} />
      </div>
    </div>
  );
}