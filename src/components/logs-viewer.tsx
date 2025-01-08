import React from 'react';

export function LogsViewer() {
  return (
    <div className="p-6">
      <h2 className="mb-6 text-2xl font-bold">Logs</h2>
      <div className="h-[calc(100vh-12rem)] rounded-lg bg-gray-900 p-4">
        <pre className="h-full overflow-auto font-mono text-sm text-gray-300">
          {/* TODO: Implement real-time log streaming */}
          System initialized...
          Loading configuration...
          Ready to process files.
        </pre>
      </div>
    </div>
  );
}