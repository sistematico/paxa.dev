"use client";

import { useActionState } from "react";
import { submitContactForm, type ContactFormState } from "@/actions/contact";

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState<
    ContactFormState,
    FormData
  >(submitContactForm, {
    status: "idle",
    message: "",
  });

  return (
    <section
      id="contato"
      className="py-20 bg-gradient-to-b from-white to-amber-50 dark:from-slate-800 dark:to-slate-900"
    >
      <div className="max-w-2xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
          Envie uma Mensagem
        </h2>
        <p className="text-center text-slate-600 dark:text-slate-400 mb-12">
          Tem um projeto em mente? Vamos conversar! 🌙
        </p>

        <form action={formAction} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
            >
              Nome
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-3 rounded-lg border-2 border-amber-200 dark:border-amber-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:border-amber-500 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
            >
              E-mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-3 rounded-lg border-2 border-amber-200 dark:border-amber-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:border-amber-500 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
            >
              Assunto
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              required
              className="w-full px-4 py-3 rounded-lg border-2 border-amber-200 dark:border-amber-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:border-amber-500 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
            >
              Mensagem
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              className="w-full px-4 py-3 rounded-lg border-2 border-amber-200 dark:border-amber-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:border-amber-500 focus:outline-none transition-colors resize-none"
            />
          </div>

          {state.message && (
            <div
              className={`p-4 rounded-lg ${
                state.status === "success"
                  ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                  : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
              }`}
            >
              {state.message}
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg font-semibold hover:from-amber-700 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Enviando..." : "Enviar Mensagem"}
          </button>
        </form>
      </div>
    </section>
  );
}
