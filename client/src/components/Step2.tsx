import React, { useState } from "react";
import { useForm } from "../context/FormContext";
import { useTranslation } from "react-i18next";
import './Step2.css';

const daysOptions = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const Step2 = ({ nextStep, prevStep }: { nextStep: () => void, prevStep: () => void }) => {
  const { formData, setFormData } = useForm();
  const { t } = useTranslation(); // i18n hook to get translations
  const [preferredDays, setPreferredDays] = useState<string[]>([]);

  const handleSelection = (day: string) => {
    setPreferredDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
    setFormData({
      ...formData,
      preferredDays: preferredDays, // Assuming you want to save this to formData
    });
  };

  return (
    <div className="step-container">
      <div className="rectangle-1"></div>
      <h2 className="workout-days-label">Pick your workout days</h2>

      {daysOptions.map((day, index) => (
        <div
          key={day}
          className={`group ${preferredDays.includes(day) ? "selected" : ""}`}
          onClick={() => handleSelection(day)}
        >
          <div className="rectangle-2">
            <div className={`list-item list-item-${index}`}>
              <div className="list-item-base">
                <div className="list-item-label">{day}</div>
                <div className={`check-icon ${preferredDays.includes(day) ? "checked" : ""}`}></div>
              </div>
            </div>
          </div>
          {index !== daysOptions.length - 1 && (
            <div className={`line line-${index}`}></div>
          )}
        </div>
      ))}
      <button className="primary-btn-2" onClick={prevStep}>
        <span className="primary-btn-2-label">{t("Back")}</span>
      </button>
      <button className="primary-btn-1" onClick={nextStep}>
        <span className="primary-btn-1-label">{t("Next")}</span>
      </button>
    </div>
  );
};


export default Step2;
