export type WorkItem = {
  name: string;
  category: string;
  url: string;
  preview: string;
  priceUsd: number;
  priceInr: number;
};

export const WORK: WorkItem[] = [
  { name: "Lumi-Re", category: "Brand Site", url: "https://lumi-re-mocha.vercel.app", preview: "/work/lumi-re.png", priceUsd: 30, priceInr: 2500 },
  { name: "Midnight Melt", category: "Food & Beverage", url: "https://midnight-melt.vercel.app", preview: "/work/midnight-melt.png", priceUsd: 25, priceInr: 2050 },
  { name: "Aurelle", category: "Jewellery / E-commerce", url: "https://aurelle-chi.vercel.app", preview: "/work/aurelle.png", priceUsd: 35, priceInr: 2900 },
  { name: "Aeris", category: "Brand Site", url: "https://aeris-navy.vercel.app", preview: "/work/aeris.png", priceUsd: 28, priceInr: 2300 },
  { name: "Healthy Dibba", category: "Food & Health", url: "https://healthy-dibba.vercel.app", preview: "/work/healthy-dibba.png", priceUsd: 30, priceInr: 2500 },
  { name: "Shagun Hotel", category: "Hospitality", url: "https://shagun-hotel.vercel.app", preview: "/work/shagun-hotel.png", priceUsd: 45, priceInr: 3700 },
  { name: "Gig-IR", category: "Fintech Tool", url: "https://gig-ir.vercel.app", preview: "/work/gig-ir.png", priceUsd: 40, priceInr: 3300 },
];
