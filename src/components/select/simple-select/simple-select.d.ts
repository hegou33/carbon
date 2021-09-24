import * as React from "react";
import { FormInputPropTypes } from "../select-textbox/select-textbox";

export interface SimpleSelectProps
  extends Omit<FormInputPropTypes, "defaultValue"> {
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-component"?: string;
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-element"?: string;
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-role"?: string;
  /** Child components (such as Option or OptionRow) for the SelectList */
  children: React.ReactNode;
  /** The default selected value(s), when the component is operating in uncontrolled mode */
  defaultValue?: string | object;
  /** Boolean to toggle where SelectList is rendered in relation to the Select Input */
  disablePortal?: boolean;
  /** If true the loader animation is displayed in the option list */
  isLoading?: boolean;
  /** When true component will work in multi column mode.
   * Children should consist of OptionRow components in this mode
   */
  multiColumn?: boolean;
  /** A callback that is triggered when a user scrolls to the bottom of the list */
  onListScrollBottom?: () => void;
  /** A custom callback for when the dropdown menu opens */
  onOpen?: () => void;
  /** If true the Component opens on focus */
  openOnFocus?: boolean;
  /** SelectList table header, should consist of multiple th elements.
   * Works only in multiColumn mode
   */
  tableHeader?: React.ReactNode;
  /** If true the component input has no border and is transparent */
  transparent?: boolean;
  /** The selected value(s), when the component is operating in controlled mode */
  value?: string | object;
  /** Overrides the default tooltip position */
  tooltipPosition?: "top" | "bottom" | "left" | "right";
}

declare function SimpleSelect(
  props: SimpleSelectProps & React.RefAttributes<HTMLInputElement>
): JSX.Element;

export default SimpleSelect;
