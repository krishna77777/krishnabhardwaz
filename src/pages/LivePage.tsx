import React from 'react';

const liveSessions = [
  {
    title: "History - Freedom Movement",
    subject: "History",
    time: "7:00 PM Today",
    status: "upcoming",
  },
  {
    title: "Geography - Indian Rivers",
    subject: "Geography",
    time: "5:00 PM Tomorrow",
    status: "upcoming",
  },
  {
    title: "Polity - Constitution Basics",
    subject: "Polity",
    time: "Completed",
    status: "completed",
  },
];

export default function LivePage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-gradient-to-r from-blue-950 to-blue-900 text-white sticky top-0 z-40 shadow-md">
        <div className="flex items-center justify-center px-4 h-14">
          <h1 className="text-lg font-bold">Live Classes</h1>
        </div>
      </header>
      <div className="px-4 py-5">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Sessions</h3>
        <div className="space-y-3">
          {liveSessions.map((session, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 text-sm">{session.title}</h4>
                  <p className="text-xs text-gray-500 mt-1">{session.subject}</p>
                </div>
                <span
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                    session.status === 'upcoming'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {session.status === 'upcoming' ? 'LIVE SOON' : 'DONE'}
                </span>
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-gray-400">{session.time}</span>
                {session.status === 'upcoming' && (
                  <button className="text-xs font-semibold text-red-600 bg-red-50 px-3 py-1.5 rounded-full hover:bg-red-100 transition-colors">
                    Set Reminder
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
