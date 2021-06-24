import { atom } from "recoil";
import { CoffeeClassified } from "../models/CoffeeClassified.model";

const defaultcoffeeClassifiedAtom: CoffeeClassified = {
  name: "",
  description: "",
  price: 0,
  roastDate: null,
  image: null,
  roast: "light",
  quality: "ok",
  caffeineContent: 0,
  isOrganic: false,
};

export const coffeeClassifiedAtom = atom<CoffeeClassified>({
  key: "coffeeClassified",
  default: defaultcoffeeClassifiedAtom,
});
