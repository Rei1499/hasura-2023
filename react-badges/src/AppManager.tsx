import React from "react";
import { RouteProps } from "react-router-dom";
import {
  Engineering as EngineersIcon,
  Security as ShieldIcon
} from "@mui/icons-material";
import AppEntrypoint, { ManagerIcon } from "./containers/AppEntrypoint";
import Engineers from "./views/manager/Engineers/Engineers";
import Badges from "./views/manager/Badges/Badges";
import Proposals from "./views/manager/Proposals/Proposals.jsx";
import { DrawerMenu } from "./layouts/BasicLayout";
import ProposalForm from "./containers/Proposals/ProposalForm";
import IssuingRequests from "./views/manager/IssueRequest/IssuingRequests";
import ArticleIcon from "@mui/icons-material/Article";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

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
    link: "proposals",
    text: "Proposal Lists",
    icon: <ArticleIcon />
  },
  {
    link: "issues",
    text: "Issues List",
    icon: <AssignmentTurnedInIcon />
  }
];

const AppManager: React.FC = () => (
  <AppEntrypoint
    icon={<ManagerIcon />}
    title={"Manager"}
    defaultRoute="badges"
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
          path: "issues",
          element: <IssuingRequests />
        },
        {
          path: "proposals",
          element: <Proposals />
        },
        {
          path: "proposalform",
          element: <ProposalForm />
        }
      ] as RouteProps[]
    }
  />
);

export default AppManager;
