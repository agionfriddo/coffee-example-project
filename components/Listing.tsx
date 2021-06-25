import Image from "next/image";
import { parse, format } from "date-fns";
import { useRecoilValue } from "recoil";
import { coffeeClassifiedAtom } from "../atoms/coffeeClassifiedAtom";

export default function Listing() {
  const coffeeState = useRecoilValue(coffeeClassifiedAtom);

  function capitalize(input: string) {
    return input[0].toUpperCase() + input.slice(1);
  }

  return (
    <div className="m-3 p-3 border-yellow-800 border-2 shadow-lg rounded-xl relative">
      <div className="flex">
        <Image
          src={coffeeState.image ?? "/coffee.jpg"}
          alt={`The ${coffeeState.name}`}
          width="120px"
          height="120px"
          className="rounded-full"
        />

        <div className="ml-10">
          <h1 className="text-3xl font-bold">{coffeeState.name}</h1>
          <ul>
            <li className="text-xs">{capitalize(coffeeState.roast)} roast</li>
            <li className="text-xs">
              {capitalize(coffeeState.quality)} quality
            </li>
            {coffeeState.roastDate && (
              <li className="text-xs">
                Roasted on{" "}
                {format(
                  parse(coffeeState.roastDate, "yyyy-MM-dd", new Date()),
                  "MM/dd/yyyy"
                )}
              </li>
            )}
            <li className="text-xs">
              {coffeeState.caffeineContent}mg of caffeine per cup
            </li>
            <li className="text-xs">
              {coffeeState.isOrganic && "Organic Roast"}
            </li>
          </ul>
        </div>
      </div>
      <p className="text-xl absolute top-5 right-5 text-yellow-800">
        ${coffeeState.price}
        <br />
      </p>
      <p className="text-md mt-5">{coffeeState.description}</p>
    </div>
  );
}
