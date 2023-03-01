import React, { useState, useEffect, useCallback, useRef } from "react";
import { MarginProps } from "styled-system";
import {
  StyledAdvancedColorPickerWrapper,
  HiddenColorPickerList,
  StyledAdvancedColorPickerCell,
  StyledAdvancedColorPickerPreview,
  DialogStyle,
} from "./advanced-color-picker.style";
import Button from "../button";
import { SimpleColorPicker, SimpleColor } from "../simple-color-picker";
import Events from "../../__internal__/utils/helpers/events";
import { filterStyledSystemMarginProps } from "../../style/utils";
import guid from "../../__internal__/utils/helpers/guid";
import useLocale from "../../hooks/__internal__/useLocale";
import { Dt, Dd } from "../definition-list";

export interface AdvancedColor {
  label: string;
  value: string;
}

export interface AdvancedColorPickerProps extends MarginProps {
  /** Prop to specify the aria-describedby property of the component */
  "aria-describedby"?: string;
  /**
   * Prop to specify the aria-label of the component.
   * To be used only when the title prop is not defined, and the component is not labelled by any internal element.
   */
  "aria-label"?: string;
  /**
   * Prop to specify the aria-labeledby property of the component
   * To be used when the title prop is a custom React Node,
   * or the component is labelled by an internal element other than the title.
   */
  "aria-labelledby"?: string;
  /** Prop for `availableColors` containing array of objects of colors */
  availableColors: AdvancedColor[];
  /** Prop for `defaultColor` containing the default color for `uncontrolled` use */
  defaultColor: string;
  /** Specifies the name prop to be applied to each color in the group */
  name: string;
  /** Prop for `onBlur` event */
  onBlur?: (ev: React.FocusEvent<HTMLInputElement>) => void;
  /** Prop for `onChange` event */
  onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  /** Prop for `onClose` event */
  onClose?: (ev: React.MouseEvent<HTMLElement>) => void;
  /** Prop for `onOpen` event */
  onOpen?: (ev: React.MouseEvent<HTMLElement>) => void;
  /** Prop for `open` status */
  open?: boolean;
  /** The ARIA role to be applied to the component container */
  role?: string;
  /** Prop for `selectedColor` containing pre-selected color for `controlled` use */
  selectedColor?: string;
}

const AdvancedColorPicker = ({
  "aria-describedby": ariaDescribedBy,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  availableColors,
  defaultColor,
  name,
  onOpen,
  onClose,
  onChange,
  onBlur,
  open = false,
  role,
  selectedColor,
  ...props
}: AdvancedColorPickerProps) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>();
  const currentColor = selectedColor || defaultColor;
  const [
    selectedColorRef,
    setSelectedColorRef,
  ] = useState<HTMLInputElement | null>(null);

  const currentColorName = selectedColorRef?.getAttribute("aria-label");
  const simpleColorPickerData = useRef<{
    gridItemRefs: Array<HTMLInputElement | null>;
  }>(null);

  const colors = availableColors.map(({ value, label }, index) => {
    return {
      value,
      label,
      getRef: () =>
        /* Fallback to null to satisfy the TypeScript compiler */
        /* istanbul ignore next */
        simpleColorPickerData.current
          ? simpleColorPickerData.current.gridItemRefs[index]
          : null,
    };
  });

  useEffect(() => {
    if (dialogOpen || open) {
      const newColor = colors?.find((c) => currentColor === c.value);

      /* istanbul ignore else */
      if (newColor) {
        setSelectedColorRef(newColor.getRef());
      }
    }
  }, [colors, currentColor, dialogOpen, open]);

  const handleFocus = useCallback(
    (e, firstFocusableElement) => {
      /* istanbul ignore else */
      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (
            document.activeElement === firstFocusableElement &&
            selectedColorRef
          ) {
            selectedColorRef.focus();
            e.preventDefault();
          }
        } else if (document.activeElement === selectedColorRef) {
          firstFocusableElement.focus();
          e.preventDefault();
        }
      }
    },
    [selectedColorRef]
  );

  const handleOnOpen = useCallback(
    (e) => {
      setDialogOpen(true);

      if (onOpen) {
        onOpen(e);
      }
    },
    [onOpen]
  );

  const handleOnClose = useCallback(
    (e) => {
      setDialogOpen(false);

      if (onClose) {
        onClose(e);
      }
    },
    [onClose]
  );

  const handleOnChange = useCallback(
    (e) => {
      const newColor = colors?.find((c) => e.target.value === c.value);

      /* istanbul ignore else */
      if (newColor) {
        setSelectedColorRef(newColor.getRef());
      }

      /* istanbul ignore else */
      if (onChange) {
        onChange(e);
      }
    },
    [onChange, colors]
  );

  const handleOnKeyDown = useCallback(
    (e) => {
      if (Events.isEnterKey(e) || Events.isSpaceKey(e)) {
        e.preventDefault();
        handleOnOpen(e);
      }
    },
    [handleOnOpen]
  );

  const handleColorOnKeyDown = useCallback(
    (e) => {
      if (Events.isEnterKey(e) || Events.isSpaceKey(e)) {
        e.preventDefault();
        handleOnClose(e);
      }
    },
    [handleOnClose]
  );

  const handleOnBlur = useCallback(
    (e) => {
      if (onBlur) {
        onBlur(e);
      }
    },
    [onBlur]
  );

  const selectedColorId = useRef(guid());
  const l = useLocale();

  return (
    <StyledAdvancedColorPickerWrapper
      m="15px auto auto 15px"
      {...filterStyledSystemMarginProps(props)}
    >
      <Button
        data-element="open-color-picker-button"
        aria-describedby={selectedColorId.current}
        size="large"
        onClick={handleOnOpen}
        onKeyDown={handleOnKeyDown}
      >
        {l.advancedColorPicker.buttonString()}
      </Button>
      <StyledAdvancedColorPickerCell
        data-element="color-picker-cell"
        color={currentColor}
      />
      <HiddenColorPickerList
        id={selectedColorId.current}
        data-element="current-color-description"
      >
        <Dt>{l.advancedColorPicker.currentColorString()}</Dt>
        <Dd>{currentColorName || "none"}</Dd>
      </HiddenColorPickerList>
      <DialogStyle
        aria-describedby={ariaDescribedBy}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        open={dialogOpen || open}
        size="auto"
        onCancel={handleOnClose}
        bespokeFocusTrap={handleFocus}
        focusFirstElement={selectedColorRef}
        role={role}
      >
        <StyledAdvancedColorPickerPreview
          data-element="color-picker-preview"
          color={currentColor}
        />
        <SimpleColorPicker
          name={name}
          legend=""
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          onKeyDown={handleColorOnKeyDown}
          ref={simpleColorPickerData}
        >
          {colors?.map(({ value, label }) => (
            <SimpleColor
              value={value}
              key={value}
              aria-label={label}
              id={value}
              defaultChecked={value === currentColor}
            />
          ))}
        </SimpleColorPicker>
      </DialogStyle>
    </StyledAdvancedColorPickerWrapper>
  );
};

export default AdvancedColorPicker;
