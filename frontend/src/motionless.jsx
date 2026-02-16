import React, { forwardRef } from "react";

const MOTION_PROPS = new Set([
  "initial",
  "animate",
  "exit",
  "variants",
  "transition",
  "whileHover",
  "whileTap",
  "whileFocus",
  "whileInView",
  "viewport",
  "layout",
  "layoutId",
  "layoutDependency",
  "layoutRoot",
  "layoutScroll",
  "custom",
  "inherit",
  "transformTemplate",
  "drag",
  "dragConstraints",
  "dragElastic",
  "dragMomentum",
  "dragPropagation",
  "dragTransition",
  "onAnimationComplete",
  "onUpdate",
  "onViewportEnter",
  "onViewportLeave",
  "onHoverStart",
  "onHoverEnd",
  "onTap",
  "onTapStart",
  "onTapCancel",
  "onPan",
  "onPanStart",
  "onPanEnd",
  "onPanSessionStart",
  "onPanSessionEnd",
  "onDrag",
  "onDragStart",
  "onDragEnd",
  "onDragTransitionEnd",
  "onDirectionLock"
]);

const stripMotionProps = (props) => {
  const clean = {};
  Object.keys(props).forEach((key) => {
    if (!MOTION_PROPS.has(key)) {
      clean[key] = props[key];
    }
  });
  return clean;
};

const motionCache = new Map();

const createMotionless = (tag) => {
  if (motionCache.has(tag)) {
    return motionCache.get(tag);
  }

  const Component = forwardRef((props, ref) => {
    return React.createElement(tag, { ref, ...stripMotionProps(props) });
  });

  Component.displayName = `Motionless(${String(tag)})`;
  motionCache.set(tag, Component);
  return Component;
};

const motion = new Proxy(
  {},
  {
    get: (_target, tag) => createMotionless(tag)
  }
);

const AnimatePresence = ({ children }) => <>{children}</>;

export { motion, AnimatePresence };
