import { useEffect, useState } from 'react';
import Card from './Card';
import api from '../utils/api';

function Main(props) {

  const { onEditProfile, onAddPlace, onEditAvatar, onCardClick } = props

  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);

  // Получение данных о пользователе и карточки с сервера
  useEffect(() => {
    api.getUserInfo()
    .then((user) => {
      setUserName(user.name)
      setUserDescription(user.about)
      setUserAvatar(user.avatar)
    })
    .catch((err) => console.log(err))

    api.getCards()
    .then((cardsData) => {
      setCards(cardsData);
    })
    .catch(err => console.log(err))
  }, [])

	return (
    <main className="content">
      <section className="profile">
        <div className="profile__container-avatar">
          <img className="profile__avatar" src={userAvatar} alt={userName}/>
          <button className="profile__edit-avatar-button" 
            type="button" 
            aria-label="Кнопка редактирования аватара профиля" 
            onClick={() => {onEditAvatar(true)}}>
          </button>
        </div>
        <div className="profile__info">
          <div className="profile__info-edit">
            <h1 className="profile__info-name">{userName}</h1>
            <button className="profile__edit-button" 
              type="button" 
              aria-label="Кнопка редактирования профиля" 
              onClick={() => {onEditProfile(true)}}>
            </button>
          </div>
          <p className="profile__info-description">{userDescription}</p>
        </div>
        <button className="profile__add-button" 
          type="button" 
          aria-label="Кнопка добавления контента" 
          onClick={() => {onAddPlace(true)}}>
        </button>
      </section>

      <section className="elements">
        {cards.map((card) => (
          <Card 
            key={card._id} // название пропса = {значение}
            card={card}
            onCardClick={onCardClick} // название пропса = {значение}
          />
        ))}
      </section>
    </main>
	);
}

export default Main;