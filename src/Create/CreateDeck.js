//import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
//import {readDeck} from "../utils/api/index";




export default function CreateDeck(){
    return(
    <>
    <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/"><i className="fa-solid fa-house"></i> Home</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
        </ol>
    </nav>
    <form>
        <h1>Create Deck</h1>
        <div className="form-group">
            <label for="controlInput1">Name</label>
            <input type="text" className="form-control" id="controlInput1" placeholder="Deck Name"/>
        </div>
        <div className="form-group">
            <label for="textarea1">Description</label>
            <textarea className="form-control" id="textarea1" rows="3" placeholder="Brief description of the deck"></textarea>
        </div>
        <Link to="/"><input className="btn btn-secondary" type="cancel" value="Cancel"/></Link> 
        <Link to="/decks/:deckId"><input className="btn btn-primary" type="submit" value="Submit"/></Link>
    </form>
    </>

    )
}