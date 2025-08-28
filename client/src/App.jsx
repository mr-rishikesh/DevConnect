import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Navigate } from "react-router-dom";


// ------------- Components ------------- 
import { useAuthStore } from "./store/useAuthStore";
import { Toaster } from "react-hot-toast";
import { Loader } from "lucide-react";
import { initFlowbite } from 'flowbite';
import { ThemeProvider } from "./context/ThemeContext";



// ------------- Layout ------------- 
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";




// ------------- Pages ------------- 
// Auth Pages 
import SignUp from "./pages/Auth/SignUp";
import SignIn from "./pages/Auth/SignIn";

// Normal pages
import { Home } from "./pages/Home";
import HomeLanding from "./components/HomeLanding";
import MessagePage from "./pages/MessagePage";
import Explore from "./pages/Explore";
import PrivacyTerms from "./pages/PrivacyTerms";
import ProfilePage from "./components/ProfilePage";
import About from "./pages/About";
import PageNotFound from "./pages/PageNotFound";

// Layout component that includes Navbar, Footer and an Outlet
function Layout() {
  return (
    <>
      <ThemeProvider>
        <Navbar />
        <main className="min-h-screen">
          <Outlet />
        </main>
        <Footer />
        <Toaster />
      </ThemeProvider>
    </>
  );
}

function App() {

  const { authUser, checkAuth, isCheckingAuth } = useAuthStore()


  useEffect(() => {
    checkAuth()
    initFlowbite();
  }, [checkAuth])

  console.log({ authUser })
  if (isCheckingAuth && !authUser) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className='size-10 animate-spin' />
      </div>
    )
  }

  return (
    <>
      <BrowserRouter>

        <Routes>
          <Route element={<Layout />}>
            {/* Auth Routes */}
            <Route path="/login" element={authUser ? <Navigate to="/home" /> : <SignIn />} />
            <Route path="/signup" element={authUser ? <Navigate to="/home" /> : <SignUp />} />

            {/* Main Routes */}
            <Route path="/" element={<HomeLanding />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacyTerms" element={<PrivacyTerms />} />
            <Route path="/messages" element={authUser ? <MessagePage /> : <Navigate to="/login" />} />
            <Route path="/home" element={authUser ? <Home /> : <Navigate to="/login" />} />
            <Route path="/explore" element={authUser ? <Explore /> : <Navigate to="/login" />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>

      </BrowserRouter>
    </>
  )


}

export default App
