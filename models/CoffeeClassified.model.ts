export type Roast = "light" | "medium" | "dark";
export type Quality = "ok" | "good" | "great" | "best";

export interface CoffeeClassified {
  name: string; // short text
  description: string; // long text
  price: number; // short text
  roastDate: string | null; // date
  image: string | null; // image
  roast: Roast; // radio
  quality: Quality;
  caffeineContent: number; // slider
  isOrganic: boolean; // checkbox
}

// long text, short text, date, image, radio, checkbox, select, slider
