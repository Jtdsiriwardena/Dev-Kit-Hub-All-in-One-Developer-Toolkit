'use client';

import { useEffect, useState } from 'react';
import { Clock, RefreshCcw } from 'lucide-react';

export type ApiHistoryItem = {
  _id: string;
  url: string;
  method: string;
  headers: Record<string, string>;
  body: any;
  status?: number;
  createdAt: string;
};

interface ApiHistoryProps {
  token: string;
  onSelect: (item: ApiHistoryItem) => void;
}

export default function ApiHistory({ token, onSelect }: ApiHistoryProps) {
  const [history, setHistory] = useState<ApiHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api-tests/recent`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await res.json();
      setHistory(data);
    } catch (err) {
      console.error('Failed to load API history', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-slate-400 text-sm text-center">
        Loading API history...
      </div>
    );
  }

  if (!history.length) {
    return (
      <div className="text-slate-500 text-sm text-center">
        No recent API tests
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-300">
        <Clock className="w-4 h-4 text-cyan-400" />
        Recent APIs
      </h3>

      <div className="space-y-2 max-h-100 overflow-auto pr-1">
        {history.map((item) => (
          <button
            key={item._id}
            onClick={() => onSelect(item)}
            className="w-full text-left p-3 rounded-lg bg-slate-800/40 border border-slate-700/50 hover:bg-slate-700/40 transition"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-cyan-400">
                {item.method}
              </span>
              {item.status && (
                <span
                  className={`text-xs font-semibold ${
                    item.status >= 200 && item.status < 300
                      ? 'text-emerald-400'
                      : 'text-red-400'
                  }`}
                >
                  {item.status}
                </span>
              )}
            </div>

            <div className="mt-1 text-sm text-slate-200 truncate">
              {item.url}
            </div>

            <div className="mt-2 flex items-center gap-1 text-xs text-slate-400">
              <RefreshCcw className="w-3 h-3" />
              Click to reload
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
