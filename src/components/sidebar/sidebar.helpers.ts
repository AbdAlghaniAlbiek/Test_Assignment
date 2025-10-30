import { IAppSidebarCollapsedGroupItemsProps } from './sidebar';

export function instanceOfIAppSidebarCollapsedGroupItemsProps(
  object: any,
): object is IAppSidebarCollapsedGroupItemsProps {
  return 'defaultIsOpen' in object;
}
