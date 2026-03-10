import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { EmployeeDashboard } from './components/EmployeeDashboard';
import { EmployerDashboard } from './components/EmployerDashboard';

const AppContent = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user || !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900 flex items-center justify-center p-4">
        {isLogin ? (
          <Login onToggle={() => setIsLogin(false)} />
        ) : (
          <Signup onToggle={() => setIsLogin(true)} />
        )}
      </div>
    );
  }

  return profile.role === 'employee' ? <EmployeeDashboard /> : <EmployerDashboard />;
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
