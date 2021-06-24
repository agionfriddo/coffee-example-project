import { atom } from "recoil";

export const isCompleted = atom<boolean>({
  key: "completed",
  default: false,
});
