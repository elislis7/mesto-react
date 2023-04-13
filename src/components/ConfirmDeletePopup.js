import React from 'react';
import PopupWithForm from './PopupWithForm';
import api from '../utils/api'

function ConfirmDeletePopup(props) {
  const { isOpen, onClose, onLoading, deletedCard, setCards } = props;
  
  function handleSubmit(e) {
    e.preventDefault(); // запрещаем работу браузера по умолчанию
      api.deleteCardApi(deletedCard._id)
      .then(() => setCards(state => state.filter(item => item._id !== deletedCard._id)))
      .catch(console.error)
      .finally(() => onClose())
  }

  return (
    <PopupWithForm
      name='confirm'
      title='Вы уверены?'
      buttonText={onLoading ? 'Удаление' : 'Да'}
      isOpen={isOpen}
      onClose={onClose} 
      onSubmit={handleSubmit}
      >
    </PopupWithForm>
  );
}

export default ConfirmDeletePopup;