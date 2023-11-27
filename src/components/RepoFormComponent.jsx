import { useState } from "react";

const RepoForm = () => {
    const [loaded, setLoaded] = useState(true);
    let className = "repo-form";

    const handleClick = () => {
        // Puedes agregar lógica adicional aquí si es necesario
    };

    return (
        <div className={className + (loaded ? "" : " hidden")} onClick={handleClick}>
            <form>
                <label htmlFor="repoDesc">Description</label>
                <input type="text" id="repoDesc" placeholder="Repo description..." />
                <label htmlFor="owner">Owner</label>
                <input type="text" id="owner" placeholder='Owner...' />
                <label htmlFor="language">Language</label>
                <input type="text" id="language" placeholder='Language...' />
                <label htmlFor="type">Type</label>
                <select id="type" defaultValue="all">
                    <option value="all">All</option>
                    <option value="user">User</option>
                    <option value="org">Organization</option>
                </select>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default RepoForm;