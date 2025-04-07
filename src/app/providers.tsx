'use client';

import { SessionProvider } from 'next-auth/react';
import WagmiProviderWrap from './providers/WagmiProviderWrap';
import WalletAuthProvider from './providers/WalletAuthProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProviderWrap>
      <WalletAuthProvider>
        <SessionProvider>{children}</SessionProvider>
      </WalletAuthProvider>
    </WagmiProviderWrap>
  );
}