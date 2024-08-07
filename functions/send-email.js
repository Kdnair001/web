const formData = require('form-data');
const Mailgun = require('mailgun.js');

const mailgun = new Mailgun(formData);
const mg = mailgun.client({username: 'api', key: '7059d594534e74f577ab5699920b13d9-a26b1841-49c2de18'});

exports.handler = async (event, context) => {
  // Check for the HTTP POST method
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    // Parse the form data from the request body
    const { name, email, complaint } = JSON.parse(event.body);

    // Define the email data
    const data = {
      from: 'no-reply@sandbox0b843e88a4de4c438c932b724b4ab0b9.mailgun.org', // Your sender email
      to: 'ctzenocs@gmail.com', // Your recipient email
      subject: `New Complaint from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nComplaint:\n${complaint}`,
    };

    // Send the email via Mailgun
    await mg.messages.create('sandbox0b843e88a4de4c438c932b724b4ab0b9.mailgun.org', data);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Complaint submitted successfully.' }),
    };
  } catch (error) {
    console.error('Error sending email:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send email' }),
    };
  }
};
