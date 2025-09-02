import { useOutletContext } from "react-router-dom";

export default function InstallButton() {
  const { deferredPrompt } = useOutletContext();

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(outcome === "accepted" ? "User accepted" : "User dismissed");
  };

  return (
    <button
      onClick={handleInstallClick}
      className="mt-5 w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 "
    >
      Install App
    </button>
  );
}