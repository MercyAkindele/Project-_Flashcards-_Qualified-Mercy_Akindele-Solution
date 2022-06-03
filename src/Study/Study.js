import React, {useEffect, useState} from "react";
import { readDeck } from "../utils/api";
import { Link, useParams } from "react-router-dom";




export default function Study(){
    const {deckId} = useParams();
    const[deck, setDeck]=useState({});
    const[cardIndex, setCardIndex] = useState(0);
    const[flipped, setFlipped] = useState(false)
    
    useEffect(() => {
        async function loadDeck(){
            // console.log("start of loadDeck", deck);
            let response = await readDeck(deckId)
            console.log("response id ", response);
            setDeck(response)
             console.log("end of loadDeck", deck);
        } 
        loadDeck();
    },[deckId])
    const flipHandler = ()=>{
        return(
            setFlipped(!flipped)
        )
    }
    const nextButtonHandler = () =>{
        return(
            setCardIndex(cardIndex + 1),
            setFlipped(!flipped)     
        )
    } 

    if(deck.name && flipped){        
        return(
            <>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/"><i className="fa-solid fa-house"></i> Home</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">{deck.name}/ Study</li>
                    </ol>
                </nav>
                <h1>Study: {deck.name}</h1>
                <div className= "card" style={{ width: "18rem" }}>
                
                    <div className="card-body">
                        {console.log("deck.cards is ", deck.cards)}
                        <h4 className="card-title">Card {cardIndex +1} of {deck.cards.length}</h4>
                        <p className="">{deck.cards[cardIndex].back}</p>
                        <button tyupe="button" className="btn btn-secondary" onClick={flipHandler}>Flip</button>
                        <button type="button" className="btn btn-primary" onClick={nextButtonHandler}>Next</button>
                        
                    </div>
    
                </div>
            </>
            )
    }else if(deck.name && !flipped){
        if (deck.cards.length < 3){
            return (
            <div className="card p-3 mt-3">
                <h4>Not Enough Cards.</h4>
                <p>{`You need at least 3 cards to study. There are ${deck.cards.length} cards in this deck.`}</p>
                <Link to={`/decks/${deck.id}/cards/new`}><button type="button" className="btn btn-primary">Add Cards</button></Link>
            </div>
            )}
        return(
            <>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/"><i className="fa-solid fa-house"></i> Home</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">{deck.name}/ Study</li>
                    </ol>
                </nav>
                <h1>Study: {deck.name}</h1>
                <div className= "card" style={{ width: "18rem" }}>
                
                    <div className="card-body">
                        {console.log("deck.cards is ", deck.cards)}
                        <h4 className="card-title">Card {cardIndex +1} of {deck.cards.length}</h4>
                        <p className="">{deck.cards[cardIndex].front}</p>
                        <button type="button" className="btn btn-primary" onClick={flipHandler}>Flip</button>
                        
                    </div>
    
                </div>
            </>
            )
    }else{
        return <h3>Loading...</h3>
    }
}