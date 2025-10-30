"use client";

import { ChevronDown, MoreHorizontal, ShowerHeadIcon } from "lucide-react";
import React, { Fragment, ReactNode, useState, useTransition } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarSeparator,
  useSidebar,
} from "../ui/sidebar";
import { Collapsible } from "@/components/ui/collapsible";
import {
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { LogicError } from "@/helpers/errors/exceptions/login.exception";
import { instanceOfIAppSidebarCollapsedGroupItemsProps } from "./sidebar.helpers";
import Link from "next/link";
import { useRouter } from "next/navigation";

//#region DropDown
interface IAppSidebarItemDropDownMenuItem {
  icon: React.ReactNode;
  content: string;
  action: () => void;
}
interface IAppSidebarItemDropDownProps {
  items: IAppSidebarItemDropDownMenuItem[];
}
function AppSidebarItemDropDown({ items }: IAppSidebarItemDropDownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuAction>
          <MoreHorizontal />
        </SidebarMenuAction>
      </DropdownMenuTrigger>

      <DropdownMenuContent side="right" align="start">
        {items.map((dropDownMenuItem, k) => (
          <DropdownMenuItem key={k}>
            <div onClick={() => dropDownMenuItem.action()}>
              {dropDownMenuItem.icon}
              <span>{dropDownMenuItem.content}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
//#endregion

//#region Create Menu Items
interface IAppSidebarMenuItems {
  items: IAppSidebarItemProps[];
  selectedItem: string | undefined;
  setSelectedItem: React.Dispatch<React.SetStateAction<string | undefined>>;
}
function AppSidebarMenuItems({
  items,
  selectedItem,
  setSelectedItem,
}: IAppSidebarMenuItems) {
  return items.map((item, j) => (
    <SidebarMenuItem key={j}>
      <SidebarMenuButton
        asChild
        isActive={selectedItem === item.tag ? true : item?.defaultIsActive}
        onClick={() => setSelectedItem(item.tag)}
      >
        <a href={item.path}>
          {item.icon}
          <span>{item.title}</span>
        </a>
      </SidebarMenuButton>

      {item.badgeValue && (
        <SidebarMenuBadge>{item.badgeValue}</SidebarMenuBadge>
      )}

      {item.dropDownMenuItems && (
        <AppSidebarItemDropDown items={item.dropDownMenuItems} />
      )}
    </SidebarMenuItem>
  ));
}
function AppSidebarCollapsibleMenuItems({
  items,
  selectedItem,
  setSelectedItem,
}: IAppSidebarMenuItems) {
  return items.map((item, j) => (
    <SidebarMenuSubItem key={j}>
      <SidebarMenuButton
        asChild
        isActive={selectedItem === item.tag ? true : item?.defaultIsActive}
        onClick={() => setSelectedItem(item.tag)}
      >
        <a href={item.path}>
          {item.icon}
          <span>{item.title}</span>
        </a>
      </SidebarMenuButton>

      {item?.badgeValue && (
        <SidebarMenuBadge>{item?.badgeValue}</SidebarMenuBadge>
      )}
    </SidebarMenuSubItem>
  ));
}
//#endregion

//#region Sidebar Props
export interface IAppSidebarItemProps {
  defaultIsActive?: boolean;
  tag: string;
  title: string;
  icon: React.ReactNode;
  path: string;
  badgeValue?: number;
  dropDownMenuItems?: IAppSidebarItemDropDownMenuItem[];
}

type IAppSidebarCollapsibleItemProps = Omit<
  IAppSidebarItemProps,
  "dropDownMenuItems"
>;

export interface IAppSidebarCollapsedGroupItemsProps {
  defaultIsOpen?: boolean;
  label: string;
  items: IAppSidebarCollapsibleItemProps[];
}

interface IAppSidebarGroupItemsProps {
  label: string;
  items: (IAppSidebarItemProps | IAppSidebarCollapsedGroupItemsProps)[];
  trigger?: {
    actionIcon: React.ReactNode;
    tooltip: string;
    action: () => void;
  };
  endsWithSeparator?: boolean;
}

//#endregion

interface IAppSidebarProps {
  side: "left" | "right";
  header?: React.ReactNode; // You can use Either ComboBox || Normal React Component contains on AppLogo & AppName
  content: {
    groups?: IAppSidebarGroupItemsProps[];
    items?: IAppSidebarItemProps[];
  };
  footer?: React.ReactNode;
  showRails?: boolean;
}
function AppSidebar({
  content,
  footer,
  header,
  showRails,
  side,
}: IAppSidebarProps) {
  if (!content.items && !content.groups) {
    throw new LogicError(
      `You should at least one of these properties items, groups, or collapsedGroups`
    );
  }

  const router = useRouter();
  const { isMobile } = useSidebar();
  const [selectedItem, setSelectedItem] = useState<string | undefined>(
    undefined
  );
  const [_, startTransition] = useTransition();

  return (
    <Sidebar
      side={side}
      variant={isMobile ? "floating" : "sidebar"}
      collapsible={isMobile ? "offcanvas" : "icon"}
    >
      {header && <SidebarHeader>{header}</SidebarHeader>}

      <SidebarContent>
        <div className="flex flex-col gap-4">
          {content?.groups &&
            content?.groups?.length > 0 &&
            content?.groups.map((group, i) => (
              <Fragment key={i}>
                <SidebarGroup>
                  <SidebarGroupLabel>{group.label}</SidebarGroupLabel>

                  <SidebarGroupContent>
                    <SidebarMenu>
                      {group?.items.map((item, j) =>
                        instanceOfIAppSidebarCollapsedGroupItemsProps(item) ? (
                          <Collapsible
                            key={j}
                            defaultOpen={item?.defaultIsOpen}
                            className="group/collapsible"
                          >
                            <SidebarMenuItem>
                              <CollapsibleTrigger asChild>
                                <SidebarMenuButton>
                                  <span>{item.label}</span>
                                </SidebarMenuButton>
                              </CollapsibleTrigger>

                              <CollapsibleContent>
                                <SidebarMenuSub>
                                  <AppSidebarCollapsibleMenuItems
                                    items={item?.items}
                                    selectedItem={selectedItem}
                                    setSelectedItem={setSelectedItem}
                                  />
                                </SidebarMenuSub>
                              </CollapsibleContent>
                            </SidebarMenuItem>
                          </Collapsible>
                        ) : (
                          <SidebarMenuItem key={j}>
                            <SidebarMenuButton
                              asChild
                              isActive={
                                selectedItem === undefined
                                  ? item?.defaultIsActive
                                  : selectedItem === item.tag
                                  ? true
                                  : false
                              }
                              onClick={() => {
                                setSelectedItem(item.tag);
                                startTransition(() => {
                                  router.push(item.path);
                                });
                              }}
                            >
                              <Link href={item.path}>
                                {item.icon}
                                <span>{item.title}</span>
                              </Link>
                            </SidebarMenuButton>

                            {item?.badgeValue && (
                              <SidebarMenuBadge>
                                {item?.badgeValue}
                              </SidebarMenuBadge>
                            )}

                            {item?.dropDownMenuItems && (
                              <AppSidebarItemDropDown
                                items={item?.dropDownMenuItems}
                              />
                            )}
                          </SidebarMenuItem>
                        )
                      )}
                    </SidebarMenu>
                  </SidebarGroupContent>

                  {group?.trigger && (
                    <SidebarGroupAction onClick={group?.trigger?.action}>
                      {group?.trigger?.actionIcon}{" "}
                      <span className="sr-only">{group?.trigger?.tooltip}</span>
                    </SidebarGroupAction>
                  )}
                </SidebarGroup>

                {group?.endsWithSeparator && <SidebarSeparator />}
              </Fragment>
            ))}

          {content?.items && content?.items?.length > 0 && (
            <SidebarMenu>
              <AppSidebarMenuItems
                items={content?.items}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
              />
            </SidebarMenu>
          )}
        </div>
      </SidebarContent>

      {footer && <SidebarFooter>{footer}</SidebarFooter>}
      {showRails && <SidebarRail />}
    </Sidebar>
  );
}

export default AppSidebar;
