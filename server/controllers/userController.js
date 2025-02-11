const User = require("../models/User");

// Kullanıcı kaydını işleyen fonksiyon

// Kullanıcı kaydını işleyen fonksiyon
const registerUser = async (req, res) => {
  console.log(5454444, req.body)
    const {
      fullName, email, password,
      heightCm, weightKg, preferredDays, fitnessGoal, language, bmi
    } = req.body;
    const preferredDaysArray = preferredDays.split(',');

    try {
      // Veritabanına yeni kullanıcı ekleme işlemi
      const newUser = await User.create({
        fullName,
        email,
        password,  // Şifreyi güvenli şekilde hash'lemek gereklidir!
        heightCm,
        weightKg,
        bmi,
        preferredDaysArray,
        fitnessGoal,
        language
      });
  
      // Başarılı yanıt
      res.status(201).json({
        message: "Kullanıcı başarıyla kaydedildi",
        userId: newUser.id
      });
    } catch (err) {
      console.error("Kayıt hatası: ", err);
      res.status(500).json({ message: "Kullanıcı kaydı sırasında bir hata oluştuuu", error: err.message });
    }
  };


// ID'ye göre kullanıcıyı döndüren fonksiyon
const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    // Kullanıcıyı veritabanından bulma
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }

    // Başarılı yanıt
    res.status(200).json(user);
  } catch (err) {
    console.error("Kullanıcı alma hatası: ", err);
    res.status(500).json({ message: "Kullanıcı alınırken bir hata oluştu", error: err.message });
  }
};

module.exports = { registerUser, getUserById };
