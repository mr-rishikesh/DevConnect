import { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";

export default function Profile() {
  const [openSettings, setOpenSettings] = useState(false);
  const { authUser } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-200 p-8" data-aos="fade-in">
      <div className="relative bg-white rounded-lg shadow-xl pb-8" data-aos="fade-up" data-aos-delay="100">
        {/* Settings Button */}
        <div className="absolute right-12 mt-4 rounded">
          <button
            onClick={() => setOpenSettings(!openSettings)}
            className="border border-gray-400 p-2 rounded text-gray-300 hover:text-gray-300 bg-gray-100 bg-opacity-10 hover:bg-opacity-20"
            title="Settings"
          >
            <svg xmlns="" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 5v.01M12 12v.01M12 19v.01" />
            </svg>
          </button>
          {openSettings && (
            <div className="bg-white absolute right-0 w-40 py-2 mt-1 border border-gray-200 shadow-2xl z-50">
              <div className="py-2 border-b">
                <p className="text-gray-400 text-xs px-6 uppercase mb-1">Settings</p>
                <button className="w-full flex items-center px-6 py-1.5 space-x-2 hover:bg-gray-200">
                  <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342a3 3 0 010-2.684l6.632-3.316a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684L8.684 13.342z" />
                  </svg>
                  <span className="text-sm text-gray-700">Share Profile</span>
                </button>
                <button className="w-full flex items-center py-1.5 px-6 space-x-2 hover:bg-gray-200">
                  <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636M18.364 18.364L5.636 5.636" />
                  </svg>
                  <span className="text-sm text-gray-700">Block User</span>
                </button>
                <button className="w-full flex items-center py-1.5 px-6 space-x-2 hover:bg-gray-200">
                  <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm text-gray-700">More Info</span>
                </button>
              </div>
              <div className="py-2">
                <p className="text-gray-400 text-xs px-6 uppercase mb-1">Feedback</p>
                <button className="w-full flex items-center py-1.5 px-6 space-x-2 hover:bg-gray-200">
                  <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M5.062 20h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 17c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span className="text-sm text-gray-700">Report</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile Header */}
        <div className="w-full h-[250px]">
          <img src="https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg" alt="Background" className="w-full h-full object-cover rounded-tl-lg rounded-tr-lg" />
        </div>

        <div className="flex flex-col items-center -mt-20">
          <img src={authUser.profilePic ? authUser.profilePic : "https://freesvg.org/img/abstract-user-flat-4.png"} alt="Profile" className="w-40 h-40 object-cover border-4 border-white rounded-full" />
          <div className="flex items-center space-x-2 mt-2">
            <p className="text-2xl font-semibold">{authUser ? authUser.fullName : ""}</p>
            <span className="bg-blue-500 rounded-full p-1" title="Verified">
              <svg className="text-white h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
              </svg>
            </span>
          </div>
          <p className="text-gray-700">Health Consultant</p>
          <p className="text-sm text-gray-500">{authUser ? authUser.city : ""}</p>
        </div>

        {/* Profile Buttons */}
        <div className="flex flex-col items-center lg:items-end justify-end px-8 mt-2">
          <div className="flex items-center space-x-4 mt-2">
            <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm space-x-2 transition duration-100">
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
              </svg>
              <span>Connect</span>
            </button>
            <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm space-x-2 transition duration-100">
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
              </svg>
              <span>Message</span>
            </button>
          </div>
        </div>
      </div>

      {/* Profile Info Section */}
      <div className="my-4 w-full" data-aos="fade-up" data-aos-delay="200">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h4 className="text-xl text-gray-900 font-bold">Personal Info</h4>
          <ul className="mt-2 text-gray-700">
            <li className="flex border-y py-2">
              <span className="font-bold w-32">Full name:</span>
              <span className="text-gray-700">{authUser.fullName}</span>
            </li>
            <li className="flex border-b py-2">
              <span className="font-bold w-32">Email:</span>
              <span className="text-gray-700">{authUser.email}</span>
            </li>
            <li className="flex border-b py-2">
              <span className="font-bold w-32">Age:</span>
              <span className="text-gray-700">{authUser.age}</span>
            </li>
            <li className="flex border-b py-2">
              <span className="font-bold w-32">Tags:</span>
              <span className="text-gray-700">{authUser.tags ? authUser.tags : "health"}</span>
            </li>
            <li className="flex border-b py-2">
              <span className="font-bold w-32">Joined:</span>
              <span className="text-gray-700">{authUser.createdAt}</span>
            </li>
            <li className="flex border-b py-2">
              <span className="font-bold w-32">Location:</span>
              <span className="text-gray-700">{authUser.city}</span>
            </li>

          </ul>
        </div>
      </div>
    </div>
  );
}
