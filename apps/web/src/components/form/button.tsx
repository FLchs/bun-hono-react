import { ComponentProps } from "react";

export const Button = (properties: ComponentProps<"button">) => {
  return (
    <button
      {...properties}
      className="bg-blue-700 hover:bg-blue-800 text-white p-2 rounded w-fit"
    />
  );
};
