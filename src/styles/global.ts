import { createGlobalStyle } from 'styled-components';
export const GlobalStyle = createGlobalStyle`
  :root{
    --bg: #0f172a;
    --panel: #111827;
    --muted: #9ca3af;
    --text: #e5e7eb;
    --primary: #22d3ee;
    --accent: #34d399;
    --danger: #f87171;
  }
  * { box-sizing: border-box; }
  html, body, #root { height: 100%; }
  body {
    margin: 0;
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    background: linear-gradient(180deg, #0b1023, var(--bg));
    color: var(--text);
  }
  a { color: inherit; text-decoration: none; }
  input, select, button, textarea { font: inherit; }
`;