import { useRecoilState, useSetRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import { coffeeClassifiedAtom } from "../atoms/coffeeClassifiedAtom";
import Input from "./shared/Input";
import TextArea from "./shared/TextArea";
import FormError from "./shared/FormError";
import { viewAtom } from "../atoms/viewAtom";

interface FormData {
  name: string;
  description: string;
  price: string;
}

export default function FirstStep() {
  const [coffeeState, setCoffeeState] = useRecoilState(coffeeClassifiedAtom);
  const setStep = useSetRecoilState(viewAtom);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit((data) => {
    setCoffeeState({
      ...coffeeState,
      ...data,
      price: parseFloat(data.price),
    });
    setStep("secondPage");
  });

  return (
    <form onSubmit={onSubmit}>
      <h1 className="text-xl font-bold">
        Please enter some information about your coffee
      </h1>
      <Input
        id="name"
        type="text"
        label="Name"
        placeholder="Enter the name of your coffee"
        defaultValue={coffeeState.name}
        {...register("name", { required: true })}
      />
      <FormError error={errors.name} label="Name" />
      <TextArea
        id="description"
        label="Description"
        placeholder="Enter the description of your coffee"
        defaultValue={coffeeState.description}
        {...register("description", { required: true })}
      />
      <FormError error={errors.description} label="Description" />
      <Input
        id="price"
        type="number"
        step="0.01"
        label="Price"
        placeholder="Enter the price of your coffee"
        defaultValue={coffeeState.price}
        {...register("price", {
          required: true,
          pattern: /^(\d*\.)?\d+$/,
        })}
      />
      <FormError error={errors.price} label="Price" />
      <button className="bg-yellow-800 rounded text-white p-3 w-full mt-5">
        Next
      </button>
    </form>
  );
}
