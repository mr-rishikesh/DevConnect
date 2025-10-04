import React from 'react';
import { Link } from "react-router-dom";


const About = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <div
        className="w-full bg-cover bg-center bg-no-repeat flex items-center"
        style={{ backgroundImage: `url(/bgNetwork.png)` }}
      >
        <div className="mx-auto my-24 max-w-4xl px-6 text-left" data-aos="fade-right">
          <h4 className="text-green-400 text-xl sm:text-2xl font-semibold tracking-wider">
            DevConnect
          </h4>
          <p className="text-white py-6 font-bold text-3xl sm:text-4xl md:text-5xl tracking-wide hover:text-amber-300 transition">
            Developers for developers
          </p>
          <p className="text-blue-200 text-lg sm:text-xl font-semibold tracking-wide">
            Developers share their journey, showcase their work, and connect with like-minded tech enthusiasts.
          </p>
        </div>
      </div>

      {/* Gradient Strip */}
      <div className="w-full h-10 bg-gradient-to-r from-slate-700 via-purple-500 to-blue-400" />

      {/* Mission Section */}
      <div className="my-20 px-6 text-center" data-aos="zoom-in-up">
        <h2 className="font-serif font-extrabold tracking-wide text-3xl sm:text-4xl lg:text-5xl text-blue-900 hover:text-red-500 hover:scale-110 transition-transform">
          MISSION
        </h2>
        <p className="my-10 max-w-5xl mx-auto text-purple-800 text-lg sm:text-xl font-semibold tracking-wide leading-relaxed">
          To empower developers by providing a dedicated space to share their journeys, showcase projects, form teams,
          and collaborate on meaningful work — from hackathons to open source — fostering a community built on
          connection, contribution, and growth.
        </p>
      </div>

      {/* Values Section */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-6 pb-20">
        {[
          {
            title: 'Growth',
            text: 'Learn from others, stay inspired, and keep building. Sharing meaningful work & experiences.',
          },
          {
            title: 'Exposure',
            text: 'Share real projects, real experiences, and find opportunities.',
          },
          {
            title: 'Inclusivity',
            text: 'Connect globally. All developers from beginners to experts are welcome.',
          },
          {
            title: 'Collaboration',
            text: 'Find teammates, mentors, and contributors.',
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-blue-950 text-white p-8 rounded-lg shadow-md hover:shadow-xl hover:opacity-90 transition duration-300"
            data-aos="fade-up"
            data-aos-delay={i * 100}
          >
            <h3 className="text-xl font-bold mb-4">{item.title}</h3>
            <p className="text-base">{item.text}</p>
          </div>
        ))}
      </div>

      <div className='place-items-center grid sm:grid-rows-2 sm:grid-cols-1 md:grid-cols-2 md:grid-rows-1 lg:grid-rows-1 lg:grid-cols-2 gap-7 bg-blue-100 w-screen lg:pb-16 pb-8 pt-8' data-aos="fade-in">
        <div className='lg:ml-10 md:ml-10 md:mr-10' data-aos="fade-right" data-aos-delay="200">
          <h2 className='text-center hover:text-amber-500 tracking-wide font-root-heading text-blue-600 font-extrabold lg:text-5xl sm:text-3xl sm:pt-5 md:pt-5 md:text-4xl pt-4 pb-10'>Why DevConnect?</h2>
          <div className='place-items-center grid lg:grid-cols-3 lg:grid-rows-2 md:grid-cols-2 md:grid-rows-3 sm:grid-rows-6 sm:grid-cols-1 gap-5'>
            <div className="bg-blue-50 p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="font-bold text-xl mb-2 text-blue-950">Share Your Journey</h3>
              <p>Post experiences, achievements, and milestones from your developement life.</p>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="font-bold text-xl mb-2 text-blue-950">Showcase Projects</h3>
              <p>Display personal projects, GitHub repos, hackathon demos, and more — with media support.</p>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="font-bold text-xl mb-2 text-blue-950">Team Formation</h3>
              <p>Find collaborators for hackathons, open-source, freelance gigs, or startup ideas.</p>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="font-bold text-xl mb-2 text-blue-950">Resource Sharing</h3>
              <p>Contribute ans share tutorials, blogs, tools, or tips to help the community grow.</p>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="font-bold text-xl mb-2 text-blue-950">Inclusive Community</h3>
              <p>Open to all — beginners to pros, across the globe and all tech domains.</p>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="font-bold text-xl mb-2 text-blue-950">Contribute Feed</h3>
              <p>Join active projects, find teammates, or request contributors — all in one place.</p>
            </div>
          </div>

        </div>

        <div className='w-36 h-28 md:w-80 md:h-52 lg:w-96 bg-center bg-cover lg:h-80 mr-8 ml-8 lg:mt-20 rounded-xl hover:scale-110' style={{ backgroundImage: "url('/devCommunity.png')" }} data-aos="fade-left" data-aos-delay="400"></div>

      </div>

      {/*footer*/}
      <section className="bg-blue-600 text-white text-center py-20 px-6" data-aos="zoom-in">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to build your dev network?</h2>
        <p className="mb-6 text-lg">Join DevConnect today and never code alone again.</p>
        <Link
          to="/signup"
          className="inline-block bg-white text-blue-700 font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-100 transition"
        >
          Get Started Free
        </Link>
      </section>
    </div>
  );
};

export default About;
