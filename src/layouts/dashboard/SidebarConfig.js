import { Icon } from "@iconify/react";
import pieChart2Fill from "@iconify/icons-eva/pie-chart-2-fill";
import peopleFill from "@iconify/icons-eva/people-fill";

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
