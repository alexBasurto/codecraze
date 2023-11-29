// Aislando la lógica de la API de GitHub en un archivo aparte para poder reutilizarla en otros componentes. Principio DRY (Don't Repeat Yourself)

const getReposFromAPI = async (formData, queryParams) => {
    let query = "";
    if (!queryParams) {
        query =
            "https://api.github.com/search/repositories?q=stars:%3E2000&sort=stars&order=desc&page=1&per_page=100";
    } else {
        query = "https://api.github.com/search/repositories";
        query += `?q=${queryParams.limit}`;
        if (queryParams.name) query += `+${queryParams.name}+in:name`; //ok
        if (queryParams.description)
            query += `+${queryParams.description}+in:description`; //ok
        if (queryParams.owner) query += `+user:${queryParams.owner}`; //ok
        if (queryParams.language) query += `+language:${queryParams.language}`; //ok
        if (queryParams.license) query += `+license:${queryParams.license}`; //ok
        query += `&sort=${queryParams.sort}`;
        query += `&order=${queryParams.order}`;
        query += `&page=${queryParams.page}`;
        query += `&per_page=${queryParams.per_page}`;
    }
    try {
        const response = await fetch(query);
        const data = await response.json();
        return data;
    } catch (error) {
        return error;
    }
};

const getLicensesFromAPI = async () => {
    try {
        const response = await fetch("https://api.github.com/licenses");
        const data = await response.json();
        console.log("Licenses: ", data);
        return data;
    } catch (error) {
        return error;
    }
};

const getLanguagesFromAPI = async () => {
    try {
        const response = await fetch("https://api.github.com/languages");
        const data = await response.json();
        console.log("Languages: ", data);
        return data;
    } catch (error) {
        return error;
    }
}


export {
    getReposFromAPI,
    getLicensesFromAPI,
    getLanguagesFromAPI
  };
  