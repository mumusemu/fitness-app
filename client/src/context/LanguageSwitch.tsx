import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <div>
      <label>
        <input
          type="radio"
          value="en"
          checked={i18n.language === "en"}
          onChange={handleChange}
        />
        English
      </label>

      <label style={{ marginLeft: "10px" }}>
        <input
          type="radio"
          value="ar"
          checked={i18n.language === "ar"}
          onChange={handleChange}
        />
        العربية
      </label>
    </div>
  );
};

export default LanguageSwitcher;
