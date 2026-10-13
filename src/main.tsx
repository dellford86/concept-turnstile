import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';

import './index.css';
import '@fontsource/figtree/400.css';
import '@fontsource/figtree/600.css';
import '@fontsource/figtree/900.css';

import '../tokens/sideline-fan-ds.tokens.css';
import '../tokens/sideline-fan-ds.brand.tokens.css';
import '../tokens/sideline-fan-ds.semantics.tokens.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
