import React,{useEffect, useState} from "react"
import { readCard, readDeck, updateCard } from "../utils/api";
import {Link, useParams, useHistory} from "react-router-dom";


export default function EditCard(){
    const {deckId} = useParams();
    const{cardId}=useParams();
    const initialFormState= {front:"",back:"",}
    const[decks, setDecks] = useState({})
    const[formData, setFormData]=useState({...initialFormState})
    
    const history= useHistory();
    
    const saveHandler = (e) => {
        e.preventDefault();
        async function editCard() {
          try {
            // have formData
            // save formData to updatedCards
            // return back to deckid

              console.log("formData is", formData);
              console.log("deckId is", deckId);
              await updateCard(formData);
            history.push(`/decks/${deckId}`);
          //   console.log("what is the data after", formData);
          } catch (error) {
            if (error.name === "AbortError") {
              // Ignore `AbortError`
              console.log("Aborted");
            } else {
              throw error;
            }
          }
        }
        editCard();
      };

    const inputHandler = ({ target }) => {
        console.log("this is targt", target);
      //   console.log("what is the data before", formData);
        setFormData({ ...formData, [target.name]: target.value });
      //   console.log("what is the data after", formData);
      };

    useEffect(()=>{
        async function getTheDeckToGetCards(){
            const decksInfo= await readDeck(deckId);
            setDecks(decksInfo)
        }
        getTheDeckToGetCards();
    
    },[deckId]);
    useEffect(() =>{
        async function readCardInfo(){
            const cardInfo = await readCard(cardId);
            setFormData(cardInfo)
        }
        readCardInfo();
    },[cardId])
  


    if(decks){
        return(
            <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{decks.name}</Link></li>
                    <li className="breadcrumb-item" aria-current="page">Edit Card {cardId}</li>
                </ol>
            </nav>
            <br/>
                <h4>Edit Card</h4>
                {/* <p>{deck.description}</p> */}
                <form onSubmit={saveHandler}>
                    <div className="form-group">
                        <label htmlFor="frontTextarea">Front</label>
                        <textarea className="form-control" id="front" name="front" rows="3" 
                        placeholder="Front side of card" onChange={inputHandler} value={formData.front}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="backTextarea">Back</label>
                        <textarea className="form-control" id="back" name="back" rows="3" 
                        placeholder="Back side of card" onChange={inputHandler} value={formData.back}
                        ></textarea>
                    </div>
                    <Link to={`/decks/${deckId}`}><button type="button" className="btn btn-secondary">Cancel</button></Link>
                    <button type="submit" className="btn btn-primary" >Save</button>
                </form>
            
            
            </>
        )
       }else{
           return <h4>Loading deck item...</h4>
       }
}
