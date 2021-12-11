import React, {useState, useEffect} from 'react'

const WordState = {
    CORRECT: "CORRECT",
    INCORRECT: "INCORRECT",
    UNOBSERVED: "UNOBSERVED"
}

const RaceMe = () => {
    const [corpus, setCorpus] = useState([])
    const [inputValue, setInputValue] = useState("")

    useEffect(() => {
        // TODO: Fetch corpus from backend
        // Convert corpus to [{word: state}]
        const fetchedCorpus = "I like music."
        const newCorpus = []
        for (const word of fetchedCorpus.split(" ")) {
            newCorpus.push({word: word, state: WordState.UNOBSERVED})
        }

        setCorpus(newCorpus)
    }, [])

    const checkInputValue = (inputValue) => {
        setInputValue(inputValue)
        
    }

    return (
        <div>
            {corpus.map((word, wordIdx) => {
                if (word.state === "UNOBSERVED") {
                    return <p>{word.word}</p>
                } else if (word.state === "CORRECT") {
                    return <p className="text-green-300">{word.word}</p>
                } else {
                    return <p className="text-red-300">{word.word}</p>
                }
            })}
            <div>
            <input className="bb-1" value={inputValue} onChange={(e) => checkInputValue(e.target.value)}/>
            </div>
        </div>
    )
}

export default RaceMe
