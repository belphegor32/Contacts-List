import { useState, useEffect } from 'react'
import './App.css'
import ContactList from './ContactList/ContactList.jsx';
import ContactForm from './ContactForm/ContactForm.jsx';

function App() {
  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentContact, setCurrentContact] = useState({})

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    const response = await fetch("http://127.0.0.1:5000/contacts")
    const data = await response.json()
    setContacts(data.contacts)
  }

  function closeModal(){
    setIsModalOpen(false)
    setCurrentContact({})
  }

  function openCreateModel(){
    if (!isModalOpen) setIsModalOpen(true)
  }

  function update(){
    closeModal()
    fetchContacts()
  }

  function openEditModal(contact){
    if (isModalOpen) return 
    setCurrentContact(contact)
    setIsModalOpen(true)
  }

  return (
    <>
      <ContactList contacts={contacts} updateContact={openEditModal} updateCallback={update}/>
      <button className='CreateContact' onClick={openCreateModel}>Create New Contact</button>
      {
        isModalOpen && <div className='modal'>
          <div className='modal-content'>
            <span className='close' onClick={closeModal}>&times;</span>
            <ContactForm existingContact={currentContact} updateCallback={update}/>
          </div>
        </div>
      }
    </>
  );
}

export default App
