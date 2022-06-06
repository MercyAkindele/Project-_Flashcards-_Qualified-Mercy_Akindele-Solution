import React from "react";
import {Switch, Route} from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../Home/Home";
import Deck from "../Decks/Deck";
import CreateDeck from "../Create/CreateDeck";
import Study from "../Study/Study";
import DeckItem from "../Decks/DeckItem";
import EditDeck from "../Create/EditDeck";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route path="/decks/:deckId/study">
            <Study/>
          </Route>
          <Route path="/decks/new">
            <CreateDeck/>
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck/>
          </Route>

          <Route path="/decks/:deckId/cards/new">
            <DeckItem/>
          </Route>
          <Route path="/decks/:deckId">
            <Deck />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
