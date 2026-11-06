// Total live listings we track. Update this when the database count changes.
export const TOTAL_LISTINGS = 673;

export interface Listing {
  title:    string;
  area:     string;
  priceUsd: string;
  priceIdr: string;
  image:    string;
  specs:    string[];
  points:   string[];
}

export const listings: Listing[] = [
  {
    title: '2 Bed Villa',
    area: 'Pererenan',
    priceUsd: '$250,000',
    priceIdr: 'Rp 4.5B',
    image: '/listings/listing-01.webp',
    specs: ['2 bed', 'Private pool', 'Rooftop ocean view'],
    points: [
      'Around $2,043 per m²',
      '500 m from Lima Beach',
      'Only 5 villas in the complex',
    ],
  },
  {
    title: '2–4 Bed Villa',
    area: 'Nuanu City',
    priceUsd: 'From $600,000',
    priceIdr: 'Rp 10.8B',
    image: '/listings/listing-02.webp',
    specs: ['2–4 bed', 'Leasehold to 2062', 'Handover Q2 2027'],
    points: [
      'Pink-zone tourism land',
      'PBG building permit already issued',
      'Furnished, run by a hotel operator',
    ],
  },
  {
    title: '1 Bed Villa',
    area: 'Cepaka',
    priceUsd: 'From $99,000',
    priceIdr: 'Rp 1.7B',
    image: '/listings/listing-03.webp',
    specs: ['1 bed', '65 m² build', '30 + 20 yr lease'],
    points: [
      'A furnished villa for under $100K',
      '8 minutes from Pererenan',
      'Yellow-zone land: we explain the rental licensing first',
    ],
  },
  {
    title: '2 Bed Villa',
    area: 'Canggu',
    priceUsd: '$562,500',
    priceIdr: 'Rp 10.1B',
    image: '/listings/listing-04.webp',
    specs: ['2 bed', '284 m² build', 'Fully furnished'],
    points: [
      'Lowest-priced villa still available in the complex',
      '20% down, the rest monthly until handover',
      'Price already includes VAT',
    ],
  },
  {
    title: '2 Bed Villa',
    area: 'Tibubeneng, Canggu',
    priceUsd: '$225,000',
    priceIdr: 'Rp 3.1B',
    image: '/listings/listing-05.webp',
    specs: ['2 bed', 'Private pool', '30 yr lease'],
    points: [
      '110 m² villa on a 97 m² plot',
      'Fully furnished, ready to rent out',
      'Payments tied to construction progress',
    ],
  },
  {
    title: '3 Bed Villa',
    area: 'Sanur',
    priceUsd: '$358,000',
    priceIdr: 'Rp 6.5B',
    image: '/listings/listing-06.webp',
    specs: ['3 bed + optional 4th', 'Private pool', '254 m² build'],
    points: [
      'One of 15 villas around a shared garden',
      'Carport and 128 m² of land included',
      'Sanur: the calmer, family side of Bali',
    ],
  },
];

