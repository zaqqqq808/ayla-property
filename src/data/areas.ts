// Headline market figures for each /invest/<area>/ page, kept in one place so
// every comparison table quotes the same numbers.
export interface AreaSummary {
  name: string;
  href: string;
  entry: string;
  grossYield: string;
  growth: string;
  bestFor: string;
}

export const areas: Record<string, AreaSummary> = {
  canggu: {
    name: 'Canggu',
    href: '/invest/canggu/',
    entry: '$150K–$200K',
    grossYield: '15–20%',
    growth: '3–5× over the last decade',
    bestFor: 'Liquidity and an easy resale',
  },
  pererenan: {
    name: 'Pererenan',
    href: '/invest/pererenan/',
    entry: '$120K–$180K',
    grossYield: '12–16%',
    growth: '50–70% since 2021',
    bestFor: 'Canggu demand for 20–30% less',
  },
  seseh: {
    name: 'Seseh',
    href: '/invest/seseh/',
    entry: '$250K–$280K',
    grossYield: '13–17%',
    growth: '60–90% since 2022',
    bestFor: 'Premium boutique villas and private guests',
  },
  kedungu: {
    name: 'Kedungu',
    href: '/invest/kedungu/',
    entry: 'From $180K, median $245K',
    grossYield: '11–15%',
    growth: '40–70% since 2022',
    bestFor: 'A longer hold with an earlier entry',
  },
  uluwatu: {
    name: 'Uluwatu',
    href: '/invest/uluwatu/',
    entry: '$180K–$250K',
    grossYield: '15–18%',
    growth: 'Clifftop land is finite',
    bestFor: 'Luxury guests and ocean views',
  },
  sanur: {
    name: 'Sanur',
    href: '/invest/sanur/',
    entry: '$150K–$180K',
    grossYield: '8–12%',
    growth: 'Slower and steadier',
    bestFor: 'Steady income from longer stays',
  },
};

export const compareRows = ['Typical entry', 'Gross yield', 'Land growth', 'Best for'];

/** The current area first, then its neighbours, in the shape AreaMarket expects. */
export function compareFor(current: string, neighbours: string[]) {
  return [current, ...neighbours].map((key) => {
    const a = areas[key];
    return {
      name: a.name,
      href: a.href,
      current: key === current,
      values: [a.entry, a.grossYield, a.growth, a.bestFor],
    };
  });
}
