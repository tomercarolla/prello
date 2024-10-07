import * as BasePopover from '@radix-ui/react-popover';
import { AnimatePresence, motion } from 'framer-motion';
import React, {
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';

export function Popover({ trigger, side, children, onOpenChanged }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    onOpenChanged?.(open);
  }, [open, onOpenChanged]);

  return (
    <ControlledPopover
      trigger={trigger}
      side={side}
      open={open}
      setOpen={setOpen}
    >
      {children}
    </ControlledPopover>
  );
}

export function ControlledPopover({
  trigger,
  side = 'bottom',
  open,
  setOpen,
  children,
}) {
  const contentRef = useRef(null);

  const clonedChildren = React.Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child, {
        onClick: (event) => {
          if (child.props.onClick) {
            child.props.onClick(event);
          }
          if (event.target.closest('[data-close-popover]')) {
            setOpen(false);
          }
        },
      });
    }

    return child;
  });

  return (
    <BasePopover.Root open={open} onOpenChange={setOpen}>
      <BasePopover.Trigger asChild>{trigger}</BasePopover.Trigger>
      <AnimatePresence>
        {open ? (
          <BasePopover.Portal forceMount>
            <BasePopover.Content asChild side={side} sideOffset={5}>
              <Content
                ref={contentRef}
                initial={{ opacity: 0, scale: 0.9 }}
                exit={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  ease: 'linear',
                  duration: 0.12,
                }}
              >
                {clonedChildren.map((clonedChild) => clonedChild)}
              </Content>
            </BasePopover.Content>
          </BasePopover.Portal>
        ) : null}
      </AnimatePresence>
    </BasePopover.Root>
  );
}

const Content = styled(motion.div)`
  --popover-z: 100;
  --max-popover-height: calc(var(--radix-popper-available-height) - 10px);
  width: 304px;
  padding: 12px;
  box-sizing: border-box;
  background-color: var(--ds-surface-overlay);
  color: var(--ds-text);
  box-shadow: var(
    --ds-shadow-overlay,
    0px 8px 12px #091e4226,
    0px 0px 1px #091e424f
  );
  border-radius: 8px;
  z-index: var(--popover-z) !important;
  max-height: var(--max-popover-height);
  overflow-y: auto;

  ul {
    > li:not([role='option']) {
      all: unset;
      appearance: none;
      display: flex;
    }
  }
`;
