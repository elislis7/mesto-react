import React, { useState } from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {

  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  const handleEditAvatarClick = () => {
    setisEditProfilePopupOpen(true);
  }

  const handleEditProfileClick = () => {
    setisEditAvatarPopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setisAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setisEditAvatarPopupOpen(false);
    setisEditProfilePopupOpen(false);
    setisAddPlacePopupOpen(false);
    setSelectedCard({});
  }

  return (
    <div className='page'>
      <Header />
      <Main 
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={setSelectedCard}
      />
      <Footer />
      <PopupWithForm
        name='avatar'
        title='Обновить аватар'
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}>
          <input
            className="popup__input"
            name='avatar'
            id='input-avatar'
            type='url'
            value=''
            placeholder='Ссылка на картинку'
            required
          />
          <span className="avatar-error input-avatar-error" />
      </PopupWithForm>

      <PopupWithForm
        name='profile'
        title='Редактировать профиль'
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}>
          <input
            className="popup__input"
            id='input-name' name="name"
            type="text"
            value="" placeholder="Имя"
            minlength="2" maxlength="40"
            required
          />
          <span className="name-error input-name-error" />
          <input
            className="popup__input"
            id='input-description'
            type="text" name="about"
            value="" placeholder="Имя"
            minlength="2" maxlength="200"
            required
          />
          <span className="description-error input-description-error" />
      </PopupWithForm>

      <PopupWithForm
        name='place'
        title='Новое место'
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}>
          <input
            className="popup__input"
            id='input-title'
            type="text" name="name"
            value="" placeholder="Название"
            minlength="2" maxlength="30"
            required
          />
          <span className="title-error input-title-error" />
          <input 
            className="popup__input"
            id='input-link'
            type="url" name="link"
            value="" placeholder="Ссылка на картинку"
            required
          />
          <span className="link-error input-link-error" />
      </PopupWithForm>

      <PopupWithForm
        name='confirm'
        title='Вы уверены?'>
      </PopupWithForm>

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />
    </div>
  );
}

export default App;
