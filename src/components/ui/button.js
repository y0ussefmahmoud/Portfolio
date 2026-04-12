import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
const buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
            destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
            outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
            secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            link: "text-primary underline-offset-4 hover:underline",
        },
        size: {
            default: "h-9 px-4 py-2",
            sm: "h-8 rounded-md px-3 text-xs",
            lg: "h-10 rounded-md px-8",
            icon: "h-9 w-9",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});
const Button = React.forwardRef(({ className, variant, size, asChild = false, animated = true, hoverScale = 1.05, tapScale = 0.95, shine = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    // Motion configuration for animations (only when not asChild)
    const motionProps = animated && !asChild ? {
        whileHover: { scale: hoverScale },
        whileTap: { scale: tapScale },
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 17,
        },
    } : {};
    const buttonContent = (_jsxs(_Fragment, { children: [shine && !asChild && (_jsx(motion.div, { className: "absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent", initial: { x: "-100%" }, whileHover: { x: "100%" }, transition: { duration: 0.6, ease: "easeInOut" }, style: { pointerEvents: "none" } })), _jsx("span", { className: "relative z-10", children: children })] }));
    if (asChild) {
        return (_jsx(Slot, { className: cn(buttonVariants({ variant, size, className })), ref: ref, ...props, children: children }));
    }
    if (animated) {
        return (_jsx(motion.div, { whileHover: { scale: hoverScale }, whileTap: { scale: tapScale }, transition: {
                type: "spring",
                stiffness: 400,
                damping: 17,
            }, children: _jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref: ref, ...props, children: buttonContent }) }));
    }
    return (_jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref: ref, ...props, children: buttonContent }));
});
Button.displayName = "Button";
export { Button, buttonVariants };
