import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center forest-card animate-fade-in-up">
        <div className="text-6xl mb-6">🌲</div>
        <h1 className="mb-4 text-4xl font-bold text-foreground">404</h1>
        <p className="mb-6 text-xl text-forest-text">Lost in the forest? This page doesn't exist!</p>
        <a href="/" className="forest-button inline-block">
          🏠 Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
