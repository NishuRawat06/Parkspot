"use client";

import type * as React from "react";
import type { Combobox as ComboboxPrimitive } from "@base-ui/react";

export type ComboboxInputProps = ComboboxPrimitive.Input.Props & {
  showTrigger?: boolean;
  showClear?: boolean;
};

export type ComboboxContentProps = ComboboxPrimitive.Popup.Props &
  Pick<
    ComboboxPrimitive.Positioner.Props,
    "side" | "align" | "sideOffset" | "alignOffset" | "anchor"
  >;

export type ComboboxChipProps = ComboboxPrimitive.Chip.Props & {
  showRemove?: boolean;
};

export type ComboboxChipsProps = React.ComponentPropsWithRef<
  typeof ComboboxPrimitive.Chips
> &
  ComboboxPrimitive.Chips.Props;
