'use client';
import { signIn } from 'next-auth/react';

export default function SignupButton() {
  return (
    <button
      onClick={() => signIn('google', { callbackUrl: '/' })}
      className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
    >
      Sign up with Google
    </button>
  );
}
