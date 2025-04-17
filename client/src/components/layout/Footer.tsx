import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Footer = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email) {
      toast({
        title: "Subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      });
      setEmail("");
    }
  };

  return (
    <footer className="bg-secondary py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-primary font-playfair text-xl font-semibold mb-4">Meta Restaurant</h3>
            <p className="text-foreground opacity-80 mb-4">
              Experience the fusion of traditional Egyptian flavors and international culinary techniques in an elegant setting.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-primary hover:text-foreground transition-colors duration-300">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-primary hover:text-foreground transition-colors duration-300">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-primary hover:text-foreground transition-colors duration-300">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-primary hover:text-foreground transition-colors duration-300">
                <i className="fab fa-tripadvisor"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-primary font-playfair text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-foreground hover:text-primary transition-colors duration-300">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-foreground hover:text-primary transition-colors duration-300">
                  About Us
                </a>
              </li>
              <li>
                <a href="#menu" className="text-foreground hover:text-primary transition-colors duration-300">
                  Menu
                </a>
              </li>
              <li>
                <a href="#gallery" className="text-foreground hover:text-primary transition-colors duration-300">
                  Gallery
                </a>
              </li>
              <li>
                <a href="#reservation" className="text-foreground hover:text-primary transition-colors duration-300">
                  Reservations
                </a>
              </li>
              <li>
                <a href="#contact" className="text-foreground hover:text-primary transition-colors duration-300">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-primary font-playfair text-xl font-semibold mb-4">Newsletter</h3>
            <p className="text-foreground opacity-80 mb-4">
              Subscribe to our newsletter for special offers and updates.
            </p>
            <form className="flex" onSubmit={handleSubmit}>
              <Input
                type="email"
                placeholder="Your email address"
                className="rounded-r-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" className="rounded-l-none">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 text-center">
          <p className="text-foreground opacity-70">
            &copy; {new Date().getFullYear()} Meta Restaurant. All rights reserved. | Sheikh Zayed City, Giza Governorate, Egypt
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
