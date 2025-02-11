// src/context/FormContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface FormData {
    weightKg: string;
    heightCm: string;
    preferredDays: string[];
    fitnessGoal: string;
    bmi:number,
    name: string;
    email: string;
    password: string;
    language: string;
}

interface FormContextType {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<FormData>({
    weightKg: "",
    heightCm: "",
    bmi: 0,
    preferredDays: [],
    fitnessGoal: "",
    name: "",
    email: "",
    password: "",
    language: "",
  });

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useForm must be used within a FormProvider");
  }
  return context;
};
