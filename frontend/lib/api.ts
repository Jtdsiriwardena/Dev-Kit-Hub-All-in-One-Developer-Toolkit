
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://dev-kit-hub-all-in-one-developer-toolkit.onrender.com';

export async function apiRequest<T>(path: string, options: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, options);
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'API request failed');
  }
  return res.json() as Promise<T>;
}
