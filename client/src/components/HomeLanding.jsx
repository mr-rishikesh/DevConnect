import { Link } from "react-router-dom";

const HomeLanding = () => {

  const features = [
    {
      icon: "🎯",
      title: "Showcase Your Work",
      desc: "Build a professional portfolio with your projects, skills, and achievements.",
    },
    {
      icon: "🤝",
      title: "Connect with Peers",
      desc: "Follow developers, join discussions, and build your professional network.",
    },
    {
      icon: "🚀",
      title: "Find Collaborators",
      desc: "Discover developers with complementary skills for your next big project.",
    },
    {
      icon: "📝",
      title: "Share Knowledge",
      desc: "Write technical blogs, share tutorials, and establish your expertise.",
    },
    {
      icon: "💼",
      title: "Career Opportunities",
      desc: "Get discovered by top tech companies and open source organizations.",
    },
    {
      icon: "⚡",
      title: "Hack & Build",
      desc: "Participate in hackathons and coding challenges with your team.",
    },
  ]

  const howItWorks = [
    {
      title: "1. Sign Up",
      desc: "Create your developer profile in seconds.",
      icon: "👤"
    },
    {
      title: "2. Post & Engage",
      desc: "Start sharing your wins and connect with others.",
      icon: "💬"
    },
    {
      title: "3. Team Up",
      desc: "Collaborate on projects, hackathons, and startups.",
      icon: "🚀"
    },
  ]

  const testimonials = [
    {
      quote: "DevConnect helped me find my dream team for a hackathon. We won second place!",
      author: "Alex Chen",
      role: "Full Stack Developer",
      img: 8,
      rating: 5,
    },
    {
      quote: "The knowledge sharing here is incredible. I've learned so much from the community.",
      author: "Priya Patel",
      role: "Frontend Engineer",
      img: 9,
      rating: 4,
    },
    {
      quote: "Landed my first tech job through connections I made on DevConnect. Forever grateful!",
      author: "Jamal Williams",
      role: "Junior Developer",
      img: 3,
      rating: 5,
    }
  ]


  return (
    <div className="bg-white dark:bg-gray-900 transition-colors">
      {/* Hero Section */}
      <section className="text-center px-6 py-24 max-w-6xl mx-auto">

        <div className="mb-6 inline-flex items-center px-4 py-2 text-sm font-medium text-primary-700 dark:text-accent-100 bg-primary-50 dark:bg-accent-900/30 rounded-full border border-primary-100 dark:border-accent-800">
          <span className="mr-2 bg-primary-600 dark:bg-accent-600 text-white px-2.5 py-1 rounded-full text-xs font-bold">🚀</span>
          Welcome to DevConnect!
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
          <span className="text-primary-600 dark:text-accent-500">Build. Brag. Belong.</span><br />
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-xl">
          The ultimate platform for developers to showcase their work, connect with peers, and build amazing projects together.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/signup"
            className="bg-primary-600 hover:bg-primary-700 dark:bg-accent-600 dark:hover:bg-accent-700 text-white font-semibold py-3.5 px-8 rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-200"
          >
            Get Started - It's Free
          </Link>
          <Link
            to="/about"
            className="text-primary-700 hover:text-primary-800 dark:text-accent-400 dark:hover:text-accent-300 font-medium py-3.5 px-8 border-2 border-primary-100 dark:border-accent-800 hover:border-primary-200 dark:hover:border-accent-700 rounded-lg transition-colors"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-secondary-900">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Everything You Need to Grow as a Developer</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Join a thriving community of developers building the future together</p>
        </div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => {
            return (
              <div
                key={i}
                className="bg-white dark:bg-secondary-800 p-8 rounded-2xl shadow-sm border-2 border-gray-100 hover:border-primary-400 dark:border-secondary-700 dark:hover:border-accent-500 transition-all duration-300"
              >
                <div className="w-16 h-16 mb-6 rounded-xl flex items-center justify-center text-3xl bg-primary-50 dark:bg-accent-900/30 text-primary-600 dark:text-accent-400">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{f.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{f.desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50 dark:bg-secondary-900 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">How DevConnect Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step, idx) => (
              <div 
                key={idx} 
                className="bg-white dark:bg-secondary-800 p-8 rounded-2xl shadow-sm border-2 border-gray-100 hover:border-primary-400 dark:border-secondary-700 dark:hover:border-accent-500 transition-all duration-300 text-center"
              >
                <div className="w-20 h-20 mx-auto mb-6 text-4xl flex items-center justify-center rounded-full bg-primary-50 dark:bg-accent-900/20 text-primary-600 dark:text-accent-400">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50 dark:bg-secondary-900">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">What Our Community Says</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div 
                key={idx} 
                className="group relative bg-white dark:bg-secondary-800 p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border-2 border-gray-100 dark:border-secondary-700 hover:border-primary-200 dark:hover:border-accent-500 overflow-hidden hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 dark:from-secondary-800 dark:to-secondary-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="absolute top-4 right-4 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span 
                        key={i} 
                        className={`text-xl ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <div className="flex items-start mb-6">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md mr-4 flex-shrink-0 group-hover:ring-2 group-hover:ring-primary-200 dark:group-hover:ring-accent-500/50 transition-all duration-300">
                      <img
                        src={`https://i.pravatar.cc/150?img=${testimonial.img}`}
                        alt={testimonial.author}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-accent-400 transition-colors">
                        {testimonial.author}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</div>
                    </div>
                  </div>
                  <div className="relative pl-6">
                    <span className="absolute left-0 top-0 text-5xl text-gray-200 dark:text-gray-700 -mt-1 group-hover:text-primary-100 dark:group-hover:text-accent-900/30 transition-colors duration-300">"</span>
                    <p className="text-gray-700 dark:text-gray-300 italic relative z-10 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300">
                      {testimonial.quote}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-primary-600 dark:bg-accent-800">
        <div className="relative max-w-7xl mx-auto px-6 py-24 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to join a community of passionate developers?
            </h2>
            <p className="text-xl text-primary-100 dark:text-accent-100 mb-10 max-w-2xl mx-auto">
              Create your free account and start building meaningful connections today. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/signup"
                className="bg-white text-primary-700 hover:bg-gray-50 dark:bg-accent-500 dark:hover:bg-accent-400 dark:text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-200 text-lg"
              >
                Get Started for Free
              </Link>
              <Link
                to="/about"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:bg-opacity-10 font-medium px-8 py-4 rounded-lg transition-colors text-lg"
              >
                Learn More
              </Link>
            </div>
            <div className="mt-8 flex items-center justify-center space-x-6">
              <div className="flex -space-x-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-white bg-gray-200"
                    style={{
                      backgroundImage: `url(https://i.pravatar.cc/150?img=${i + 1})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  ></div>
                ))}
              </div>
              <p className="text-primary-100 dark:text-accent-200 text-sm font-medium">
                Join <span className="font-bold text-white">10,000+</span> developers already building with us
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeLanding;
