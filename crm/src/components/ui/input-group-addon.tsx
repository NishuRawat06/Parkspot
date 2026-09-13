"use client";

import * as React from "react";
import type { VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { inputGroupAddonVariants } from "./input-group-variants";

type InputGroupAddonProps = React.ComponentProps<"div"> &
  VariantProps<typeof inputGroupAddonVariants>;

export function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}: InputGroupAddonProps) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) return;
        e.currentTarget.parentElement?.querySelector("input")?.focus();
      }}
      {...props}
    />
  );
}
