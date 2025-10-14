// generate-qr.js
import { mkdirSync } from "fs";
import { toFile } from "qrcode";

// ⚡ URL real de tu Firebase Hosting
const url = "https://paginabonita-9fb3f.web.app";

// Crear carpeta dist si no existe (por seguridad)
mkdirSync("./dist", { recursive: true });

// Generar archivo qr.png dentro de dist/
toFile(
  "./dist/qr.png",
  url,
  {
    color: {
      dark: "#000000", // Color del QR
      light: "#ffffff", // Fondo
    },
    width: 400, // Tamaño
  },
  function (err) {
    if (err) throw err;
    console.log("✅ QR generado en dist/qr.png");
  }
);
