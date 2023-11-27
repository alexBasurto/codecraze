import { useState } from "react";
import { useEffect } from "react";

const LanguageOptions = () => {
    const [languageList, setLanguageList] = useState([]);
    let className = "language-options";

    const getLanguages = async () => {
        try {
            const data = await fetch(`https://api.github.com/languages`);
            const results = await data.json();
            console.log(results);

            setLanguageList(results);
        } catch (e) {
            setError("Algo salió mal...");
            console.error(e);
        }
    }

    useEffect(() => {
        setLanguageList([]);
        getLanguages();
    }, []);

    return (
        <>
        <label htmlFor="languages">Main language</label>
        <select name="languages" id="languages" defaultValue={"all"}>
            <option value="all">All</option>
            {languageList.map((language) => {
                return <option key={language.name} value={language.name}>{language.name}</option>
            })}
        </select>
        </>
    );
};

export default LanguageOptions;