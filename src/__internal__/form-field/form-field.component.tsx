import React, { useContext, useEffect, useMemo } from "react";

import { ValidationProps } from "__internal__/validations";
import { MarginProps } from "styled-system";
import invariant from "invariant";
import { filterStyledSystemMarginProps } from "../../style/utils";
import FormFieldStyle, { FieldLineStyle } from "./form-field.style";
import Label from "../label";
import FieldHelp from "../field-help";
import tagComponent, { TagProps } from "../utils/helpers/tags/tags";
import { TabContext, TabContextProps } from "../../components/tabs/tab";
import useIsAboveBreakpoint from "../../hooks/__internal__/useIsAboveBreakpoint";
import { IconType } from "../../components/icon";

interface CommonFormFieldProps extends MarginProps, ValidationProps {
  /** If true, the component will be disabled */
  disabled?: boolean;
  /** Help content to be displayed under an input */
  fieldHelp?: React.ReactNode;
  /** The unique id of the Help component tooltip, used for accessibility */
  tooltipId?: string;
  /** The unique id of the FieldHelp component */
  fieldHelpId?: string;
  /** Label content */
  label?: React.ReactNode;
  /** Text alignment of the label */
  labelAlign?: "left" | "right";
  /** A message that the Help component will display */
  labelHelp?: React.ReactNode;
  /** Help Icon type */
  labelHelpIcon?: IconType;
  /** The unique id of the label element */
  labelId?: string;
  /** When true label is inline */
  labelInline?: boolean;
  /** Spacing between label and a field for inline label, given number will be multiplied by base spacing unit (8) */
  labelSpacing?: 1 | 2;
  /** Label width */
  labelWidth?: number;
  /** If true the label switches position with the input */
  reverse?: boolean;
  /** Id of the validation icon */
  validationIconId?: string;
}

export interface FormFieldProps extends CommonFormFieldProps, TagProps {
  /** Breakpoint for adaptive label (inline labels change to top aligned). Enables the adaptive behaviour when set */
  adaptiveLabelBreakpoint?: number;
  /** Content to be rendered inside the FormField */
  children?: React.ReactNode;
  /**
   * If true, the FieldHelp will be displayed inline
   * To be used with labelInline prop set to true
   */
  fieldHelpInline?: boolean;
  /** Id of the element a label should be bound to */
  id: string;
  /** [Legacy] Flag to configure component as optional in Form */
  isOptional?: boolean;
  /** Flag to configure component as mandatory */
  isRequired?: boolean;
  /** Whether to show the validation icon */
  useValidationIcon?: boolean;
}

const FormField = ({
  children,
  disabled,
  fieldHelp: fieldHelpContent,
  fieldHelpInline,
  error,
  warning,
  info,
  tooltipId,
  fieldHelpId,
  label,
  labelId,
  labelAlign,
  labelHelp,
  labelHelpIcon,
  labelInline,
  labelSpacing = 2,
  labelWidth,
  id,
  reverse,
  isOptional,
  useValidationIcon,
  adaptiveLabelBreakpoint,
  isRequired,
  validationIconId,
  ...rest
}: FormFieldProps) => {
  const invalidValidationProp: string | undefined = useMemo(() => {
    const validationProps: Record<string, boolean> = {
      error: !!error,
      warning: !!warning,
      info: !!info,
    };

    if (!disabled) return undefined;

    return Object.keys(validationProps).find(
      (propName) => validationProps[propName]
    );
  }, [error, warning, info, disabled]);

  invariant(
    invalidValidationProp === undefined,
    `Prop \`${invalidValidationProp}\` cannot be used in conjunction with \`disabled\`. ` +
      "Use `readOnly` if you require users to see validations with a non-interactive field"
  );

  const largeScreen = useIsAboveBreakpoint(adaptiveLabelBreakpoint);
  let inlineLabel = labelInline;
  if (adaptiveLabelBreakpoint) {
    inlineLabel = largeScreen;
  }

  const { setError, setWarning, setInfo } = useContext<TabContextProps>(
    TabContext
  );

  useEffect(() => {
    if (setError) setError(id, !!error);
    if (setWarning) setWarning(id, !!warning);
    if (setInfo) setInfo(id, !!info);
  }, [id, setError, setWarning, setInfo, error, warning, info]);

  const marginProps = filterStyledSystemMarginProps(rest);

  const fieldHelp = fieldHelpContent ? (
    <FieldHelp
      labelInline={inlineLabel}
      labelWidth={labelWidth}
      id={fieldHelpId}
    >
      {fieldHelpContent}
    </FieldHelp>
  ) : null;

  return (
    <FormFieldStyle
      {...tagComponent(rest["data-component"], rest)}
      {...marginProps}
    >
      <FieldLineStyle inline={inlineLabel}>
        {reverse && children}

        {label && (
          <Label
            labelId={labelId}
            align={labelAlign}
            disabled={disabled}
            error={!rest.validationRedesignOptIn && error}
            warning={!rest.validationRedesignOptIn && warning}
            info={!rest.validationRedesignOptIn && info}
            help={labelHelp}
            tooltipId={tooltipId}
            htmlFor={id}
            helpIcon={labelHelpIcon}
            inline={inlineLabel}
            width={labelWidth}
            optional={isOptional}
            useValidationIcon={useValidationIcon}
            pr={!reverse ? labelSpacing : undefined}
            pl={reverse ? labelSpacing : undefined}
            isRequired={isRequired}
            validationIconId={validationIconId}
          >
            {label}
          </Label>
        )}

        {fieldHelpInline && fieldHelp}

        {!reverse && children}
      </FieldLineStyle>

      {!fieldHelpInline && fieldHelp}
    </FormFieldStyle>
  );
};
FormField.displayName = "FormField";

export default FormField;
