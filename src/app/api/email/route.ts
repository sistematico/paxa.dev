import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.email("E-mail inválido"),
  subject: z.string().min(5, "Assunto deve ter pelo menos 5 caracteres"),
  message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validação
    const validatedData = contactSchema.parse(body);

    // Configurar transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT!),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // E-mail para você
    await transporter.sendMail({
      from: process.env.SMTP_USER,
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
      from: process.env.SMTP_USER,
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

    return NextResponse.json(
      { message: "Mensagem enviada com sucesso!" },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues?.[0]?.message || "Erro de validação" },
        { status: 400 },
      );
    }

    console.error("Erro ao enviar e-mail:", error);
    return NextResponse.json(
      { error: "Erro ao enviar mensagem. Tente novamente." },
      { status: 500 },
    );
  }
}
