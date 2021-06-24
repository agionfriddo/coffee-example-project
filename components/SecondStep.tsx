import { useRecoilState, useSetRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import Input from "./shared/Input";
import Select from "./shared/Select";
import FormError from "./shared/FormError";
import { viewAtom } from "../atoms/viewAtom";
import { coffeeClassifiedAtom } from "../atoms/coffeeClassifiedAtom";
import { Roast } from "../models/CoffeeClassified.model";

interface FormData {
  roastDate: string;
  image: FileList;
  roast: Roast;
}

export default function FirstStep() {
  const [coffeeState, setCoffeeState] = useRecoilState(coffeeClassifiedAtom);
  const setStep = useSetRecoilState(viewAtom);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  function validateImageSize(data: FileList) {
    return (
      data[0].size < 200000 ||
      "Image is too large. Please choose an image less than 200 KB."
    );
  }

  function goBack() {
    setStep("firstPage");
  }

  const onSubmit = handleSubmit((data) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(data.image[0]);
    fileReader.onload = () => {
      setCoffeeState({
        ...coffeeState,
        ...data,
        roastDate: new Date(data.roastDate),
        image: fileReader.result as string,
      });
      setStep("thirdPage");
    };
  });

  return (
    <form onSubmit={onSubmit}>
      <h1 className="text-xl font-bold">
        Please enter some information about your coffee
      </h1>
      <Input
        id="roastDate"
        type="date"
        label="Roast Date"
        placeholder="When was this coffee roasted?"
        defaultValue={
          coffeeState.roastDate ? coffeeState.roastDate.toDateString() : ""
        }
        {...register("roastDate", { required: true })}
      />
      <FormError error={errors.roastDate} label="Roast Date" />
      <Input
        id="image"
        label="Image"
        type="file"
        placeholder="Please upload a picture of your coffee"
        defaultValue={coffeeState.image ?? ""}
        accept="image/png, image/jpeg"
        {...register("image", { required: true, validate: validateImageSize })}
      />
      <FormError error={errors.image} label="Image" />
      <p className="mt-5">Please select what type of roast this is:</p>
      <div>
        <input
          type="radio"
          id="light"
          value="light"
          {...register("roast", { required: true })}
        />
        <label className="ml-2" htmlFor="light">
          Light
        </label>
      </div>
      <div>
        <input
          type="radio"
          id="medium"
          value="medium"
          {...register("roast", { required: true })}
        />
        <label className="ml-2" htmlFor="medium">
          Medium
        </label>
      </div>
      <div>
        <input
          type="radio"
          id="dark"
          value="dark"
          {...register("roast", { required: true })}
        />
        <label className="ml-2" htmlFor="dark">
          Dark
        </label>
      </div>

      <FormError error={errors.roast} label="Roast" />

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
