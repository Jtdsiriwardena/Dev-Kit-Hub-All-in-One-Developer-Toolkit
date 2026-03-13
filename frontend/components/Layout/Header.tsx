'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, Bell, Settings, Moon, Sun, Command, GitBranch, Activity, 
  Sparkles, LogIn, Code, Key, Hash, TestTube, Globe, Eye, Shield, 
  Palette, Clock, Lock, Link as LinkIcon 
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

// Tool type
interface Tool {
  name: string;
  path: string;
  icon: any;
  description: string;
  color: string;
  bgGradient: string;
  category: string;
  popular: boolean;
}

// Tools data
const tools: Tool[] = [
  {
    name: 'JSON Beautifier',
    path: '/tools/json-beautifier',
    icon: Code,
    description: 'Format, validate and beautify your JSON data with syntax highlighting',
    color: 'from-emerald-500 to-teal-600',
    bgGradient: 'from-emerald-500/10 to-teal-600/10',
    category: 'Data Processing',
    popular: true
  },
  {
    name: 'UUID Generator',
    path: '/tools/uuid-generator',
    icon: Key,
    description: 'Generate RFC-compliant unique identifiers for your applications',
    color: 'from-blue-500 to-indigo-600',
    bgGradient: 'from-blue-500/10 to-indigo-600/10',
    category: 'Generators',
    popular: false
  },
  {
    name: 'Slug Generator',
    path: '/tools/slug-generator',
    icon: Hash,
    description: 'Create SEO-friendly URL slugs from any text with customizable options',
    color: 'from-purple-500 to-violet-600',
    bgGradient: 'from-purple-500/10 to-violet-600/10',
    category: 'URL Tools',
    popular: true
  },
  {
    name: 'Regex Tester',
    path: '/tools/regex-tester',
    icon: TestTube,
    description: 'Test and debug regular expressions with real-time matching',
    color: 'from-orange-500 to-red-600',
    bgGradient: 'from-orange-500/10 to-red-600/10',
    category: 'Testing',
    popular: false
  },
  {
    name: 'API Tester',
    path: '/tools/api-tester',
    icon: Globe,
    description: 'Test REST API endpoints with custom headers and payloads',
    color: 'from-cyan-500 to-blue-600',
    bgGradient: 'from-cyan-500/10 to-blue-600/10',
    category: 'Testing',
    popular: true
  },
  {
    name: 'Base64 Encoder/Decoder',
    path: '/tools/base64-encoder-decoder',
    icon: Eye,
    description: 'Encode and decode Base64 strings with file support',
    color: 'from-pink-500 to-rose-600',
    bgGradient: 'from-pink-500/10 to-rose-600/10',
    category: 'Encoding',
    popular: false
  },
  {
    name: 'JWT Decoder',
    path: '/tools/jwt-decoder',
    icon: Shield,
    description: 'Decode and validate JSON Web Tokens with detailed information',
    color: 'from-amber-500 to-orange-600',
    bgGradient: 'from-amber-500/10 to-orange-600/10',
    category: 'Security',
    popular: true
  },
  {
    name: 'Color Converter',
    path: '/tools/color-converter',
    icon: Palette,
    description: 'Convert between HEX, RGB, HSL and other color formats',
    color: 'from-green-500 to-emerald-600',
    bgGradient: 'from-green-500/10 to-emerald-600/10',
    category: 'Design',
    popular: false
  },
  {
    name: 'Timestamp Converter',
    path: '/tools/timestamp-converter',
    icon: Clock,
    description: 'Convert between Unix timestamps and human-readable dates',
    color: 'from-slate-500 to-gray-600',
    bgGradient: 'from-slate-500/10 to-gray-600/10',
    category: 'Time & Date',
    popular: false
  },
  {
    name: 'Password Generator',
    path: '/tools/password-generator',
    icon: Lock,
    description: 'Generate cryptographically secure passwords with custom rules',
    color: 'from-red-500 to-pink-600',
    bgGradient: 'from-red-500/10 to-pink-600/10',
    category: 'Security',
    popular: true
  },
  {
    name: 'Hash Generator',
    path: '/tools/hash-generator',
    icon: Hash,
    description: 'Generate MD5, SHA-1, SHA-256 and other cryptographic hashes',
    color: 'from-indigo-500 to-purple-600',
    bgGradient: 'from-indigo-500/10 to-purple-600/10',
    category: 'Security',
    popular: false
  },
  {
    name: 'URL Encoder/Decoder',
    path: '/tools/url-encoder-decoder',
    icon: LinkIcon,
    description: 'Safely encode and decode URLs for web applications',
    color: 'from-teal-500 to-cyan-600',
    bgGradient: 'from-teal-500/10 to-cyan-600/10',
    category: 'URL Tools',
    popular: false
  }
];

