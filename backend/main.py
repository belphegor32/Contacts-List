from flask import request, jsonify
from config import app, db
from models import Contact

@app.route("/create_contact", methods=["POST"])
def create_contact():
    first_name = request.json.get("firstName")
    last_name = request.json.get("lastName")
    email = request.json.get("email")
    phone_number = request.json.get("phone_number")

    if not first_name or not last_name or not email or not phone_number:
        return (jsonify({"message": "You must include all the information"}), 400)
    
    new_contact = Contact(first_name=first_name, last_name=last_name, email=email, phone_number=phone_number)
    try:
        db.session.add(new_contact)
        db.session.commit()
    except Exception as exc:
        return (jsonify({"message": str(exc)}), 400)

    return (jsonify({"message": "User was created"}), 201)

@app.route("/update_contact/<int:user_id>", methods=["PATCH"])
def update_contact(user_id):
    contact = Contact.query.get(user_id)
    
    if not contact:
        return jsonify({"message": "User was not found"}), 404

    contact_data = request.json
    contact.first_name = contact_data.get("firstName", contact.first_name)
    contact.last_name = contact_data.get("lastName", contact.last_name)
    contact.email = contact_data.get("email", contact.email)
    contact.phone_number = contact_data.get("phone_number", contact.phone_number)

    db.session.commit()

    return (jsonify({"message": "User was updated."}), 200)

@app.route("/delete_contact/<int:user_id>", methods=["DELETE"])
def delete_contact(user_id):
    contact = Contact.query.get(user_id)
    
    if not contact:
        return (jsonify({"message": "User was not found"}), 404)

    db.session.delete(contact)
    db.session.commit()

    return jsonify({"message": "User was deleted"}), 200

@app.route("/contacts", methods=["GET"])
def get_contacts():
    contacts = Contact.query.all()
    json_contacts = list(map(lambda x: x.to_json(), contacts))
    return jsonify({"contacts": json_contacts})

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    
    app.run(debug=True)