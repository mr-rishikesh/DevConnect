import { useState } from "react";
import { FiSend, FiPaperclip, FiSmile, FiArrowLeft } from "react-icons/fi";

const dummyUsers = [
  {
    id: "1",
    name: "Alice Johnson",
    avatar: "https://i.pravatar.cc/150?img=1",
    lastMessage: "See you at the meeting",
    online: true,
  },
  {
    id: "2",
    name: "Bob Smith",
    avatar: "https://i.pravatar.cc/150?img=2",
    lastMessage: "Let’s refactor this",
    online: false,
  },
];

const dummyMessages = [
  { id: 1, text: "Hey, are you working on the new API?", sender: "me", timestamp: "10:30 AM" },
  { id: 2, text: "Yes! Almost done. You?", sender: "them", timestamp: "10:31 AM" },
  { id: 3, text: "Cool. Deploying now.", sender: "me", timestamp: "10:32 AM" },
];

export default function MessagePage() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="flex h-[100vh] text-gray-900 dark:text-white bg-white dark:bg-gray-900" data-aos="fade-in">
      {/* Sidebar */}
      <aside className={`w-full md:w-1/3 border-r border-gray-300 dark:border-gray-700 ${selectedUser ? 'hidden md:block' : 'block'}`} data-aos="fade-right">
        <div className="p-4 text-xl font-bold border-b border-gray-200 dark:border-gray-700">
          Messages
        </div>
        <ul className="overflow-y-auto h-full">
          {dummyUsers.map((user, i) => (
            <li
              key={user.id}
              className="flex items-center gap-3 p-4 hover:bg-blue-50 dark:hover:bg-gray-800 cursor-pointer"
              onClick={() => setSelectedUser(user)}
              data-aos="fade-right"
              data-aos-delay={i * 100}
            >
              <div className="relative">
                <img className="w-12 h-12 rounded-full" src={user.avatar} alt={user.name} />
                <span className={`absolute bottom-0 right-0 block w-3 h-3 rounded-full ${user.online ? "bg-green-500" : "bg-gray-400"}`}></span>
              </div>
              <div className="flex-1">
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-500 truncate">{user.lastMessage}</p>
              </div>
            </li>
          ))}
        </ul>
      </aside>

      {/* Chat Window */}
      <main className={`flex-1 flex flex-col ${!selectedUser ? 'hidden md:flex' : 'flex'}`} data-aos="fade-left">
        {selectedUser ? (
          <>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                {/* Back button (mobile only) */}
                <button className="md:hidden" onClick={() => setSelectedUser(null)}>
                  <FiArrowLeft className="text-xl" />
                </button>
                <img className="w-10 h-10 rounded-full" src={selectedUser.avatar} alt={selectedUser.name} />
                <div>
                  <p className="font-semibold">{selectedUser.name}</p>
                  <p className="text-sm text-gray-500">{selectedUser.online ? "Online" : "Offline"}</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4">
              {dummyMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-sm px-4 py-2 rounded-lg shadow ${msg.sender === "me" ? "bg-blue-500 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"}`}>
                    <p>{msg.text}</p>
                    <p className="text-xs text-right mt-1 text-gray-300">{msg.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Box */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-4 flex items-center gap-3">
              <button className="text-gray-400 hover:text-blue-500">
                <FiSmile />
              </button>
              <button className="text-gray-400 hover:text-blue-500">
                <FiPaperclip />
              </button>
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800">
                <FiSend />
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            Select a conversation to start chatting.
          </div>
        )}
      </main>
    </div>
  );
}
