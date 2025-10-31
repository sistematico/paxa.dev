import { useState } from 'react'
import { Link } from 'react-router'
import { Navbar, NavbarMobile } from './Navbar'

function Header() {
	const [open, setOpen] = useState(false)

	return (
		<header className="border-b-2 border-black/50 bg-background py-2 px-2 md:px-0">
			<div className="container mx-auto">
				<div className="flex h-16 items-center justify-between gap-8">
					<Link to="/" className="flex items-center gap-2">
						<span className="sr-only">Home</span>
						<img
							src="/images/logo.svg"
							alt="Paxá"
							width={40}
							height={40}
						/>
						<span className="text-2xl font-bold">Paxá</span>
					</Link>
					<Navbar />
					<button
						onClick={() => setOpen(!open)}
						type="button"
						className="block rounded-sm bg-black/40 p-2.5 text-white md:hidden cursor-pointer"
						aria-label="Toggle menu"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="size-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth="2"
						>
							<title>Menu</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					</button>
				</div>

				{/* Menu mobile */}
				{open && (
					<nav className="md:hidden border-t border-black/10 mt-2 pt-4 pb-2">
						<NavbarMobile setOpen={setOpen} />
					</nav>
				)}
			</div>
		</header>
	);
}

export default Header;