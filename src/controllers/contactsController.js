import { getContacts } from '../services/contactsService.js';
import { getContactById } from '../services/contactsService.js';

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

const routGetContactById = async (req, res) => {
    const { id } = req.params;
    try {
      const contacts = await getContactById(id);
      res.json({
        status: 200,
        message: `Successfully found contact with id ${id}!`,
        data: contacts,
      });
    } catch (error) {
      console.error(error);
      res.status(404).json({
        status: 404,
        message: 'Contact not found',
        error: error.message
      });
    }
  };



export { getAllContacts, routGetContactById };
