
export default function CardDetails({cardNum, cardRarity, language}) {

    return (
        <>
            <p><b>Card Details</b></p>
            <p><b>Card Number / Rarity: </b> {cardNum} / {cardRarity}</p>
            <p><b>Language: </b> {language}</p>
        </>
    )
}