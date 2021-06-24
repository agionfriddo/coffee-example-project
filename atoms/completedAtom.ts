import { atom } from "recoil";

export const completedAtom = atom<boolean>({
  key: "completed",
  default: false,
});
