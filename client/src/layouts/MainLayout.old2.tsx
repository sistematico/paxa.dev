import Header from './Header';
import Footer from './Footer';
import { Outlet, useNavigation } from 'react-router';
import '../assets/css/transitions.css';

function MainLayout() {
	const navigation = useNavigation();
	const isNavigating = navigation.state === 'loading';
	return (
		<div className="min-h-screen flex flex-col">
			<Header />
			<div className={isNavigating ? 'fade-out-up' : 'fade-in-down'}>
				<main className="flex flex-1 flex-wrap items-center justify-center container mx-auto pt-2 mb-8">
					<Outlet />
				</main>
			</div>
			<Footer />
		</div>
	);
}

export default MainLayout;
