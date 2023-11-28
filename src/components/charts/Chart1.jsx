import { useEffect, useState } from "react";
import React from 'react';
import Plot from 'react-plotly.js';

const Chart1 = () => {
    const [repoList, setRepoList] = useState([]);
    const [error, setError] = useState("");

    let className = "chart1";

    useEffect(() => {
        getThousandRepos();
      } , []);

      const getThousandRepos = async () => {
        try {
          const data = await fetch('https://api.github.com/search/repositories?q=stars:%3E2000&sort=stars&order=desc&page=1&per_page=100');
          const results = await data.json();
          
          setRepoList(results.items);
            console.log("RepoList:", repoList);
        } catch (e) {
          setError("Algo salió mal...");
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

        const chartData = [{
            type: 'bar',
            x: languageCount.map(l => l.language),
            y: languageCount.map(l => l.count),
            marker: {
                color: 'rgb(142,124,195)'
            }
        }];
        const layout = {
            title: 'Most Used Languages',
            xaxis: {
                title: 'Language'
            },
            yaxis: {
                title: 'Number of Repositories'
            }
        };
      class MostUsed1000 extends React.Component {
        

        render() {
          return (
            <div>
      {error && <p>{error}</p>}
      <Plot data={chartData} layout={layout} />
    </div>
          );
        }
      }

    return (
        <>
        <h3>Chart 1</h3>
        <p>Here you can see the most used languages in the repos you have searched</p>
        <MostUsed1000/>
        </>
    );
}

export default Chart1;