import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-primary font-playfair text-4xl font-bold mb-4">Our Story</h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h3 className="text-3xl font-playfair font-semibold mb-6">A Culinary Journey</h3>
            <p className="text-lg mb-6 leading-relaxed">
              Meta Restaurant was founded in 2018 with a vision to bring together traditional Egyptian flavors and international culinary techniques. Our name "Meta" represents our philosophy of going beyond conventional dining experiences.
            </p>
            <p className="text-lg mb-6 leading-relaxed">
              Located in the vibrant district of Sheikh Zayed, our restaurant offers a serene escape from the bustling city life. Each dish tells a story of our heritage and innovation, carefully crafted by our team of passionate chefs.
            </p>
            <div className="flex items-center space-x-4 mt-8">
              <div className="h-px bg-primary flex-grow"></div>
              <span className="text-primary font-cormorant italic text-xl">"Beyond Taste"</span>
              <div className="h-px bg-primary flex-grow"></div>
            </div>
          </div>
          <div className="order-1 md:order-2 relative">
            <img 
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80" 
              alt="Meta Restaurant Interior" 
              className="rounded-lg shadow-2xl h-96 w-full object-cover"
            />
            <div className="absolute -bottom-6 -left-6 bg-primary p-4 rounded shadow-lg">
              <p className="font-playfair text-background text-xl font-bold">Est. 2018</p>
            </div>
          </div>
        </div>
        
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-10">
          <Card className="bg-secondary transition-transform duration-300 hover:-translate-y-2">
            <CardContent className="p-8 text-center">
              <i className="fas fa-utensils text-primary text-4xl mb-4"></i>
              <h4 className="font-playfair text-2xl font-semibold mb-4">Finest Ingredients</h4>
              <p className="text-foreground opacity-80">
                We source only the freshest, locally-grown ingredients to ensure authentic flavors and support local farmers.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-secondary transition-transform duration-300 hover:-translate-y-2">
            <CardContent className="p-8 text-center">
              <i className="fas fa-award text-primary text-4xl mb-4"></i>
              <h4 className="font-playfair text-2xl font-semibold mb-4">Award-Winning Chefs</h4>
              <p className="text-foreground opacity-80">
                Our culinary team brings decades of experience from renowned kitchens across the globe to create unforgettable dishes.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-secondary transition-transform duration-300 hover:-translate-y-2">
            <CardContent className="p-8 text-center">
              <i className="fas fa-glass-cheers text-primary text-4xl mb-4"></i>
              <h4 className="font-playfair text-2xl font-semibold mb-4">Elegant Atmosphere</h4>
              <p className="text-foreground opacity-80">
                Immerse yourself in our carefully designed space that combines modern luxury with traditional Egyptian elements.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="py-20 bg-cover bg-center mt-20" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')" }}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-primary font-playfair text-4xl font-bold mb-6">Our Culinary Philosophy</h2>
          <p className="text-xl text-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
            At Meta, we believe that dining is more than just eating—it's an experience that engages all the senses. Our dishes are crafted to tell a story, evoke emotions, and create memories.
          </p>
          <div className="flex justify-center">
            <a 
              href="#menu" 
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('menu');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Button>Discover Our Menu</Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
