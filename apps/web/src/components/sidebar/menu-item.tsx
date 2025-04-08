import { createLink, LinkComponent } from "@tanstack/react-router";
import { AnchorHTMLAttributes, forwardRef } from "react";

const BasicLinkComponent = forwardRef<
  HTMLAnchorElement,
  AnchorHTMLAttributes<HTMLAnchorElement>
>((properties, reference) => {
  return (
    <a
      ref={reference}
      {...properties}
      className={`${properties.className} block [&.active]:font-bold [&.active]:bg-gray-700 hover:bg-gray-800 px-2 py-1 rounded-lg`}
    />
  );
});

const CreatedLinkComponent = createLink(BasicLinkComponent);

export const MenuItem: LinkComponent<typeof BasicLinkComponent> = (
  properties,
) => {
  return <CreatedLinkComponent preload={"intent"} {...properties} />;
};
