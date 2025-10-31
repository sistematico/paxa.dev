import { Link } from 'react-router';
import Navbar from './Navbar';

function Header() {
	return (
		<header className="border-b-2 border-black/50 bg-background py-2 px-2 md:px-0">
			<div className="container mx-auto">
				<div className="flex justify-between items-center gap-4">
					<Link to="/" className="flex items-center gap-2">
						<img
							src="/images/logo.svg"
							alt="Paxá"
							className=""
							width={40}
							height={40}
						/>
						<span className="text-2xl font-bold">Paxá</span>
					</Link>
					<Navbar />
				</div>
			</div>
		</header>
	);
}

export default Header;
