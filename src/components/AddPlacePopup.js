import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const { isOpen, onClose, onAddPlace, onLoading } = props;

  const [ placeName, setPlaceName ] = React.useState('');
  const [ placeLink, setPlaceLink ] = React.useState('');

  React.useEffect(() => {
    setPlaceName('');
    setPlaceLink('');
  }, [ isOpen ]);

  function handleSubmit(e) {
    e.preventDefault(); // запрещаем работу браузера по умолчанию
    onAddPlace({
      name: placeName,
      link: placeLink,
    });
  }

  // обработчик изменения инпута обновляет стейт
  function handleChangePlaceName(e) {
    setPlaceName(e.target.value);
  }

  function handleChangePlaceLink(e) {
    setPlaceLink(e.target.value);
  }

  return ( 
    <PopupWithForm
      name='place'
      title='Новое место'
      buttonText={onLoading ? 'Создаю' : 'Создать'}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose} >
        <input
          className="popup__input"
          id='input-title'
          type="text" 
          name="name"
          placeholder="Название"
          value={placeName} 
          onChange={handleChangePlaceName}
          minLength={2} maxLength={30}
          required />
        <span className="title-error input-title-error" />
        <input 
          className="popup__input"
          id='input-link'
          type="url" 
          name="link"
          placeholder="Ссылка на картинку"
          value={placeLink} 
          onChange={handleChangePlaceLink}
          required />
        <span className="link-error input-link-error" />
    </PopupWithForm>
  );
}

export default AddPlacePopup;