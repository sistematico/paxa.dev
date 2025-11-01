import { useState } from 'react';

const ContactForm = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    // interface FormData {
    //   name: string;
    //   email: string;
    //   message: string;
    // }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/send-email', { // Adjust port if needed
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.text();
            alert(data);
        } catch (error) {
            console.error('Error sending email:', error);
            alert('Failed to send email.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} />
            <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} />
            <textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange}></textarea>
            <button type="submit">Send Email</button>
        </form>
    );
};

export default ContactForm;