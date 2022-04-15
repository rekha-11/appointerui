import React, { useCallback, useState } from "react";
import {
  AutocompletePureProps,
  RenderItem,
  AutocompletePure,
} from "./AutoCompleteCore";
import { log } from "util";

export type IOption = {
  label: string;
  value: string;
};

const renderItem: RenderItem<IOption> = (item, { isHighlighted }) => (
  <span style={{ fontWeight: isHighlighted ? 700 : 400 }}>{item.label}</span>
);

interface IAutoCompleteProps extends AutocompletePureProps<any> {
  setFieldValue?: any;
  isCloseOnOuterClick?: boolean;
  options?: any;
  label?: string;
  values?: any;
  touched?: any;
  errors?: any;
  setBooleanStates?: any;
}

const FormikAutoComplete = (props: Partial<IAutoCompleteProps>) => {
  const {
    name = "",
    label = "",
    values,
    touched,
    errors,
    setFieldValue,
    options = [],
    isCloseOnOuterClick = true,
    setBooleanStates = [],
  } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<any>([]);
  const [value, setValue] = useState<string>("");

  const getSuggestionValue: any = (item: IOption) => item?.label;

  const fetchItems = (query: string): Promise<IOption[]> => {
    const filteredItems = options.filter(({ label }: any) =>
      label.toLowerCase().includes(query.toLowerCase())
    );

    return new Promise((resolve) => {
      setTimeout(() => resolve(filteredItems), 500);
    });
  };

  // When inpute changes save value.
  // If change reason is type on input then get new items, save them and close dropdown if no new items fetched
  // If change reason is enter keydown then simple close dropdown
  const handleChange: AutocompletePureProps<IOption>["onChange"] = useCallback(
    async (_event, { value, reason }) => {
      setValue(value ? value : "");
      if (reason === "INPUT") {
        const newItems = await fetchItems(value);
        setSuggestions(newItems);
        setIsOpen(Boolean(newItems.length));
      } else if (reason === "ENTER") {
        setIsOpen(false);
      }
    },
    []
  );

  // When item selected then save it and close dropdown
  const handleSelect: AutocompletePureProps<IOption>["onSelect"] = useCallback(
    (_event, { item }) => {
      const value: any = getSuggestionValue(item);
      setValue(value);
      if (setFieldValue) {
        setFieldValue(name, item?.value);
        setBooleanStates.length &&
          setBooleanStates.map((func: any) => func(item?.value));
      }
      setIsOpen(false);
    },
    []
  );

  // Close dropdown when clicked outside of component
  const handleClickOutside = (_event: Event) => {
    if (isCloseOnOuterClick) {
      setIsOpen(false);
    }
  };

  return (
    <div className={"mb-6 rounded  relative"}>
      <AutocompletePure
        id={"autoComplete"}
        open={isOpen}
        value={value}
        label={label}
        items={suggestions}
        renderItem={renderItem}
        getSuggestionValue={getSuggestionValue}
        onChange={handleChange}
        onSelect={handleSelect}
        placeholder={label}
        onClickOutside={handleClickOutside}
      />
      <p className="text-sm text-red-500">{touched && errors?.[name]}</p>
    </div>
  );
};

export default FormikAutoComplete;
