import { useState } from "react";

interface Testimonial {
  id: number;
  text: string;
  author: string;
  title: string;
  rating: number;
}

const Testimonials = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      text: "Meta Restaurant offers an unforgettable dining experience. The fusion of traditional Egyptian and modern international cuisine creates flavors I've never experienced before. The service is impeccable and the atmosphere is divine.",
      author: "Sarah Ahmed",
      title: "Food Critic, Cairo Times",
      rating: 5
    },
    {
      id: 2,
      text: "From the moment we walked in, we knew we were in for a special evening. The chef's tasting menu was outstanding, with each dish telling a unique story of Egyptian culinary heritage with modern techniques.",
      author: "Mohamed Karim",
      title: "Restaurant Reviewer",
      rating: 5
    },
    {
      id: 3,
      text: "The attention to detail at Meta is extraordinary. Each dish is not just a meal, but an art piece. The staff were knowledgeable and attentive without being intrusive. A true gem in Sheikh Zayed.",
      author: "Laila Nour",
      title: "Food Blogger",
      rating: 5
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-20 bg-cover bg-center" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.85)), url('https://images.unsplash.com/photo-1543353071-087092ec393a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')" }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-primary font-playfair text-4xl font-bold mb-4">Guest Experiences</h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="text-center px-8 py-12">
            <div className="text-primary text-5xl mb-6">"</div>
            <p className="text-foreground text-xl italic mb-8">
              {testimonials[activeIndex].text}
            </p>
            <div className="flex justify-center items-center mb-4">
              <div className="flex text-primary">
                {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                  <i key={i} className="fas fa-star"></i>
                ))}
              </div>
            </div>
            <p className="text-primary font-semibold">{testimonials[activeIndex].author}</p>
            <p className="text-foreground text-sm">{testimonials[activeIndex].title}</p>
          </div>
          
          <div className="flex justify-center mt-8">
            {testimonials.map((testimonial, index) => (
              <button 
                key={testimonial.id}
                className={`w-3 h-3 rounded-full mx-1 transition-all duration-300 ${
                  index === activeIndex 
                    ? "bg-primary" 
                    : "bg-foreground opacity-50"
                }`}
                onClick={() => setActiveIndex(index)}
                aria-label={`View testimonial from ${testimonial.author}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
