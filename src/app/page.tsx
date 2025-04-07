'use client';

import Image from "next/image";
import Cloud from "./components/cloud";
import { useSession, signIn, signOut } from 'next-auth/react';
import { useState } from 'react';
import SignInModal from './components/auth/SignInModal';

export default function Home() {
  const { data: session } = useSession();
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  return (
    <div>
      <div className="fixed top-4 right-4 z-50">
        {session ? (
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-700">欢迎, {session.user?.name}</span>
            <button
              onClick={() => signOut()}
              className="px-4 py-3 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
            >
              退出登录
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsSignInModalOpen(true)}
            className="px-4 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
          >
            登录
          </button>
        )}
      </div>
      {/* <main className="fixed left-1/2 -translate-x-1/2 top-1/2 z-9999 text-5xl font-bold text-blue">
        Welcome to Parallel World!!!
      </main> */}
      <Cloud />
      <SignInModal isOpen={isSignInModalOpen} onClose={() => setIsSignInModalOpen(false)} />
    </div>
  );
}
