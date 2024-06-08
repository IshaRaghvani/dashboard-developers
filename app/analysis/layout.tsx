import React from "react";
import SideNav from "@/app/dashboard/_components/SideNav";

interface Props {
  children: React.ReactNode;
}

const AnalysisLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex">
      
      <div className="w-full">{children}</div>
    </div>
  );
};

export default AnalysisLayout;
