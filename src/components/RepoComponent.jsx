import { useState } from "react";

const Repo = ({ data }) => {
  const [loaded, setLoaded] = useState(false);
  let className = "repo-card";
  
  const handleClick = () => {
    // Puedes agregar lógica adicional aquí si es necesario
    console.log("Click en el repo:", data.name);
  };

  return (
    <article className={className + (loaded ? "" : " hidden")} onClick={handleClick}>
      <h2>{data.name}</h2>
    </article>
  );
}

export default Repo;
