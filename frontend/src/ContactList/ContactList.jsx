import React from 'react';
import "./contactlist.css"

function ContactList({contacts, updateContact, updateCallback}){
    const onDelete = async (id) => {
        try {
            const options = {
                method: "DELETE"
            }
            const response = await fetch(`http://127.0.0.1:5000/delete_contact/${id}`, options)
            if (response.status === 200) {
                updateCallback()
            } 
            else{
                console.error("Failed to delete")
            }
        }
        catch (error) {
            alert(error)
        }
    }


    return (
    <div className='ContactList'>
    <h2>Contact list</h2>
    <table>
        <thead>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone number</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {contacts.map((contact) => (
                <tr id="contactInfo" key={contact.id}>
                    <td id="contactCell">{contact.firstName}</td>
                    <td id="contactCell">{contact.lastName}</td>
                    <td id="contactCell">{contact.email}</td>
                    <td id="contactCell">{contact.phone_number}</td>
                    <td>
                        <button id="updateBtn" onClick={() => updateContact(contact)}>Update contact</button>
                        <button id="deleteBtn" onClick={() => onDelete(contact.id)}>Delete contact</button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
    </div>)
}

export default ContactList