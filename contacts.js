const fs = require("fs/promises");
const path = require("path");
const { uid } = require("uid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const getContacts = async () => {
  const data = await fs.readFile(contactsPath);

  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const data = await getContacts();
  const result = data.find(({ id }) => id === contactId);

  return result;
};

const removeContact = async (contactId) => {
  const data = await getContacts();
  const newContacts = data.filter(({ id }) => id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));

  return data.find(({ id }) => id === contactId);
};

const addContact = async (name, email, phone) => {
  const data = await getContacts();
  const newContact = {
    id: uid(),
    name: name,
    email: email,
    phone: phone,
  };
  data.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2), "utf8");

  return newContact;
};

module.exports = {
  getContacts,
  getContactById,
  removeContact,
  addContact,
};
