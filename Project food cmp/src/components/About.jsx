import React, { useState, useEffect } from 'react';

const About = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [animateStats, setAnimateStats] = useState(false);

  const developers = [
    {
      name: "Ashish Kumar",
      role: "Backend Developer",
      email: "ashishkkr46@gmail.com",
      avatar: "👨‍💻",
      color: "from-blue-500 to-cyan-500",
      skills: ["Python", "FastAPI", "Selenium", "Web Scraping"],
      description: "Expert in backend development and API integration",
      contribution: "Built robust backend APIs and web scraping systems"
    },
    {
      name: "Sagar Bharadwaj",
      role: "Data Processing Engineer",
      email: "sagar78@gmail.com",
      avatar: "👨‍🔬",
      color: "from-green-500 to-emerald-500",
      skills: ["Data Analysis", "Machine Learning", "Python", "SQL"],
      description: "Specialized in data processing and analytics",
      contribution: "Developed data processing pipelines and analytics"
    },
    {
      name: "Chandrakant Singh Danu",
      role: "UI/UX Designer",
      email: "csdanu@gmail.com",
      avatar: "🎨",
      color: "from-purple-500 to-pink-500",
      skills: ["React", "UI Design", "UX Research", "Frontend"],
      description: "Creating beautiful and intuitive user experiences",
      contribution: "Designed modern UI/UX and frontend development"
    }
  ];

  const stats = [
    { number: "1000+", label: "Restaurants", icon: "🏪" },
    { number: "50K+", label: "Dishes", icon: "🍽️" },
    { number: "24/7", label: "Real-time Data", icon: "⚡" },
    { number: "99.9%", label: "Uptime", icon: "🔄" }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setAnimateStats(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 to-red-400/10"></div>
        <div className="relative z-10 container mx-auto px-6 py-16">
          <div className="text-center max-w-5xl mx-auto">
            <div className="mb-8">
              <div className="inline-block p-4 bg-white rounded-2xl shadow-xl border border-gray-200 mb-6">
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <img 
                    src="/images/logo.png" 
                    alt="CRAVEX Logo" 
                    className="w-16 h-16 object-contain drop-shadow-sm"
                  />
                  <h1 className="text-6xl font-bold text-orange-400 drop-shadow-sm">
                    CraveX
                  </h1>
                </div>
              </div>
              <p className="text-2xl text-gray-700 mb-8 font-light drop-shadow-sm">
                Revolutionizing food discovery with cutting-edge technology
              </p>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-xl p-6 border border-gray-200 shadow-lg transform transition-all duration-1000 ${
                    animateStats ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="text-3xl mb-2 drop-shadow-sm">{stat.icon}</div>
                  <div className="text-3xl font-bold text-gray-800 mb-1 drop-shadow-sm">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl p-12 shadow-2xl border border-gray-200">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4 drop-shadow-sm">
                About Our Platform
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-red-500 mx-auto mb-6"></div>
              <p className="text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto drop-shadow-sm">
                CraveX is a next-generation food discovery platform that leverages advanced web scraping 
                technology and modern UI/UX design to provide users with comprehensive restaurant and dish information. 
                Our platform aggregates data from multiple sources to deliver real-time, accurate information.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center group">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-500/80 to-cyan-500/80 rounded-2xl flex items-center justify-center text-3xl transform group-hover:scale-110 transition-all duration-300 shadow-lg border border-gray-200">
                  🔍
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 drop-shadow-sm">Advanced Search</h3>
                <p className="text-gray-600 leading-relaxed">
                  Intelligent search algorithms that find the perfect restaurants and dishes based on your preferences
                </p>
              </div>
              <div className="text-center group">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-green-500/80 to-emerald-500/80 rounded-2xl flex items-center justify-center text-3xl transform group-hover:scale-110 transition-all duration-300 shadow-lg border border-gray-200">
                  📊
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 drop-shadow-sm">Real-time Data</h3>
                <p className="text-gray-600 leading-relaxed">
                  Live data from multiple sources ensuring you always have the most current information
                </p>
              </div>
              <div className="text-center group">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-purple-500/80 to-pink-500/80 rounded-2xl flex items-center justify-center text-3xl transform group-hover:scale-110 transition-all duration-300 shadow-lg border border-gray-200">
                  🎨
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 drop-shadow-sm">Modern Design</h3>
                <p className="text-gray-600 leading-relaxed">
                  Beautiful, intuitive interface designed for the best user experience across all devices
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center">
              <button
                onClick={() => setShowPopup(true)}
                className="bg-gradient-to-r from-orange-500/90 to-red-500/90 text-white px-10 py-4 rounded-full font-semibold text-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-lg border border-gray-200"
              >
                Meet Our Development Team 👥
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Developer Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-7xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200">
            {/* Popup Header */}
            <div className="text-center mb-10 relative">
              <h2 className="text-4xl font-bold text-gray-800 mb-3 drop-shadow-sm">
                🚀 Our Development Team
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-red-500 mx-auto mb-4"></div>
              <p className="text-xl text-gray-600 drop-shadow-sm">
                Meet the talented developers behind CRAVEX
              </p>
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-0 right-0 text-gray-400 hover:text-gray-600 text-3xl transform hover:scale-110 transition-all duration-300"
              >
                ✕
              </button>
            </div>

            {/* Developer Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
              {developers.map((developer, index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl p-8 border border-gray-200 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 group"
                >
                  {/* Avatar and Name */}
                  <div className="text-center mb-6">
                    <div className={`w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r ${developer.color} flex items-center justify-center text-4xl transform group-hover:scale-110 transition-all duration-300 shadow-lg border border-gray-200`}>
                      {developer.avatar}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2 drop-shadow-sm">
                      {developer.name}
                    </h3>
                    <p className="text-orange-600 font-semibold text-lg mb-3">
                      {developer.role}
                    </p>
                  </div>

                  {/* Email */}
                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center space-x-2 text-gray-600 bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <span>📧</span>
                      <a
                        href={`mailto:${developer.email}`}
                        className="text-blue-600 hover:text-blue-800 transition-colors duration-300 font-medium"
                      >
                        {developer.email}
                      </a>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-center mb-6 leading-relaxed drop-shadow-sm">
                    {developer.description}
                  </p>

                  {/* Contribution */}
                  <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2 text-center">
                      Key Contribution
                    </h4>
                    <p className="text-gray-600 text-sm text-center">
                      {developer.contribution}
                    </p>
                  </div>

                  {/* Skills */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3 text-center">
                      Skills & Technologies
                    </h4>
                    <div className="flex flex-wrap justify-center gap-2">
                      {developer.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="bg-gray-100 px-4 py-2 rounded-full text-sm font-medium text-gray-700 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Contact Button */}
                  <div className="text-center">
                    <a
                      href={`mailto:${developer.email}`}
                      className="inline-block bg-gradient-to-r from-orange-500/90 to-red-500/90 text-white px-6 py-3 rounded-full font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-md border border-gray-200"
                    >
                      Contact {developer.name.split(' ')[0]}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="text-center pt-8 border-t border-gray-200">
              <p className="text-gray-600 mb-6 text-lg drop-shadow-sm">
                Together, we're building the future of food discovery! 🍕
              </p>
              <div className="flex justify-center space-x-6">
                <div className="text-3xl animate-bounce drop-shadow-lg">👨‍💻</div>
                <div className="text-3xl animate-bounce drop-shadow-lg" style={{ animationDelay: '0.2s' }}>👨‍🔬</div>
                <div className="text-3xl animate-bounce drop-shadow-lg" style={{ animationDelay: '0.4s' }}>🎨</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    );
};

export default About;