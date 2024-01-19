import React, { useState } from "react";
import TextEditor, {
  TextEditorState as EditorState,
  TextEditorProps,
} from "./text-editor.component";

export default {
  title: "Text Editor/Test",
  includeStories: ["Default"],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
  argTypes: {
    labelText: {
      control: {
        type: "text",
      },
    },
    characterLimit: {
      control: {
        type: "number",
      },
    },
    rows: {
      control: {
        type: "number",
      },
    },
    error: {
      control: {
        type: "text",
      },
    },
    warning: {
      control: {
        type: "text",
      },
    },
    info: {
      control: {
        type: "text",
      },
    },
    previews: {
      control: {
        type: "text",
      },
    },
  },
};

export const Default = ({ onChange, ...props }: Partial<TextEditorProps>) => {
  const [value, setValue] = useState(EditorState.createEmpty());
  return (
    <div style={{ padding: "4px" }}>
      <TextEditor
        onChange={(newValue) => {
          if (onChange) {
            onChange(newValue);
          }
          setValue(newValue);
        }}
        value={value}
        labelText="Text Editor Label"
        {...props}
      />
    </div>
  );
};

Default.storyName = "default";
