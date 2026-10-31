import LegalLayout from '../components/LegalLayout';

const sections = [
  {
    id: 'collect',
    title: 'Information we collect',
    body: [
      'When you place an order or contact us, we may collect your name, email address, mobile number, delivery address, branch preference and order details. For Home Credit applications, the lender collects the required identity and income documents directly.',
      'This prototype stores cart, wishlist, branch, theme and build selections in your browser. It does not transmit form submissions to a server or payment processor.',
    ],
  },
  {
    id: 'use',
    title: 'How we use information',
    body: [
      'We use your information to process orders, confirm stock, arrange pickup or delivery, respond to inquiries, provide warranty and repair support, and improve the store experience.',
      'With your consent, we may send restock alerts, build ideas and local promotions. You can opt out at any time.',
    ],
  },
  {
    id: 'storage',
    title: 'Local storage and cookies',
    body: [
      'This prototype uses browser localStorage to remember your cart, wishlist, branch and theme. It does not use advertising cookies or third-party tracking pixels.',
      'Clearing site data in your browser removes these preferences. On the live site, essential cookies may be used for cart sessions and checkout security.',
    ],
  },
  {
    id: 'sharing',
    title: 'When we share information',
    body: [
      'We may share order details with delivery partners, payment providers, manufacturers or authorized service centers when necessary to complete your order or warranty claim.',
      'For installment applications, information is shared with Home Credit or the relevant lender with your consent. We do not sell personal information.',
    ],
  },
  {
    id: 'retention',
    title: 'Retention and security',
    body: [
      'Order and warranty records are retained for the period required by applicable law, accounting rules and manufacturer warranty terms.',
      'We use reasonable organizational and technical safeguards. No online transmission can be guaranteed to be completely secure, so please avoid sending sensitive documents through the contact form.',
    ],
  },
  {
    id: 'rights',
    title: 'Your choices and rights',
    body: [
      'You may request access, correction, or deletion of personal information, subject to legal and warranty retention requirements. You may also withdraw marketing consent.',
      'To exercise these rights, contact us at hello@tnctechhub.ph or visit any branch. We may need to verify your identity before acting on a request.',
    ],
  },
  {
    id: 'children',
    title: 'Students and minors',
    body: [
      'Students may shop with a parent or guardian. Home Credit applications for minors require a qualified co-borrower. We do not knowingly collect account information from children without guardian involvement.',
    ],
  },
  {
    id: 'contact',
    title: 'Contact us',
    body: [
      'For privacy questions, email hello@tnctechhub.ph or visit TNC Tech Hub Balanga, Calero St., Ibayo, Balanga City, Bataan. Store hours are 10:00 AM–6:30 PM daily.',
      'If this policy changes, we will update the date above and, for material changes, provide a clearer notice on the site.',
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalLayout
      eyebrow="Your data, explained"
      title="Privacy Policy"
      updated="January 2026"
      intro="This policy explains what information TNC Tech Hub Balanga collects, why we collect it, and the choices you have. We keep it as plain as possible."
      sections={sections}
    />
  );
}
