import { useState } from 'react';

const apiUrl = import.meta.env.VITE_API_URL!;

const ContactForm = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: ''
	});

	// interface FormData {
	//   name: string;
	//   email: string;
	//   message: string;
	// }

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const response = await fetch(`${apiUrl}/email`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			});
			const data = await response.text();
			alert(data);
		} catch (error) {
			console.error('Error sending email:', error);
			alert('Failed to send email.');
		}
	};

	return (
		<form className="flex flex-col" onSubmit={handleSubmit}>
			<input
				type="text"
				name="name"
				placeholder="Your Name"
				value={formData.name}
				onChange={handleChange}
        className="border-2 border-black/50 bg-black/20 w-full mb-4"
			/>
			<input
				type="email"
				name="email"
				placeholder="Your Email"
				value={formData.email}
				onChange={handleChange}
        className="border-2 border-black/50 bg-black/20 w-full mb-4"
			/>
			<textarea
				name="message"
				placeholder="Your Message"
				value={formData.message}
        className="border-2 border-black/50 bg-black/20 w-full mb-4"
				onChange={handleChange}
			></textarea>
			<button 
        className="border-2 border-black/50 bg-black/20 w-full mb-4"
        type="submit"
      >
        Enviar
      </button>
		</form>
	);
};

export default ContactForm;
