import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Home() {
  return (
    <>
      <h1>Erro 404</h1>
      <p>Página não encontrada</p>
      <Link
        className="flex items-center gap-1 rounded px-2 py-1 border-2 border-primary/80 inline-block text-primary group"
        href="/"
      >
        <ArrowLeft className="size-5 inline-block group-hover:-translate-x-1 transition-transform duration-350 ease-in-out" />
        Voltar
      </Link>
    </>
  );
}
