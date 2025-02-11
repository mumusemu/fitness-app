import React, { useState, useEffect } from "react";
import "./i18n"; // i18n ayarlarını yükleyelim

import { FormProvider } from "./context/FormContext";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
import Step4 from "./components/Step4";
import LanguageSwitcher from "./context/LanguageSwitch";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";

// Dil değiştirme işlevi
const App = () => {
  const [step, setStep] = useState(1);
  const { i18n } = useTranslation();
  const [direction, setDirection] = useState(i18n.dir()); // direction state: 'ltr' veya 'rtl'

  // Direction değiştiğinde animasyonu tetiklemek için useEffect kullanıyoruz
  useEffect(() => {
    setDirection(i18n.dir()); // direction'ı güncelle
  }, [i18n.language]); // Dil değiştiğinde çalışır

  return (
    <>
      <LanguageSwitcher />
      <FormProvider>
        <AnimatePresence mode="wait">
          <motion.div
            className="motion"
            key={`${step}-${direction}`} // page step size - direction (ltr, rtl)
            initial={{
              x: direction === "rtl" ? 100 : -100, // Eğer LTR sağdan sola, RTL soldan sağa kayacak
              opacity: 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
            }}/* 
            exit={{
              x: direction === "rtl" ? -100 : 100, // Yönün tersine kayma efekti
              opacity: 0,
            }} */
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {step === 1 && <Step1 nextStep={() => setStep(2)} />}
            {step === 2 && <Step2 nextStep={() => setStep(3)} />}
            {step === 3 && <Step3 nextStep={() => setStep(4)} />}
            {step === 4 && <Step4 onSubmit={() => alert("Registration complete!")} />}
          </motion.div>
        </AnimatePresence>
      </FormProvider>
    </>
  );
};

export default App;
