import React from "react";
import { action } from "@storybook/addon-actions";

import {
  ActionPopover,
  ActionPopoverDivider,
  ActionPopoverItem,
  ActionPopoverMenu,
} from ".";
import {
  FlatTable,
  FlatTableHead,
  FlatTableBody,
  FlatTableRow,
  FlatTableHeader,
  FlatTableCell,
} from "../flat-table";

export default {
  title: "Action Popover/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disable: true,
    },
  },
};

export const Default = () => {
  const submenu = (
    <ActionPopoverMenu>
      <ActionPopoverItem onClick={action("sub menu 1")}>
        Sub Menu 1
      </ActionPopoverItem>
      <ActionPopoverItem onClick={action("sub menu 2")}>
        Sub Menu 2
      </ActionPopoverItem>
      <ActionPopoverItem disabled onClick={action("sub menu 3")}>
        Sub Menu 3
      </ActionPopoverItem>
    </ActionPopoverMenu>
  );
  const submenuWithIcons = (
    <ActionPopoverMenu>
      <ActionPopoverItem icon="graph" onClick={action("sub menu 1")}>
        Sub Menu 1
      </ActionPopoverItem>
      <ActionPopoverItem icon="add" onClick={action("sub menu 2")}>
        Sub Menu 2
      </ActionPopoverItem>
      <ActionPopoverItem icon="print" disabled onClick={action("sub menu 3")}>
        Sub Menu 3
      </ActionPopoverItem>
    </ActionPopoverMenu>
  );
  return (
    <div style={{ marginTop: "40px", height: "275px" }}>
      <FlatTable isZebra>
        <FlatTableHead>
          <FlatTableRow>
            <FlatTableHeader>First Name</FlatTableHeader>
            <FlatTableHeader>Last Name</FlatTableHeader>
            <FlatTableHeader>&nbsp;</FlatTableHeader>
          </FlatTableRow>
        </FlatTableHead>
        <FlatTableBody>
          <FlatTableRow>
            <FlatTableCell>John</FlatTableCell>
            <FlatTableCell>Doe</FlatTableCell>
            <FlatTableCell>
              <ActionPopover
                onOpen={action("popover opened")}
                onClose={action("popover closed")}
              >
                <ActionPopoverItem
                  disabled
                  icon="graph"
                  submenu={submenu}
                  onClick={action("email")}
                >
                  Business
                </ActionPopoverItem>
                <ActionPopoverItem icon="email" onClick={action("email")}>
                  Email Invoice
                </ActionPopoverItem>
                <ActionPopoverItem
                  icon="print"
                  onClick={action("print")}
                  submenu={submenu}
                >
                  Print Invoice
                </ActionPopoverItem>
                <ActionPopoverItem
                  icon="pdf"
                  submenu={submenu}
                  onClick={action("pdf")}
                >
                  Download PDF
                </ActionPopoverItem>
                <ActionPopoverItem icon="csv" onClick={action("csv")}>
                  Download CSV
                </ActionPopoverItem>
                <ActionPopoverDivider />
                <ActionPopoverItem icon="delete" onClick={action("delete")}>
                  Delete
                </ActionPopoverItem>
              </ActionPopover>
            </FlatTableCell>
          </FlatTableRow>
          <FlatTableRow>
            <FlatTableCell>Jane</FlatTableCell>
            <FlatTableCell>Smith</FlatTableCell>
            <FlatTableCell>
              <ActionPopover>
                <ActionPopoverItem icon="csv" onClick={action("csv")}>
                  Download CSV
                </ActionPopoverItem>
              </ActionPopover>
            </FlatTableCell>
          </FlatTableRow>
          <FlatTableRow>
            <FlatTableCell>Bob</FlatTableCell>
            <FlatTableCell>Jones</FlatTableCell>
            <FlatTableCell>
              <ActionPopover>
                <ActionPopoverItem
                  icon="csv"
                  submenu={submenuWithIcons}
                  onClick={action("csv")}
                >
                  Download CSV
                </ActionPopoverItem>
              </ActionPopover>
            </FlatTableCell>
          </FlatTableRow>
        </FlatTableBody>
      </FlatTable>
    </div>
  );
};
