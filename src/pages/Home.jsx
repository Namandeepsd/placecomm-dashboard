import React from 'react';
import { Bell, Calendar, Briefcase, CheckCircle, Clock, TrendingUp, Target, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {

  const recentActivity = [
    { id: 1, company: 'Tech Corp Inc', action: 'released job description', time: '2h ago', type: 'jd' },
    { id: 2, company: 'Innovation Labs', action: 'shortlisted you', time: '5h ago', type: 'shortlist' },
    { id: 3, company: 'Cloud Systems', action: 'application deadline tomorrow', time: '1d ago', type: 'deadline' },
  ];

  const upcoming = [
    { company: 'Data Dynamics', date: 'Feb 18', role: 'Software Engineer' },
    { company: 'NextGen AI', date: 'Feb 20', role: 'ML Intern' },
    { company: 'FinStack', date: 'Feb 22', role: 'Backend Developer' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">

      <div className="max-w-7xl mx-auto px-5 py-12">

        {/* Page Title */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Welcome Back!
          </h1>
          <p className="text-base text-slate-600">
            Track your placement activity and upcoming opportunities
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">

          <div className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 hover:border-blue-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-2">New Updates</p>
                <p className="text-3xl font-bold text-slate-900">4</p>
                <p className="text-xs text-green-600 mt-3 font-medium">+1 this week</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Bell className="text-blue-600" size={24}/>
              </div>
            </div>
          </div>

          <div className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 hover:border-purple-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-2">Applications</p>
                <p className="text-3xl font-bold text-slate-900">12</p>
                <p className="text-xs text-green-600 mt-3 font-medium">+3 this month</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Briefcase className="text-purple-600" size={24}/>
              </div>
            </div>
          </div>

          <div className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 hover:border-green-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-2">Shortlisted</p>
                <p className="text-3xl font-bold text-slate-900">2</p>
                <p className="text-xs text-green-600 mt-3 font-medium">16.7% success rate</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                <CheckCircle className="text-green-600" size={24}/>
              </div>
            </div>
          </div>

        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Activity Feed */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100">

            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-bold text-slate-900 text-lg">Recent Activity</h2>
              <Link to="/notifications" className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline transition">
                View all →
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {recentActivity.map((item, idx) => (
                <div key={item.id} className="px-6 py-5 flex items-center gap-4 hover:bg-slate-50 transition-colors group">

                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0
                    ${item.type === 'shortlist'
                      ? 'bg-green-100 text-green-700'
                      : item.type === 'deadline'
                      ? 'bg-orange-100 text-orange-700'
                      : 'bg-blue-100 text-blue-700'
                    }`}>
                    {item.type === 'shortlist' ? <CheckCircle size={20}/> :
                     item.type === 'deadline' ? <Clock size={20}/> :
                     <Briefcase size={20}/>}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-900">
                      <span className="font-semibold">{item.company}</span>{' '}
                      <span className="text-slate-600">{item.action}</span>
                    </p>
                    <p className="text-xs text-slate-500 mt-1">{item.time}</p>
                  </div>
                  
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-slate-400 hover:text-slate-600 p-2 rounded-lg hover:bg-slate-200">
                      →
                    </button>
                  </div>

                </div>
              ))}
            </div>

          </div>

          {/* Upcoming Deadlines */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col">

            <div className="px-6 py-5 border-b border-slate-100">
              <h2 className="font-bold text-slate-900 text-lg">Upcoming Deadlines</h2>
            </div>

            <div className="divide-y divide-slate-100 flex-1">
              {upcoming.map((job, index) => (
                <div key={index} className="px-6 py-5 hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent transition-colors group cursor-pointer">

                  <div className="flex items-start justify-between mb-2">
                    <p className="font-semibold text-slate-900 group-hover:text-blue-700 transition">
                      {job.company}
                    </p>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
                      <Calendar size={12}/>
                      {job.date}
                    </span>
                  </div>

                  <p className="text-sm text-slate-500 group-hover:text-slate-600 transition">
                    {job.role}
                  </p>

                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;
