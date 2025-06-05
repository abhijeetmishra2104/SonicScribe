'use client';
import { signIn } from 'next-auth/react';

export default function SignInButton() {
  return (
    <button
      onClick={() => signIn('google', { callbackUrl: '/' })}
      className="bg-blue-600 text-white px-6 py-2 rounded"
    >
      Sign in with Google
    </button>
  );
}
