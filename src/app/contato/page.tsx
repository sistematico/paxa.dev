import ContactForm from "@/components/ContactForm";
import Breadcrumb from "@/components/Breadcrumb";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contato - Paxá",
  description:
    "Entre em contato comigo para discutir projetos, colaborações ou apenas para trocar uma ideia sobre desenvolvimento web.",
};

export default function ContatoPage() {
  return (
    <div className="px-4 py-6">
      <Breadcrumb items={[{ label: "Contato" }]} />

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Contato
          </h1>
          <p className="text-base md:text-lg text-muted leading-relaxed max-w-2xl mx-auto">
            Estou sempre aberto para novas jornadas. Seja para um projeto,
            colaboração ou apenas para trocar ideias sobre o universo do
            desenvolvimento web.
          </p>
        </div>
      </div>
      <ContactForm />
    </div>
  );
}
