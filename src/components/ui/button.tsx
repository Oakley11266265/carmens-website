import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-md font-body font-bold tracking-wide whitespace-nowrap transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-crab-600 text-cream-50 shadow-soft hover:bg-crab-700 hover:shadow-lifted focus-visible:outline-crab-600",
        outline:
          "border-2 border-cream-50/80 bg-transparent text-cream-50 hover:bg-cream-50/15 focus-visible:outline-cream-50",
        bay: "bg-bay-900 text-cream-50 shadow-soft hover:bg-bay-800 hover:shadow-lifted focus-visible:outline-bay-900",
        ghost: "text-cream-50/90 hover:bg-cream-50/10 hover:text-cream-50 focus-visible:outline-cream-50",
      },
      size: {
        default: "h-11 px-6 text-sm",
        sm: "h-9 px-4 text-xs",
        lg: "h-13 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  ),
);
Button.displayName = "Button";

export { Button, buttonVariants };
