import { memo } from 'react';
import { AutocompletePureListItemProps } from './types';

export function InnerItem<Item>({
  item,
  index,
  isHighlighted,
  onMouseEnter,
  onClick,
  renderItem,
  ...props
}: AutocompletePureListItemProps<Item>) {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <li
      {...props}
      onClick={(event) => onClick(event, { item, itemIndex: index })}
      role="option"
      aria-selected={isHighlighted}
      onMouseEnter={(event) => onMouseEnter(event, { item, itemIndex: index })}
    >
      {renderItem(item, { isHighlighted })}
    </li>
  );
}

export const Item = memo(InnerItem) as typeof InnerItem & { displayName: string };

Item.displayName = 'AutocompletePureListItem';
