import {useState} from 'react';
import Chart1 from './charts/Chart1';
import Chart2 from './charts/Chart2';

const LanguageStats = () => {
    const [loaded, setLoaded] = useState(true);
    const [webPosition, setWebPosition] = useState(null);
    const [className, setClassName] = useState('bttn-material-flat bttn-sm bttn-primary');

    let clName = "language-stats";

    const handleButtonClick = (position) => {
        setWebPosition(position);
    }



    return (
        <>
        <h2>Language Statistics</h2>
        <p>Here you can see the most used languages in the repos you have searched</p>
        <ul>
            <li><button className={className} onClick={() => handleButtonClick('chart1')}>CHART LANGUAGES</button></li>
            <li><button className={className} onClick={() => handleButtonClick('chart2')}>CHART REPOSITORIES</button></li> 
        </ul>
        {webPosition === 'chart1' && <Chart1/>}
        {webPosition === 'chart2' && <Chart2/>}
        </>
    );
}

export default LanguageStats;