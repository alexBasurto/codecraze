import { useState } from "react";
import LanguageOptions from "./LanguageOptionsComponent";
import LicensesOptions from "./LicenseOptionsComponent";

const RepoForm = ({ onFormSubmit }) => {
    const [loaded, setLoaded] = useState(true);
    const [repoName, setRepoName] = useState("");
    const [repoDesc, setRepoDesc] = useState("");
    const [owner, setOwner] = useState("");
    const [language, setLanguage] = useState("");
    const [license, setLicense] = useState("");

    let className = "repo-form";

    const handleSubmit = (e) => {
        e.preventDefault();
        onFormSubmit({
            repoName,
            repoDesc,
            owner,
            language,
            license,
        });
    };

    return (

            <form onSubmit={handleSubmit}>
                <label htmlFor="repoName">Repo Name</label>
                <input type="text" id="repoName" placeholder="Repo name..." value={repoName} onChange={(e) => setRepoName(e.target.value)}/>

                <label htmlFor="repoDesc">Description</label>
                <input type="text" id="repoDesc" placeholder="Repo description..." value={repoDesc}
        onChange={(e) => setRepoDesc(e.target.value)}/>


                <LanguageOptions onLanguageChange={(language) => setLanguage(language)}/>
                <LicensesOptions onLicenseChange={(license) => setLicense(license)}/>

                <button type="submit">Search</button>
            </form>
    );
}

export default RepoForm;