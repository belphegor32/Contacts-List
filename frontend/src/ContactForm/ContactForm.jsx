import {useState} from 'react';
import "./contactform.css"

function ContactForm({existingContact = {}, updateCallback}){
    const [firstName, setFirstName] = useState(existingContact.firstName || "");
    const [lastName, setLastName] = useState(existingContact.lastName || "");
    const [email, setEmail] = useState(existingContact.email || "");
    const [phone_number, setPhoneNumber] = useState(existingContact.phone_number || "");

    const updating = Object.entries(existingContact).length !== 0

    const onSubmit = async (e) => {
        e.preventDefault()

        const data = {
            firstName,
            lastName,
            email,
            phone_number
        }
        const url = "http://127.0.0.1:5000/" + (updating ? `update_contact/${existingContact.id}` : "create_contact")
        const options = {
            method: updating ? "PATCH" : "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(url, options)
        if (response.status !== 201 && response.status !== 200){
            const data = await response.json()
            alert(data.message)
        }
        else{
            updateCallback()
        }
    }

    return (
    <form className="ContactForm" onSubmit={onSubmit}>
        <div id="fillInfo">
            <label htmlFor="firstName">First Name:</label>
            <input type="text" 
            id="firstName" 
            value={firstName} 
            onChange={(e) => setFirstName(e.target.value)}/>
        </div>

        <div id="fillInfo">
            <label htmlFor="lastName">Last Name:</label>
            <input type="text" 
            id="lastName" 
            value={lastName} 
            onChange={(e) => setLastName(e.target.value)}/>
        </div>

        <div id="fillInfo">
            <label htmlFor="email">Email:</label>
            <input type="text" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}/>
        </div>

        <div id="fillInfo">
            <label htmlFor="phone_number">Phone number:</label>
            <input type="text" 
            id="phone_number" 
            value={phone_number} 
            onChange={(e) => setPhoneNumber(e.target.value)}/>
        </div>

        <button id="createBtn" type="submit">{updating ? "Update" : "Create"}</button>
    </form>
    
    );
};

export default ContactForm