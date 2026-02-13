import ContactForm from "@/components/ContactForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contato - Paxá",
  description:
    "Entre em contato comigo para discutir projetos, colaborações ou apenas para trocar uma ideia sobre desenvolvimento web.",
};

export default function ContatoPage() {
  return (
    <div>
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-amber-600 via-orange-500 to-red-600 bg-clip-text text-transparent mb-4">
            Contato
          </h1>
          <p className="text-base md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Como um{" "}<span className="text-amber-600 dark:text-amber-400 font-semibold">nômade digital</span>
            , estou sempre aberto para novas jornadas. Seja para um projeto,
            colaboração ou apenas para trocar ideias sobre o universo do
            desenvolvimento web.
          </p>
        </div>
      </div>
      <ContactForm />
    </div>
  );
}
