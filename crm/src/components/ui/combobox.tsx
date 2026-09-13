"use client";

import { Combobox as ComboboxPrimitive } from "@base-ui/react";

const Combobox = ComboboxPrimitive.Root;

export { Combobox };
export {
  ComboboxValue,
  ComboboxTrigger,
  ComboboxClear,
} from "./combobox-trigger";
export { ComboboxInput, ComboboxContent } from "./combobox-content";
export {
  ComboboxList,
  ComboboxItem,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxCollection,
  ComboboxEmpty,
  ComboboxSeparator,
} from "./combobox-list";
export {
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
  useComboboxAnchor,
} from "./combobox-chips";
export type {
  ComboboxInputProps,
  ComboboxContentProps,
  ComboboxChipProps,
  ComboboxChipsProps,
} from "./combobox-types";
