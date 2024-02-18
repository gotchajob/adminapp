// ----------------------------------------------------------------------

import SvgColor from "@/components/svg-color/svg-color";
import ChatIcon from '@mui/icons-material/Chat';

const icon = (name: string) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const navConfig = [
  {
    title: "dashboard",
    path: "/dashboard",
    icon: icon("ic_analytics"),
  },
  {
    title: "user",
    path: "/user",
    icon: icon("ic_user"),
  },
  {
    title: "order",
    path: "/order",
    icon: icon("ic_cart"),
  },
  {
    title: "chat",
    path: "/blog",
    icon: <ChatIcon/>,
  },
  // {
  //   title: "login",
  //   path: "/login",
  //   icon: icon("ic_lock"),
  // },
  // {
  //   title: "Not found",
  //   path: "/404",
  //   icon: icon("ic_disabled"),
  // },
];

export default navConfig;
