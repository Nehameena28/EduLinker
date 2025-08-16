
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const features = [
  {
    title: "Upload Documents",
    desc: "Easily upload your study notes or PDFs with a title, cover photo, and price.",
    icon: "https://img.icons8.com/3d-fluency/94/upload.png",
  },
  {
    title: "View Uploaded Docs",
    desc: "Access and manage your uploaded materials from a clean dashboard.",
    icon: "https://img.icons8.com/3d-fluency/94/opened-folder.png",
  },
  {
    title: "Sold Notes",
    desc: "Check which documents were purchased, and by whom.",
    icon: "https://img.icons8.com/3d-fluency/94/sales-performance.png",
  },
  {
    title: "Payment Info",
    desc: "Track your earnings and view your payment and payout history easily.",
    icon: "https://img.icons8.com/3d-fluency/94/money.png",
  },
  {
    title: "Marketplace Access",
    desc: "Explore all available study notes with search, filters, and previews.",
    icon: "https://img.icons8.com/3d-fluency/94/shop.png",
  },
  {
     title: "Buy Notes / Docs",
    desc: "Browse and purchase quality notes directly from sellers in a few clicks.",
    icon: "https://img.icons8.com/3d-fluency/94/shopping-bag.png", 
  },
];

const Hero = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleFeatureClick = () => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/Login');
    }
  };

  return (
    <section className="py-20 px-4 bg-white">
      <h2
        className="text-4xl font-bold text-center text-custom-blue mb-4"
        data-aos="fade-up"
      >
        Features of Edulinker
      </h2>
      <p
        className="text-center text-gray-600 mb-14 max-w-2xl mx-auto"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        Built for learners and note creators alike. Upload, browse, and manage content — all in one place.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-gray-50 border border-gray-200 p-6 rounded-2xl shadow-md hover:shadow-2xl hover:scale-105 transform transition-all duration-300 text-center cursor-pointer"
            data-aos="fade-up"
            data-aos-delay={index * 100}
            onClick={handleFeatureClick}
          >
            <img
              src={feature.icon}
              alt={feature.title}
              className="w-20 h-20 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {feature.title}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
