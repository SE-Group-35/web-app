import { Icon } from "@iconify/react";
import pieChart2Fill from "@iconify/icons-eva/pie-chart-2-fill";
import peopleFill from "@iconify/icons-eva/people-fill";
import shoppingBagFill from "@iconify/icons-eva/shopping-bag-fill";
import fileTextFill from "@iconify/icons-eva/file-text-fill";
import calendarFill from "@iconify/icons-eva/calendar-outline";
import globeFill from "@iconify/icons-eva/globe-2-fill";
// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: "dashboard",
    path: "/dashboard/app",
    icon: getIcon(pieChart2Fill),
  },
  {
    title: "user",
    path: "/dashboard/user",
    icon: getIcon(peopleFill),
  },
  {
    title: "product",
    path: "/dashboard/products",
    icon: getIcon(shoppingBagFill),
  },
  {
    title: "blog",
    path: "/dashboard/blog",
    icon: getIcon(fileTextFill),
  },
  {
    title: "events",
    path: "/dashboard/event",
    icon: getIcon(calendarFill),
  },
  {
    title: "Destinations",
    path: "/dashboard/destination",
    icon: getIcon(globeFill),
  },
];

export default sidebarConfig;