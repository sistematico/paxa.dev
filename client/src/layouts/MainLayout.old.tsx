import Header from './Header';
import Footer from './Footer';
import { Outlet, useNavigation } from 'react-router';

function MainLayout() {
	const navigation = useNavigation();
  const isNavigating = navigation.state === "loading";
	return (
		<div className="min-h-screen flex flex-col">
      <Header />
			<div 
        style={{
          transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
          opacity: isNavigating ? 0 : 1,
          transform: isNavigating ? "translateY(10px)" : "translateY(0)"
        }}
      >
				<main className="flex flex-1 flex-wrap items-center justify-center container mx-auto">
					<Outlet />
				</main>
			</div>
      <Footer />
		</div>
	);
}

export default MainLayout;
