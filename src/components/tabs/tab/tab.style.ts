import styled, { css } from "styled-components";
import { padding } from "styled-system";
import BaseTheme, { ThemeObject } from "../../../style/themes/base";
import { TabProps } from ".";

export type StyledTabProps = Pick<TabProps, "position" | "isTabSelected"> & {
  theme?: ThemeObject;
};

const StyledTab = styled.div<StyledTabProps>`
  display: none;

  ${({ isTabSelected, position = "top" }) =>
    isTabSelected &&
    css`
      display: block;

      ${position === "left" &&
      css`
        margin-left: -6px;
        margin-top: 6px;
        width: calc(80% + 6px);
      `}

      ${padding}
    `}
`;

StyledTab.defaultProps = {
  theme: BaseTheme,
};

export default StyledTab;
