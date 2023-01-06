import { Component } from "react";
import { nanoid } from 'nanoid';
import { Report } from 'notiflix/build/notiflix-report-aio';

import { Section } from "./Section/Section";
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from "./ContactList/ContactList";
import { Filter } from "./Filter/Filter";

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    name: '',
    number: ''
  };

  addContact = ({ name, number }) => {
    const normalizedName = name.toLowerCase();
    let isAdded = false;

    this.state.contacts.forEach((element) => {
      if (element.name.toLowerCase() === normalizedName) {
        Report.warning(
          'Phonebook Warning',
          'The contact already exists with this name',
          'Okay',
        );
        isAdded = true;
      }
    });

    if (isAdded) {
      return;
    }
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    this.setState((prevState) => ({
      contacts: [...prevState.contacts, contact],
    }));
  };

  deleteContact = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== id),
    }));
  };

  inputFilter = (event) => {
    this.setState({ filter: event.currentTarget.value });
  };

  visibleContact = () => {
    const { filter, contacts } = this.state;
    const normalizeFilter = filter.toLowerCase();

    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizeFilter));
  }

  render() {
    const { filter, contacts } = this.state;
    const filterContact = this.visibleContact();
    return (
      <>
        <Section title="Phonebook">
          <ContactForm onSubmit={this.addContact} />
        </Section>
        <Section title="Contacts">
          {contacts.length > 1 && (
            <Filter value={filter} onChange={this.inputFilter} />
          )}
          {contacts.length > 0 ?
            (<ContactList contacts={filterContact} deleteContact={this.deleteContact} />) : (Report.info('Phonebook Info', 'Contact book is empty!',
              'Okay',
            ))}
        </Section>
      </>
    );
  };

};
