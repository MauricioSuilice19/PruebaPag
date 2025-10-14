// generate-qr.js
const QRCode = import("qrcode");

// URL de tu web en Firebase Hosting
const url = "https://tuproyecto.web.app"; // <-- reemplazá con tu URL real

// Genera el QR como archivo PNG
QRCode.toFile(
  "qr.png",
  url,
  {
    color: {
      dark: "#000000", // color del código
      light: "#ffffff", // color de fondo
    },
    width: 400, // tamaño en píxeles
  },
  function (err) {
    if (err) throw err;
    console.log("✅ QR generado: qr.png");
  }
);
