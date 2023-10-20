import React, { useState } from "react";
import TextEditor, {
  TextEditorState as EditorState,
  TextEditorContentState as ContentState,
} from "./text-editor.component";
import CarbonProvider from "../carbon-provider";
import Box from "../box";

export const WithNewValidation = () => {
  const [value, setValue] = useState(
    EditorState.createWithContent(ContentState.createFromText("Add content"))
  );
  const limit = 16;
  const contentLength = value.getCurrentContent().getPlainText().length;
  return (
    <CarbonProvider validationRedesignOptIn>
      <Box padding={2}>
        <TextEditor
          onChange={(newValue) => {
            setValue(newValue);
          }}
          value={value}
          labelText="Text Editor Label"
          characterLimit={limit}
          error={limit - contentLength <= 5 ? "There is an error" : undefined}
          warning={
            limit - contentLength <= 10 ? "There is a warning" : undefined
          }
          inputHint="Some additional hint text"
        />
      </Box>
    </CarbonProvider>
  );
};
