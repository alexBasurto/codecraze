import { useEffect, useState } from "react";
import React from 'react';
import Plot from 'react-plotly.js';

const Chart2 = () => {
    const [repoList, setRepoList] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState("");

    let className = "chart2";

    useEffect(() => {
        getRepos();
      } , []);

      const getRepos = async () => {
        try {
          const data = await fetch('https://api.github.com/search/repositories?q=stars:%3E2000&sort=stars&order=desc&page=1&per_page=100');
          const results = await data.json();
          
          setRepoList(results.items);
            console.log("RepoList:", repoList);
            setLoaded(true);
        } catch (e) {
          setError("Algo salió mal...");
          console.error(e);
        }
      } 

        const repoData = repoList.map(repo => {
            return {
                name: repo.name,
                language: repo.language,
                stars: repo.stargazers_count,
                forks: repo.forks_count,
                owner: repo.owner.login,
            }
        });
    
        const languages = repoList.map(repo => repo.language);
        const uniqueLanguages = Array.from(new Set(languages));

        const languageCount = uniqueLanguages.map(language => {
            return {
                language: language,
                count: languages.filter(l => l === language).length
            }
        });

        const stargazers_count = repoList.map(repo => repo.stargazers_count);
        const forks_count = repoList.map(repo => repo.forks_count);

        const chartData = [{
            type: 'bar',
            x: repoData.map(r => r.name),
            y: stargazers_count,
            text: repoData.map(r => r.language),  // Agregado para mostrar el nombre del lenguaje encima de cada barra
            name: 'Stars',
            marker: {
                color: 'rgb(142,124,195)'
            }
        },
        {
            type: 'bar',
            x: repoData.map(r => r.name),
            y: forks_count,
            text: repoData.map(r => r.language),  // Agregado para mostrar el nombre del lenguaje encima de cada barra
            name: 'Forks',
            marker: {
                color: 'rgb(100,100,100)'
            }
        }];

        const layout = {
            barmode: 'stack', // Configurar el modo de apilamiento
            title: 'Stacked Bar Chart | Stars & Forks',
            xaxis: {
                title: 'Repsitories'
            },
            yaxis: {
                title: 'Number of Stars/Forks'
            },
            
        };
      class MostUsedLang extends React.Component {
        

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
        <h3>Chart 2</h3>
        <p>Here you can see the most used languages in the repos you have searched</p>
        {loaded && <MostUsedLang/>}
        </>
    );
}

export default Chart2;