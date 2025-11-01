import SimpleIcon from '../components/SimpleIcon';

function Footer() {
	return (
		// <footer className="fixed bottom-0 left-0 right-0 z-50 border-t-2 border-black/50 bg-background py-2 text-xs shrink-0">
		<footer className="border-t-2 border-black/50 bg-background py-4 mt-auto">
			<div className="container mx-auto">
				<div className="flex flex-col md:flex-row justify-between items-center gap-2">
					<div className="text-left">
						Projeto licenciado sob a licença{' '}
						<a
							href="https://unlicense.org/"
							target="_blank"
							rel="noopener noreferrer"
							className="underline transition delay-100 hover:text-primary no-underline"
						>
							UnLicense
						</a>
						.<br />
						Copyleft {new Date().getFullYear()}{' '}
						<div className="relative group inline">
							<span className="inline cursor-pointer underline-dotted">
								Paxá
							</span>
							<span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"></span>
							<div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max px-3 py-2 text-sm text-white bg-gray-900 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
								A propósito, meu nome é Lucas =)
							</div>
						</div>
						, 
						fontes no{' '}
						<a href="https://github.com/sistematico/paxa.dev" target="_blank" rel="noopener noreferrer" className="underline transition delay-100 hover:text-primary no-underline">
						Github
						</a>.
					</div>
					<div className="text-right">
						<div className="flex gap-2 items-center">
							<a href="https://facebook.com/lsbrum" target="_blank" rel="noopener noreferrer">
								<SimpleIcon name="Facebook" size={22} />
							</a>
							<a href="https://x.com/sistematico" target="_blank" rel="noopener noreferrer">
								<SimpleIcon name="X" size={20} />
							</a>
							<a href="https://github.com/sistematico" target="_blank" rel="noopener noreferrer">
								<SimpleIcon name="GitHub" size={22} />
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
