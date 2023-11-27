import { useState } from "react";
import LanguageOptions from "./LanguageOptionsComponent";
import LicensesOptions from "./LicenseOptionsComponent";

const RepoForm = ({ onFormSubmit }) => {
    const [loaded, setLoaded] = useState(true);
    const [repoName, setRepoName] = useState("");
    const [repoDesc, setRepoDesc] = useState("");
    const [owner, setOwner] = useState("");
    const [language, setLanguage] = useState("");
    const [type, setType] = useState("");
    const [license, setLicense] = useState("");

    let className = "repo-form";

    const handleSubmit = (e) => {
        e.preventDefault();
        onFormSubmit({
            repoName,
            repoDesc,
            owner,
            language,
            type,
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

                <label htmlFor="owner">Owner</label>
                <input type="text" id="owner" placeholder='Owner...' value={owner}
        onChange={(e) => setOwner(e.target.value)}/>

                <LanguageOptions onLanguageChange={(language) => setLanguage(language)}/>

                <label htmlFor="type">Type</label>
                <select name="type" id="type" defaultValue="all"
        onChange={(e) => setType(e.target.value)}>
                    <option value="all">All</option>
                    <option value="User">User</option>
                    <option value="Organization">Organization</option>
                </select>

                <LicensesOptions/>

                <button type="submit">Search</button>
            </form>
    );
}

export default RepoForm;