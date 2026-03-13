'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { register as registerApi } from '@/lib/auth';

export default function RegisterPage() {
  const router = useRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  type Role = 'student' | 'developer' | 'freelancer' | 'other';
  const [role, setRole] = useState<Role>('developer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Password confirmation check
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Call backend API
      await registerApi({
        firstName,
        lastName,
        role,
        email,
        password,
      });

      // Success feedback
      setSuccess('Account created successfully! Please login.');
      setTimeout(() => router.push('/login'), 1500);

    } catch (err: unknown) {

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Registration failed');
      }
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="w-full max-w-md bg-slate-800/50 border border-slate-700/50 rounded-xl p-8">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">
          Create your account
        </h1>

        {error && (
          <p className="mb-4 text-sm text-red-400 text-center">{error}</p>
        )}
        {success && (
          <p className="mb-4 text-sm text-green-400 text-center">{success}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="flex gap-4">
            <input
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              type="text"
              placeholder="First name"
              required
              className="w-1/2 px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white"
            />
            <input
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              type="text"
              placeholder="Last name"
              required
              className="w-1/2 px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white"
            />
          </div>

          {/* Role */}
          <select
            value={role}
            onChange={e => setRole(e.target.value as Role)}
            required
            className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white"
          >
            <option value="">I am a...</option>
            <option value="student">Student</option>
            <option value="developer">Developer</option>
            <option value="freelancer">Freelancer</option>
            <option value="professional">Professional</option>
            <option value="hobbyist">Hobbyist</option>
          </select>

          {/* Email */}
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="email"
            placeholder="Email address"
            required
            className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white"
          />

          {/* Password */}
          <div className="flex gap-4">
            <input
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              required
              className="w-1/2 px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white"
            />
            <input
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              type="password"
              placeholder="Confirm password"
              required
              className="w-1/2 px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white"
            />
          </div>

          <button className="w-full py-3 bg-purple-500 hover:bg-purple-600 rounded-lg text-white font-semibold transition">
            Create Account
          </button>
        </form>

        <p className="text-sm text-slate-400 text-center mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-purple-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
