import FeatureCard from "@/app/components/FeatureCard";

export default function FeatureBoard() {

    const featureSymbols =  ['💰', '📈', '🛒', '🚨']
    const featureNames = ["Portfolio Value", "Market Movers", "Buy & Sell", "Alert System"]
    const featureDescriptions = ["Track in real-time", "Find daily winners & losers", "Perfect for collectors", "Never miss opportunities"]
    return (
        <div style={{display: "flex", justifyContent: "center", overflow: "hidden"}}>
            <div
                className="featureBoard"
                style={{
                    display: "grid",
                    gap: "1rem",
                    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                    maxWidth: "900px",
                    width: "100%",
                }}
            >
                {featureNames.map((name, idx) => (
                    <FeatureCard
                        key={idx}
                        style={{display: 'flex', justifyContent: 'center'}}
                        symbol={featureSymbols[idx]}
                        feature={name}
                        description={featureDescriptions[idx]}
                    />
                ))}
            </div>
        </div>
    )
}