import { Card } from "@/components/ui/card";

const Chefs = () => {
  const chefs = [
    {
      id: 1,
      name: "Ahmad Nabil",
      position: "Executive Chef",
      bio: "With over 15 years of experience in French and Egyptian cuisine, Chef Ahmad brings his expertise from Michelin-starred restaurants across Europe to create Meta's signature dishes.",
      image: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      name: "Maya Samir",
      position: "Head Pastry Chef",
      bio: "A graduate of Le Cordon Bleu Paris, Chef Maya creates stunning desserts that combine traditional Egyptian flavors with modern French techniques.",
      image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <section id="chefs" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-primary font-playfair text-4xl font-bold mb-4">Meet Our Chefs</h2>
          <p className="text-foreground max-w-2xl mx-auto">
            The creative minds behind our exquisite culinary creations
          </p>
          <div className="w-24 h-1 bg-primary mx-auto mt-6"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {chefs.map(chef => (
            <Card key={chef.id} className="bg-secondary overflow-hidden shadow-lg flex flex-col md:flex-row">
              <img 
                src={chef.image} 
                alt={chef.name} 
                className="w-full md:w-2/5 h-60 md:h-auto object-cover"
              />
              <div className="p-6 md:w-3/5">
                <h3 className="font-playfair text-2xl font-semibold mb-2">{chef.name}</h3>
                <p className="text-primary text-sm mb-4">{chef.position}</p>
                <p className="text-foreground opacity-80 text-sm mb-4">
                  {chef.bio}
                </p>
                <div className="flex space-x-3">
                  <a href="#" className="text-primary hover:text-foreground transition-colors duration-300">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#" className="text-primary hover:text-foreground transition-colors duration-300">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#" className="text-primary hover:text-foreground transition-colors duration-300">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Chefs;
