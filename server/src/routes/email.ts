import { Hono } from 'hono';
import nodemailer from 'nodemailer';

const app = new Hono();

app.post('/api/email', async (c) => {
	try {
		const { name, email, message } = await c.req.json();

		// Create a Nodemailer transporter
		const transporter = nodemailer.createTransport({
			host: 'smtp.your-email-provider.com', // Replace with your SMTP host
			port: 587, // Or 465 for secure SSL
			secure: false, // true for 465, false for other ports
			auth: {
				user: 'your-email@example.com', // Your email address
				pass: 'your-email-password' // Your email password or app-specific password
			}
		});

		// Define email options
		const mailOptions = {
			from: '"Your Name" <your-email@example.com>', // Sender address
			to: 'recipient@example.com', // Recipient email address
			subject: `New Message from ${name}`,
			html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`
		};

		// Send the email
		await transporter.sendMail(mailOptions);

		return c.text('Email sent successfully!');
	} catch (error) {
		console.error('Error sending email:', error);
		return c.text('Failed to send email.', 500);
	}
});

export { app as emailRoute };
