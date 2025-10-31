import { Home, Newspaper, SquareBottomDashedScissors, Bookmark } from 'lucide-react'
import { Link } from 'react-router'

const navLinks = [
	{ href: '/', label: 'Início', icon: Home },
	{ href: '/posts', label: 'Blog', icon: Newspaper },
	{ href: '/snippets', label: 'Snippets', icon: SquareBottomDashedScissors },
	{ href: '/favoritos', label: 'Favoritos', icon: Bookmark }
]

export function Navbar() {
	return (
		<ul className="hidden md:flex items-center gap-6 text-sm">
			{navLinks.map((link) => (
				<li key={link.href}>
					<Link
						to={link.href}
						className="flex gap-2 text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
					>
						<span className="navbar-icon">
							{link.icon && <link.icon size={18} />}
						</span>
						<span className="navbar-label group-hover:opacity-100 group-hover:translate-x-0">
							{link.label}
						</span>
					</Link>
				</li>
			))}
		</ul>
	)
}

export function NavbarMobile({ setOpen }: { setOpen: (open: boolean) => void; }) {
	return (
		<nav className="md:hidden border-t border-black/10 ">
			<ul className="flex flex-col gap-4 text-sm">
				{navLinks.map((link) => (
					<li key={link.href} className="bg-black/50 p-2 rounded-md">
						<Link
							to={link.href}
							onClick={() => setOpen(false)}
							className="flex gap-2 text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
						>
							<span className="navbar-icon">
								{link.icon && <link.icon size={18} />}
							</span>
							<span className="navbar-label group-hover:opacity-100 group-hover:translate-x-0">
								{link.label}
							</span>
						</Link>
					</li>
				))}
			</ul>
		</nav>
	)
}
