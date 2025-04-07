import { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "danger";
interface Props {
  variant?: Variant;
}

export function Button({
  variant = "primary",
  ...properties
}: ComponentProps<"button"> & Props) {
  const variants: Record<Variant, string> = {
    primary:
      "bg-blue-500 hover:bg-blue-700 text-white border-blue-500 hover:border-blue-700",
    danger:
      "bg-red-500 hover:bg-red-700 text-white border-red-500 hover:border-red-700",
    secondary:
      "bg-gray-800 hover:text-white hover:bg-gray-700 text-gray-400 border-gray-400",
  };

  return (
    <button
      {...properties}
      className={`${properties?.className ?? ""} ${variants[variant]} hover:cursor-pointer min-w-20 w-fit rounded py-1 px-4 font-bold border`}
    />
  );
}
