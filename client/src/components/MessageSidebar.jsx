// /components/MessageSidebar.jsx

import { useEffect, useState } from "react";

const dummyConversations = [
  {
    id: "1",
    name: "Ananya Sharma",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    lastMessage: "Hey, saw your recent project. Loved it!",
    online: true,
  },
  {
    id: "2",
    name: "Ravi Kumar",
    avatar: "https://randomuser.me/api/portraits/men/46.jpg",
    lastMessage: "Let’s collab on the AI module?",
    online: false,
  },
  {
    id: "3",
    name: "Sneha Patel",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    lastMessage: "Thanks for the endorsement! 🔥",
    online: true,
  },
];

const MessageSidebar = ({ onSelectChat }) => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    // Replace this with actual API call when backend is ready
    setConversations(dummyConversations);
  }, []);

  return (
    <div className="h-full overflow-y-auto p-4">
      <h2 className="text-lg font-semibold mb-4" data-aos="fade-right">Messages</h2>
      <ul className="space-y-4">
        {conversations.map((chat, idx) => (
          <li
            key={chat.id}
            onClick={() => onSelectChat(chat)}
            className="flex items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-lg transition"
            data-aos="fade-right"
            data-aos-delay={idx * 100}
          >
            <div className="relative">
              <img
                src={chat.avatar}
                alt={chat.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <span
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-900 ${chat.online ? "bg-green-500" : "bg-gray-400"
                  }`}
              />
            </div>
            <div className="ml-3">
              <p className="font-medium text-gray-900 dark:text-white">{chat.name}</p>
              <p className="text-sm text-gray-500 truncate max-w-[200px] dark:text-gray-400">
                {chat.lastMessage}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageSidebar;
