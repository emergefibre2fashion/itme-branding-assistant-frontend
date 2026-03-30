import React, { useState } from 'react';

const FAQS = [
  {
    category: 'Pricing',
    items: [
      {
        q: 'What is the difference between Exhibitor and Non-Exhibitor pricing?',
        a: 'Non-Exhibitor pricing is 25% higher than Exhibitor pricing. If a company is not exhibiting at ITME India 2026, they pay a premium of 25% over the standard exhibitor rate for all branding options.'
      },
      {
        q: 'Are there bulk discounts available?',
        a: 'Yes, ITME offers bulk sale prices which are approximately 40% lower than the standard sale price. These bulk rates apply when purchasing multiple units. Contact the sales team for specific bulk pricing.'
      },
      {
        q: 'What is the maximum discount we can offer?',
        a: 'The maximum allowed discount is 10% off the F2F List Price. The minimum sale price is automatically calculated in the tracker. Any discount beyond 10% needs special approval.'
      },
      {
        q: 'How are F2F List Prices calculated?',
        a: 'F2F List Price = F2F Cost per Unit + 25% Margin. The F2F Cost is the bulk discounted price from ITME (40% off the ITME Sale Price).'
      },
    ]
  },
  {
    category: 'Inventory & Availability',
    items: [
      {
        q: 'What types of branding options are available?',
        a: 'Available branding types include: Pole Branding (2.5x8ft), Wall Hoardings (20x60ft), Pathway Cuboids (4x8ft), CFB Bunting (3x15ft), Atrium Hanging Banners (various sizes), Pillar Branding (3x8ft), Entrance Arch Branding, Ceiling Hanging, Fire Exit Branding, Hall Entrance Panels, and Registration Area Branding.'
      },
      {
        q: 'How do I check if a specific unit is available?',
        a: 'Use the AI Assistant (Ask AI page) and ask "Is unit [code] available?" or "Show me available units for [branding type]". You can also check the Branding Tracker Excel for real-time status of each unit code.'
      },
      {
        q: 'What do the status codes mean?',
        a: 'Available = Open for sale | Reserved = Client interested, not yet confirmed/paid | Sold = Payment received, confirmed | F2F Use = Reserved for Fibre2Fashion\'s own branding.'
      },
      {
        q: 'How many total branding units do we have?',
        a: 'We have purchased 94 total branding units across all categories from ITME, with a total investment of approximately Rs 48,42,000.'
      },
    ]
  },
  {
    category: 'Locations & Venue',
    items: [
      {
        q: 'Where is ITME India 2026 being held?',
        a: 'ITME India 2026 will be held at the Bombay Exhibition Centre (BEC) / NESCO, Goregaon, Mumbai from 4th to 9th December 2026.'
      },
      {
        q: 'Which halls have branding opportunities?',
        a: 'Branding is available across multiple areas: Halls 1-17, Mart Area (Gate 1), Atrium near Hall 7, CFB (Conference & Business Forum), Pathways between halls, Registration area, Food Court areas, and all entry gates.'
      },
      {
        q: 'Where are the highest-visibility branding spots?',
        a: 'Highest visibility spots include: Wall Hoardings on Mart Front Wall (visible from Highway), Entrance Arch Branding at gates, Registration Area Branding (all visitors pass through), and Atrium Hanging Banners near Hall 7.'
      },
    ]
  },
  {
    category: 'Process & Booking',
    items: [
      {
        q: 'How do I book a branding unit for a client?',
        a: 'Step 1: Check availability in the AI Assistant or tracker. Step 2: Confirm the client type (Exhibitor/Non-Exhibitor) for pricing. Step 3: Get the unit reserved by updating the tracker. Step 4: Send the PO/invoice. Step 5: Collect creative artwork from the client. Step 6: Get creative approved.'
      },
      {
        q: 'What information do I need from the client?',
        a: 'You need: Company name, Contact person & phone, Exhibitor/Non-Exhibitor status, Preferred branding location(s), PO/Reference number, and Creative artwork in the required size format.'
      },
      {
        q: 'What is the creative approval process?',
        a: 'Once a unit is sold/reserved, the client submits their creative artwork. The creative is reviewed for size compliance and quality. Status is tracked in the "Creative Submitted?" column of the Unit Tracker. All creatives need approval before production.'
      },
    ]
  },
];

function FAQPage() {
  const [openItems, setOpenItems] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const toggleItem = (key) => {
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredFaqs = FAQS.map(cat => ({
    ...cat,
    items: cat.items.filter(item =>
      item.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.a.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(cat => cat.items.length > 0);

  return (
    <div className="faq-page">
      <div className="faq-header">
        <h1>Frequently Asked Questions</h1>
        <p>Quick answers to common questions about ITME 2026 branding inventory</p>
        <div className="faq-search">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="faq-content">
        {filteredFaqs.map((cat, ci) => (
          <div key={ci} className="faq-category">
            <h2>{cat.category}</h2>
            {cat.items.map((item, ii) => {
              const key = `${ci}-${ii}`;
              return (
                <div key={key} className={`faq-item ${openItems[key] ? 'open' : ''}`}>
                  <button className="faq-question" onClick={() => toggleItem(key)}>
                    <span>{item.q}</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      {openItems[key] ? <path d="M18 15l-6-6-6 6"/> : <path d="M6 9l6 6 6-6"/>}
                    </svg>
                  </button>
                  {openItems[key] && (
                    <div className="faq-answer">{item.a}</div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
        {filteredFaqs.length === 0 && (
          <div className="empty-state">No FAQs match your search. Try the AI Assistant for more specific questions.</div>
        )}
      </div>
    </div>
  );
}

export default FAQPage;
