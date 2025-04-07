'use client';

import { useEffect, useRef } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { signIn } from 'next-auth/react';

export default function WalletAuthProvider({ children }: { children: React.ReactNode }) {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const isAuthenticating = useRef(false);

  useEffect(() => {
    const handleAuth = async () => {
      if (isConnected && address && !isAuthenticating.current) {
        try {
          isAuthenticating.current = true;
          await signIn('credentials', {
            address: address,
            callbackUrl: '/',
            redirect: false
          });
        } finally {
          isAuthenticating.current = false;
        }
      }
    };

    handleAuth();
  }, [isConnected, address]);

  return <>{children}</>;
}