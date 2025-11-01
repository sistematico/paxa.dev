import { useState } from "react";
import Lottie from "lottie-react";
import businessman from "../assets/lottie/businessman.json";

function Home() {
	const [isTechnical, setIsTechnical] = useState(false);

	const leigosText = (
		<>
			<p className="mb-4 leading-relaxed">
				Transformo café em código e ideias em experiências digitais memoráveis. 
				Com mais de duas décadas moldando a web, crio sites que não apenas 
				funcionam - eles encantam, convertem e fazem sua empresa crescer e escalar.
			</p>
			<p className="mb-4 leading-relaxed">
				Do primeiro rascunho ao último pixel, desenvolvo soluções que se adaptam 
				perfeitamente a qualquer tela. Seu site será rápido, encontrado no Google 
				e, mais importante, seus visitantes vão querer ficar.
			</p>
			<p className="leading-relaxed font-medium">
				Pronto para dar vida ao seu próximo projeto digital?
			</p>
		</>
	);

	const technicalText = (
		<>
			<p className="mb-4 leading-relaxed">
				Arquiteto de soluções full-stack especializando em ecossistema TypeScript. 
				Domínio profundo em React, Next.js, Vue.js, Astro, complementado por 
				expertise em runtimes modernos (Bun, Node.js) e práticas avançadas de SSR/SSG.
			</p>
			<p className="mb-4 leading-relaxed">
				Veterano Linux (desde '99) com sólida experiência em infraestrutura cloud, 
				CI/CD pipelines, containerização (Docker/Kubernetes) e otimização de 
				performance. Arquiteturas escaláveis são minha especialidade.
			</p>
			<p className="leading-relaxed font-medium">
				Vamos construir algo extraordinário juntos?
			</p>
		</>
	);

	return (
		<div className="w-full max-w-7xl mx-auto px-4 py-12 lg:py-20">
			<div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
				{/* Conteúdo de Texto */}
				<div className="order-2 lg:order-1">
					<h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
						Lucas Brum
					</h1>
					
					<h2 className="text-xl md:text-2xl font-semibold mb-8 text-gray-300">
						Desenvolvedor Full Stack
					</h2>

					{/* Toggle de Modo */}
					<div className="flex gap-2 mb-8 bg-black/30 p-1 rounded-lg inline-flex">
						<button
							className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
								!isTechnical
									? "bg-primary text-white shadow-lg"
									: "text-gray-400 hover:text-white"
							}`}
							onClick={() => setIsTechnical(false)}
							type="button"
						>
							Versão Simples
						</button>
						<button
							className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
								isTechnical
									? "bg-primary text-white shadow-lg"
									: "text-gray-400 hover:text-white"
							}`}
							onClick={() => setIsTechnical(true)}
							type="button"
						>
							Versão Técnica
						</button>
					</div>

					{/* Texto Alternado */}
					<div className="relative min-h-[280px]">
						<div
							className={`absolute inset-0 transition-all duration-500 ease-in-out ${
								!isTechnical
									? "opacity-100 translate-y-0"
									: "opacity-0 -translate-y-4 pointer-events-none"
							}`}
						>
							<div className="text-gray-300 text-base md:text-lg">
								{leigosText}
							</div>
						</div>

						<div
							className={`absolute inset-0 transition-all duration-500 ease-in-out ${
								isTechnical
									? "opacity-100 translate-y-0"
									: "opacity-0 translate-y-4 pointer-events-none"
							}`}
						>
							<div className="text-gray-300 text-base md:text-lg">
								{technicalText}
							</div>
						</div>
					</div>
				</div>

				{/* Imagem Flutuante */}
				<div className="order-1 lg:order-2 flex items-center justify-center">
					<div className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96">
						<div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl animate-pulse" />
						{/* <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl"> */}

							<Lottie animationData={businessman} loop={true} style={{ width: '100%', height: '100%' }} />

							{/* <img
								src="/images/profile.jpg"
								alt="Lucas Brum"
								className="w-full h-full object-cover"
								onError={(e) => {
									// Fallback para quando a imagem não existir
									e.currentTarget.src = "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas";
								}}
							/> */}
						{/* </div> */}
						{/* Elementos decorativos */}
						<div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
						<div className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary/20 rounded-full blur-2xl" />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;