import React from "react";

export default function ProgressStep({
    icon,
    label,
    isActive = false,
    secondaryIcon
  }) {
  return <div> <section className="flex flex-col text-base leading-none text-center text-indigo-800">
  <div className="flex gap-5 justify-between self-end">
    <img
      src={icon}
      className="object-contain shrink-0 w-12 rounded-full aspect-[1.02]"
      alt={`${label} icon`}
    />
    {secondaryIcon && (
      <img
        src={secondaryIcon}
        className="object-contain shrink-0 my-auto w-6 aspect-square"
        alt="Secondary icon"
      />
    )}
  </div>
  <p className={`mt-2${!secondaryIcon ? '.5' : ''}`}>
    {label}
  </p>
</section></div>;
}
