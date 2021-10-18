import { Icon } from "@iconify/react";
import pieChart2Fill from "@iconify/icons-eva/pie-chart-2-fill";
import peopleFill from "@iconify/icons-eva/people-fill";
import shoppingBagFill from "@iconify/icons-eva/shopping-bag-fill";
import fileTextFill from "@iconify/icons-eva/file-text-fill";
import calendarFill from "@iconify/icons-eva/calendar-outline";
import globeFill from "@iconify/icons-eva/globe-2-fill";
// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const ConfigSidebar = [
  {
    title: "dashboard",
    path: "/traveller/app",
    icon: getIcon(pieChart2Fill),
  },
  {
    title: "Trip Planner",
    path: "/traveller/tripPlanner",
    icon: getIcon(peopleFill),
  },
  {
    title: "My Trips",
    path: "/traveller/myTrips",
    icon: getIcon(shoppingBagFill),
  },
  {
    title: "Gallery",
    path: "/traveller/gallery",
    icon: getIcon(fileTextFill),
  },
  {
    title: "Backpack List",
    path: "/traveller/backpackList",
    icon: getIcon(calendarFill),
  },
  
];

export default ConfigSidebar;
