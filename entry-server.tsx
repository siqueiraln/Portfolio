import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';

// Renderiza a mesma árvore que o cliente hidrata (com StrictMode) para HTML estático.
export function render(): string {
  return renderToString(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
