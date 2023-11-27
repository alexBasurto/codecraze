import { useState, useEffect } from "react";

const LanguageOptions = ({ onLanguageChange }) => {
  const [languageList, setLanguageList] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("all");

  const getLanguages = async () => {
    try {
      const data = await fetch(`https://api.github.com/languages`);
      const results = await data.json();
      setLanguageList(results);
    } catch (e) {
      console.error("Algo salió mal...", e);
    }
  };

  useEffect(() => {
    getLanguages();
  }, []);

  const handleLanguageChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedLanguage(selectedValue);
    // Pasa el valor seleccionado a la función proporcionada a través de las propiedades
    onLanguageChange(selectedValue);
  };

  return (
    <>
      <label htmlFor="languages">Main language</label>
      <select
        name="languages"
        id="languages"
        value={selectedLanguage}
        onChange={handleLanguageChange}
      >
        <option value="all">All</option>
        {languageList.map((language) => (
          <option key={language.name} value={language.name}>
            {language.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default LanguageOptions;
