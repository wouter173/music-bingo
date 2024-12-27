import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { useButton, type AriaButtonProps } from "@react-aria/button";
import { FocusRing } from "@react-aria/focus";
import { cva, type VariantProps } from "class-variance-authority";
import {
  useImperativeHandle,
  useRef,
  type ComponentProps,
  type RefObject,
} from "react";

const styles = cva(
  "select-none touch-none cursor-pointer h-fit w-fit focus:outline-none transition-all",
  {
    variants: {
      intent: {
        primary: "bg-white text-black rounded-full",
      },
      size: {
        sm: "px-2 py-1 text-xs",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base",
      },
      disabled: {
        true: "pointer-events-none opacity-50",
        false: null,
      },
      isPressed: {
        true: null,
        false: null,
      },
    },
    compoundVariants: [
      { intent: "primary", isPressed: true, className: "bg-white/70" },
      { intent: "primary", isPressed: false, className: "bg-white" },
    ],
    defaultVariants: {
      size: "md",
      intent: "primary",
      disabled: false,
    },
  }
);

export type ButtonProps = Omit<
  ComponentProps<"button"> & AriaButtonProps,
  "disabled" | "isDisabled" | "onClick"
> &
  VariantProps<typeof styles> & {
    disabled?: boolean;
    asChild?: boolean;
    className?: string;
    ref?: RefObject<HTMLButtonElement | null>;
  };

export const Button = ({
  className,
  children,
  intent,
  size,
  disabled,
  style,
  asChild = false,
  ref: imperativeRef,
  ...props
}: ButtonProps) => {
  const Comp = asChild ? Slot : "button";

  const ref = useRef<HTMLButtonElement>(null);
  useImperativeHandle(imperativeRef, () => ref.current!);

  const { buttonProps, isPressed } = useButton(
    { ...props, isDisabled: disabled, elementType: Comp },
    ref
  );

  return (
    <FocusRing focusRingClass="ring-2 ring-offset-zinc-950 ring-white ring-opacity-75 ring-offset-3">
      <Comp
        ref={ref}
        style={{ WebkitTapHighlightColor: "transparent", ...style }}
        className={cn(styles({ intent, size, disabled, isPressed }), className)}
        {...props}
        {...buttonProps}
      >
        {children}
      </Comp>
    </FocusRing>
  );
};
