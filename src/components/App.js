import React from 'react';
import { useState, useEffect } from 'react';
import '../index.css';
import api from '../utils/api'
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import CurrentUserContext from '../contexts/CurrentUserContext';
import AddPlacePopup from './AddPlacePopup';

function App() {

  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);

  const [deletedCard, setDeletedCard] = useState({})
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Получение данных о пользователе и карточки с сервера
  useEffect(() => {
    api.getUserInfo()
    .then(user => setCurrentUser(user))
    .catch(err => console.log(err))

    api.getCards()
    .then(cardsData =>
      setCards(cardsData))
    .catch(err => console.log(err))
  }, [])
  

  const handleEditAvatarClick = () => {
    setisEditAvatarPopupOpen(true);
  }

  const handleEditProfileClick = () => {
    setisEditProfilePopupOpen(true);
  }

  const handleOpenAddPlace = () => {
    setisAddPlacePopupOpen(true);
  }

  const handleOpenConfirm = () => {
    setIsConfirmPopupOpen(true);
  }

  function closeAllPopups() {
    setisEditAvatarPopupOpen(false);
    setisEditProfilePopupOpen(false);
    setisAddPlacePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setSelectedCard({});
  }

  // функция по проверке лайков и их постановкой и удаления
  function handleCardLike(card) {
    const isLiked = card.likes.some(user => user._id === currentUser._id); // Снова проверяем, есть ли уже лайк на этой карточке

    // Отправляем запрос в API и получаем обновлённые данные карточки
    // добавляем лайк
    api.updateLikes(card._id, isLiked)
      .then((newCard) => {
        setCards((cards) => cards
        .map((c) => c._id === card._id ? newCard : c))
      })
      .catch(err => console.log(err))
  }

  function handleCardDelete(card) {
    // открытие модального окна подтверждения удаления    
    handleOpenConfirm()
    // назначаем удаляемую карточку
    setDeletedCard(card)
  }

  function handleUpdateUser(newUserInfo) {
    setIsLoading(true);
    api.editProfile(newUserInfo)
      .then(data => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))
  }

  function handleUpdateAvatar(newAvatar) {
    setIsLoading(true);
    api.editProfileAvatar(newAvatar)
      .then(avatar => {
        setCurrentUser(avatar);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))
  }

  function handleAddPlaceSubmit(cardsData) {
    setIsLoading(true);
    api.createCard(cardsData)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))
  }

  return (
    <CurrentUserContext.Provider value={currentUser} >
      <div className='page'>
        <Header />
        <Main 
          cards={cards}
          onEditAvatar={handleEditAvatarClick} 
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleOpenAddPlace}
          onCardClick={setSelectedCard}
          onCardLike={handleCardLike} // добавление и удаление лайков 
          onCardDelete={handleCardDelete} // удаление карточек
        />
        <Footer />
        
        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen}
          onUpdateAvatar={handleUpdateAvatar}
          onLoading={isLoading}
          onClose={closeAllPopups}
        />

        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen}
          onUpdateUser={handleUpdateUser}
          onLoading={isLoading}
          onClose={closeAllPopups}
        />

        <AddPlacePopup 
          isOpen={isAddPlacePopupOpen}
          onAddPlace={handleAddPlaceSubmit}
          onLoading={isLoading}
          onClose={closeAllPopups}
        />

        <ConfirmDeletePopup
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          deletedCard={deletedCard}
          setCards={setCards}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
