import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20">
      <h2 className="-pb-6 uppercase">Erro 404</h2>
      <p>Página não encontrada</p>
      <Link
        className="flex items-center gap-1 rounded px-2 py-1 border-3 border-black/40 bg-black/30 inline-block text-primary group"
        href="/"
        >
        <ArrowLeft className="size-6 inline-block group-hover:-translate-x-1 transition-transform duration-300 ease-in-out" />
        <span className="-mt-1">
          Voltar
        </span>
      </Link>
    </div>
  );
}
