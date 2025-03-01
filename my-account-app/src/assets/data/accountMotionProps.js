export const motionProps = {
  variants: {
    enter: {
      y: 0,
      opacity: 1,
      height: "auto",
      overflowY: "unset",
      transition: {
        height: {
          type: "spring",
          stiffness: 800,
          damping: 30,
          duration: 1.75,
        },
        opacity: {
          easings: "ease",
          duration: 1,
        },
      },
    },
    exit: {
      y: -10,
      opacity: 0,
      height: 0,
      overflowY: "hidden",
      transition: {
        height: {
          easings: "ease",
          duration: 0.25,
        },
        opacity: {
          easings: "ease",
          duration: 0.3,
        },
      },
    },
  },
}; 