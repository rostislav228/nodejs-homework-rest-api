const fs = require("fs/promises");
const { v4: uuid } = require("uuid");
const path = require("path");

const contacts = path.join(__dirname, "./contacts.json");

const readFile = async (path) => {
  try {
    const file = await fs.readFile(path);
    const obg = JSON.parse(file);
    return obg;
  } catch (err) {
    console.error(err);
  }
};

const listContacts = async () => {
  return await readFile(contacts);
};

const getContactById = async (contactId) => {
  const file = await readFile(contacts);
  if (!file.some(({ id }) => id === Number.parseInt(contactId))) {
    return false;
  }
  return file.find(({ id }) => id === Number.parseInt(contactId));
};

const removeContact = async (contactId) => {
  const file = await readFile(contacts);
  if (!file.some(({ id }) => id === Number.parseInt(contactId))) {
    return false;
  }
  const newFile = file.filter(({ id }) => id !== Number.parseInt(contactId));
  fs.writeFile(contacts, JSON.stringify(newFile));
  return true;
};

const addContact = async ({ name, email, phone }) => {
  try {
    const id = uuid();
    const newContact = { id, name, email, phone };

    const file = await readFile(contacts);
    const newFile = [...file, newContact];

    fs.writeFile(contacts, JSON.stringify(newFile));
    return newContact;
  } catch (err) {
    console.error(err);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const file = await readFile(contacts);
    const updateContacts = file.map((data) =>
      data.id === Number.parseInt(contactId) ? { ...data, ...body } : data
    );
    fs.writeFile(contacts, JSON.stringify(updateContacts));
    console.log(
      updateContacts.find(({ id }) => id === Number.parseInt(contactId))
    );

    return updateContacts.find(({ id }) => id === Number.parseInt(contactId));
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
