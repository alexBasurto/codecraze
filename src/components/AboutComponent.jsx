import {useState} from 'react';

const About = () => {
    const [loaded, setLoaded] = useState(true);
    let className = "about";

    return (
        <>
        <h2>About</h2>
        <p>This is a simple app that allows you to search for repositories on GitHub. You can filter by language and license.</p>
        <p>It also shows you the most used languages in the repos you have searched.</p>
        <p>It is built with React and uses the GitHub API.</p>

        <h3>Libraries</h3>
        <p>This app uses <a href="https://plotly.com/javascript/react/">Plotly </a> to display the language and repositories statistics.</p>
        <p>Plotly is an open-source graphing library for JavaScript. It is free and open-source software subject to the terms of the MIT license.</p>
        <p>Plotly.js is a high-level, declarative charting library. plotly.js ships with over 40 chart types, including 3D charts, statistical graphs, and SVG maps.</p>
        <h3>CSS</h3>
        <p>This app uses <a href="https://bttn.surge.sh/">BTTN CSS</a> for the buttons.</p>
        <p>BTTN CSS is a collection of flat, simple, and stylish buttons for the web.</p>
        <p>BTTN CSS is free and open-source software subject to the terms of the MIT license.</p>
        
        <h3>Author</h3>
        <p>This app was built by <a href="https://basurto.dev">Alex Basurto</a>.</p>
        <p>Find me on <a href="https://github.com/alexBasurto">GitHub</a> and <a href="https://www.linkedin.com/in/alex-basurto/">LinkedIn</a>.</p>
        <p>Check out my <a href="https://alex.basurto.dev">portfolio</a>.</p>
        
        </>
    );
}

export default About;