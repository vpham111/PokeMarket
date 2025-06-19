import styles from "./styles/InfoSection.css"

export default function InfoSection({title, name, change}) {

    return (
        <div className="infosection">
            <p className="title">{title}</p>
            <p className="cardName">{name}</p>
            <p className="perChange">{change}</p>
        </div>
    )
}