import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Çeviri dosyalarını tanımlayalım
const resources = {
  en: {
    translation: {
      step1: "Step 1: Enter Your Weight & Height",
      step2: "Step 2: Select Your Workout Days",
      step3: "Step 3: Select Your Fitness Goal",
      step4: "Step 4: Complete Your Registration Process",
      next: "Next",
      submit: "Submit",
      weightPlaceholer: "Weight (kg)",
      heightPlaceholer: "Height (cm)",
      step1intro: "Let’s hear more about you to prepare your personal workout plan",
      register: "Register",
    },
  },
  ar: {
    translation: {
      step1: "الخطوة 1",
      step2: "الخطوة 2",
      step3: "الخطوة 3",
      step4: "الخطوة 4",
      next: "التالي",
      submit: "إرسال",
      weightPlaceholer: "التالي",
      heightPlaceholer: "التالي",
      step1intro: "التالي",
      register: "التالي",
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // Varsayılan dili İngilizce yapalım
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
