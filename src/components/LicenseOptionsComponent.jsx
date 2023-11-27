import { useState } from "react";
import { useEffect } from "react";

const LicensesOptions = ({onLicenseChange}) => {
    const [licensesList, setLicensesList] = useState([]);
    const [selectedLicense, setSelectedLicense] = useState("all");

    const getLicenses = async () => {
        try {
            const data = await fetch(`https://api.github.com/licenses`);
            const results = await data.json();
            setLicensesList(results);
        } catch (e) {
            console.error(e);
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