
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import Navbar from "../components/Navbar";
import BackgroundShapes from "../components/BackgroundShapes";

const Home = () => {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <BackgroundShapes />
      
      <main className="flex-grow flex items-center justify-center">
        <div className="max-w-3xl w-full px-4 py-16 text-center relative z-10">
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-portfolio-blue to-portfolio-purple">
            Welcome to Portfolio Duo
          </h1>
          
          <p className="text-xl mb-8 text-gray-700">
            Explore amazing portfolios of two talented designers/developers
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <>
                <Link to="/portfolio/1">
                  <Button size="lg" className="w-full sm:w-auto">
                    View Portfolio 1
                  </Button>
                </Link>
                <Link to="/portfolio/2">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    View Portfolio 2
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button size="lg" className="w-full sm:w-auto">
                    Login to View
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Create Account
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
