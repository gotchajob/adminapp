// ----------------------------------------------------------------------

import Iconify from "@/components/iconify/iconify";
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
    title: "advisory",
    path: "/advisory",
    icon: <ChatIcon/>,
  },
  {
    title: "notification",
    path: "/notification",
    icon: <Iconify width={24} icon="solar:bell-bing-bold-duotone" />,
  },
  {
    title: "transaction",
    path: "/transaction",
    icon: <Iconify width={24} icon="icon-park-solid:transaction" />,
  },

];

export default navConfig;
