//import Link from "next/link";
//import Image from "next/image";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 text-center text-xs text-[--muted] mb-2">
      &copy; {new Date().getFullYear()} Paxá
    </footer>
  );
}
