import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Eye, EyeOff, Trash2 } from 'lucide-react';

interface ApiKeyData {
  key: string;
  savedAt: string;
}

export function Settings() {
  const [apiKey, setApiKey] = useState('');
  const [savedApiKey, setSavedApiKey] = useState<ApiKeyData | null>(null);
  const [showApiKey, setShowApiKey] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Load saved API key on component mount
    const savedData = localStorage.getItem('mistralApiKey');
    if (savedData) {
      setSavedApiKey(JSON.parse(savedData));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const response = await fetch('http://localhost:8000/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mistralApiKey: apiKey }),
      });

      if (response.ok) {
        const newApiKeyData: ApiKeyData = {
          key: apiKey,
          savedAt: new Date().toISOString(),
        };
        localStorage.setItem('mistralApiKey', JSON.stringify(newApiKeyData));
        setSavedApiKey(newApiKeyData);
        setApiKey('');
      }
    } catch (error) {
      console.error('Failed to save API key:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch('http://localhost:8000/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mistralApiKey: null }),
      });

      if (response.ok) {
        localStorage.removeItem('mistralApiKey');
        setSavedApiKey(null);
      }
    } catch (error) {
      console.error('Failed to delete API key:', error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="mb-6 text-2xl font-bold">Settings</h2>
      <div className="max-w-2xl space-y-8 rounded-lg border border-gray-200 p-6">
        {savedApiKey && (
          <div className="rounded-lg bg-gray-50 p-4">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-medium text-gray-900">Current API Key</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="text-gray-500 hover:text-gray-700"
                  aria-label={showApiKey ? "Hide API key" : "Show API key"}
                >
                  {showApiKey ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                <button
                  onClick={handleDelete}
                  className="text-red-500 hover:text-red-700"
                  aria-label="Delete API key"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <p className="mb-2 font-mono text-sm">
              {showApiKey ? savedApiKey.key : '••••••••••••••••'}
            </p>
            <p className="text-xs text-gray-500">
              Saved on: {new Date(savedApiKey.savedAt).toLocaleString()}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="apiKey"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              {savedApiKey ? 'Update Mistral AI API Key' : 'Add Mistral AI API Key'}
            </label>
            <input
              type="password"
              id="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter your API key"
            />
          </div>
          <Button type="submit" disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save API Key'}
          </Button>
        </form>
      </div>
    </div>
  );
}