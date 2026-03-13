'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import Header from '@/components/Layout/Header';

export default function ProfilePage() {
  const { token, logout } = useAuth();
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);

  // Redirect to login if not logged in
  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token, router]);

  // Fetch profile
  useEffect(() => {
    if (!token) return;

    const fetchProfile = async () => {
      try {
        const res = await fetch('http://localhost:3000/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          if (res.status === 401) {
            alert('Session expired. Please log in again.');
            logout();
            router.push('/login');
          }
          throw new Error('Failed to fetch profile');
        }

        const data = await res.json();
        setUser(data);
        setRole(data.role);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token, logout, router]);

  const updateRole = async () => {
    try {
      const res = await fetch('http://localhost:3000/users/role', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role }),
      });

      if (!res.ok) throw new Error('Failed to update role');
      const updated = await res.json();
      setUser(updated);
      alert('Role updated successfully');
    } catch (err) {
      console.error(err);
      alert('Error updating role');
    }
  };

  const updatePassword = async () => {
    if (!password) return;

    try {
      const res = await fetch('http://localhost:3000/users/password', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) throw new Error('Failed to update password');
      alert('Password updated successfully');
      setPassword('');
    } catch (err) {
      console.error(err);
      alert('Error updating password');
    }
  };

  const deleteAccount = async () => {
    if (!confirm('Are you sure you want to delete your account?')) return;

    try {
      const res = await fetch('http://localhost:3000/users', {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error('Failed to delete account');

      alert('Account deleted successfully');
      logout();
      router.push('/login');
    } catch (err) {
      console.error(err);
      alert('Error deleting account');
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-slate-900 flex items-center justify-center">
          <p className="text-white text-lg">Loading profile...</p>
        </div>
      </>
    );
  }

  if (!user) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-slate-900 flex items-center justify-center">
          <p className="text-white text-lg">No profile data available.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-slate-900 text-white flex flex-col items-center py-10 px-4">
        {/* Container with proper max-width */}
        <div className="max-w-4xl mx-auto space-y-8 mt-6">
          

          {/* Profile Overview Card */}
          <div className="bg-linear-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-2xl p-8">
            <div className="flex items-center gap-6">
              {/* Avatar */}
              <div className="w-32 h-32 rounded-full bg-linear-to-br from-purple-500 to-blue-500 flex items-center justify-center text-3xl font-bold">
                {user.firstName?.[0]}{user.lastName?.[0]}
              </div>
              
              {/* User Info */}
              <div className="flex-1">
                <h2 className="text-2xl font-semibold">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-slate-400 mt-1">{user.email}</p>
                <div className="mt-3">
                  <span className="inline-block px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium capitalize">
                    {user.role}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Account Settings Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mt-4">Account Settings</h2>

            {/* Personal Information */}
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-slate-200">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">
                    First Name
                  </label>
                  <div className="px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-700 text-white">
                    {user.firstName}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">
                    Last Name
                  </label>
                  <div className="px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-700 text-white">
                    {user.lastName}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-400 mb-1">
                    Email Address
                  </label>
                  <div className="px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-700 text-white">
                    {user.email}
                  </div>
                </div>
              </div>
            </div>

            {/* Update Role */}
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-slate-200">Professional Role</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">
                    Select your role
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  >
                    <option value="student">Student</option>
                    <option value="developer">Developer</option>
                    <option value="freelancer">Freelancer</option>
                    <option value="professional">Professional</option>
                    <option value="hobbyist">Hobbyist</option>
                  </select>
                </div>
                <button
                  onClick={updateRole}
                  className="w-full sm:w-auto px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-lg font-semibold transition shadow-lg shadow-purple-500/20"
                >
                  Update Role
                </button>
              </div>
            </div>

            {/* Security Section */}
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-slate-200">Security</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  />
                </div>
                <button
                  onClick={updatePassword}
                  className="w-full sm:w-auto px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-lg font-semibold transition shadow-lg shadow-purple-500/20"
                >
                  Change Password
                </button>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-2 text-red-400">Danger Zone</h3>
              <p className="text-slate-400 text-sm mb-4">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <button
                onClick={deleteAccount}
                className="w-full sm:w-auto px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition shadow-lg shadow-red-600/20"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}