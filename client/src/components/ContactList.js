import React from "react";

// import the Contact component
import Contact from "./Contact";


function ContactList(props) {
  return (
    <div>
      {props.contacts.map(c => <Contact key={c.ContactId} name={c.FirstName} />)}
     </div> 
  ); 
} 

export default ContactList;