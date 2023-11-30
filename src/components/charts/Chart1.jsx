import { useEffect, useState } from "react";
import React from 'react';
import Plot from 'react-plotly.js';

import {getReposFromAPI} from "../utils/apiGitHub.js";

const Chart1 = () => {
    const [repoList, setRepoList] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState("");
    const [className, setClassName] = useState("plotlyContainer");

    useEffect(() => {
        getRepos();
      } , []);

      const getRepos = async () => {
        try {
          const data = await getReposFromAPI();
          setRepoList(data.items);
          setLoaded(true);

        } catch (e) {
          setError('Algo salió mal...');
          console.error(e);
        }
      }
      

    
      const languages = repoList.map(repo => repo.language);
        const uniqueLanguages = Array.from(new Set(languages));
        const languageCount = uniqueLanguages.map(language => {
            return {
                language: language,
                count: languages.filter(l => l === language).length
            }
        });

        languageCount.sort((a, b) => b.count - a.count);

        const chartData = [{
            type: 'bar',
            x: languageCount.map(l => l.language),
            y: languageCount.map(l => l.count),
            marker: {
                color: 'rgb(255, 163, 60)'
            },
            hovertemplate: 'Language: %{x} <br>Number of Repositories: %{y}<extra></extra>'
        }];
        const layout = {
            title: 'Most Used Languages',
            paper_bgcolor:'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            width: 1300,
            height: 500,
            xaxis: {
                title: 'Language',
                tickangle: -45,
                automargin: true,

            },
            yaxis: {
                title: 'Number of Repositories'
            },
            
        };
      class MostUsedLang extends React.Component {
        

        render() {
          return (
            <div className={className} >
      {error && <p>{error}</p>}
      <Plot data={chartData} layout={layout} />
    </div>
          );
        }
      }

    return (
        <>
        <h3>Chart Languages</h3>
        <p>Here you can see the most used languages in the repos you have searched</p>
        {!loaded && <p>Loading...</p>}
        {loaded && <MostUsedLang/>}
        </>
    );
}

export default Chart1;