import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase, LeaveRequestWithEmployee } from '../lib/supabase';
import {
  Calendar,
  LogOut,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  FileText,
  Briefcase,
  User,
} from 'lucide-react';

export const EmployerDashboard = () => {
  const { profile, signOut } = useAuth();
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequestWithEmployee[]>([]);
  const [filter, setFilter] = useState<'all' | 'Pending' | 'Approved' | 'Rejected'>('all');
  const [loading, setLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const fetchLeaveRequests = async () => {
    const { data, error } = await supabase
      .from('leave_requests')
      .select(`
        *,
        employee:profiles!leave_requests_employee_id_fkey(*)
      `)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setLeaveRequests(data as LeaveRequestWithEmployee[]);
    }
  };

  const handleStatusUpdate = async (requestId: string, newStatus: 'Approved' | 'Rejected') => {
    setLoading(requestId);
    try {
      const { error } = await supabase
        .from('leave_requests')
        .update({
          status: newStatus,
          reviewed_by: profile?.id,
          reviewed_at: new Date().toISOString(),
        })
        .eq('id', requestId);

      if (error) throw error;

      fetchLeaveRequests();
    } catch (err) {
      console.error('Error updating status:', err);
    } finally {
      setLoading(null);
    }
  };

  const filteredRequests =
    filter === 'all' ? leaveRequests : leaveRequests.filter((r) => r.status === filter);

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

  const pendingCount = leaveRequests.filter((r) => r.status === 'Pending').length;
  const approvedCount = leaveRequests.filter((r) => r.status === 'Approved').length;
  const rejectedCount = leaveRequests.filter((r) => r.status === 'Rejected').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900">
      <nav className="bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-emerald-400 to-cyan-500 p-2 rounded-lg">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white">LeaveFlow - Employer</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-white">
                <Briefcase className="w-5 h-5" />
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
                <p className="text-3xl font-bold text-white mt-1">{pendingCount}</p>
              </div>
              <Clock className="w-12 h-12 text-yellow-400" />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Approved</p>
                <p className="text-3xl font-bold text-white mt-1">{approvedCount}</p>
              </div>
              <CheckCircle className="w-12 h-12 text-emerald-400" />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Rejected</p>
                <p className="text-3xl font-bold text-white mt-1">{rejectedCount}</p>
              </div>
              <XCircle className="w-12 h-12 text-red-400" />
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Leave Requests</h2>
            <div className="flex gap-2">
              {['all', 'Pending', 'Approved', 'Rejected'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status as typeof filter)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    filter === status
                      ? 'bg-gradient-to-r from-emerald-400 to-cyan-500 text-white'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredRequests.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-300 text-lg">No leave requests found</p>
                <p className="text-gray-400 text-sm mt-2">
                  {filter === 'all'
                    ? 'No employees have submitted leave requests yet'
                    : `No ${filter.toLowerCase()} requests`}
                </p>
              </div>
            ) : (
              filteredRequests.map((request) => (
                <div
                  key={request.id}
                  className="p-6 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-200"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="bg-gradient-to-br from-emerald-400 to-cyan-500 p-2 rounded-lg">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            {request.employee.full_name}
                          </h3>
                          <p className="text-sm text-gray-400">{request.employee.email}</p>
                        </div>
                      </div>
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

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-400">Leave Type</p>
                      <p className="text-white font-medium">{request.leave_type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Start Date</p>
                      <p className="text-white font-medium">
                        {new Date(request.start_date).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">End Date</p>
                      <p className="text-white font-medium">
                        {new Date(request.end_date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-400 mb-1">Reason</p>
                    <p className="text-gray-300">{request.reason}</p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <p className="text-sm text-gray-400">
                      Submitted on {new Date(request.created_at).toLocaleDateString()}
                    </p>
                    {request.status === 'Pending' && (
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleStatusUpdate(request.id, 'Approved')}
                          disabled={loading === request.id}
                          className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 rounded-lg transition-all duration-200 border border-emerald-500/50 disabled:opacity-50"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(request.id, 'Rejected')}
                          disabled={loading === request.id}
                          className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-all duration-200 border border-red-500/50 disabled:opacity-50"
                        >
                          <XCircle className="w-4 h-4" />
                          Reject
                        </button>
                      </div>
                    )}
                    {request.status !== 'Pending' && request.reviewed_at && (
                      <p className="text-sm text-gray-400">
                        Reviewed on {new Date(request.reviewed_at).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
