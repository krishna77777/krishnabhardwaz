import React, { useState } from 'react';
import { Bot, X, Send } from 'lucide-react';

const demoResponses = [
  "Hi! I'm Mentor AI. How can I help you with your exam preparation today?",
  "That's a great question! Let me help you understand this topic better. For competitive exams, focus on NCERT basics first.",
  "I recommend practicing MCQs daily and revising notes regularly. Consistency is the key to success!",
  "For History, focus on ancient Indian dynasties and the freedom movement. For Geography, map-based questions are very important.",
  "You can use the Paid Test Series for structured practice. Start with easy questions and gradually increase difficulty.",
];

export default function MentorAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isBot: boolean }[]>([
    { text: "Hi! I'm Mentor AI. How can I help you today?", isBot: true },
  ]);
  const [input, setInput] = useState('');
  const [responseIndex, setResponseIndex] = useState(1);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { text: userMsg, isBot: false }]);

    setTimeout(() => {
      const botReply = demoResponses[responseIndex % demoResponses.length];
      setMessages((prev) => [...prev, { text: botReply, isBot: true }]);
      setResponseIndex((prev) => prev + 1);
    }, 800);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 right-4 z-50 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full shadow-lg hover:shadow-xl hover:from-red-700 hover:to-red-800 active:scale-95 transition-all flex items-center gap-2 pl-3 pr-4 py-3"
        aria-label="Mentor AI"
      >
        <Bot size={22} />
        <span className="text-sm font-bold">AI</span>
      </button>

      {/* Chat Popup */}
      {isOpen && (
        <div className="fixed bottom-36 right-4 z-50 w-80 bg-white rounded-2xl shadow-2xl border-2 border-blue-950 flex flex-col overflow-hidden" style={{ maxHeight: '420px' }}>
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-blue-950 to-blue-900 text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <span className="font-bold text-sm">Mentor AI</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-blue-800 rounded-lg transition-colors">
              <X size={18} />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2.5" style={{ minHeight: '200px' }}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                <div
                  className={`max-w-[85%] px-3 py-2 rounded-2xl text-xs leading-relaxed ${
                    msg.isBot
                      ? 'bg-gray-100 text-gray-800 rounded-bl-md'
                      : 'bg-red-600 text-white rounded-br-md'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="border-t border-gray-200 p-2.5 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type message..."
              className="flex-1 text-xs px-3 py-2 bg-gray-50 rounded-full border-2 border-blue-950 border-opacity-20 focus:outline-none focus:border-opacity-100"
            />
            <button
              onClick={handleSend}
              className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 active:scale-90 transition-all"
              aria-label="Send message"
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
