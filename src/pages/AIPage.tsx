import React, { useState } from 'react';
import { Send, Bot } from 'lucide-react';

const demoResponses = [
  "Hi! I'm your AI Mentor. Ask me anything about your exam preparation!",
  "For History, focus on the timeline approach - memorize events in chronological order. It helps with both prelims and mains.",
  "Geography tip: Always relate physical features with their economic impact. Map-based questions are scoring!",
  "Polity is all about articles and amendments. Start with Fundamental Rights and DPSP - they cover 60% of polity questions.",
  "Economics can be simplified by understanding basic terms first - GDP, Fiscal Deficit, Inflation. Then move to current data.",
  "Science questions usually come from NCERT. Focus on Biology for one-liners and Physics for conceptual questions.",
  "Current Affairs tip: Make short notes monthly. Focus on appointments, indices, sports, and defense exercises.",
  "For quick revision, use the Notes PDF section and practice MCQs daily. Consistency beats intensity!",
];

export default function AIPage() {
  const [messages, setMessages] = useState<{ text: string; isBot: boolean }[]>([
    { text: "Hello! I'm Mentor AI, your study companion. Ask me anything about exam preparation!", isBot: true },
  ]);
  const [input, setInput] = useState('');
  const [responseIndex, setResponseIndex] = useState(0);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { text: userMsg, isBot: false }]);

    setTimeout(() => {
      const botReply = demoResponses[responseIndex % demoResponses.length];
      setMessages((prev) => [...prev, { text: botReply, isBot: true }]);
      setResponseIndex((prev) => prev + 1);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-gradient-to-r from-blue-950 to-blue-900 text-white sticky top-0 z-40 shadow-md">
        <div className="flex items-center justify-center px-4 h-14">
          <Bot size={22} className="mr-2" />
          <h1 className="text-lg font-bold">Mentor AI</h1>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 pb-24">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
            <div
              className={`max-w-[80%] px-4 py-2.5 text-sm leading-relaxed ${
                msg.isBot
                  ? 'bg-white text-gray-800 rounded-2xl rounded-bl-md shadow-sm border border-gray-200'
                  : 'bg-red-600 text-white rounded-2xl rounded-br-md'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-16 left-0 right-0 bg-white border-t-2 border-blue-950 px-4 py-3 z-30">
        <div className="flex items-center gap-2 max-w-lg mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask Mentor AI anything..."
            className="flex-1 text-sm px-4 py-2.5 bg-gray-50 rounded-full border-2 border-blue-950 border-opacity-20 focus:outline-none focus:border-opacity-100"
          />
          <button
            onClick={handleSend}
            className="p-2.5 bg-red-600 text-white rounded-full hover:bg-red-700 active:scale-90 transition-all shadow-sm"
            aria-label="Send"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
