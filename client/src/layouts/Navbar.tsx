import { Home, Newspaper, SquareBottomDashedScissors,	Bookmark } from 'lucide-react';
import { Link } from 'react-router';

const navLinks = [
	{ href: '/', label: 'Início', icon: Home },
	{ href: '/posts', label: 'Blog', icon: Newspaper },
	{ href: '/snippets', label: 'Snippets', icon: SquareBottomDashedScissors },
	{ href: '/favoritos', label: 'Favoritos', icon: Bookmark }
];

function Navbar() {
	return (
		<nav className="flex gap-2">
			{navLinks.map((link) => (
				<Link key={link.href} to={link.href} className="flex items-center gap-2">
					<span className="navbar-icon">
						{link.icon && <link.icon size={18} />}
					</span>
					<span className="navbar-label group-hover:opacity-100 group-hover:translate-x-0">
						{link.label}
					</span>
				</Link>
			))}
		</nav>
	);
}

export default Navbar;
