
export default async function doListingCreate(card_id, seller_id, price, quantity, condition) {
    //const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    let respdata = null
    const response = await
        fetch(`http://localhost:8080/api/createListing`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({card_id, seller_id, price, quantity, condition})
        }).then(response => response.json())
            .then(data => {
                console.log(data);
                respdata = data
            })
    return respdata



}