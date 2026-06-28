"use client";
import { signOut } from "@/lib/session/client-session";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LogoutButton() {
  const router = useRouter();
  const handleSignOut = () => {
    const res = signOut();
    toast.success("Logout successful!");
    router.push("/");
  };
  return (
    <button
      onClick={handleSignOut}
      className="
        w-full
        flex
        items-center
        justify-center
        gap-2
        px-4
        py-3
        rounded-xl
        text-sm
        font-semibold
        text-error
        bg-error/10
        hover:bg-error
        hover:text-error-content
        transition-all
        duration-200
        active:scale-[0.98]
      "
    >
      <LogOut className="w-4 h-4" />
      Logout
    </button>
  );
}
