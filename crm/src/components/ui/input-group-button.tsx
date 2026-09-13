"use client";

import * as React from "react";
import type { VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { inputGroupButtonVariants } from "./input-group-variants";

type InputGroupButtonProps = Omit<
  React.ComponentProps<typeof Button>,
  "size" | "type"
> &
  VariantProps<typeof inputGroupButtonVariants> & {
    type?: "button" | "submit" | "reset";
  };

export function InputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size = "xs",
  ...props
}: InputGroupButtonProps) {
  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      className={cn(inputGroupButtonVariants({ size }), className)}
      {...props}
    />
  );
}
