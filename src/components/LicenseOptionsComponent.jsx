import { useState } from "react";
import { useEffect } from "react";

const LicensesOptions = () => {
    const [loaded, setLoaded] = useState(true);
    const [licensesList, setLicensesList] = useState([]);
    let className = "license-options";

    const getLicenses = async () => {
        try {
            const data = await fetch(`https://api.github.com/licenses`);
            const results = await data.json();
            console.log(results);

            setLicensesList(results);
        } catch (e) {
            setError("Algo salió mal...");
            console.error(e);
        }
    }

    useEffect(() => {
        setLicensesList([]);
        getLicenses();
    }, []);

    return (
        <>
        <label htmlFor="licenses">License</label>
        <select name="licenses" id="licenses" defaultValue={"all"}>
            <option value="all">All</option>
            {licensesList.map((license) => {
                return <option key={license.key} value={license.name}>{license.name}</option>
            })}
        </select>
        </>
    );
};

export default LicensesOptions;