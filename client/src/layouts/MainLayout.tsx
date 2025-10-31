import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router';

function MainLayout() {
	return (
		<div className="min-h-screen flex flex-col">
      <Header />
			<main className="flex flex-1 flex-wrap items-center justify-center container mx-auto">
				<Outlet />
			</main>
      <Footer />
		</div>
	);
}

export default MainLayout;
