
export default async function doRegister(firstName, lastName, email, password) {
    //const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    let respdata = null
    const response = await
        fetch(`http://localhost:8080/api/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({firstName, lastName, email, password})
        }).then(response => response.json())
            .then(data => {
                console.log(data);
                respdata = data
            })
    return respdata



}