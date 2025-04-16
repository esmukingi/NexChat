import ContactMessage from '../models/contact.model.js'

export const createContactMessage = async (req, res) => {
    const { name, email, message } = req.body;
  
    // Validate input
    if (!name || !email || !message) {
      res.status(400);
      throw new Error('Please provide all required fields');
    }
  
    // Create new contact message
    const contactMessage = await ContactMessage.create({
      name,
      email,
      message,
    });
  
    res.status(201).json({
      success: true,
      data: contactMessage,
      message: 'Message sent successfully',
    });
  };
  