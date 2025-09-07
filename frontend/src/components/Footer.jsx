const Footer = () => {
    return (
      <footer className="bg-green-200 text-green-900 py-6 px-6">
        {/* Contact Info */}
        <div className="max-w-6xl mx-auto md:justify-between md:gap-8 gap-6 mb-4">
            <p>Mumtaz Products</p>
            <a href="tel:+4733378901" className="hover:underline">+92 321 9434247</a>
            <br />
            <a href="mailto:mumtazproductspk@gmail.com" className="hover:underline">mumtazproductspk@gmail.com</a>
        </div>
  
        {/* Links & Policies */}
        <div className="border-t border-green-300 pt-2 max-w-6xl mx-auto text-sm">
          <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-10 justify-center md:justify-center text-center md:text-right">
            <span>© 2025, Mumtaz Foods</span> 
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Shipping Policy</a>
            <a href="#" className="hover:underline">Refund Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
          </div>
        </div>
        
      </footer>
    );
  };
  
  export default Footer;
  