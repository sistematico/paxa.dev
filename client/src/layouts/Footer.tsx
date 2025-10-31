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
							className="underline"
						>
							UnLicense
						</a>
						.<br />
						Copyleft {new Date().getFullYear()} Paxá
					</div>
					<div className="text-right">
            <a href="https://facebook.com/lsbrum" target="_blank" rel="noopener noreferrer">
              <SimpleIcon name="siFacebook" size={22} />
            </a>
					</div>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
