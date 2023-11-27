import { useState } from "react";
import LanguageOptions from "./LanguageOptionsComponent";
import LicensesOptions from "./LicenseOptionsComponent";

const RepoForm = () => {
    const [loaded, setLoaded] = useState(true);
    let className = "repo-form";

    const handleClick = () => {
        // Puedes agregar lógica adicional aquí si es necesario
    };

    return (
        <div className={className + (loaded ? "" : " hidden")} onClick={handleClick}>
            <form>
                <label htmlFor="repoName">Repo Name</label>
                <input type="text" id="repoName" placeholder="Repo name..." />

                <label htmlFor="repoDesc">Description</label>
                <input type="text" id="repoDesc" placeholder="Repo description..." />

                <label htmlFor="owner">Owner</label>
                <input type="text" id="owner" placeholder='Owner...' />

                <LanguageOptions />

                <label htmlFor="type">Type</label>
                <select name="type" id="type" defaultValue="all">
                    <option value="all">All</option>
                    <option value="user">User</option>
                    <option value="org">Organization</option>
                </select>

                <LicensesOptions/>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default RepoForm;