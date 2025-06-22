
export default async function doSearch(search) {
    let type = "autocomplete"
    let respdata = null
    const response = await
        fetch(`http://localhost:8080/api/search?query=${search}&type=${type}`, {
            method: "GET",
            credentials: "include"
        }).then(response => response.json())
            .then(data => {
                respdata = data
            })
    return respdata



}