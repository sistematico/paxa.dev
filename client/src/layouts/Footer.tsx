import SimpleIcon from '../components/SimpleIcon';

function Footer() {
	return (
		<footer className="border-t-2 border-black/50 bg-background py-2 text-xs shrink-0">
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
						Copyleft {new Date().getFullYear()} Paxá, fontes no <a href="https://github.com/sistematico/paxa.dev" target="_blank" rel="noopener noreferrer" className="underline transition delay-100 hover:text-primary no-underline">Github</a>.
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
