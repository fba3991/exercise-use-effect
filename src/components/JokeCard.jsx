import React, { useState, useEffect } from "react";

const JokeCard = () => {
  // Stati per memorizzare la barzelletta, se è stato cliccato "Answer" e per controllare il reload
  const [joke, setJoke] = useState(""); // Memorizza la barzelletta
  const [click, setClick] = useState(false); // Memorizza se è stato cliccato "Answer"

  // Funzione per ottenere una nuova barzelletta 
  const jokeFetch = async () => {
    try {
      // Effettua una richiesta per ottenere la barzelletta sulla programmazione
      const response = await fetch(
        "https://v2.jokeapi.dev/joke/Programming?type=twopart"
      );
        console.log(response);
      // Se la richiesta non va a buon fine, genera un errore
      if (!response.ok){ //se la risposta non e ok
        throw new Error("Richiesta fallita");
      }

      //  la barzelletta viene memorizzata nello stato 'joke'
      const obj = await response.json();
      setJoke(obj);//update di joke
    } catch (error) {
      console.error("Errore durante la ricerca:", error);
    }
  };

  // Quando il componente viene montato, richiama jokeFetch per ottenere la barzelletta
  useEffect(() => {
    jokeFetch(); // Questa funzione viene chiamata al momento del montaggio del componente
  }, []);

  // Handler per impostare 'click' a 'true' al click del bottone "Answer" e mostra la seconda parte della barzeletta
  const answerClick = () => {
    setClick(true);
  };

  // Handler per ottenere una nuova barzelletta al click del bottone "Reload"
  const reloadClick = () => {
    setClick(false); // Imposta 'click' a 'false' per visualizzare nuovamente solo la prima parte(setup) della barzelletta
    jokeFetch(); // Ottiene una nuova barzelletta/ invocando la funzione
  };

  return (
    <div>
      {/* Verifica se 'joke' è vuoto per mostrare il messaggio "Loading..." */}
      {joke === "" ? (
        "Loading..."
      ) : (
        // Mostra il setup della barzelletta e il bottone "Answer" o "Reload" in base a 'click'
        <div>
          <h2>{joke.setup}</h2>
          {click ? (
            <div>
              <p>{joke.delivery}</p>
              <button onClick={reloadClick}>Reload</button>
            </div>
          ) : (
            <button onClick={answerClick}>Answer</button>
          )}
        </div>
      )}
    </div>
  );
};

export default JokeCard;
