import { NavLink } from 'react-router-dom';
import { Upload, Database, Settings, FileText, LogOut } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';
import { cn } from '../lib/utils';

const navItems = [
  { icon: Upload, label: 'Upload Files', path: '/upload' },
  { icon: Database, label: 'Knowledge Base', path: '/knowledge-base' },
  { icon: FileText, label: 'Logs', path: '/logs' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export function Sidebar() {
  const { logout, user } = useAuth0();

  return (
    <div className="flex h-screen w-64 flex-col bg-gray-900 text-white">
      <div className="flex h-16 items-center justify-between px-6">
        <h1 className="text-xl font-bold">AIFAQ Dashboard</h1>
      </div>
      <div className="flex items-center space-x-3 border-b border-gray-800 px-6 pb-4">
        <div className="h-8 w-8 rounded-full bg-gray-800">
          {user?.picture ? (
            <img
              src={user.picture}
              alt={user.name}
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-full bg-blue-600 text-sm font-medium">
              {user?.name?.[0] || user?.email?.[0] || '?'}
            </div>
          )}
        </div>
        <div className="flex-1 overflow-hidden">
          <p className="truncate text-sm font-medium">{user?.name || user?.email}</p>
        </div>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map(({ icon: Icon, label, path }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              cn(
                'flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium',
                {
                  'bg-gray-800 text-white': isActive,
                  'text-gray-400 hover:bg-gray-800 hover:text-white': !isActive,
                }
              )
            }
          >
            <Icon className="h-5 w-5" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-gray-800 p-4">
        <button
          onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
          className="flex w-full items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-white"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}