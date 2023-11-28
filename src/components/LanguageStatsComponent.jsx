import {useState} from 'react';
import Chart1 from './charts/Chart1';
import Chart2 from './charts/Chart2';

const LanguageStats = () => {
    const [loaded, setLoaded] = useState(true);
    const [webPosition, setWebPosition] = useState(null);
    let className = "language-stats";

    const handleButtonClick = (position) => {
        setWebPosition(position);
    }



    return (
        <>
        <h2>Language Statistics</h2>
        <p>Here you can see the most used languages in the repos you have searched</p>
        <ul>
            <li><button onClick={() => handleButtonClick('chart1')}>CHART 1</button></li>
            <li><button onClick={() => handleButtonClick('chart2')}>CHART 2</button></li> 
        </ul>
        {webPosition === 'chart1' && <Chart1/>}
        {webPosition === 'chart2' && <Chart2/>}
        </>
    );
}

export default LanguageStats;