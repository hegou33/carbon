import React from "react";
import { VerticalMenu, VerticalMenuItem } from ".";
import Pill from "../pill";

interface LinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

const Link = ({ to, children, className }: LinkProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.history.pushState({}, "", to);
  };
  return (
    <a href={to} className={className} onClick={handleClick}>
      {children}
    </a>
  );
};

export const CustomComponent = () => {
  return (
    <VerticalMenu>
      <VerticalMenuItem
        iconType="analysis"
        title="Item 1"
        component={Link}
        to="/item-1"
      />
    </VerticalMenu>
  );
};

export const Adornment = () => {
  return (
    <VerticalMenu>
      <VerticalMenuItem
        iconType="analysis"
        adornment={(isOpen) =>
          !isOpen && (
            <Pill borderColor="#fff" fill size="S">
              10
            </Pill>
          )
        }
        title="Item 1"
      >
        <VerticalMenuItem
          adornment={
            <Pill borderColor="#fff" fill size="S">
              10
            </Pill>
          }
          title="ChildItem 1"
          href="/child-item-1"
        />
        <VerticalMenuItem title="ChildItem 2" href="/child-item-2" />
      </VerticalMenuItem>
    </VerticalMenu>
  );
};

export const CustomItemHeight = () => {
  return (
    <VerticalMenu>
      <VerticalMenuItem height="100px" iconType="analysis" title="Item 1" />
    </VerticalMenu>
  );
};

export const CustomItemPadding = () => {
  return (
    <VerticalMenu>
      <VerticalMenuItem
        iconType="analysis"
        title="Item 1"
        padding="0 0 0 80px"
      />
    </VerticalMenu>
  );
};
