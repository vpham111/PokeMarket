export default async function doLogin(email, password) {
    let respdata = null
    const response = await
        fetch(`http://localhost:8080/api/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({email, password})
        }).then(response => response.json())
            .then(data => {
                console.log(data);
                respdata = data
            })
    return respdata



}