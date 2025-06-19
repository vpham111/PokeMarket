import styles from './styles/FeatureCard.css'

export default function FeatureCard({symbol, feature, description}) {

    return (
        <div className="featureCont">
            <div className="featureContInner" style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                <p className="fSymbol">{symbol}</p>
                <div className="text">
                    <p className="fName">{feature}</p>
                    <p className="fDescription">{description}</p>
                </div>
            </div>
        </div>
    )
}