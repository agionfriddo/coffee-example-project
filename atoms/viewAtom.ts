import { atom } from "recoil";

type View = "firstPage" | "secondPage" | "thirdPage";

export const viewAtom = atom<View>({
  key: "view",
  default: "firstPage",
});
