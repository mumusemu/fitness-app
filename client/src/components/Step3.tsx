import React, { useState } from "react";
import { useForm } from "../context/FormContext";
import { useTranslation } from "react-i18next";
import './Step3.css'; // Import the CSS file

type FitnessGoal = "Lose Weight" | "Build Muscle" | "Healthy Living";
// İkonları string anahtarlarla indeksleyebilmek için typescript'e nesnenin türünü belirtiyoruz
const icons: { [key: string]: JSX.Element } = {
  "Lose Weight": (
    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.2192 3.4385C11.0912 3.36714 10.9445 3.33633 10.7985 3.35017C10.6526 3.36401 10.5143 3.42183 10.4019 3.516C10.2895 3.61016 10.2084 3.73622 10.1693 3.87749C10.1301 4.01877 10.1348 4.16861 10.1826 4.30718C10.4506 5.12068 10.5481 5.98065 10.4693 6.8335C10.3904 7.68636 10.1368 8.51384 9.72416 9.26441C9.19209 9.30547 8.66429 9.14292 8.24751 8.80963C7.83073 8.47635 7.55608 7.99722 7.47912 7.46915C6.6824 7.9044 6.0267 8.5583 5.58927 9.35382C5.15184 10.1493 4.95091 11.0533 5.01015 11.9592C5.01015 13.3881 5.57779 14.7585 6.58818 15.7689C7.59857 16.7793 8.96895 17.3469 10.3979 17.3469C11.8207 17.3275 13.1798 16.7536 14.186 15.7474C15.1922 14.7412 15.7661 13.3821 15.7856 11.9592C15.947 10.2473 15.5998 8.52575 14.7876 7.01014C13.9753 5.49452 12.7341 4.25214 11.2192 3.4385V3.4385Z" stroke="#183137" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
    </svg>

  ),
  "Build Muscle": (
    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 7.84108L9.11358 12.0098C9.35776 12.2271 9.67319 12.3471 10 12.3471C10.3268 12.3471 10.6422 12.2271 10.8864 12.0098L16.9999 7.84108" stroke="#183137" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M16.5564 13.2357L10.8914 17.0096C10.6472 17.2269 10.3318 17.3469 10.005 17.3469C9.67816 17.3469 9.36273 17.2269 9.11856 17.0096L3.44821 13.2357C3.30802 13.1103 3.19594 12.9567 3.11932 12.7849C3.04271 12.6131 3.00329 12.4271 3.00366 12.239L3.00372 4.01304C3.00401 3.88475 3.0413 3.75926 3.11112 3.65164C3.18094 3.54401 3.28033 3.45881 3.39736 3.40625C3.51439 3.35369 3.6441 3.33601 3.77093 3.35533C3.89776 3.37465 4.01633 3.43014 4.11241 3.51515L9.11371 7.00972C9.35788 7.22694 9.67331 7.34694 10.0001 7.34694C10.3269 7.34694 10.6424 7.22694 10.8865 7.00972L15.8914 3.51515C15.9875 3.42986 16.1061 3.37412 16.2331 3.35465C16.3601 3.33517 16.49 3.35279 16.6072 3.40538C16.7244 3.45797 16.8239 3.54329 16.8938 3.6511C16.9636 3.7589 17.0009 3.88458 17.001 4.01304L17.0009 12.2426C17.0008 12.4301 16.9612 12.6154 16.8846 12.7865C16.808 12.9577 16.6961 13.1107 16.5564 13.2357Z" stroke="#183137" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
    </svg>

  ),
  "Healthy Living": (
    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M4 10.3469C4 7.03323 6.68629 4.34694 10 4.34694C13.3137 4.34694 16 7.03323 16 10.3469C16 13.6606 13.3137 16.3469 10 16.3469C6.68629 16.3469 4 13.6606 4 10.3469ZM10 2.34694C5.58172 2.34694 2 5.92866 2 10.3469C2 14.7652 5.58172 18.3469 10 18.3469C14.4183 18.3469 18 14.7652 18 10.3469C18 5.92866 14.4183 2.34694 10 2.34694ZM14 8.34694C14 8.89922 13.5523 9.34694 13 9.34694C12.4477 9.34694 12 8.89922 12 8.34694C12 7.79465 12.4477 7.34694 13 7.34694C13.5523 7.34694 14 7.79465 14 8.34694ZM7 9.34694C7.55228 9.34694 8 8.89922 8 8.34694C8 7.79465 7.55228 7.34694 7 7.34694C6.44772 7.34694 6 7.79465 6 8.34694C6 8.89922 6.44772 9.34694 7 9.34694ZM7.85714 11.8319C7.57267 11.3585 6.95831 11.2053 6.48492 11.4898C6.01153 11.7743 5.85839 12.3886 6.14286 12.862C6.54285 13.5276 7.10829 14.0784 7.78419 14.4608C8.46008 14.8432 9.22343 15.0442 10 15.0442C10.7766 15.0442 11.5399 14.8432 12.2158 14.4608C12.8917 14.0784 13.4572 13.5276 13.8571 12.862C14.1416 12.3886 13.9885 11.7743 13.5151 11.4898C13.0417 11.2053 12.4273 11.3585 12.1429 11.8319C11.9206 12.2017 11.6065 12.5076 11.231 12.7201C10.8555 12.9325 10.4314 13.0442 10 13.0442C9.56857 13.0442 9.14449 12.9325 8.76899 12.7201C8.39349 12.5076 8.07936 12.2017 7.85714 11.8319Z" fill="#183137" />
    </svg>
  )
};

const Step3 = ({ nextStep }: { nextStep: () => void }) => {
  const { formData, setFormData } = useForm();
  const { t } = useTranslation(); // i18n hook to get translations


  const [selectedGoal, setSelectedGoal] = useState<FitnessGoal | null>(null);

  // Handle radio button selection
  const handleGoalChange = (goal: FitnessGoal) => {
    setSelectedGoal(goal);
    setFormData({
      ...formData,
      fitnessGoal: goal, // Assuming you want to save this to formData
    });
  };

  return (
    <div className="step3-container">
      <div className="step3-rectangle"></div>
      <h2 className="fitness-goal-title">{t("step3")}</h2>
      {["Lose Weight", "Build Muscle", "Healthy Living"].map((fitnessGoal, index) => (
        <div key={fitnessGoal} className={`group group-${index + 1}`}>
          <div className="rectangle"></div>
          <div className="list-item">
            <div className="list-item-base">
              <div className="icon">
                {icons[fitnessGoal]}
              </div>
              <div className="label">{fitnessGoal}</div>
              <div
                className={`radio-button ${selectedGoal === fitnessGoal ? "active" : "inactive"} .inner-oval`}
                onClick={() => handleGoalChange(fitnessGoal as FitnessGoal)} // Handle selection on click
              ></div>
            </div>
          </div>
          {index < 2 && <div className="line"></div>} {/* Add line between groups */}
        </div>
      ))}

      <button className="primary-btn-2">
        <span className="primary-btn-2-label">Back</span>
      </button>
      <button className="primary-btn-1" onClick={nextStep}>
        <span className="primary-btn-1-label">Next</span>
      </button>
    </div>
  );
};

export default Step3;
