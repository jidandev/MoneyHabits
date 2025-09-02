import { AndroidLogo, House, TrendDown, TrendUp } from "phosphor-react";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Modal from "./components/Modal";

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate()
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [date, setDate] = useState(new Date());

  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstalled(false);
    };

    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      navigate("/"); // langsung redirect ke home setelah install
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("appinstalled", () => {});
    };
  }, [navigate]);

  // Tentuin table sesuai page aktif
  let type;
  if (location.pathname === "/income") type = "income";
  else if (location.pathname === "/expense") type = "expense";
  else type = "expense";

  const openAddModal = () => {
    setEditingItem(null);
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setModalOpen(true);
  };

  return (
    <div>
      {/* Modal */}
      <Modal
        type={type}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        editingItem={editingItem}
        date={date}
      />

      {/* Navbar */}
      <div className="z-30 fixed bottom-0 left-0 w-full ">
        <button
          onClick={() => (setModalOpen(true), setEditingItem(null))}
          className="justify-self-end mr-4 mb-4 w-12 h-12 rounded-full bg-black shadow flex justify-center items-center "
        >
          <h1 className="text-2xl text-white ">+</h1>
        </button>
        <nav className=" bg-white w-full h-14 shadow-[0_-1px_3px_rgba(0,0,0,0.1)] flex justify-center items-center gap-14">
          <House size={30} weight="fill" />
          <TrendUp size={30} weight="fill" />
          <TrendDown size={30} weight="fill" />
          {!isInstalled && deferredPrompt && (
            <AndroidLogo onClick={() => navigate("/install")} size={30} weight="fill" />
          )}
        </nav>
      </div>

      {/* Halaman */}
      <Outlet context={{ openEditModal, type, date, setDate, deferredPrompt }} />
    </div>
  );
}