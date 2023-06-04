import React, { useState } from 'react';
import ModalComponent from './modal';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <ModalComponent isOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
};

export default App;
