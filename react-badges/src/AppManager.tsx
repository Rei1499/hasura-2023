// import React from "react";

// import AppEntrypoint, { ManagerIcon } from "./containers/AppEntrypoint";

// const AppManager: React.FC = () => (
//   <AppEntrypoint
//     icon={<ManagerIcon />}
//     title="Manager"
//     defaultRoute="dashboard"
//     routes={[
//       {
//         path: "dashboard",
//         element: <div>Manager</div>
//       }
//     ]}
//   />
// );

// export default AppManager;

import React from "react";
import { RouteProps } from "react-router-dom";

import {
  Engineering as EngineersIcon,
  Security as ShieldIcon
} from "@mui/icons-material";

import AppEntrypoint, { ManagerIcon } from "./containers/AppEntrypoint";
import ManagerEngineer from "./views/backoffice/ManagerEngineer";
import IssueComponenet from "./views/manager/IssueComponent";

import { DrawerMenu } from "./layouts/BasicLayout";

const menuItems = [
  {
    link: "badges",
    text: "Badges List",
    icon: <ShieldIcon />
  },
  {
    link: "engineers",
    text: "Engineers",
    icon: <EngineersIcon />
  },
  {
    link: "candidatures",
    text: "Candidatures List",
    icon: <ShieldIcon />
  },
  {
    link: "issues",
    text: "Issues List",
    icon: <ShieldIcon />
  }
];

const AppManager: React.FC = () => (
  <AppEntrypoint
    icon={<ManagerIcon />}
    title={"Manager"}
    defaultRoute=""
    drawerContents={[<DrawerMenu title="Manager:" items={menuItems} />]}
    mobileUtils={menuItems}
    routes={
      [
        {
          path: "badges",
          element: <Badges />
        },
        {
          path: "engineers",
          element: <Engineers />
        },
        {
          path: "candidatures",
          element: <Candidatures />
        },
        {
          path: "issues",
          element: <IssueComponenet />
        }
      ] as RouteProps[]
    }
  />
);

export default AppManager;
