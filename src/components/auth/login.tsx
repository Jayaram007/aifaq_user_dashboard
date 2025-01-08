import { useAuth0 } from '@auth0/auth0-react';
import { Loader2 } from 'lucide-react';

export function Login() {
  const { loginWithRedirect, isLoading } = useAuth0();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-2xl font-bold">Welcome to AIFAQ Dashboard</h1>
        <button
          onClick={() => loginWithRedirect()}
          disabled={isLoading}
          className="flex w-full items-center justify-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            'Login to continue'
          )}
        </button>
      </div>
    </div>
  );
}