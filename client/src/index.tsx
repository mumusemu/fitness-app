import React from "react";
import ReactDOM from "react-dom/client";  // React 18 ile yeni client import
import App from "./App"; // App bileşeninizi import edin

// Stil dosyasını import edin (isteğe bağlı)
// import "./styles.css";

// HTML'deki root id'sine sahip div'i alıyoruz
const rootElement = document.getElementById("root") as HTMLElement; 

// React 18 ile root oluşturuyoruz
const root = ReactDOM.createRoot(rootElement);

// React.StrictMode ile uygulamayı render ediyoruz
root.render(
  <React.StrictMode>
    <App />  {/* App bileşenini render ediyoruz */}
  </React.StrictMode>
);
