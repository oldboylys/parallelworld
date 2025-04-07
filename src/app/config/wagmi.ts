import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { createConfig, http } from 'wagmi';
// import { mainnet, polygon, optimism, arbitrum, base, zora, sepolia } from 'wagmi/chains';
import { mainnet, sepolia } from 'wagmi/chains';

// const chains = [sepolia, mainnet, polygon, optimism, arbitrum, base, zora];
const chains = [sepolia, mainnet];

const { connectors } = getDefaultWallets({
  appName: 'Parallel World',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID',
  chains
});

export const wagmiConfig = createConfig({
  chains: [sepolia ,mainnet],
  connectors,
  transports: {
    [sepolia.id]: http(),
    [mainnet.id]: http(),
    // [polygon.id]: http(),
    // [optimism.id]: http(),
    // [arbitrum.id]: http(),
    // [base.id]: http(),
    // [zora.id]: http()
  }
});

export { chains };