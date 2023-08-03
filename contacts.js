const fs = require("fs/promises")
const path = require("path")
const {nanoid} = require("nanoid")

const contactsPath = path.join(__dirname, "/db/contacts.json")
console.log(contactsPath)

const  listContacts  = async () =>  {
    const allContacts = await fs.readFile(contactsPath)
    return JSON.parse(allContacts) 
  }
  
  const  getContactById = async (contactId) =>  {
    const allContacts = await listContacts()
    const oneContact = allContacts.find(({id}) => contactId === id)
    return oneContact || null
  }
  
  const  addContact = async ({name, email, phone}) =>  {
    // ...твій код. Повертає об'єкт доданого контакту. 
    const allContacts = await listContacts()
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone
    }
    allContacts.push(newContact)
    await fs.writeFile(contactsPath, JSON.stringify(allContacts,null,2))
    return newContact
  }

  const removeContact = async (contactId) =>  {
    const allContacts = await listContacts()
    const index = allContacts.findIndex(({id}) => contactId === id)
    if(index === -1){
        return null
    }
    const [deletedContact] = allContacts.splice(index, 1)
    await fs.writeFile(contactsPath, JSON.stringify(allContacts,null,2))
    return deletedContact
  }
  

  module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact
  }