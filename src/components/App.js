import { useState } from 'react';
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

  /* const [urlInput, setUrlInput] = useState('') */
  

  const handleEditAvatarClick = () => {
    setisEditAvatarPopupOpen(true);
  }

  const handleEditProfileClick = () => {
    setisEditProfilePopupOpen(true);
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

  /* const onChangeUrlInput = (e) => setUrlInput(e.target.value) */

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
        buttonText='Сохранить'
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}>
          <input
            className="popup__input"
            name='avatar'
            id='input-avatar'
            type='url'
            placeholder='Ссылка на картинку'
            /* value={urlInput} 
            onChange={onChangeUrlInput} */
            required
          />
          <span className="avatar-error input-avatar-error" />
      </PopupWithForm>

      <PopupWithForm
        name='profile'
        title='Редактировать профиль'
        buttonText='Сохранить'
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}>
          <input
            className="popup__input"
            id='input-name' 
            name="name"
            type="text"
            placeholder="Имя"
            /* value={urlInput} 
            onChange={onChangeUrlInput} */
            minLength={2} maxLength={40}
            required
          />
          <span className="name-error input-name-error" />
          <input
            className="popup__input"
            id='input-description'
            type="text" 
            name="about"
            placeholder="О себе"
            /* value={urlInput} 
            onChange={onChangeUrlInput} */
            minLength={2} maxLength={200}
            required
          />
          <span className="description-error input-description-error" />
      </PopupWithForm>

      <PopupWithForm
        name='place'
        title='Новое место'
        buttonText='Создать'
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}>
          <input
            className="popup__input"
            id='input-title'
            type="text" 
            name="name"
            placeholder="Название"
            /* value={urlInput} 
            onChange={onChangeUrlInput} */
            minLength={2} maxLength={30}
            required
          />
          <span className="title-error input-title-error" />
          <input 
            className="popup__input"
            id='input-link'
            type="url" 
            name="link"
            placeholder="Ссылка на картинку"
            /* value={urlInput} 
            onChange={onChangeUrlInput} */
            required
          />
          <span className="link-error input-link-error" />
      </PopupWithForm>

      <PopupWithForm
        name='confirm'
        title='Вы уверены?'
        buttonText='Да'>
      </PopupWithForm>

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />
    </div>
  );
}

export default App;
