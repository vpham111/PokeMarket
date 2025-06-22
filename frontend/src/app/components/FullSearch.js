'use client'
import styles from './styles/FullSearch.css'
import {useState, useEffect, useRef} from "react";
import {useRouter} from "next/navigation";
import doSearch from "@/app/helpers/doSearch";
import Link from "next/link";

export default function FullSearch() {
    const [search, setSearch] = useState("")
    const [inputValue, setInputValue] = useState("")
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [foundData, setFoundData] = useState([])
    const [selectedIndex, setSelectedIndex] = useState(-1)
    const searchRef = useRef(null);
    const router = useRouter()

    const handleSubmit = (e) => {
        e.preventDefault()
        const params = new URLSearchParams()
        params.append("query", search)
        params.append("type", "full")
        router.push(`/search?${params.toString()}`)

    }

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search)
            console.log("autocompleted initiated")
        }, 300)

        return () => {
            clearTimeout(handler)
        }
    }, [search])

    useEffect(() => {
        if (debouncedSearch.trim() !== "" && debouncedSearch.length >= 3) {
            const fetchData = async () => {
                const results = sessionStorage.getItem(debouncedSearch.trim())
                if (results) {
                    const parsed = JSON.parse(results)
                    console.log("using cache")
                    setFoundData(parsed)
                    return
                }
                console.log("sending request")
                const data = await doSearch(debouncedSearch)
                console.log(data.results)
                sessionStorage.setItem(debouncedSearch.trim(), JSON.stringify(data.results))
                setFoundData(data.results)
            }

            fetchData()
        }
        else {
            setFoundData([])
        }
    }, [debouncedSearch])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setFoundData([]); // hide results
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    return (
        <div style={{marginTop: "1rem"}}>

            <form onSubmit={handleSubmit} className="search-wrapper">
                <div className="search-box">
                    <input
                        type="text"
                        className="search-input"
                        value={inputValue}
                        onChange={(e) => {
                            setInputValue(e.target.value)
                            setSearch(e.target.value);
                            setSelectedIndex(-1);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'ArrowDown') {
                                e.preventDefault();
                                setSelectedIndex((prev) => {
                                    const next = Math.min(prev + 1, foundData.length - 1)
                                    setInputValue(foundData[next]?.name || search)
                                    return next
                                })
                            } else if (e.key === 'ArrowUp') {
                                e.preventDefault();
                                setSelectedIndex((prev) => {
                                    const next = Math.max(prev - 1, 0)
                                    setInputValue(foundData[next]?.name || search)
                                    return next
                                })
                            } else if (e.key === 'Enter' && selectedIndex >= 0) {
                                e.preventDefault();
                                const selected = foundData[selectedIndex];
                                window.location.href = selected.type === 'card'
                                    ? `/card/${selected.id}`
                                    : `/set/${selected.id}`;
                            }
                        }}
                        placeholder="Search here"
                        autoComplete="off"
                    />
                    <button type="submit" className="search-button">🔍</button>
                </div>

                {foundData.length > 0 && (
                    <ul className="autocomplete-dropdown">
                        {foundData.map((item, index) => (
                            <li key={item.id} className={`autocomplete-item ${index === selectedIndex ? 'highlighted' : ''}`}>
                                <Link href={item.setId ? `/card/${item.id}` : `/set/${item.id}`}>
                                    {item.setId
                                        ? `${item.name} - ${item.card_number} (${item.language})`
                                        : `${item.name} (${item.language})`
                                    }                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </form>

        </div>
    )
}