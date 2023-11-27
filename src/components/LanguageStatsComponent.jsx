import {useState} from 'react';

const LanguageStats = () => {
    const [loaded, setLoaded] = useState(true);
    let className = "language-stats";

    return (
        <>
        <h2>Language Statistics</h2>
        <p>Here you can see the most used languages in the repos you have searched</p>
        </>
    );
}

export default LanguageStats;