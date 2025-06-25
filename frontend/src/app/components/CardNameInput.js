'use client'
import styles from './styles/CardNameInput.css'
import {useState, useEffect, useRef} from "react";
import {useRouter} from "next/navigation";
import doSearch from "@/app/helpers/doSearch";
import Link from "next/link";

export default function CardNameInput({callback}) {
    const [search, setSearch] = useState("")
    const [inputValue, setInputValue] = useState("")
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [foundData, setFoundData] = useState([])
    const [selectedIndex, setSelectedIndex] = useState(-1)
    const searchRef = useRef(null);
    const router = useRouter()

    const handleSubmit = (e) => {
        e.preventDefault()

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
                    setFoundData(parsed)
                    return
                }
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
            <div className="search-wrapper-sell">
                <div className="search-box-sell">
                    <input
                        type="text"
                        className="search-input-sell"
                        value={inputValue}
                        onChange={(e) => {
                            setInputValue(e.target.value);
                            setSearch(e.target.value);
                            setSelectedIndex(-1);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'ArrowDown') {
                                e.preventDefault();
                                setSelectedIndex(prev => {
                                    const next = Math.min(prev + 1, foundData.length - 1);
                                    setInputValue(foundData[next]?.name || search);
                                    return next;
                                });
                            } else if (e.key === 'ArrowUp') {
                                e.preventDefault();
                                setSelectedIndex(prev => {
                                    const next = Math.max(prev - 1, 0);
                                    setInputValue(foundData[next]?.name || search);
                                    return next;
                                });
                            } else if (e.key === 'Enter' && selectedIndex >= 0) {
                                e.preventDefault();
                                const selected = foundData[selectedIndex];
                                if (callback && typeof callback === 'function') {
                                    callback(selected.id);
                                }
                                setFoundData([]);
                            }
                        }}
                        placeholder="Search here"
                        autoComplete="off"
                    />
                </div>

                {foundData.length > 0 && (
                    <ul className="autocomplete-dropdown-sell">
                        {foundData.map((item, index) => (
                            <li
                                key={item.id}
                                className={`autocomplete-item-sell ${index === selectedIndex ? 'highlighted' : ''}`}
                                onClick={() => {
                                    if (callback && typeof callback === 'function') {
                                        callback(item.id);
                                    }
                                    setInputValue(`${item.name} - ${item.card_number} (${item.language})`)
                                    setFoundData([]);
                                }}
                            >
                                {item.name} - {item.card_number} ({item.language})
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>

    )
}