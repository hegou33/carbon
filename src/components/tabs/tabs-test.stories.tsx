import React from "react";
import { Tabs, Tab, TabsProps } from ".";

export default {
  title: "Tabs/Test",
  includeStories: ["Default"],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
  argTypes: {
    align: {
      options: ["left", "right"],
      control: {
        type: "select",
      },
    },
    position: {
      options: ["top", "left"],
      control: {
        type: "select",
      },
    },
    borders: {
      options: ["off", "on", "no sides", "no left side", "no right side"],
      control: {
        type: "select",
      },
    },
    size: {
      options: ["default", "large"],
      control: {
        type: "select",
      },
    },
    variant: {
      options: ["default", "alternate"],
      control: {
        type: "select",
      },
    },
  },
};

export const Default = (args: TabsProps) => {
  return (
    <Tabs {...args}>
      <Tab
        errorMessage="error"
        warningMessage="warning"
        infoMessage="info"
        tabId="tab-1"
        title="Tab 1"
        key="tab-1"
      >
        Content for tab 1
      </Tab>
      <Tab
        errorMessage="error"
        warningMessage="warning"
        infoMessage="info"
        tabId="tab-2"
        title="Tab 2"
        key="tab-2"
      >
        Content for tab 2
      </Tab>
      <Tab
        errorMessage="error"
        warningMessage="warning"
        infoMessage="info"
        tabId="tab-3"
        title="Tab 3"
        key="tab-3"
      >
        Content for tab 3
      </Tab>
      <Tab
        errorMessage="error"
        warningMessage="warning"
        infoMessage="info"
        tabId="tab-4"
        title="Tab 4"
        key="tab-4"
      >
        Content for tab 4
      </Tab>
      <Tab
        errorMessage="error"
        warningMessage="warning"
        infoMessage="info"
        tabId="tab-5"
        title="Tab 5"
        key="tab-5"
      >
        Content for tab 5
      </Tab>
      <Tab
        errorMessage="error"
        warningMessage="warning"
        infoMessage="info"
        tabId="tab-6"
        title="Tab 6"
        key="tab-6"
        href="https://carbon.sage.com/"
      />
    </Tabs>
  );
};

Default.storyName = "default";
