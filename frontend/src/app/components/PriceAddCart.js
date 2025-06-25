
export default function Listing({condition, price, seller, qty, id}) {

    return (
        <>
            <p className="cardCondition">{condition}</p>
            <p className="cardPrice">{price}</p>
            <p className="sellerName">{seller}</p>
            <p className="qtyAvailable">{qty}</p>
            <button className="addToCardBtn">Add To Cart</button>
        </>
    )
}