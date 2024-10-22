import { getContacts } from '../services/contactsService.js';
import { getContactById } from '../services/contactsService.js';
// import mongoose from 'mongoose';

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

    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //   return res.status(404).send('Contact not found');
    // }

    try {
      const contacts = await getContactById(id);
      if (contacts == null) {
        return res.status(404).send('Contact not found');
      }
      res.json({
        status: 200,
        message: `Successfully found contact with id ${id}!`,
        data: contacts,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };



export { getAllContacts, routGetContactById };
