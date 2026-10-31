import LegalLayout from '../components/LegalLayout';

const sections = [
  {
    id: 'orders',
    title: 'Orders and reservations',
    body: [
      'An order is a request to purchase and is subject to stock confirmation, payment verification and branch review. We may contact you to confirm details before processing.',
      'Pickup reservations are held for 24 hours unless another period is agreed. Unclaimed reservations may be released so stock can be offered to other customers.',
    ],
  },
  {
    id: 'pricing',
    title: 'Prices and product information',
    body: [
      'Prices are shown in Philippine pesos and may change without prior notice. Product images are illustrative; generated visuals in this prototype are not photographs of the exact unit.',
      'We aim to keep specifications and stock accurate, but occasional errors may occur. If a pricing or availability error affects your order, we will contact you before charging or releasing the item.',
    ],
  },
  {
    id: 'payments',
    title: 'Payments',
    body: [
      'Available payment methods are displayed at checkout and may vary by branch. This prototype does not process real payments.',
      'For bank or e-wallet transfers, proof of payment may be requested. Orders are released only after payment is verified.',
    ],
  },
  {
    id: 'delivery',
    title: 'Pickup and delivery',
    body: [
      'Local delivery within Balanga is free for orders over ₱15,000. Delivery outside the covered area may incur a fee confirmed by our team.',
      'Delivery windows are estimates, not guaranteed times. Someone must be available to receive and inspect the order. Report visible shipping damage at the time of delivery.',
    ],
  },
  {
    id: 'returns',
    title: 'Returns, warranty and repairs',
    body: [
      'Unopened items may be returned within 7 days with a receipt, subject to inspection. Defective items are covered by the applicable manufacturer warranty. Change-of-mind returns may incur a restocking fee.',
      'Warranty does not cover physical damage, liquid damage, unauthorized repairs, or damage from improper use. Repair diagnostics are free, but work begins only after you approve the quote.',
    ],
  },
  {
    id: 'credit',
    title: 'Home Credit and installments',
    body: [
      'Installment calculators on this site are estimates only. Interest, fees, down payment and approval are determined by Home Credit or the relevant lender.',
      'Submitting an online estimate does not create a credit application or guarantee approval. Official applications are completed with the lender and may require identification, income documents and a co-borrower.',
    ],
  },
  {
    id: 'accounts',
    title: 'Accounts and acceptable use',
    body: [
      'You are responsible for keeping account credentials confidential and for activity under your account. Do not attempt to disrupt the site, scrape it at scale, or submit false information.',
      'Account features are intentionally stubbed in this prototype. Guest checkout and local storage remain available.',
    ],
  },
  {
    id: 'content',
    title: 'Intellectual property',
    body: [
      'The TNC Tech Hub name, logo, site design and original written content belong to their respective owners. Third-party brand names and product marks belong to their respective companies.',
      'You may share product links for personal, non-commercial use. Do not reproduce site content for commercial purposes without permission.',
    ],
  },
  {
    id: 'liability',
    title: 'Limitation of liability',
    body: [
      'To the extent allowed by law, TNC Tech Hub Balanga is not liable for indirect or consequential losses arising from site use, delivery delays, or products modified or misused by the customer.',
      'Nothing in these terms removes rights that cannot be waived under applicable Philippine consumer law.',
    ],
  },
  {
    id: 'changes',
    title: 'Changes and contact',
    body: [
      'We may update these terms as services change. The updated date at the top reflects the latest revision. Continued use of the site means you accept the revised terms.',
      'Questions? Email hello@tnctechhub.ph or visit Calero St., Ibayo, Balanga City, Bataan, daily from 10:00 AM to 6:30 PM.',
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalLayout
      eyebrow="The fine print, in plain language"
      title="Terms of Service"
      updated="January 2026"
      intro="These terms cover orders, payments, delivery, warranty and use of this website. By shopping with TNC Tech Hub Balanga, you agree to these terms."
      sections={sections}
    />
  );
}
