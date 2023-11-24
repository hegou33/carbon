import styled from "styled-components";
import Typography from "../typography/typography.component";

const StyledStepFlow = styled.div``;

const StyledStepContent = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledStepContentText = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledCategoryText = styled(Typography)`
  color: var(--colorsUtilityYin055);
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  margin: 0px;
  padding: 0px;
`;

const StyledTitleText = styled(Typography)``;

const StyledTitleTextContainer = styled.span``;

const StyledVisibleTitleText = styled.span`
  color: var(--colorsUtilityYin090);
  font-weight: 900;
  font-size: 24px;
  line-height: 30px;
  margin: 0px;
  padding: 0px;
`;

const StyledHiddenTitleText = styled(Typography)``;

const StyledStepLabelAndProgress = styled.div`
  margin-top: 10px;
`;

const StyledStepLabel = styled(Typography)``;

const StyledProgressIndicatorBar = styled.div`
  display: flex;
  margin-top: 5px;
`;

interface StyledProgressIndicatorProps {
  isCompleted: boolean;
  isInProgress: boolean;
}

function calculateProgressIndicatorColor({
  isCompleted,
  isInProgress,
}: StyledProgressIndicatorProps) {
  if (isInProgress) {
    return "var(--colorsUtilityYin090)";
  }
  if (isCompleted) {
    return "var(--colorsSemanticPositive500)";
  }
  return "var(--colorsActionDisabled600)";
}

const StyledProgressIndicator = styled.span<StyledProgressIndicatorProps>`
  background-color: ${({ isCompleted, isInProgress }) =>
    calculateProgressIndicatorColor({ isCompleted, isInProgress })};
  width: 100%;
  height: 8px;
  border-radius: 8px;
  margin-right: 12px;
`;

export {
  StyledStepFlow,
  StyledStepContent,
  StyledStepContentText,
  StyledCategoryText,
  StyledTitleText,
  StyledTitleTextContainer,
  StyledVisibleTitleText,
  StyledHiddenTitleText,
  StyledStepLabelAndProgress,
  StyledStepLabel,
  StyledProgressIndicatorBar,
  StyledProgressIndicator,
};
