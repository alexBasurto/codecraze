import { useState, useEffect } from "react";

import getLanguagesFromAPI from "./utils/apiGitHub.js";

const LanguageOptions = ({ onLanguageChange }) => {
  const [languageList, setLanguageList] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [error, setError] = useState("");

  const getLanguages = async () => {
    try {
      const data = await getLanguagesFromAPI();
      setLanguageList(data);
    } catch (e) {
      setError(e.message);
    }
  }

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
