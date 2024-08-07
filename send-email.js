// functions/send-email.js
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = async (event, context) => {
  const { name, email, complaint } = JSON.parse(event.body);

  const msg = {
    to: 'your-email@example.com', // Replace with your email
    from: 'no-reply@yourdomain.com', // Replace with your verified sender
    subject: `New Complaint from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nComplaint:\n${complaint}`,
  };

  try {
    await sgMail.send(msg);
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
