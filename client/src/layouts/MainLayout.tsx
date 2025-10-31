import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router";

function MainLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <main className="w-full max-w-4xl mx-auto">
        <div className="relative bg-black/10 md:rounded-lg md:border-2 md:border-black/60 md:shadow-lg">
          <Header />
          <Outlet />
          <Footer />
        </div>
      </main>
    </div>
  );
}

export default MainLayout;