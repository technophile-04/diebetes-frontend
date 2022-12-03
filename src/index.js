import { ChakraProvider, ColorModeScript, theme } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { WagmiConfig, createClient, configureChains, chain } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { Web3AuthProvider } from "./contexts/SocialLoginContext";
import { SmartAccountProvider } from "./contexts/SmartAccountContext";

const { chains, provider, webSocketProvider } = configureChains(
  [chain.polygonMumbai, chain.goerli],
  [publicProvider()]
);

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
    <Web3AuthProvider>
      <SmartAccountProvider>
        <WagmiConfig client={client}>
          <ColorModeScript />
          <ChakraProvider theme={theme}>
            <App />
          </ChakraProvider>
        </WagmiConfig>
      </SmartAccountProvider>
    </Web3AuthProvider>
  </StrictMode>
);
