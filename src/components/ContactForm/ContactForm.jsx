import { useState } from 'react';

const ContactForm = ({ onAddContact }) => {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
  });

  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    if (formData.name.trim() === '' || formData.number.trim() === '') {
      alert('Te rog completează toate câmpurile!');
      return;
    }
    onAddContact(formData);

    setFormData({
      name: '',
      number: '',
    });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label>
        <h4>Name:</h4>
        <input
          type="text"
          placeholder="Add name....."
          name="name"
          pattern="^[a-zA-Z]+(([' \-][a-zA-Z ])?[a-zA-Z]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={formData.name}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        <h4>Phone number:</h4>
        <input
          type="tel"
          placeholder="Add number....."
          name="number"
          pattern="\+?\d{1,4}[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={formData.number}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <button className="SubmitButton" type="submit">
        Add contact
      </button>
    </form>
  );
};

export default ContactForm;
