import {useState} from 'react';

const Welcome = () => {
    const [loaded, setLoaded] = useState(true);
    let className = "welcome";

    return (
        <>
        <h2>Welcome</h2>
        <p>Search for repositories on GitHub</p>
        <p>Filter by language and license</p>
        <p>See the most used languages in the repos you have searched</p>
        </>
    );
}

export default Welcome;