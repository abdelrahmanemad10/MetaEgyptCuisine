import { Button } from "@/components/ui/button";

const Hero = () => {
  const handleLinkClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="relative flex items-center justify-center h-screen bg-no-repeat bg-cover bg-center"
      style={{ 
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')" 
      }}
    >
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-playfair font-bold text-foreground mb-6">
          <span className="text-primary">Meta</span> Restaurant
        </h1>
        <p className="text-xl md:text-2xl font-montserrat text-foreground mb-8 max-w-3xl mx-auto">
          Experience exquisite culinary artistry in the heart of Sheikh Zayed, Egypt
        </p>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 justify-center">
          <Button 
            size="lg"
            onClick={() => handleLinkClick('menu')}
          >
            Explore Our Menu
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => handleLinkClick('reservation')}
          >
            Make a Reservation
          </Button>
        </div>
        <div className="absolute bottom-12 left-0 right-0 text-center">
          <a 
            href="#about" 
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('about');
            }}
            className="inline-block animate-bounce"
          >
            <i className="fas fa-chevron-down text-primary text-2xl"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
