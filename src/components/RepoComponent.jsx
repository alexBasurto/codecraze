import { useState } from "react";

const Repo = ({ data }) => {
  const [loaded, setLoaded] = useState(false);
  let className = "repo-card";
  
  const handleClick = () => {
    // Puedes agregar lógica adicional aquí si es necesario
    console.log("Click en el repo:", data.name);
  };

  return (
    <tbody>
    <tr className={className + (loaded ? "" : " hidden")} onClick={handleClick}>
        <td> <a href={data.html_url} target="_blank">{data.name.toUpperCase()}</a></td>
        <td>{data.description}</td>
        <td>{data.language}</td>
        <td>{data.stargazers_count}</td>
        <td>
        <a href={data.owner.html_url} target="_blank"><img src={data.owner.avatar_url} alt="Owner profile" className="ownerMiniature" />{data.owner.login}</a>
        </td>
        <td>{data.owner.type}</td>

      
    </tr>
    </tbody>
  );
}

export default Repo;
