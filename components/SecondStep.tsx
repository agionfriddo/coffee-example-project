import { useRecoilState, useSetRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import { isBefore } from "date-fns";
import Input from "./shared/Input";
import FormError from "./shared/FormError";
import { viewAtom } from "../atoms/viewAtom";
import { coffeeClassifiedAtom } from "../atoms/coffeeClassifiedAtom";
import { Roast } from "../models/CoffeeClassified.model";

interface FormData {
  roastDate: string;
  image: FileList;
  roast: Roast;
}

export default function SecondStep() {
  const [coffeeState, setCoffeeState] = useRecoilState(coffeeClassifiedAtom);
  const setStep = useSetRecoilState(viewAtom);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  function validateImageSize(data: FileList) {
    if (!data[0]) return true;
    return (
      data[0].size < 200000 ||
      "Image is too large. Please choose an image less than 200 KB."
    );
  }

  function validateDate(date: string) {
    return (
      isBefore(new Date(date), new Date()) || "Please select a date in the past"
    );
  }

  function goBack() {
    setStep("firstPage");
  }

  const onSubmit = handleSubmit((data) => {
    if (data.image[0]) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(data.image[0]);
      fileReader.onload = () => {
        setCoffeeState({
          ...coffeeState,
          roast: data.roast,
          roastDate: data.roastDate,
          image: fileReader.result as string,
        });
      };
    } else {
      setCoffeeState({
        ...coffeeState,
        roast: data.roast,
        roastDate: data.roastDate,
      });
    }
    setStep("thirdPage");
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
        defaultValue={coffeeState.roastDate ? coffeeState.roastDate : ""}
        {...register("roastDate", {
          required: true,
          validate: validateDate,
        })}
      />
      <FormError error={errors.roastDate} label="Roast Date" />
      <Input
        id="image"
        label="Image"
        type="file"
        placeholder="Please upload a picture of your coffee"
        accept="image/png, image/jpeg"
        {...register("image", { validate: validateImageSize })}
      />
      {coffeeState.image && (
        <p className="text-sm">Image already set. Click the field to change.</p>
      )}
      <FormError error={errors.image} label="Image" />
      <p className="mt-5">Please select what type of roast this is:</p>
      <div>
        <input
          type="radio"
          id="light"
          value="light"
          defaultChecked={coffeeState.roast === "light"}
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
          defaultChecked={coffeeState.roast === "medium"}
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
          defaultChecked={coffeeState.roast === "dark"}
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
