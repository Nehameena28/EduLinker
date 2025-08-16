import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="bg-white text-gray-800 overflow-y-scroll scrollbar-hide">
      {/* Hero Section with background image */}
      <div
        className="relative  bg-cover  bg-center py-36 px-6 text-center"
        style={{
          backgroundImage: "url('/about-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10">
          <h1
            className="text-5xl font-extrabold mb-4 text-gray-100 drop-shadow-lg"
            style={{ textShadow: '2px 2px 4px rgba(209, 144, 100, 0.4)' }}
            data-aos="fade-up"
          >
            Learn. Share. Grow.
          </h1>

         
          <p
            className="max-w-3xl mx-auto text-lg text-gray-200"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Edulinker is your one-stop academic marketplace — empowering learners to share study materials and helping others grow through quality content.
          </p>
        </div>
      </div>

      {/* Mission & Vision Modern Design */}
      <div className="max-w-6xl mx-auto py-20 px-6 grid grid-cols-1 md:grid-cols-2 gap-14">
        {/* Our Mission - Card style */}
        <div
          data-aos="fade-right"
          className="bg-white shadow-xl rounded-2xl p-8 border-l-4 border-custom-brown hover:shadow-2xl transition hover:scale-[1.01]"
        >
          <h2 className="text-3xl font-bold text-custom-brown mb-4">Our Mission</h2>
          <p className="text-gray-700 text-base leading-relaxed">
            We believe in the power of shared learning. Edulinker enables students to
            turn their notes into earnings and gives others access to helpful,
            student-curated resources that truly make a difference.
          </p>
        </div>

        {/* Our Vision - Soft background style */}
        <div
          data-aos="fade-left"
          className="bg-[#f9f3ee] rounded-2xl p-8 border-l-4 border-custom-i-berry shadow-inner hover:scale-[1.01] transition"
        >
          <h2 className="text-3xl font-bold text-custom-i-berry mb-4">Our Vision</h2>
          <p className="text-gray-700 text-base leading-relaxed">
            To become the leading platform where creators, educators, and learners
            collaborate — making education more accessible, affordable, and effective
            for everyone.
          </p>
        </div>
      </div>

      {/* What Makes Edulinker Special Section */}
      <div className="bg-gray-100 py-20 px-6">
        <h2
          className="text-4xl font-bold text-center text-custom-blue mb-16"
          data-aos="fade-up"
        >
          What Makes Edulinker Special?
        </h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            {
              title: "For Note Creators",
              desc: "Upload, manage, and monetize your study materials.",
              icon: "https://img.icons8.com/3d-fluency/94/upload.png",
              color: "border-custom-brown",
            },
            {
              title: "For Learners",
              desc: "Browse, search, and instantly access quality notes.",
              icon: "https://img.icons8.com/3d-fluency/94/search--v1.png",
              color: "border-custom-i-berry",
            },
            {
              title: "Secure & Transparent",
              desc: "Safe payments and full transparency on every transaction.",
              icon: "https://img.icons8.com/3d-fluency/94/lock--v1.png",
              color: "border-custom-blue",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`bg-white border-l-4 ${item.color} rounded-2xl p-6 shadow hover:shadow-lg transition`}
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <img
                src={item.icon}
                alt={item.title}
                className="w-16 h-16 mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto py-20 px-6">
        <h2 className="text-4xl font-bold text-center text-custom-blue mb-12" data-aos="fade-up">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "How do I upload my notes?",
              a: "After logging in as a seller, go to the 'Sell' section and fill out the upload form including title, price, PDF, and cover image."
            },
            {
              q: "Is there any fee for buyers or sellers?",
              a: "Edulinker takes a small service fee from each transaction. Browsing and listing are free."
            },
            {
              q: "Can I delete or update my uploaded notes?",
              a: "Yes, you can manage all your uploaded notes from the seller dashboard including updates or removal."
            },
            {
              q: "How do payments work?",
              a: "Sellers receive payments securely via the payment gateway integrated into Edulinker."
            },
          ].map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm" data-aos="fade-up" data-aos-delay={index * 100}>
              <h3 className="text-lg font-bold text-custom-i-berry mb-2">{item.q}</h3>
              <p className="text-gray-700">{item.a}</p>
            </div>
          ))}
        </div>
      </div>

  

      {/* Final CTA */}
<div className="text-center py-20 px-6 bg-white" data-aos="zoom-in">
  <h2 className="text-3xl font-bold mb-4 text-custom-blue">
    Ready to join the Edulinker community?
  </h2>
  <p className="text-gray-600">
    Whether you're a note creator or knowledge seeker — Edulinker is built for you.
  </p>
</div>
 
   
    </section>
  );
};

export default About;
