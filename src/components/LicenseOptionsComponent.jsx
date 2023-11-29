import { useState } from "react";
import { useEffect } from "react";

import {getLicensesFromAPI} from "./utils/apiGitHub.js";

const LicensesOptions = ({onLicenseChange}) => {
    const [licensesList, setLicensesList] = useState([]);
    const [selectedLicense, setSelectedLicense] = useState("all");
    const [error, setError] = useState("");

    const getLicenses = async () => {
        try {
            console.log("Getting licenses...");
            const data = await getLicensesFromAPI();
            setLicensesList(data);
        } catch (e) {
            console.log("Error getting licenses:", e.message);
            setError(e.message);
        }
    }

    useEffect(() => {
        getLicenses();
    }, []);

    const handleLicenseChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedLicense(selectedValue);
        onLicenseChange(selectedValue);
    };

    return (
        <>
        <label htmlFor="licenses">License</label>
        <select name="licenses" id="licenses" value={selectedLicense} 
        onChange={handleLicenseChange}>
            <option value="all">All</option>
            {licensesList.map((license) => {
                return <option key={license.key} value={license.key}>{license.name}</option>
            })}
        </select>
        </>
    );
};

export default LicensesOptions;