const Map = () => {
  return (
    <section id="map" className="h-96 bg-background relative">
      <iframe 
        title="Meta Restaurant Location"
        className="w-full h-full border-0"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55251.37634200034!2d30.966344!3d30.0267482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14585a614680a5a9%3A0xbf29f28b88a1f3c2!2sSheikh%20Zayed%20City%2C%20Giza%20Governorate%2C%20Egypt!5e0!3m2!1sen!2sus!4v1653037131775!5m2!1sen!2sus"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      <div 
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
        style={{ background: 'rgba(0, 0, 0, 0.3)' }}
      >
        <div className="text-center bg-secondary bg-opacity-80 p-4 rounded-lg">
          <i className="fas fa-map-marked-alt text-primary text-4xl mb-4"></i>
          <p className="text-foreground text-lg mb-2">Meta Restaurant Location</p>
          <p className="text-primary">Sheikh Zayed City, Giza Governorate, Egypt</p>
        </div>
      </div>
    </section>
  );
};

export default Map;
