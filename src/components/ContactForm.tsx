"use client";

import { useActionState, useRef } from "react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { submitContactForm, type ContactFormState } from "@/actions/contact";
import type { Dictionary } from "@/i18n";

interface ContactFormProps {
  dict?: Dictionary["contact"];
}

export default function ContactForm({ dict }: ContactFormProps) {
  const [state, formAction, isPending] = useActionState<
    ContactFormState,
    FormData
  >(submitContactForm, {
    status: "idle",
    message: "",
  });
  const turnstileRef = useRef<TurnstileInstance>(null);

  if (state.status === "success" || state.status === "error") {
    turnstileRef.current?.reset();
  }

  return (
    <div className="max-w-2xl mx-auto px-6">
      <h2 className="text-3xl font-bold text-center mb-4 text-foreground">
        {dict?.formTitle ?? "Envie uma Mensagem"}
      </h2>
      <p className="text-center text-muted mb-12">
        {dict?.formDesc ?? "Tem um projeto em mente? Vamos conversar!"}
      </p>

      <form
        action={formAction}
        className="space-y-6"
        key={state.status === "success" ? Date.now() : undefined}
      >
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-foreground mb-2"
          >
            {dict?.nameLabel ?? "Nome"}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            defaultValue={state.formData?.name || ""}
            className="w-full px-4 py-3 rounded-lg border border-border bg-surface text-foreground focus:border-accent focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-foreground mb-2"
          >
            {dict?.emailLabel ?? "E-mail"}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            defaultValue={state.formData?.email || ""}
            className="w-full px-4 py-3 rounded-lg border border-border bg-surface text-foreground focus:border-accent focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-semibold text-foreground mb-2"
          >
            {dict?.subjectLabel ?? "Assunto"}
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            required
            defaultValue={state.formData?.subject || ""}
            className="w-full px-4 py-3 rounded-lg border border-border bg-surface text-foreground focus:border-accent focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-semibold text-foreground mb-2"
          >
            {dict?.messageLabel ?? "Mensagem"}
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            defaultValue={state.formData?.message || ""}
            className="w-full px-4 py-3 rounded-lg border border-border bg-surface text-foreground focus:border-accent focus:outline-none transition-colors resize-none"
          />
        </div>

        <Turnstile
          ref={turnstileRef}
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
          options={{ theme: "dark" }}
        />

        {state.message && (
          <div
            className={`p-4 rounded-lg ${
              state.status === "success"
                ? "bg-green-900/30 text-green-300 border border-green-800"
                : "bg-red-900/30 text-red-300 border border-red-800"
            }`}
          >
            {state.message}
          </div>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full px-8 py-3 bg-surface-alt text-foreground rounded-lg font-medium border border-border hover:border-accent hover:text-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending
            ? (dict?.sendingButton ?? "Enviando...")
            : (dict?.submitButton ?? "Enviar Mensagem")}
        </button>
      </form>
    </div>
  );
}
