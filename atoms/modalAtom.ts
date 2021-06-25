import { atom } from "recoil";

export const modalAtom = atom<boolean>({
  key: "modal",
  default: false,
});
