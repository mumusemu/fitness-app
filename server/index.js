const express = require("express");
const cors = require('cors');
const userRoutes = require("./routes/userRoutes");  // Eksik import
const sequelize = require("./config/database");

const app = express();

// CORS'u etkinleştir (React portu)
app.use(cors());

// JSON ve URL-encoded verilerini işlemek için middleware'ler
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota işleyicilerini ekle
app.use("/api/users", userRoutes);

// Veritabanı Bağlantısı ve Senkronizasyon
sequelize.authenticate()
  .then(() => {
    console.log("Database connected");
    return sequelize.sync();  // Veritabanı senkronizasyonu
  })
  .then(() => console.log("Database synced"))
  .catch(err => {
    console.error("Database connection error: ", err);
    process.exit(1);  // Veritabanı bağlantı hatası durumunda uygulamayı sonlandır
  });

// Sunucuyu başlat
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Global hata yönetimi middleware'i
app.use((err, req, res, next) => {
  console.error("Global error handler:", err);  // Detaylı hata logu
  res.status(500).json({
    message: "Internal Server Error",
    error: err.message,
  });
});

module.exports = app;
