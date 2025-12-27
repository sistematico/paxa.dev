import Header from "./Header"
import Footer from "./Footer"
import { Outlet, useNavigation } from "react-router"
import "../assets/css/transitions.css"

function MainLayout() {
  const navigation = useNavigation()
  const isNavigating = navigation.state === "loading"
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main
        className="flex-1 w-full"
        style={{
          transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
          opacity: isNavigating ? 0 : 1,
          transform: isNavigating ? "translateY(10px)" : "translateY(0)"
        }}
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
