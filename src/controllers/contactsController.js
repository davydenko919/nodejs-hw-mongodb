import { getContacts } from '../services/contactsService.js';

const getAllContacts = async (req, res) => {
  try {
    const contacts = await getContacts();
    res.json({
      status: 200,
      message: "Successfully found contacts!",
      data: contacts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      error: error.message
    });
  }
};


export { getAllContacts };
