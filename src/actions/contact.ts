"use server";

import nodemailer from "nodemailer";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.email("E-mail inválido"),
  subject: z.string().min(5, "Assunto deve ter pelo menos 5 caracteres"),
  message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
});

async function verifyTurnstile(token: string): Promise<boolean> {
  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: process.env.TURNSTILE_SECRET_KEY!,
        response: token,
      }),
    },
  );
  const data = await res.json();
  return data.success === true;
}

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message: string;
  formData?: {
    name: string;
    email: string;
    subject: string;
    message: string;
  };
};

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  try {
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };

    // Verificar Turnstile
    const turnstileToken = formData.get("cf-turnstile-response") as string;
    if (!turnstileToken || !(await verifyTurnstile(turnstileToken))) {
      return {
        status: "error" as const,
        message: "Verificação de segurança falhou. Tente novamente.",
        formData: data,
      };
    }

    // Validação
    const validatedData = contactSchema.parse(data);

    const transporter = nodemailer.createTransport({
      service: "iCloud", // Use any Service ID from the table below (case-insensitive)
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // E-mail para você
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.CONTACT_EMAIL,
      replyTo: validatedData.email,
      subject: `[Paxá.dev] ${validatedData.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #d97706; border-bottom: 2px solid #d97706; padding-bottom: 10px;">
            Nova mensagem de contato
          </h2>
          <div style="margin: 20px 0;">
            <p><strong>Nome:</strong> ${validatedData.name}</p>
            <p><strong>E-mail:</strong> ${validatedData.email}</p>
            <p><strong>Assunto:</strong> ${validatedData.subject}</p>
          </div>
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 0;"><strong>Mensagem:</strong></p>
            <p style="margin: 10px 0 0 0; white-space: pre-wrap;">${validatedData.message}</p>
          </div>
        </div>
      `,
    });

    // E-mail de confirmação para o remetente
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: validatedData.email,
      subject: "Mensagem recebida - Paxá.dev",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #d97706;">Olá ${validatedData.name}!</h2>
          <p>Recebi sua mensagem e responderei em breve.</p>
          <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
            — Paxá<br/>
            <a href="https://paxa.dev" style="color: #d97706;">paxa.dev</a>
          </p>
        </div>
      `,
    });

    return {
      status: "success",
      message: "Mensagem enviada com sucesso!",
    };
  } catch (error) {
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };

    if (error instanceof z.ZodError) {
      return {
        status: "error",
        message: error.issues?.[0]?.message || "Erro de validação",
        formData: data,
      };
    }

    console.error("Erro ao enviar e-mail:", error);
    return {
      status: "error",
      message: "Erro ao enviar mensagem. Tente novamente.",
      formData: data,
    };
  }
}
