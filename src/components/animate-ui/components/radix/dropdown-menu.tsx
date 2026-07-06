"use client";

import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const DropdownMenuContext = React.createContext<{ open: boolean }>({ open: false });

export const DropdownMenu = ({ open: openProp, onOpenChange, ...props }: DropdownMenuPrimitive.DropdownMenuProps) => {
  const [open, setOpen] = React.useState(openProp ?? false);

  React.useEffect(() => {
    if (openProp !== undefined) setOpen(openProp);
  }, [openProp]);

  const handleOpenChange = (val: boolean) => {
    setOpen(val);
    onOpenChange?.(val);
  };

  return (
    <DropdownMenuContext.Provider value={{ open }}>
      <DropdownMenuPrimitive.Root open={open} onOpenChange={handleOpenChange} {...props} />
    </DropdownMenuContext.Provider>
  );
};

export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuSubContext = React.createContext<{ open: boolean }>({ open: false });

export const DropdownMenuSub = ({ open: openProp, onOpenChange, ...props }: DropdownMenuPrimitive.DropdownMenuSubProps) => {
  const [open, setOpen] = React.useState(openProp ?? false);

  React.useEffect(() => {
    if (openProp !== undefined) setOpen(openProp);
  }, [openProp]);

  const handleOpenChange = (val: boolean) => {
    setOpen(val);
    onOpenChange?.(val);
  };

  return (
    <DropdownMenuSubContext.Provider value={{ open }}>
      <DropdownMenuPrimitive.Sub open={open} onOpenChange={handleOpenChange} {...props} />
    </DropdownMenuSubContext.Provider>
  );
};

const contentVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: -8 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: {
      type: "spring",
      duration: 0.25,
      bounce: 0.12
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95, 
    y: -8,
    transition: {
      duration: 0.12,
      ease: "easeOut"
    }
  }
};

export const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, children, sideOffset = 4, ...props }, ref) => {
  const { open } = React.useContext(DropdownMenuContext);

  return (
    <DropdownMenuPrimitive.Portal>
      <AnimatePresence>
        {open && (
          <DropdownMenuPrimitive.Content
            ref={ref}
            forceMount
            sideOffset={sideOffset}
            asChild
            {...props}
          >
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={contentVariants}
              className={cn(
                "z-50 min-w-[8rem] overflow-hidden rounded-2xl border border-line bg-bg/90 backdrop-blur-md p-1.5 text-ink shadow-xl origin-top-left",
                className
              )}
            >
              {children}
            </motion.div>
          </DropdownMenuPrimitive.Content>
        )}
      </AnimatePresence>
    </DropdownMenuPrimitive.Portal>
  );
});
DropdownMenuContent.displayName = "DropdownMenuContent";

export const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, children, ...props }, ref) => {
  const { open } = React.useContext(DropdownMenuSubContext);

  return (
    <AnimatePresence>
      {open && (
        <DropdownMenuPrimitive.SubContent
          ref={ref}
          forceMount
          asChild
          {...props}
        >
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={contentVariants}
            className={cn(
              "z-50 min-w-[8rem] overflow-hidden rounded-xl border border-line bg-bg/95 backdrop-blur-xs p-1.5 text-ink shadow-lg origin-top-left",
              className
            )}
          >
            {children}
          </motion.div>
        </DropdownMenuPrimitive.SubContent>
      )}
    </AnimatePresence>
  );
});
DropdownMenuSubContent.displayName = "DropdownMenuSubContent";

export const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    variant?: "default" | "destructive";
  }
>(({ className, variant = "default", ...props }, ref) => {
  return (
    <DropdownMenuPrimitive.Item
      ref={ref}
      className={cn(
        "group relative flex cursor-pointer select-none items-center justify-between rounded-xl px-3 py-2 text-[10px] uppercase tracking-widest font-semibold text-ink outline-hidden transition-all duration-150 focus:bg-ink focus:text-bg data-disabled:pointer-events-none data-disabled:opacity-50",
        {
          "text-red-500 focus:bg-red-500 focus:text-white": variant === "destructive",
        },
        className
      )}
      {...props}
    />
  );
});
DropdownMenuItem.displayName = "DropdownMenuItem";

export const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger>
>(({ className, children, ...props }, ref) => {
  return (
    <DropdownMenuPrimitive.SubTrigger
      ref={ref}
      className={cn(
        "group flex cursor-pointer select-none items-center justify-between rounded-xl px-3 py-2 text-[10px] uppercase tracking-widest font-semibold text-ink outline-hidden transition-all duration-150 focus:bg-ink focus:text-bg data-[state=open]:bg-ink data-[state=open]:text-bg",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto h-3.5 w-3.5 shrink-0 text-muted group-focus:text-bg" />
    </DropdownMenuPrimitive.SubTrigger>
  );
});
DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger";

export const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label>
>(({ className, ...props }, ref) => {
  return (
    <DropdownMenuPrimitive.Label
      ref={ref}
      className={cn(
        "px-3 py-1.5 text-[9px] font-bold tracking-[0.2em] uppercase text-muted/80",
        className
      )}
      {...props}
    />
  );
});
DropdownMenuLabel.displayName = "DropdownMenuLabel";

export const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => {
  return (
    <DropdownMenuPrimitive.Separator
      ref={ref}
      className={cn("-mx-1 my-1.5 h-[1px] bg-line", className)}
      {...props}
    />
  );
});
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

export const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-[8px] tracking-widest font-medium text-muted/60 uppercase transition-colors group-focus:text-bg/75",
        className
      )}
      {...props}
    />
  );
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
