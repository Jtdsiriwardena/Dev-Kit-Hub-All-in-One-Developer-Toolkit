'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Globe,
  Code,
  Key,
  Hash,
  TestTube,
  Eye,
  Shield,
  Palette,
  Clock,
  Lock,
  Link as LinkIcon,
  LucideIcon,
  ChevronRight
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Tool {
  name: string;
  path: string;
  icon: LucideIcon;
}

const tools: Tool[] = [
  { name: 'JSON Beautifier', path: '/tools/json-beautifier', icon: Code },
  { name: 'UUID Generator', path: '/tools/uuid-generator', icon: Key },
  { name: 'Slug Generator', path: '/tools/slug-generator', icon: Hash },
  { name: 'Regex Tester', path: '/tools/regex-tester', icon: TestTube },
  { name: 'API Tester', path: '/tools/api-tester', icon: Globe },
  { name: 'Base64 Encoder/Decoder', path: '/tools/base64-encoder-decoder', icon: Eye },
  { name: 'JWT Decoder', path: '/tools/jwt-decoder', icon: Shield },
  { name: 'Color Converter', path: '/tools/color-converter', icon: Palette },
  { name: 'Timestamp Converter', path: '/tools/timestamp-converter', icon: Clock },
  { name: 'Password Generator', path: '/tools/password-generator', icon: Lock },
  { name: 'Hash Generator', path: '/tools/hash-generator', icon: Lock },
  { name: 'URL Encoder/Decoder', path: '/tools/url-encoder-decoder', icon: LinkIcon },
];

export default function Sidebar() {
  const pathname = usePathname();
   const router = useRouter();

  return (
    <aside className="fixed left-0 top-0 w-72 h-screen bg-linear-to-b from-slate-900 via-slate-900 to-slate-950 border-r border-slate-800/50 flex flex-col overflow-hidden z-40">
      <div className="p-6 border-b border-slate-800/50 bg-slate-900/50 backdrop-blur-sm">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => router.push('/')}
        >
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Code className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              DEV KIT HUB
            </h1>
            <p className="text-xs text-slate-400">Developer Utilities</p>
          </div>
        </div>
      </div>

      {/* Scrollable Tools List */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        {/* All Tools Section */}
        <div>
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-2">
            All Tools
          </h2>
          <nav className="space-y-1">
            {tools.map((tool) => {
              const Icon = tool.icon;
              const isActive = pathname === tool.path;

              return (
                <Link
                  key={tool.path}
                  href={tool.path}
                  className={`
                    group relative flex items-center gap-3 px-3 py-2.5 rounded-lg
                    transition-all duration-200 ease-out
                    ${isActive
                      ? 'bg-linear-to-r from-blue-500/20 to-purple-500/20 text-white shadow-lg shadow-blue-500/10'
                      : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
                    }
                  `}
                >
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-linear-to-b from-blue-500 to-purple-500 rounded-r-full" />
                  )}

                  <div className={`
                    p-2 rounded-lg transition-colors
                    ${isActive
                      ? 'bg-linear-to-br from-blue-500 to-purple-600 shadow-md'
                      : 'bg-slate-800/50 group-hover:bg-slate-700/50'
                    }
                  `}>
                    <Icon className="w-4 h-4" />
                  </div>

                  <span className="flex-1 text-sm font-medium">
                    {tool.name}
                  </span>

                  <ChevronRight className={`
                    w-4 h-4 transition-transform duration-200
                    ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-1 group-hover:opacity-50 group-hover:translate-x-0'}
                  `} />
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

    </aside>
  );
}