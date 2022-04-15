import React, {
  forwardRef,
  useCallback,
  useRef,
  useState,
  KeyboardEvent,
  MouseEvent,
  ChangeEvent,
  Ref,
} from "react";
import { useClickOutside } from "./hooks";
import { List } from "./List";
import { AutocompletePureProps } from "./types";

const DEFAULT_ITEM_INDEX = -1;

function InnerAutocompletePure<Item>(
  {
    id,
    open,
    value,
    label,
    items,
    renderItem,
    renderContainer,
    getSuggestionValue,
    onChange,
    onClickOutside,
    onSelect,
    onInputFocus,
    ...props
  }: AutocompletePureProps<Item>,
  ref: Ref<HTMLInputElement>
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputValue = useRef<string>(value);
  const [highlightedItemIndex, setHighlightedItemIndex] =
    useState<number>(DEFAULT_ITEM_INDEX);

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const { code }: any = event;

    switch (code) {
      case "ArrowDown": {
        event.preventDefault();
        const nextItemIndex = highlightedItemIndex + 1;
        const newItemIndex =
          nextItemIndex === items?.length ? DEFAULT_ITEM_INDEX : nextItemIndex;
        const newValue =
          newItemIndex === DEFAULT_ITEM_INDEX
            ? inputValue.current
            : getSuggestionValue(items?.[newItemIndex]);
        setHighlightedItemIndex(newItemIndex);
        onChange(event, { value: newValue, reason: "ARROW" });
        break;
      }
      case "ArrowUp": {
        event.preventDefault();
        const nextItemIndex = highlightedItemIndex - 1;
        const newItemIndex = items?.length
          ? nextItemIndex < DEFAULT_ITEM_INDEX
            ? items.length - 1
            : nextItemIndex
          : 0;
        const newValue =
          newItemIndex === DEFAULT_ITEM_INDEX
            ? inputValue.current
            : getSuggestionValue(items?.[newItemIndex]);
        setHighlightedItemIndex(newItemIndex);
        onChange(event, { value: newValue, reason: "ARROW" });
        break;
      }
      case "Enter": {
        event.preventDefault();
        const newValue = getSuggestionValue(items?.[highlightedItemIndex]);
        setHighlightedItemIndex(DEFAULT_ITEM_INDEX);
        onChange(event, { value: newValue, reason: "ENTER" });
        break;
      }
      default:
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    inputValue.current = value;
    setHighlightedItemIndex(DEFAULT_ITEM_INDEX);
    onChange(event, { value, reason: "INPUT" });
  };

  const handleItemMouseEnter = useCallback(
    (
      _event: MouseEvent<HTMLLIElement>,
      { itemIndex }: { item?: Item; itemIndex: number }
    ) => {
      setHighlightedItemIndex(itemIndex);
    },
    []
  );

  useClickOutside(containerRef, onClickOutside);

  const listComponent = (
    <List
      items={items}
      highlightedItemIndex={highlightedItemIndex}
      renderItem={renderItem}
      onItemClick={onSelect}
      onItemMouseEnter={handleItemMouseEnter}
    />
  );

  return (
    <div ref={containerRef} className="w-full" style={{ position: "relative" }}>
      <input
        id={id}
        type="text"
        className="peer bg-gray-200 p-2 rounded w-full text-gray-700 focus: outline-none border-b-2 border-gray-300 focus:border-purple-600 transition duration-500"
        placeholder=" "
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        onFocus={onInputFocus}
        autoComplete={"false"}
      />
      <label
        htmlFor={id}
        className="absolute left-2 -top-2.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-2.5 peer-focus:text-gray-600 peer-focus:text-sm"
      >
        {label}
      </label>
      {open &&
        (renderContainer
          ? renderContainer({ list: listComponent })
          : listComponent)}
    </div>
  );
}

export const AutocompletePure = forwardRef(InnerAutocompletePure) as (<
  Item extends object
>(
  // eslint-disable-next-line no-use-before-define
  props: AutocompletePureProps<Item> & { ref?: Ref<HTMLInputElement> }
) => React.ReactElement) & {
  displayName: string;
};

AutocompletePure.displayName = "AutocompletePure";
