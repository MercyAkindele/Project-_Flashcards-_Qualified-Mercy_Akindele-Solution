import React, {useEffect, useState} from "react";
import { readDeck } from "../utils/api";
import { Link, useParams ,useHistory} from "react-router-dom";





export default function Study(){
    const {deckId} = useParams();
    const[deck, setDeck]=useState({});
    const[cardIndex, setCardIndex] = useState(0);
    const[flipped, setFlipped] = useState(false)
    const history = useHistory();
    
    function startAgain(){
        setCardIndex(0);
        setFlipped(false);
    }
    useEffect(() => {
        async function loadDeck(){
            // console.log("start of loadDeck", deck);
            let response = await readDeck(deckId)
            console.log("response id ", response);
            setDeck(response)
            //  console.log("end of loadDeck", deck);
        } 
        loadDeck();
    },[deckId])
    const flipHandler = ()=>{
        return(
            setFlipped(!flipped)
        )
    }
    const nextButtonHandler = () =>{
        let isLastCard = cardIndex === deck.cards.length - 1;
        if(isLastCard) { 
            const doYouWantToRestart = window.confirm(
              `Restart cards?\n\nClick cancel to return to the Home page.`
            );
            doYouWantToRestart ? startAgain() : history.push("/");
            
        } else {
            return(
                setCardIndex(cardIndex + 1),
                setFlipped(!flipped)     
            )
        }
        


    } 

    let shouldRenderNotEnoughCards = deck && deck.cards && deck.cards.length < 3;
    let shouldRenderCards = deck && deck.cards && deck.cards.length >= 3;

    if(shouldRenderCards){
        let card = deck.cards[cardIndex];
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
                        {console.log("flipped is ", flipped)}
                        {console.log("deck.cards is ", deck.cards)}
                        <h4 className="card-title">Card {cardIndex +1} of {deck.cards.length}</h4>
                        <p className="">{flipped ? card.back : card.front}</p>
                        <button tyupe="button" className="btn btn-secondary" onClick={flipHandler}>Flip</button>
                    
                        {flipped && <button type="button" className="btn btn-primary" onClick={nextButtonHandler}>Next</button>}
                        
                    </div>
    
                </div>
            </>
        )
    }else if(shouldRenderNotEnoughCards){
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
                        <h4>Not Enough Cards.</h4>
                        <p>{`You need at least 3 cards to study. There are ${deck.cards.length} cards in this deck.`}</p>
                        <Link to={`/decks/${deck.id}/cards/new`}><button type="button" className="btn btn-primary">Add Cards</button></Link>
                    </div>
    
                </div>
            </>
        )
    } else {
        return null;
    }
}