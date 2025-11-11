import { useState } from "react"
import { Send, CheckCircle, XCircle } from "lucide-react"
import { useNavigate } from "react-router"

const apiUrl = import.meta.env.VITE_API_URL!

type FormStatus = "idle" | "sending" | "success" | "error"

export default function ContactForm() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  const [status, setStatus] = useState<FormStatus>("idle")

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus("sending")

    try {
      const response = await fetch(`${apiUrl}/email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setStatus("success")
        setFormData({ name: "", email: "", subject: "", message: "" })
        setTimeout(() => navigate("/"), 10000)
      } else {
        setStatus("error")
        setTimeout(() => setStatus("idle"), 5000)
      }
    } catch (error) {
      console.error("Erro ao enviar e-mail:", error)
      setStatus("error")
      setTimeout(() => setStatus("idle"), 5000)
    }
  }

	if (status === "success") {
		return (
			<div className="w-full max-w-2xl mx-auto px-4 py-12">
				<div className="flex items-center gap-2 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 animate-in fade-in slide-in-from-bottom-4 duration-500">
					<CheckCircle size={20} />
					<span>Mensagem enviada com sucesso! Responderemos em breve.</span>
				</div>
			</div>
		)
	}

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Entre em Contato
        </h1>
        <p className="text-gray-400 text-lg">
          Vamos conversar sobre seu próximo projeto
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nome */}
        <div className="group">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-300 mb-2 transition-colors group-focus-within:text-primary"
          >
            Nome
          </label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Seu nome completo"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>

        {/* Email */}
        <div className="group">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-300 mb-2 transition-colors group-focus-within:text-primary"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="seu@email.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>

        {/* Assunto */}
        <div className="group">
          <label
            htmlFor="subject"
            className="block text-sm font-medium 󱓻 text-gray-300 mb-2 transition-colors group-focus-within:text-primary"
          >
            Assunto
          </label>
          <input
            id="subject"
            type="text"
            name="subject"
            placeholder="Assunto"
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-3 󱓻 bg-black/30 border 󱓻 border-gray-700 rounded-lg 󱓻 text-white 󱓻 placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            required
          />
        </div>

        {/* Mensagem */}
        <div className="group">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-300 mb-2 transition-colors group-focus-within:text-primary"
          >
            Mensagem
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Conte-me sobre seu projeto..."
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
          />
        </div>

        {/* Botão de Envio */}
        <button
          type="submit"
          disabled={status === "sending"}
          className="text-white font-semibold py-3 px-6 rounded-lg border-2 border-primary hover:border-secondary transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group cursor-pointer"
        >
          {status === "sending" ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Enviando...</span>
            </>
          ) : (
            <>
              <span>Enviar Mensagem</span>
              <Send
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </>
          )}
        </button>

        {/* Feedback Messages */}
        {status === "error" && (
          <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <XCircle size={20} />
            <span>Erro ao enviar mensagem. Tente novamente mais tarde.</span>
          </div>
        )}
      </form>
    </div>
  )
}
