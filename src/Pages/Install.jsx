import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import InstallButton from "../components/InstallButton";

const Install = () => {
  const navigate = useNavigate();
  const { deferredPrompt, isInstalled } = useOutletContext();

  useEffect(() => {
    // Kalau udah install atau gak ada deferredPrompt, langsung lempar ke "/"
    if (isInstalled || !deferredPrompt) {
      navigate("/");
    }
  }, [isInstalled, deferredPrompt, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-white px-3 select-none items-center">   
      <img
        className="bg-green-500 rounded-xl p-4 w-20 h-auto mt-10"
        src="/vite.svg"
        alt=""
      />
      <h1 className="font-semibold text-xl mt-2">MoneyHabits</h1>
      <p className="text-sm">Version 1.0.0</p>
      <InstallButton />
    </div>
  );
};

export default Install;