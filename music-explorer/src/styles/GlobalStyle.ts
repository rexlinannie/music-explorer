import { createGlobalStyle } from "styled-components";
export const GlobalStyle = createGlobalStyle`
  *,*::before,*::after{box-sizing:border-box} html{color-scheme:dark;scroll-behavior:smooth}
  body{margin:0;min-width:320px;background:radial-gradient(ellipse at 12% 0%,rgba(120,89,190,.12),transparent 32rem),${({ theme }) => theme.colors.background};color:${({ theme }) => theme.colors.text};font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;-webkit-font-smoothing:antialiased}
  button,input{font:inherit} ::selection{color:#101014;background:${({ theme }) => theme.colors.accent}}
`;
