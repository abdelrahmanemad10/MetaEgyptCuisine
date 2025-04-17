import { useState } from "react";
import { Button } from "@/components/ui/button";
import { menuItems, MenuCategory } from "@/lib/menu-data";

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory | "all">("all");

  const filteredItems = selectedCategory === "all" 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  return (
    <section id="menu" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-primary font-playfair text-4xl font-bold mb-4">Our Menu</h2>
          <p className="text-foreground max-w-2xl mx-auto">
            Carefully curated dishes that showcase the finest ingredients and culinary craftsmanship
          </p>
          <div className="w-24 h-1 bg-primary mx-auto mt-6"></div>
        </div>
        
        {/* Menu Navigation */}
        <div className="flex flex-wrap justify-center mb-12 gap-4">
          <button 
            className={`px-6 py-2 rounded-full font-semibold transition-colors duration-300 ${
              selectedCategory === "all" 
                ? "bg-primary text-background" 
                : "bg-secondary text-foreground hover:bg-primary hover:text-background"
            }`}
            onClick={() => setSelectedCategory("all")}
          >
            All
          </button>
          <button 
            className={`px-6 py-2 rounded-full font-semibold transition-colors duration-300 ${
              selectedCategory === "appetizers" 
                ? "bg-primary text-background" 
                : "bg-secondary text-foreground hover:bg-primary hover:text-background"
            }`}
            onClick={() => setSelectedCategory("appetizers")}
          >
            Appetizers
          </button>
          <button 
            className={`px-6 py-2 rounded-full font-semibold transition-colors duration-300 ${
              selectedCategory === "mains" 
                ? "bg-primary text-background" 
                : "bg-secondary text-foreground hover:bg-primary hover:text-background"
            }`}
            onClick={() => setSelectedCategory("mains")}
          >
            Main Courses
          </button>
          <button 
            className={`px-6 py-2 rounded-full font-semibold transition-colors duration-300 ${
              selectedCategory === "seafood" 
                ? "bg-primary text-background" 
                : "bg-secondary text-foreground hover:bg-primary hover:text-background"
            }`}
            onClick={() => setSelectedCategory("seafood")}
          >
            Seafood
          </button>
          <button 
            className={`px-6 py-2 rounded-full font-semibold transition-colors duration-300 ${
              selectedCategory === "desserts" 
                ? "bg-primary text-background" 
                : "bg-secondary text-foreground hover:bg-primary hover:text-background"
            }`}
            onClick={() => setSelectedCategory("desserts")}
          >
            Desserts
          </button>
          <button 
            className={`px-6 py-2 rounded-full font-semibold transition-colors duration-300 ${
              selectedCategory === "beverages" 
                ? "bg-primary text-background" 
                : "bg-secondary text-foreground hover:bg-primary hover:text-background"
            }`}
            onClick={() => setSelectedCategory("beverages")}
          >
            Beverages
          </button>
        </div>
        
        {/* Menu Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-secondary rounded-lg overflow-hidden shadow-lg menu-item-transition">
              <img src={item.image} alt={item.name} className="w-full h-60 object-cover" />
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-playfair text-xl font-semibold">{item.name}</h3>
                  <span className="text-primary font-semibold">LE {item.price}</span>
                </div>
                <p className="text-foreground opacity-80 text-sm mb-4">
                  {item.description}
                </p>
                <div className="flex items-center space-x-2">
                  {item.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className={`text-xs px-2 py-1 rounded-full ${
                        tag === "Chef's Choice" 
                          ? "bg-primary text-background" 
                          : tag === "Signature" 
                            ? "bg-[#800020] text-foreground" 
                            : "bg-[#7D8E7B] text-foreground"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            View Full Menu
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Menu;
