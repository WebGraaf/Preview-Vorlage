import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests are allowed' });
  }

  const { vorname, nachname, email, telefon, geburtsdatum, klasse, starttermin, nachricht } = req.body;

  const plainTextBody = `
    Neue Anmeldung erhalten:

    Persönliche Informationen:
    -------------------------
    Vorname: ${vorname || 'N/A'}
    Nachname: ${nachname || 'N/A'}
    E-Mail: ${email || 'N/A'}
    Telefon: ${telefon || 'N/A'}
    Geburtsdatum: ${geburtsdatum || 'N/A'}

    Kursdetails:
    ------------
    Gewünschte Klasse: ${klasse || 'N/A'}
    Gewünschter Starttermin: ${starttermin || 'N/A'}

    Zusätzliche Nachricht:
    ----------------------
    ${nachricht || 'Keine Nachricht hinterlassen.'}
  `;

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2 style="color: #333;">Neue Anmeldung über Ihre Webseite</h2>
      <p>Sie haben eine neue Fahrschul-Anmeldung erhalten. Hier sind die Details:</p>
      
      <h3 style="border-bottom: 2px solid #eee; padding-bottom: 5px; color: #555;">Persönliche Informationen</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr style="background-color: #f9f9f9;">
          <td style="padding: 8px; border: 1px solid #ddd; width: 30%;"><strong>Vorname:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${vorname || 'N/A'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Nachname:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${nachname || 'N/A'}</td>
        </tr>
        <tr style="background-color: #f9f9f9;">
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>E-Mail-Adresse:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${email || 'N/A'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Telefonnummer:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${telefon || 'N/A'}</td>
        </tr>
        <tr style="background-color: #f9f9f9;">
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Geburtsdatum:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${geburtsdatum || 'N/A'}</td>
        </tr>
      </table>

      <h3 style="border-bottom: 2px solid #eee; padding-bottom: 5px; color: #555; margin-top: 20px;">Kursdetails</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr style="background-color: #f9f9f9;">
          <td style="padding: 8px; border: 1px solid #ddd; width: 30%;"><strong>Gewünschte Klasse:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${klasse || 'N/A'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Gewünschter Starttermin:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${starttermin || 'N/A'}</td>
        </tr>
      </table>

      <h3 style="border-bottom: 2px solid #eee; padding-bottom: 5px; color: #555; margin-top: 20px;">Zusätzliche Nachricht</h3>
      <div style="padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9; border-radius: 5px;">
        <p style="margin: 0;">${nachricht || 'Keine Nachricht hinterlassen.'}</p>
      </div>
    </div>
  `;

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: Number(process.env.EMAIL_PORT) === 465, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    const mailOptions1 = {
      from: `"Anmeldeformular Fahrschule [Hier Fahrschulname]" <${process.env.EMAIL_USER}>`,
      to: 'info@pflanzen-verstehen.de', // Main recipient
      subject: `Neue Anmeldung von ${vorname} ${nachname}`,
      text: plainTextBody,
      html: htmlBody,
    };

    const mailOptions2 = {
      from: `"Anmeldeformular Fahrschule [Hier Fahrschulname]" <${process.env.EMAIL_USER}>`,
      to: 'neue-anmeldung@deine-fahrschul-website.de', // BCC recipient for notification
      subject: 'Neue Anmeldung',
      text: 'Eine neue Anmeldung ist eingegangen.',
      html: '<p>Eine neue Anmeldung ist eingegangen.</p>',
    };

    const emailsToSend = [
      transporter.sendMail(mailOptions1),
      transporter.sendMail(mailOptions2)
    ];

    const results = await Promise.allSettled(emailsToSend);

    const failedEmails = results.filter(result => result.status === 'rejected');

    if (failedEmails.length > 0) {
      console.error('Failed to send one or more emails:', failedEmails);
      if (failedEmails.length < results.length) {
        res.status(207).json({ message: 'One or more emails failed to send, but others succeeded.' });
      } else {
        throw new Error('All emails failed to send.');
      }
    } else {
      res.status(200).json({ message: 'Emails sent successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error sending email' });
  }
}