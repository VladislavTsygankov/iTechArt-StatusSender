import Mailgun from 'mailgun-js';
import { DOMAIN_NAME, PRIVATE_API_KEY } from '../mailgun-config';

const my_email = 'Uladzislau.Tsyhankou@itechart-group.com';
const form_email = 'vladikmcdonald@gmail.com';

const mailgun = new Mailgun({ apiKey: PRIVATE_API_KEY, domain: DOMAIN_NAME });

var data = {
  from: form_email,
  to: my_email,
  subject: 'Hello',
  text: 'Testing some Mailgun awesomness!',
};

const sendMail = () => {
  mailgun.messages().send(data);
};

export default sendMail;
