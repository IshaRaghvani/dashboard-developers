import React, { ReactNode } from "react";
import SideNav from "./_components/SideNav";

interface Props {
  children: ReactNode;
}

function DashboardLayout(): JSX.Element {
  return (
    <div>
      <div className="md:w-64 fixed">
       
      </div>
      <div className="md:ml-64"></div>
    </div>
  );
}

export default DashboardLayout;
