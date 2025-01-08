import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Loader2 } from 'lucide-react';
import { Sidebar } from './components/sidebar';
import { FileUpload } from './components/file-upload';
import { LogsViewer } from './components/logs-viewer';
import { Settings } from './components/settings';
import { Login } from './components/auth/login';
import { Auth0ProviderWithNavigate } from './auth/auth0-provider';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <Routes>
          <Route path="/upload" element={<FileUpload />} />
          <Route path="/knowledge-base" element={
            <div className="p-6">
              <h2 className="mb-6 text-2xl font-bold">Knowledge Base</h2>
              <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                Build Knowledge Base
              </button>
            </div>
          } />
          <Route path="/logs" element={<LogsViewer />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/" element={<Navigate to="/upload" replace />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Auth0ProviderWithNavigate>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Auth0ProviderWithNavigate>
    </Router>
  );
}

export default App;