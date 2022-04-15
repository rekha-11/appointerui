import {
  MouseEvent,
  ChangeEvent,
  ReactNode,
  KeyboardEvent,
  ComponentPropsWithoutRef,
  FocusEventHandler,
  ComponentPropsWithRef,
} from 'react';

// COMMON
type ListItemHandlerAdditionalData<Item> = { item: Item; itemIndex: number };
type ListItemHandler<Item> = (
  event: MouseEvent<HTMLLIElement>,
  additionalData: ListItemHandlerAdditionalData<Item>,
) => void;

// CUSTOM RENDERS
type RenderItemAdditionalData = { isHighlighted: boolean };
export type RenderItem<Item> = (item: Item, additionalData: RenderItemAdditionalData) => ReactNode;
export type RenderContainer = ({list}: { list: JSX.Element }) => JSX.Element;

// BASE
export type ChangeReason = 'INPUT' | 'ARROW' | 'ENTER';
type OnChangeAdditionalData = { value: string; reason: ChangeReason };

// COMPONENTS PROPS
export interface AutocompletePureProps<Item>
  extends Omit<ComponentPropsWithRef<'input'>, 'onChange' | 'onSelect'> {
  /**
   * If `true`, the item list is shown
   */
  open: boolean;
  label?: string;
  /**
   * The value of the `input`
   */
  value: string;
  /**
   * Array of items
   */
  items: Item[];
  /**
   * Invokes for each entry in `items` to tell how to render each item in list
   * @param {Item} item The item from `items` prop
   * @param {RenderItemAdditionalData} additionalData Additional data for `item` from component
   * @returns {ReactNode}
   */
  renderItem: RenderItem<Item>;
  /**
   * Invokes to get new `value` when using keyboard events
   * @param {Item} item The item from `items` prop
   * @returns {string}
   */
  getSuggestionValue: (item: Item) => string;
  /**
   * Callback fired when the value changes
   * @param {ChangeEvent<HTMLInputElement> | KeyboardEvent<HTMLInputElement>} event The event source of callback
   * @param {OnChangeAdditionalData} additionalData Provides new value and change value reason
   */
  onChange: (
    event: ChangeEvent<HTMLInputElement> | KeyboardEvent<HTMLInputElement>,
    {value, reason}: OnChangeAdditionalData,
  ) => void;
  /**
   * Callback fired when clicked on item in item list
   * @param {MouseEvent<HTMLLIElement>} event The mouse clicking event
   * @param {ListItemHandlerAdditionalData<Item>} additionalData Provides selected `item` and it's index in item list
   */
  onSelect: ListItemHandler<Item>;
  /**
   * Uses to pass classNames to AutocompletePure's components
   */
  /**
   * Invokes to generate `input` element
   * @param {ComponentPropsWithRef<'input'>} props Default input props, must pass to `input` element
   * @returns {JSX.Element} New JSX Element with `input` element
   * @default (props) => <input type="text" {...props} />;
   */
  /**
   * Invokes to generate new element with `list` component
   * @param {RenderContainer} renderContainerData Has `list` component which must pass to new container
   * @returns {JSX.Element} New JSX Element with `list` component
   */
  renderContainer?: RenderContainer;
  /**
   * Invokes when clicking outside of component
   * Can use to change `open` state in callback
   */
  onClickOutside?: (event: Event) => void;
  /**
   * Invokes when `input` has focus
   */
  onInputFocus?: FocusEventHandler<HTMLInputElement>;
}

export interface AutocompletePureListProps<Item> {
  items: Item[];
  highlightedItemIndex: number;
  className?: string;
  itemClassName?: string;
  renderItem: RenderItem<Item>;
  onItemClick: ListItemHandler<Item>;
  onItemMouseEnter: ListItemHandler<Item>;
}

export interface AutocompletePureListItemProps<Item>
  extends Omit<ComponentPropsWithoutRef<'li'>, 'onClick' | 'onMouseEnter'> {
  item: Item;
  index: number;
  isHighlighted: boolean;
  className?: string;
  renderItem: RenderItem<Item>;
  onClick: ListItemHandler<Item>;
  onMouseEnter: ListItemHandler<Item>;
}
