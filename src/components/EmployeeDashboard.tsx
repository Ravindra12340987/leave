import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase, LeaveRequest } from '../lib/supabase';
import {
  Calendar,
  FileText,
  LogOut,
  Plus,
  Clock,
  CheckCircle,
  XCircle,
  User,
} from 'lucide-react';

export const EmployeeDashboard = () => {
  const { profile, signOut } = useAuth();
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    leave_type: 'Sick Leave',
    start_date: '',
    end_date: '',
    reason: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const fetchLeaveRequests = async () => {
    const { data, error } = await supabase
      .from('leave_requests')
      .select('*')
      .eq('employee_id', profile?.id)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setLeaveRequests(data);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.leave_type || !formData.start_date || !formData.end_date || !formData.reason) {
      setError('Please fill in all fields');
      return;
    }

    if (new Date(formData.start_date) > new Date(formData.end_date)) {
      setError('End date must be after start date');
      return;
    }

    setLoading(true);
    try {
      const { error: insertError } = await supabase.from('leave_requests').insert({
        employee_id: profile?.id,
        leave_type: formData.leave_type,
        start_date: formData.start_date,
        end_date: formData.end_date,
        reason: formData.reason,
      });

      if (insertError) throw insertError;

      setSuccess('Leave request submitted successfully!');
      setFormData({
        leave_type: 'Sick Leave',
        start_date: '',
        end_date: '',
        reason: '',
      });
      setShowForm(false);
      fetchLeaveRequests();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit leave request');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'text-emerald-400 bg-emerald-400/20 border-emerald-400/50';
      case 'Rejected':
        return 'text-red-400 bg-red-400/20 border-red-400/50';
      default:
        return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved':
        return <CheckCircle className="w-4 h-4" />;
      case 'Rejected':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900">
      <nav className="bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-emerald-400 to-cyan-500 p-2 rounded-lg">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white">LeaveFlow</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-white">
                <User className="w-5 h-5" />
                <span className="font-medium">{profile?.full_name}</span>
              </div>
              <button
                onClick={signOut}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-all duration-200 border border-red-500/50"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {success && (
          <div className="mb-6 p-4 bg-emerald-500/20 border border-emerald-500/50 rounded-lg text-emerald-200">
            {success}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Total Requests</p>
                <p className="text-3xl font-bold text-white mt-1">{leaveRequests.length}</p>
              </div>
              <FileText className="w-12 h-12 text-cyan-400" />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Pending</p>
                <p className="text-3xl font-bold text-white mt-1">
                  {leaveRequests.filter((r) => r.status === 'Pending').length}
                </p>
              </div>
              <Clock className="w-12 h-12 text-yellow-400" />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Approved</p>
                <p className="text-3xl font-bold text-white mt-1">
                  {leaveRequests.filter((r) => r.status === 'Approved').length}
                </p>
              </div>
              <CheckCircle className="w-12 h-12 text-emerald-400" />
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">My Leave Requests</h2>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-400 to-cyan-500 text-white rounded-lg font-semibold hover:from-emerald-500 hover:to-cyan-600 transition-all duration-200 shadow-lg"
            >
              <Plus className="w-5 h-5" />
              New Request
            </button>
          </div>

          {showForm && (
            <form onSubmit={handleSubmit} className="mb-6 p-6 bg-white/5 rounded-lg border border-white/20">
              {error && (
                <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Leave Type
                  </label>
                  <select
                    value={formData.leave_type}
                    onChange={(e) => setFormData({ ...formData, leave_type: e.target.value })}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 text-white"
                  >
                    <option value="Sick Leave" className="bg-slate-800">Sick Leave</option>
                    <option value="Casual Leave" className="bg-slate-800">Casual Leave</option>
                    <option value="Vacation" className="bg-slate-800">Vacation</option>
                    <option value="Personal" className="bg-slate-800">Personal</option>
                    <option value="Emergency" className="bg-slate-800">Emergency</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={formData.end_date}
                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 text-white"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Reason
                  </label>
                  <textarea
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 text-white placeholder-gray-400"
                    placeholder="Please provide a reason for your leave request..."
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-gradient-to-r from-emerald-400 to-cyan-500 text-white rounded-lg font-semibold hover:from-emerald-500 hover:to-cyan-600 transition-all duration-200 disabled:opacity-50"
                >
                  {loading ? 'Submitting...' : 'Submit Request'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          <div className="space-y-4">
            {leaveRequests.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-300 text-lg">No leave requests yet</p>
                <p className="text-gray-400 text-sm mt-2">Click "New Request" to apply for leave</p>
              </div>
            ) : (
              leaveRequests.map((request) => (
                <div
                  key={request.id}
                  className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-200"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{request.leave_type}</h3>
                      <p className="text-sm text-gray-300 mt-1">
                        {new Date(request.start_date).toLocaleDateString()} -{' '}
                        {new Date(request.end_date).toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium border flex items-center gap-1 ${getStatusColor(
                        request.status
                      )}`}
                    >
                      {getStatusIcon(request.status)}
                      {request.status}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm">{request.reason}</p>
                  <p className="text-gray-400 text-xs mt-2">
                    Submitted on {new Date(request.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
