import React, { useState } from "react";
import { useForm } from "../context/FormContext";
import axios, { AxiosError } from "axios";
import { useTranslation } from "react-i18next";

const Step4 = ({ onSubmit }: { onSubmit: () => void }) => {
  const { formData, setFormData } = useForm();
  const { t, i18n } = useTranslation(); // i18n hook'u ile metinleri alıyoruz
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      // API isteği gönderiyoruz
      const response = await axios.post("http://localhost:5000/api/users/register", {
        fullName: formData.name,  // fullName -> name olarak eşliyoruz
        email: formData.email,
        password: formData.password,
        heightCm: formData.heightCm, // heightCm -> height olarak eşliyoruz
        weightKg: formData.weightKg, // weightKg -> weight olarak eşliyoruz
        preferredDays: formData.preferredDays.join(","), // preferredDays -> days olarak eşliyoruz
        fitnessGoal: formData.fitnessGoal, // fitnessGoal -> goal olarak eşliyoruz
        language: i18n.language, // Şu an dil olarak english gönderiyoruz, bunu dinamik yapabilirsin
      });

      // Başarılı olduğunda
      alert("Kayıt başarıyla tamamlandı!");
      onSubmit(); // Callback fonksiyonunu çağırıyoruz
    } catch (err) {
      // Hata durumunda, err'yi AxiosError olarak kontrol ediyoruz
      if (err instanceof AxiosError) {
        setError("Kullanıcı kaydı sırasında bir hata oluştu. ");

        if (err.response?.data?.error === 'Validation error: Validation isEmail on email failed') {
          setError("Email adresinizi yeniden kontrol ediniz. ");
        }
        console.error(err);
      } else {
        setError("Bilinmeyen bir hata oluştu.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>{t("step4")}</h2>
      <div>
        <input
          type="text"
          placeholder="Ad Soyad"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Şifre"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Gönderiliyor..." : t('register')}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

export default Step4;
