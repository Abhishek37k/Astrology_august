const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, emailHelp, phone, subject, comments } = req.body;

    const msg = {
      to: 'satheeforever01@gmail.com',
      from: 'your-verified-sender@example.com', // Must be verified in SendGrid
      subject: 'Inquiry From Contact Page',
      text: `
        Name: ${name}
        Phone: ${phone}
        Email: ${emailHelp}
        Subject: ${subject}
        Message: ${comments}
        User IP: ${req.headers['x-forwarded-for'] || req.socket.remoteAddress}
      `,
    };

    try {
      await sgMail.send(msg);
      res.status(200).json({ status: 'Success', msg: 'Email sent successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 'Error', msg: 'Failed to send email' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
