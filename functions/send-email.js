// functions/send-email.js

const formData = require('form-data');
const Mailgun = require('mailgun.js');

const mailgun = new Mailgun(formData);
const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY});

exports.handler = async (event, context) => {
  const { name, email, complaint } = JSON.parse(event.body);

  const data = {
    from: 'no-reply@yourdomain.com', // Replace with your verified sender
    to: 'ctzenocs@gmail.com',         // Updated recipient email address
    subject: `New Complaint from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nComplaint:\n${complaint}`,
  };

  try {
    await mg.messages.create('yourdomain.com', data);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Complaint submitted successfully.' }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send email' }),
    };
  }
};
