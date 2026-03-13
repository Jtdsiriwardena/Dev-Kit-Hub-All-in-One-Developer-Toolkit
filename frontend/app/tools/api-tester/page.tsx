'use client';

import { useState, useEffect } from 'react';
import { Globe, Play, RotateCcw, AlertCircle, List, Eye, EyeOff, Sparkles } from 'lucide-react';
import Sidebar from './../../../components/Layout/Sidebar';
import ApiHistory, { ApiHistoryItem } from './api_history';
import { useAuth } from '@/context/AuthContext';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export default function APITester() {
  const { token } = useAuth();

  // Form states
  const [url, setUrl] = useState('');
  const [method, setMethod] = useState<HttpMethod>('GET');
  const [headers, setHeaders] = useState('{}');
  const [body, setBody] = useState('');

  // Response states
  const [response, setResponse] = useState<string | null>(null);
  const [status, setStatus] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(true);

  // Recent API history
  const [recentHistory, setRecentHistory] = useState<ApiHistoryItem[]>([]);

  // ---------------- Helper Functions ----------------

  const handleLoadSample = () => {
    setUrl('https://jsonplaceholder.typicode.com/posts');
    setMethod('GET');
    setHeaders('{}');
    setBody('');
    setResponse(null);
    setStatus(null);
    setError(null);
  };

  const handleClear = () => {
    setUrl('');
    setMethod('GET');
    setHeaders('{}');
    setBody('');
    setResponse(null);
    setStatus(null);
    setError(null);
  };

  const handleSelectHistory = (item: ApiHistoryItem) => {
    setUrl(item.url);
    setMethod(item.method as HttpMethod);
    setHeaders(JSON.stringify(item.headers || {}, null, 2));
    setBody(item.body ? JSON.stringify(item.body, null, 2) : '');
  };

  const fetchRecentHistory = async () => {
    if (!token) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api-tests/recent`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setRecentHistory(data);
    } catch (err) {
      console.error('Failed to fetch recent APIs', err);
    }
  };

  useEffect(() => {
    fetchRecentHistory();
  }, [token]);

  // ---------------- Send API Request ----------------

  const handleSend = async () => {
    if (!token) {
      setError('You must be logged in to test APIs.');
      return;
    }

    setLoading(true);
    setError(null);
    setResponse(null);
    setStatus(null);

    // Parse headers
    let parsedHeaders: Record<string, string> = {};
    try {
      parsedHeaders = JSON.parse(headers);
    } catch {
      setError('Headers must be valid JSON.');
      setLoading(false);
      return;
    }

    // Parse body if method != GET
    let parsedBody: Record<string, unknown> | null = null;
    if (method !== 'GET' && body.trim()) {
      try {
        parsedBody = JSON.parse(body);
      } catch {
        setError('Body must be valid JSON.');
        setLoading(false);
        return;
      }
    }

    try {
      // Send API request
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', ...parsedHeaders },
        body: method === 'GET' ? undefined : JSON.stringify(parsedBody),
      });

      const text = await res.text();
      setStatus(res.status);

      try {
        const json = JSON.parse(text);
        setResponse(JSON.stringify(json, null, 2));
      } catch {
        setResponse(text);
      }

      // Save API test to backend
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api-tests`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            url,
            method,
            headers: parsedHeaders,
            body: parsedBody,
            status: res.status,
            responseSnippet: text.slice(0, 500),
          }),
        });

        // Refresh history
        fetchRecentHistory();
      } catch (err) {
        console.error('Failed to save API test', err);
      }
    } catch {
      setError('Network error or invalid URL.');
    } finally {
      setLoading(false);
    }
  };

  const urlLength = url.length;
  let headersCount = 0;
  try {
    headersCount = Object.keys(JSON.parse(headers)).length;
  } catch {}
  const responseStatus = status !== null ? status : 'N/A';


  return (
    <div className="flex min-h-screen bg-slate-900 text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-linear-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/25">
                <Globe className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white bg-linear-to-r from-cyan-400 to-blue-300 bg-clip-text">
                  API Tester
                </h1>
                <p className="text-slate-400 mt-1">Test API endpoints quickly</p>
              </div>
            </div>

            <button
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg border border-slate-700/50 text-slate-300 hover:text-white transition-all duration-200"
            >
              {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {showPreview ? 'Hide Preview' : 'Show Preview'}
            </button>
          </div>

          {/* Metrics */}
          <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Metric label="HTTP Method" value={method} />
            <Metric label="URL Length" value={urlLength} />
            <Metric label="Headers Count" value={headersCount} />
            <Metric
              label="Response Status"
              value={responseStatus}
              highlight={status !== null && status >= 200 && status < 300}
            />
          </div>

          {/* API form + Response + History */}
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
            {/* Input Form */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-white mb-4 flex items-center gap-2">API Configuration</h3>
                  <button
                    onClick={handleLoadSample}
                    className="px-3 py-1.5 text-xs bg-slate-700/50 hover:bg-slate-600/50 rounded-lg text-slate-300 hover:text-white transition-all duration-200 border border-slate-600/50"
                  >
                    Load Sample
                  </button>
                </div>

                <LabelInput label="URL" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://api.example.com/data" />
                <LabelSelect label="Method" value={method} onChange={(e) => setMethod(e.target.value as HttpMethod)} options={['GET','POST','PUT','DELETE','PATCH']} />
                <LabelTextarea label="Headers (JSON)" value={headers} onChange={(e) => setHeaders(e.target.value)} placeholder='{"Authorization": "Bearer TOKEN"}' rows={7} />
                {method !== 'GET' && <LabelTextarea label="Body (JSON)" value={body} onChange={(e) => setBody(e.target.value)} placeholder='{"key": "value"}' rows={10} />}

                {error && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-400" />
                    <span className="text-red-300">{error}</span>
                  </div>
                )}

                <div className="flex gap-4 mt-4">
                  <button
                    onClick={handleSend}
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg disabled:opacity-60"
                  >
                    <Play className="w-4 h-4" /> {loading ? 'Sending...' : 'Send Request'}
                  </button>
                  <button
                    onClick={handleClear}
                    className="flex items-center gap-2 px-6 py-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-400 font-semibold"
                  >
                    <RotateCcw className="w-4 h-4" /> Clear All
                  </button>
                </div>
              </div>
            </div>

            {/* Response + Recent History */}
            {showPreview && (
              <div className="flex flex-col gap-6">
                {/* Response */}
                <div className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50 flex flex-col">
                  <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                    <List className="w-4 h-4 text-cyan-400" /> Response
                  </h3>
                  <div className="flex-1 overflow-auto">
                    {!response && !error && <div className="text-slate-400 text-center select-none">Send request to see response</div>}
                    {response && <pre className="whitespace-pre-wrap font-mono text-white text-sm">{response}</pre>}
                    {error && <div className="text-red-400 font-semibold text-center">{error}</div>}
                    {status !== null && <div className="mt-4 text-cyan-400 font-semibold text-center">Status: {status}</div>}
                  </div>
                </div>

                {/* Recent API History */}
                <div className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50">
                  <ApiHistory
                    token={token || ''}
                    onSelect={handleSelectHistory}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Pro Tips */}
          <div className="mt-10 bg-slate-800/30 p-6 rounded-xl border border-slate-700/50">
            <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-400" /> Pro Tips
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-300">
              <ProTip color="orange">Use correct HTTP methods based on the API documentation.</ProTip>
              <ProTip color="purple">Validate headers and request body format before sending.</ProTip>
              <ProTip color="emerald">Pay attention to response status codes for debugging issues.</ProTip>
              <ProTip color="pink">Test both successful and failed requests for better coverage.</ProTip>
              <ProTip color="blue">Use sample APIs like JSONPlaceholder for safe testing during development.</ProTip>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


// -------------------- Helper Components --------------------
interface MetricProps {
  label: string;
  value: string | number;
  highlight?: boolean;
}
function Metric({ label, value, highlight }: MetricProps) {
  return (
    <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-700/50 flex flex-col items-center">
      <div className="text-sm text-slate-400">{label}</div>
      <div className={`text-xl font-semibold ${highlight ? 'text-emerald-400' : 'text-white'}`}>{value}</div>
    </div>
  );
}

interface LabelInputProps {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
function LabelInput({ label, value, placeholder, onChange }: LabelInputProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm text-slate-300 mb-2">{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg px-3 py-2 text-white font-mono focus:outline-none"
      />
    </div>
  );
}

interface LabelSelectProps {
  label: string;
  options: string[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

function LabelSelect({ label, options, value, onChange }: LabelSelectProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm text-slate-300 mb-2">{label}</label>
      <select
        value={value}
        onChange={onChange}
        className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg px-3 py-2 text-white font-mono focus:outline-none"
      >
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

interface LabelTextareaProps {
  label: string;
  value: string;
  placeholder?: string;
  rows?: number;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
function LabelTextarea({ label, value, placeholder, rows = 5, onChange }: LabelTextareaProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm text-slate-300 mb-2">{label}</label>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg px-3 py-2 text-white font-mono resize-none focus:outline-none"
      />
    </div>
  );
}

interface ProTipProps {
  color: string;
  children: React.ReactNode;
}
function ProTip({ color, children }: ProTipProps) {
  return (
    <div className="flex gap-2 items-start">
      <div className={`w-2 h-2 rounded-full mt-2 bg-${color}-400`}></div>
      <span>{children}</span>
    </div>
  );
}
