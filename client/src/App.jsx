import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Navigate } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';


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
import Home from "./pages/HomePage/Home";
import HomeLanding from "./components/HomeLanding";
import MessagePage from "./pages/MessagePage";
import Explore from "./pages/Explore";
import PrivacyTerms from "./pages/PrivacyTerms";
import ProfilePage from "./components/ProfilePage";
import About from "./pages/About";
import PageNotFound from "./pages/PageNotFound";
import CreatePostPage from "./pages/CreatePostPage";

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
    // Initialize AOS on component mount
    AOS.init({
      duration: 1000, // values from 0 to 3000, with step 50ms
      once: true, // whether animation should happen only once - while scrolling down
    });

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
            <Route path="/signup" element={authUser ? <Navigate to="/home" /> : <SignUp />} />
            <Route path="/login" element={authUser ? <Navigate to="/home" /> : <SignIn />} />

            {/* Main Routes */}
            <Route path="/" element={<HomeLanding />} />
            <Route path="/home" element={authUser ? <Home /> : <Navigate to="/login" />} />
            <Route path="/explore" element={authUser ? <Explore /> : <Navigate to="/login" />} />
            <Route path="/messages" element={authUser ? <MessagePage /> : <Navigate to="/login" />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/create-post" element={authUser ? <CreatePostPage /> : <Navigate to="/login" />} />

            {/* Extra Routes */}
            <Route path="/privacyTerms" element={<PrivacyTerms />} />
            <Route path="*" element={<PageNotFound />} />

          </Route>
        </Routes>

      </BrowserRouter>
    </>
  )


}

export default App
