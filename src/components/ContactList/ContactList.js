

export const ContactList = ({contacts, onDelete}) => {
return(  

    <>    <h2>Contacts</h2>
    

<ul>
    {contacts.map(contact => (
            
      <li key={contact.id}>
        {contact.name}: {contact.number}{' '}
        <button
          type="submit"
          onClick={() => {
            onDelete(contact.id);
          }}
        >
          Delete
        </button>
        
      </li>
    ))}
  </ul></>

)

};