export default function Header() {
  const router = useRouter();
  const { token, logout } = useAuth();
  const isLoggedIn = !!token;

  const [isDark, setIsDark] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTools, setFilteredTools] = useState<Tool[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchFocused, setSearchFocused] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Toggle theme
  const toggleTheme = () => setIsDark(prev => !prev);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Filter tools based on search query
  useEffect(() => {
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const filtered = tools.filter(tool =>
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.category.toLowerCase().includes(query)
      );
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFilteredTools(filtered);
      setShowDropdown(true);
    } else {
      setFilteredTools([]);
      setShowDropdown(false);
    }
  }, [searchQuery]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
        setSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcut ⌘K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setSearchFocused(true);
      }
      
      // Close dropdown on Escape key
      if (e.key === 'Escape') {
        setShowDropdown(false);
        setSearchFocused(false);
        inputRef.current?.blur();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle tool selection
  const handleToolClick = (path: string) => {
    router.push(path);
    setSearchQuery('');
    setShowDropdown(false);
    setSearchFocused(false);
    inputRef.current?.blur();
  };

  // Get user first name from JWT token
  let userFirstName = 'User';
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      userFirstName = payload.firstName || payload.name || 'User';
    } catch (error) {
      console.error('Error decoding JWT:', error);
    }
  }

  // Format time
  const formattedTime = currentTime.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });

  // Format date
  const formattedDate = currentTime.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric' 
  });

  return (
    <header className="relative h-20 bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700/50 backdrop-blur-xl">
      {/* Animated background effects */}
      <div className="absolute inset-0 bg-linear-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-blue-400/50 to-transparent"></div>
      <div className="absolute top-2 right-20 w-2 h-2 bg-blue-400/30 rounded-full animate-ping"></div>
      <div className="absolute top-6 right-40 w-1 h-1 bg-purple-400/40 rounded-full animate-pulse delay-500"></div>
      <div className="absolute top-4 right-60 w-1.5 h-1.5 bg-pink-400/30 rounded-full animate-ping delay-1000"></div>

      <div className="relative z-10 flex justify-between items-center h-full px-4 md:px-8">
        {/* Left section - Logo and stats */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity duration-200"
            onClick={() => router.push('/')}
          >
            <div className="relative">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-linear-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25 rotate-3 hover:rotate-0 transition-transform duration-300">
                <Command className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-linear-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
                <Sparkles className="w-1.5 h-1.5 md:w-2 md:h-2 text-white" />
              </div>
            </div>
            <div>
              <h1 className="font-bold text-xl md:text-2xl text-white bg-linear-to-r from-white via-blue-100 to-purple-100 bg-clip-text">
                DEV KIT HUB
              </h1>
              <div className="flex items-center gap-2 mt-0.5">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-slate-400 font-medium">System Online</span>
              </div>
            </div>
          </div>

          {/* Quick Stats - Hidden on mobile */}
          <div className="hidden lg:flex items-center gap-4 md:gap-6 ml-4 md:ml-8">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 rounded-lg border border-slate-700/50">
              <Activity className="w-4 h-4 text-green-400" />
              <span className="text-sm text-slate-300 font-medium">12 Tools</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 rounded-lg border border-slate-700/50">
              <GitBranch className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-slate-300 font-medium">v2.1.0</span>
            </div>
          </div>
        </div>

        {/* Center - Search bar */}
        <div className="hidden md:flex flex-1 justify-center max-w-lg mx-4 md:mx-8">
          <div ref={searchRef} className="relative w-full">
            <div className={`relative flex items-center bg-slate-800/50 backdrop-blur-sm rounded-xl border transition-all duration-300 ${
              searchFocused 
                ? 'border-blue-500/50 shadow-lg shadow-blue-500/20' 
                : 'border-slate-700/50 hover:border-slate-600/50'
            }`}>
              <Search className={`w-5 h-5 ml-4 transition-colors duration-200 ${
                searchFocused ? 'text-blue-400' : 'text-slate-400'
              }`} />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search tools... (⌘K)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => {
                  setSearchFocused(true);
                  if (searchQuery.trim()) {
                    setShowDropdown(true);
                  }
                }}
                onBlur={() => {
                  // Small delay to allow for click events on dropdown items
                  setTimeout(() => {
                    if (!document.activeElement?.closest('.search-dropdown')) {
                      setSearchFocused(false);
                      setShowDropdown(false);
                    }
                  }, 100);
                }}
                className="w-full px-4 py-3 bg-transparent text-white placeholder-slate-400 focus:outline-none text-sm font-medium"
              />
              <div className="flex items-center gap-1 mr-3">
                <kbd className="px-2 py-1 text-xs text-slate-400 bg-slate-700/50 rounded border border-slate-600/50 font-mono hidden lg:inline">
                  ⌘K
                </kbd>
              </div>
            </div>

            {/* Search Results Dropdown */}
            {showDropdown && filteredTools.length > 0 && (
              <div className="search-dropdown absolute top-full mt-2 w-full bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-xl shadow-2xl shadow-black/50 max-h-96 overflow-y-auto z-9999">
                <div className="p-2">
                  <div className="px-3 py-2 mb-1">
                    <p className="text-xs font-medium text-slate-400">
                      {filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'} found
                    </p>
                  </div>
                  {filteredTools.map((tool, index) => {
                    const Icon = tool.icon;
                    return (
                      <button
                        key={index}
                        onClick={() => handleToolClick(tool.path)}
                        className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-slate-800/70 transition-all duration-200 group text-left focus:outline-none focus:bg-slate-800/70"
                      >
                        <div className={`shrink-0 w-10 h-10 bg-linear-to-br ${tool.color} rounded-lg flex items-center justify-center shadow-lg`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors duration-200">
                              {tool.name}
                            </h3>
                            {tool.popular && (
                              <span className="px-2 py-0.5 text-xs bg-blue-500/20 text-blue-400 rounded-full border border-blue-500/30">
                                Popular
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-slate-400 mt-1 line-clamp-1">{tool.description}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-slate-500">{tool.category}</span>
                            <span className="text-xs text-slate-600 group-hover:text-blue-400 transition-colors duration-200">
                              Click to open →
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* No Results State */}
            {showDropdown && searchQuery.trim() && filteredTools.length === 0 && (
              <div className="search-dropdown absolute top-full mt-2 w-full bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-xl shadow-2xl shadow-black/50 z-9999">
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-slate-500" />
                  </div>
                  <p className="text-slate-300 font-medium mb-1">No tools found</p>
                  <p className="text-sm text-slate-500">Try searching for &quot;JSON&quot;, &quot;API&quot;, or &quot;Password&quot;</p>
                  <div className="mt-4 flex flex-wrap gap-2 justify-center">
                    <button
                      onClick={() => setSearchQuery('json')}
                      className="px-3 py-1.5 text-xs bg-slate-800/50 text-slate-300 rounded-lg border border-slate-700/50 hover:bg-slate-700/50 hover:border-slate-600/50 transition-colors duration-200"
                    >
                      JSON
                    </button>
                    <button
                      onClick={() => setSearchQuery('api')}
                      className="px-3 py-1.5 text-xs bg-slate-800/50 text-slate-300 rounded-lg border border-slate-700/50 hover:bg-slate-700/50 hover:border-slate-600/50 transition-colors duration-200"
                    >
                      API
                    </button>
                    <button
                      onClick={() => setSearchQuery('password')}
                      className="px-3 py-1.5 text-xs bg-slate-800/50 text-slate-300 rounded-lg border border-slate-700/50 hover:bg-slate-700/50 hover:border-slate-600/50 transition-colors duration-200"
                    >
                      Password
                    </button>
                    <button
                      onClick={() => setSearchQuery('url')}
                      className="px-3 py-1.5 text-xs bg-slate-800/50 text-slate-300 rounded-lg border border-slate-700/50 hover:bg-slate-700/50 hover:border-slate-600/50 transition-colors duration-200"
                    >
                      URL
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right section - Time, actions, and user */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Time display - Hidden on very small screens */}
          <div className="hidden sm:block text-right">
            <div className="text-sm font-medium text-white">
              {formattedTime}
            </div>
            <div className="text-xs text-slate-400">
              {formattedDate}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1 md:gap-2">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="relative w-9 h-9 md:w-10 md:h-10 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg border border-slate-700/50 flex items-center justify-center group transition-all duration-200"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-4.5 h-4.5 md:w-5 md:h-5 text-yellow-400 group-hover:rotate-12 transition-transform duration-300" />
              ) : (
                <Moon className="w-4.5 h-4.5 md:w-5 md:h-5 text-slate-400 group-hover:rotate-12 transition-transform duration-300" />
              )}
            </button>

            {/* Notifications */}
            <button 
              className="relative w-9 h-9 md:w-10 md:h-10 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg border border-slate-700/50 flex items-center justify-center group transition-all duration-200"
              aria-label="Notifications"
            >
              <Bell className="w-4.5 h-4.5 md:w-5 md:h-5 text-slate-400 group-hover:text-blue-400 transition-colors duration-200" />
              {/* <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border border-slate-900"></div> */}
            </button>

            {/* Settings */}
            <button 
              className="w-9 h-9 md:w-10 md:h-10 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg border border-slate-700/50 flex items-center justify-center group transition-all duration-200"
              aria-label="Settings"
            >
              <Settings className="w-4.5 h-4.5 md:w-5 md:h-5 text-slate-400 group-hover:rotate-90 group-hover:text-blue-400 transition-all duration-200" />
            </button>
          </div>

          {/* Login/User section */}
          {!isLoggedIn ? (
            <button
              onClick={() => router.push('/login')}
              className="group relative px-3 py-2 md:px-4 md:py-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg border border-slate-700/50 flex items-center gap-2 transition-all duration-200"
            >
              <LogIn className="w-4 h-4 text-slate-400 group-hover:text-blue-400 transition-colors duration-200" />
              <span className="text-sm font-medium text-slate-300 group-hover:text-white hidden md:inline">Login</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 md:gap-3 px-3 py-2 bg-slate-800/50 rounded-lg border border-slate-700/50">
              <span className="text-sm text-white hidden md:inline">Hi, {userFirstName}</span>
              <button 
                onClick={logout}
                className="text-xs text-red-400 hover:text-red-300 transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          )}

          {/* User avatar - Only show when logged in */}
          {isLoggedIn && (
            <button
              onClick={() => router.push('/profile')}
              className="ml-1 md:ml-3 w-9 h-9 md:w-10 md:h-10 rounded-full bg-linear-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-blue-500/25 hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              aria-label="User profile"
            >
              <span className="text-white font-bold text-sm md:text-base">
                {userFirstName?.[0]?.toUpperCase() || 'U'}
              </span>
            </button>
          )}

        </div>
      </div>
    </header>
  );
}