import { ComponentProps } from "react";

type Variant = "primary" | "secondary";
interface Props {
  variant?: Variant;
}

export function Button({
  variant = "primary",
  ...properties
}: ComponentProps<"button"> & Props) {
  const variants: Record<Variant, string> = {
    primary: "bg-blue-900 hover:bg-blue-800",
    secondary: "bg-red-900 hover:bg-red-800",
  };

  return (
    <button
      {...properties}
      className={`${properties.className} ${variants[variant]} block text-white py-1 rounded w-fit px-4 my-2 cursor-pointer`}
    />
  );
}
