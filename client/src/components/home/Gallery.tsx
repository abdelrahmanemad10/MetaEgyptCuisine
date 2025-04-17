const Gallery = () => {
  const galleryImages = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1571805529673-0f56b922b359?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      caption: "Elegant Dining Space"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      caption: "Seasonal Specialties"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1482275548304-a58859dc31b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      caption: "Culinary Artistry"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      caption: "Premium Wine Selection"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      caption: "Private Dining Experience"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      caption: "Decadent Desserts"
    }
  ];

  return (
    <section id="gallery" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-primary font-playfair text-4xl font-bold mb-4">Our Gallery</h2>
          <p className="text-foreground max-w-2xl mx-auto">
            A visual journey through our culinary creations and dining experience
          </p>
          <div className="w-24 h-1 bg-primary mx-auto mt-6"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryImages.map(image => (
            <div key={image.id} className="relative overflow-hidden rounded-lg group h-64 md:h-80 cursor-pointer">
              <img 
                src={image.src} 
                alt={image.caption} 
                className="w-full h-full object-cover gallery-image"
              />
              <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-primary font-playfair text-xl">{image.caption}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
