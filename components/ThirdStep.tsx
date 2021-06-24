import { useRecoilState, useSetRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import Select from "./shared/Select";
import Input from "./shared/Input";
import FormError from "./shared/FormError";
import { viewAtom } from "../atoms/viewAtom";
import { coffeeClassifiedAtom } from "../atoms/coffeeClassifiedAtom";
import { Quality } from "../models/CoffeeClassified.model";
import { watch } from "fs";

interface FormData {
  quality: Quality;
  caffeineContent: string;
  isDecaf: boolean;
}

export default function FirstStep() {
  const [coffeeState, setCoffeeState] = useRecoilState(coffeeClassifiedAtom);
  const setStep = useSetRecoilState(viewAtom);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();

  function goBack() {
    setStep("secondPage");
  }

  const onSubmit = handleSubmit((data) => {
    setCoffeeState({
      ...coffeeState,
      ...data,
      caffeineContent: parseFloat(data.caffeineContent),
    });
    setStep("thirdPage");
  });

  return (
    <form onSubmit={onSubmit}>
      <h1 className="text-xl font-bold">
        Please enter some information about your coffee
      </h1>
      <Select
        id="quality"
        label="Quality"
        defaultValue={coffeeState.quality}
        {...register("quality", { required: true })}
      >
        <option value="ok">OK</option>
        <option value="good">Good</option>
        <option value="great">Great</option>
        <option value="best">Best</option>
      </Select>

      <Input
        label="How much caffeine is there in one cup of this roast?"
        type="range"
        min={1}
        max={500}
        defaultValue={coffeeState.caffeineContent}
        {...register("caffeineContent")}
      />
      <p>{watch("caffeineContent")} mg</p>

      <div className="mt-5">
        <input
          id="isDecaf"
          type="checkbox"
          defaultChecked={coffeeState.isDecaf}
          className="mr-2"
          {...register("isDecaf")}
        />
        <label htmlFor="isDecaf">Is this roast decaf?</label>
      </div>
      <button className="bg-yellow-800 rounded text-white p-3 w-full mt-5">
        Next
      </button>
      <button
        className="bg-white rounded text-yellow-800 p-3 w-full mt-5"
        type="button"
        onClick={goBack}
      >
        Back
      </button>
    </form>
  );
}
