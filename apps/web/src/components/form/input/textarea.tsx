interface TextInputProperties extends React.ComponentProps<"textarea"> {
  title?: string;
}

export const TextArea = (properties: TextInputProperties) => {
  const { title, ...inputProperties } = properties;

  return (
    <div className="w-full flex flex-col gap-1">
      <label htmlFor={inputProperties.id}>{title}</label>
      <textarea
        rows={5}
        {...inputProperties}
        className="w-full block bg-gray-700 text-white p-1 rounded border-gray-900 border-1 focus:ring-0 focus:outline-0 focus:border-blue-500 resize-none"
      />
    </div>
  );
};
