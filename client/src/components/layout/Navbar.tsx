import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle link click for smooth scrolling
  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`sticky top-0 z-50 bg-secondary bg-opacity-95 shadow-lg transition-all duration-300 ${isScrolled ? 'py-2' : 'py-3'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <span className="text-primary font-playfair text-3xl font-bold">Meta</span>
          </Link>
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button 
            className="text-foreground focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <i className="fas fa-bars text-xl"></i>
          </button>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 items-center">
          <a 
            href="#home"
            onClick={() => handleLinkClick('home')} 
            className="nav-link text-foreground hover:text-primary transition-colors duration-300"
          >
            Home
          </a>
          <a 
            href="#about" 
            onClick={() => handleLinkClick('about')}
            className="nav-link text-foreground hover:text-primary transition-colors duration-300"
          >
            About
          </a>
          <a 
            href="#menu" 
            onClick={() => handleLinkClick('menu')}
            className="nav-link text-foreground hover:text-primary transition-colors duration-300"
          >
            Menu
          </a>
          <a 
            href="#gallery" 
            onClick={() => handleLinkClick('gallery')}
            className="nav-link text-foreground hover:text-primary transition-colors duration-300"
          >
            Gallery
          </a>
          <a 
            href="#chefs" 
            onClick={() => handleLinkClick('chefs')}
            className="nav-link text-foreground hover:text-primary transition-colors duration-300"
          >
            Our Chefs
          </a>
          <a 
            href="#contact" 
            onClick={() => handleLinkClick('contact')}
            className="nav-link text-foreground hover:text-primary transition-colors duration-300"
          >
            Contact
          </a>
          <a 
            href="#reservation" 
            onClick={() => handleLinkClick('reservation')}
            className="reservation-animation"
          >
            <Button className="px-6 py-2">Reservations</Button>
          </a>
        </nav>
      </div>
      
      {/* Mobile Navigation */}
      <div className={`md:hidden bg-secondary w-full ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="container mx-auto px-4 py-3 flex flex-col space-y-4">
          <a 
            href="#home" 
            onClick={() => handleLinkClick('home')}
            className="text-foreground hover:text-primary transition-colors duration-300 py-2 border-b border-border"
          >
            Home
          </a>
          <a 
            href="#about" 
            onClick={() => handleLinkClick('about')}
            className="text-foreground hover:text-primary transition-colors duration-300 py-2 border-b border-border"
          >
            About
          </a>
          <a 
            href="#menu" 
            onClick={() => handleLinkClick('menu')}
            className="text-foreground hover:text-primary transition-colors duration-300 py-2 border-b border-border"
          >
            Menu
          </a>
          <a 
            href="#gallery" 
            onClick={() => handleLinkClick('gallery')}
            className="text-foreground hover:text-primary transition-colors duration-300 py-2 border-b border-border"
          >
            Gallery
          </a>
          <a 
            href="#chefs" 
            onClick={() => handleLinkClick('chefs')}
            className="text-foreground hover:text-primary transition-colors duration-300 py-2 border-b border-border"
          >
            Our Chefs
          </a>
          <a 
            href="#contact" 
            onClick={() => handleLinkClick('contact')}
            className="text-foreground hover:text-primary transition-colors duration-300 py-2 border-b border-border"
          >
            Contact
          </a>
          <a 
            href="#reservation" 
            onClick={() => handleLinkClick('reservation')}
            className="text-center"
          >
            <Button className="w-full">Reservations</Button>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
