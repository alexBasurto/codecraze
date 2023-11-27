import {useState} from 'react';

const About = () => {
    const [loaded, setLoaded] = useState(true);
    let className = "about";

    return (
        <>
        <h2>About</h2>
        <p>This is a simple app that allows you to search for repositories on GitHub. You can filter by language and license.</p>
        </>
    );
}

export default About;