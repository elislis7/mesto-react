import React from 'react';

function Card(card) {

  function handleCardClick() {
    card.onCardClick(card);
  }

  return (
    <article className="element">
      <img className="element__image" src={card.link} alt={card.name} onClick={handleCardClick}/>
      <div className="element__designation">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__container_like">
          <button className="element__heart" 
            type="button" 
            name="button" 
            aria-label="Кнопка сердца">
          </button>
          <p className="element__heart-numbers">{card.likes.length}</p>
        </div>
        <button 
          className="element__trash" 
          type="button" 
          name="button" 
          aria-label="Кнопка удаления">
        </button>
      </div>
    </article>
	);
}

export default Card;