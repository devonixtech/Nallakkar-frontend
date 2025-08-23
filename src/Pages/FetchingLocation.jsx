import { Loader2 } from "lucide-react";
import logo from "../assets/logo.png"; // apna logo import karo

export default function FetchingLocation({ onClose }) {
  return (
    <div className="fixed inset-0 bg-[#353543] flex items-center justify-center z-50">
      <div className="bg-white px-12 py-8 rounded-xl shadow-md flex flex-col items-center gap-4">
        {/* Logo */}
        <img src={logo} alt="Nallakkar" className="h-16 object-contain" />

        {/* Title */}
        {/* <h1 className="text-lg font-semibold">Nallakkar</h1> */}

        {/* Loader + text */}
        <div className="flex items-center gap-2 font-semibold">
          <Loader2 className="animate-spin w-5 h-5 text-primary" />
          <span>Fetching your location...</span>
        </div>
      </div>
    </div>
  );
}
