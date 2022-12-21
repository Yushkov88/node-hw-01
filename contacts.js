const fs = require("fs/promises");
const path = require("path");
const { uid } = require("uid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);

  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const data = await listContacts();
  const result = data.find(({ id }) => id === contactId);

  return result || null;
};

const removeContact = async (contactId) => {
  const data = await listContacts();
  const newContacts = data.filter(({ id }) => id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));

  return data.filter(({ id }) => id === contactId)[0] || null;
};

const addContact = async (name, email, phone) => {
  const data = await listContacts();
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
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
