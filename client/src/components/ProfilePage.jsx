import React from 'react';

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-r from-blue-200 via-purple-300 to-pink-200 h-20 w-full rounded-b-3xl shadow-md" data-aos="fade-down" />

      {/* Profile Info Card */}
      <div className="max-w-5xl mx-auto px-6 mt-18 ">
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row items-center md:items-start gap-6" data-aos="fade-up">
          {/* Avatar */}
          <img
            src="https://i.pravatar.cc/150?img=12"
            alt="Profile"
            className="w-32 h-32 rounded-2xl border-4 border-white shadow-lg object-cover"
          />

          {/* Info */}
          <div className="flex-1 ">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  Jane Developer
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-md">PRO</span>
                </h2>
                <p className="text-gray-600 mt-1">Full-Stack Developer · Bangalore, India</p>
              </div>
              <div className="flex gap-4">
                <button className="px-4 py-2 border rounded-md hover:bg-gray-100 transition">Follow</button>
                <button className="px-4 py-2 bg-black text-white rounded-md hover:opacity-90 transition">Message</button>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-6 text-center">
              <div>
                <p className="text-xl font-bold">1,248</p>
                <p className="text-sm text-gray-500">Followers</p>
              </div>
              <div>
                <p className="text-xl font-bold">435</p>
                <p className="text-sm text-gray-500">Following</p>
              </div>
              <div>
                <p className="text-xl font-bold">89</p>
                <p className="text-sm text-gray-500">Projects</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-10 flex gap-6 border-b pb-2 text-gray-500 font-medium text-sm" data-aos="fade-up" data-aos-delay="100">
          <button className="text-black border-b-2 border-black pb-1">Achievements</button>
          <button>Projects</button>
          <button>Connections</button>
          <button>About</button>
        </div>

        {/* Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition" data-aos="fade-up" data-aos-delay={i * 100}>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Project #{i}</h3>
              <p className="text-sm text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut faucibus.
              </p>
              <span className="mt-2 inline-block text-xs text-white bg-blue-500 px-2 py-1 rounded-full">Full-stack</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
