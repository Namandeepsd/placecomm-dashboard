import React, { useState } from 'react';
import { Trash2, Check, Calendar, Briefcase, Search, X } from 'lucide-react';

const NotificationPanel = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, companyName: 'Tech Corp Inc', threadId: 'THR-001', category: 'JD', timestamp: '2h', status: 'pending' },
    { id: 2, companyName: 'Innovation Labs', threadId: 'THR-002', category: 'Shortlisted', timestamp: '5h', status: 'pending' },
    { id: 3, companyName: 'Digital Solutions', threadId: 'THR-003', category: 'JD', timestamp: '1d', status: 'pending' },
    { id: 4, companyName: 'Cloud Systems', threadId: 'THR-004', category: 'Shortlisted', timestamp: '2d', status: 'pending' },
    { id: 5, companyName: 'Data Dynamics', threadId: 'THR-005', category: 'JD', timestamp: '3d', status: 'pending' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const handleConfirm = (id) => {
    setNotifications(n =>
      n.map(item => item.id === id ? { ...item, status: 'confirmed' } : item)
    );
  };

  const handleDelete = (id) => {
    setNotifications(n => n.filter(item => item.id !== id));
  };

  const filtered = notifications.filter(n =>
    n.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    n.threadId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pendingCount = notifications.filter(n => n.status === 'pending').length;

  const categoryIcon = (category) =>
    category === 'JD'
      ? <Briefcase size={18} />
      : <Check size={18} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">

      {/* Page Header */}
      <div className="max-w-5xl mx-auto px-5 pt-12 pb-6">

        <div className="flex items-start justify-between mb-8 gap-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Notifications
            </h1>
            <p className="text-base text-slate-600 flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-orange-100 text-orange-700 text-sm font-bold">
                {pendingCount}
              </span>
              pending updates
            </p>
          </div>

          {/* Search */}
          <div className="w-full max-w-sm">
            <div className="relative group">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition"/>
              <input
                type="text"
                placeholder="Search company or ID..."
                value={searchTerm}
                onChange={(e)=>setSearchTerm(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
        </div>

        {/* Notification List */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">

          {filtered.length === 0 && (
            <div className="py-24 text-center">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                <Search size={24} className="text-slate-400" />
              </div>
              <p className="text-slate-600 font-medium">No notifications found</p>
              <p className="text-slate-500 text-sm mt-1">Try adjusting your search terms</p>
            </div>
          )}

          <div className="divide-y divide-slate-100">
            {filtered.map((n, index) => (
              <div
                key={n.id}
                className="group flex items-center justify-between px-6 py-5 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-transparent transition-all"
              >
                {/* Left side */}
                <div className="flex items-center gap-4 min-w-0 flex-1">

                  {/* Icon */}
                  <div className={`w-11 h-11 flex items-center justify-center rounded-lg flex-shrink-0
                    ${n.category === 'JD'
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-green-100 text-green-600'}`}>
                    {categoryIcon(n.category)}
                  </div>

                  {/* Text Content */}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-slate-900">
                      {n.companyName}
                    </p>

                    <div className="flex items-center gap-3 text-xs text-slate-500 mt-1.5">
                      <span className="font-mono bg-slate-100 px-2 py-1 rounded">{n.threadId}</span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 rounded-full">
                        {n.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={12}/>
                        {n.timestamp}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right side */}
                <div className="flex items-center gap-3 ml-4">

                  {/* Status Badge */}
                  <span className={`text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap
                    ${n.status === 'confirmed'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-orange-100 text-orange-700'}`}>
                    {n.status === 'confirmed' ? '✓ Confirmed' : 'Pending'}
                  </span>

                  {/* Actions */}
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {n.status === 'pending' && (
                      <button
                        onClick={()=>handleConfirm(n.id)}
                        className="p-2 rounded-lg hover:bg-green-100 text-green-600 transition-all duration-200 hover:scale-110"
                        title="Confirm"
                      >
                        <Check size={18}/>
                      </button>
                    )}

                    <button
                      onClick={()=>handleDelete(n.id)}
                      className="p-2 rounded-lg hover:bg-red-100 text-red-600 transition-all duration-200 hover:scale-110"
                      title="Delete"
                    >
                      <Trash2 size={18}/>
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default NotificationPanel;
