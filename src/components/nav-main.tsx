import { ChevronRight, type LucideIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router-dom";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
      icon?: LucideIcon;
    }[];
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible "
          >
            <SidebarMenuItem>
              {item.items && item.items.length > 0 ? (
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className="cursor-pointer"
                  >
                    {item.icon && (
                      <span className="ml-2 flex  items-center justify-center">
                        <item.icon size={22} />
                      </span>
                    )}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto h-4 w-4 transition-transform group-[&[data-state=open]]/collapsible:rotate-90 " />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
              ) : (
                <CollapsibleTrigger asChild className="px-0">
                  <SidebarMenuButton tooltip={item.title}>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center gap-2 px-4 py-2 ${
                          isActive
                            ? "bg-[#F79535] text-black rounded-none rounded-r-full w-[90%]"
                            : "text-inherit"
                        }`
                      }
                    >
                      {item.icon && <item.icon size={22} />}
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </CollapsibleTrigger>
              )}
              {item?.items && item.items.length > 0 && (
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <NavLink
                            to={subItem.url}
                            className={({ isActive }) =>
                              isActive ? "bg-amber-400" : ""
                            }
                          >
                            {subItem.icon && (
                              <span className="mr-2 flex items-center justify-center">
                                <subItem.icon size={20} />
                              </span>
                            )}
                            <span>{subItem.title}</span>
                          </NavLink>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              )}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
