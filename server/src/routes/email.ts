import { Hono } from 'hono';
import nodemailer from 'nodemailer';

const app = new Hono();

app.post('/', async (c) => {
	try {
		const { name, email, subject, message } = await c.req.json();

		// Create a Nodemailer transporter
		const transporter = nodemailer.createTransport({
			service: "iCloud", 
			auth: {
				user: process.env.ICLOUD_EMAIL!, 
				pass: process.env.ICLOUD_PASSWORD!
			}
		});

		// Define email options
		const mailOptions = {
			from: `"${name}" <${email}>`,
			to: 'paxa@paxa.dev', // Recipient email address
			subject: `paxa.dev: ${subject} ${name}`,
			html: `<p>Nome: ${name}</p><p>E-mail: ${email}</p><p>Mensagem: ${message}</p>`
		};

		// Send the email
		await transporter.sendMail(mailOptions);

		return c.text('E-mail enviado');
	} catch (error) {
		console.error('Erro ao enviar e-mail:', error);
		return c.text('Erro ao enviar e-mail.', 500);
	}
});

export { app as emailRoutes };
