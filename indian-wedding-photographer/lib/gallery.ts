export type GalleryItem = {
  title: string;
  category: string;
  image: string;
};

export const GALLERY: GalleryItem[] = [
  { title: "Golden Hour", category: "Haldi", image: "/images/grid-haldi-1.jpg" },
  { title: "Henna Detail", category: "Mehendi", image: "/images/grid-mehendi-1.jpg" },
  { title: "Dance Floor", category: "Sangeet", image: "/images/grid-sangeet-1.jpg" },
  { title: "The Phere", category: "Wedding", image: "/images/grid-wedding-1.jpg" },
  { title: "First Look", category: "Wedding", image: "/images/grid-wedding-2.jpg" },
  { title: "Grand Entrance", category: "Reception", image: "/images/grid-reception-1.jpg" },
  { title: "Portrait Study", category: "Couple", image: "/images/grid-portrait-1.jpg" },
];
