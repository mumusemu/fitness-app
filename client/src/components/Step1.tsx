import React from "react";
import { useForm } from "../context/FormContext";
import { useTranslation } from "react-i18next";
import "./Step1.css";

const Step1 = ({ nextStep }: { nextStep: () => void }) => {
  const { formData, setFormData } = useForm();
  const { t } = useTranslation();

  return (
    <div className="step1-container">
      <div className="step1-rectangle"></div>
      <div className="step1-headline">{t("step1intro")}</div>
      
      <input
        type="number"
        className="step1-text-field"
        placeholder={t("weightPlaceholer")}
        value={formData.weightKg}
        onChange={(e) => setFormData({ ...formData, weightKg: e.target.value })}
      />
      
      <input
        type="number"
        className="step1-text-field"
        placeholder={t("heightPlaceholer")}
        value={formData.heightCm}
        onChange={(e) => setFormData({ ...formData, heightCm: e.target.value })}
      />
      
      <button className="step1-primary-light" onClick={nextStep}>
        {t("back")}
      </button>
      
      <button className="step1-primary-dark" onClick={nextStep}>
        {t("next")}
      </button>
    </div>
  );
};

export default Step1;
