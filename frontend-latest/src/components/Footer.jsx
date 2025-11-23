export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16">
      <div className="container mx-auto px-6 grid md:grid-cols-3 gap-10">
        <div>
          <h2 className="text-3xl text-white font-medium mb-3">WeCare</h2>
          <p className="text-gray-400 text-lg">
            Your trusted digital health companion. Making healthcare accessible to everyone, everywhere.
          </p>
        </div>

        <div>
          <h3 className="text-xl text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-lg">
            <li><a href="#services" className="hover:text-blue-400">Services</a></li>
            <li><a href="#doctors" className="hover:text-blue-400">Our Doctors</a></li>
            <li><a href="#reviews" className="hover:text-blue-400">Reviews</a></li>
            <li><a href="#faq" className="hover:text-blue-400">FAQs</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl text-white mb-3">Contact Us</h3>
          <p><i className="fa-solid fa-envelope mr-2"></i> support@wecare.com</p>
          <p><i className="fa-solid fa-phone mr-2"></i> +91 98765 43210</p>
          <div className="flex space-x-5 mt-4 text-2xl">
            <a href="#"><i className="fab fa-facebook hover:text-blue-500"></i></a>
            <a href="#"><i className="fab fa-twitter hover:text-blue-400"></i></a>
            <a href="#"><i className="fab fa-instagram hover:text-pink-500"></i></a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm">
        © 2024 WeCare. All Rights Reserved.
      </div>
    </footer>
  );
}
