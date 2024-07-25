export const SPRING_CONFIG = {
  block: {
    // from: [{ opacity: 0, display: "none" }],
    // to: [{ display: "block" }, { opacity: 1 }],
    // to: async (next, cancel) => {
    //   await next({ display: "block" });
    //   await next({ opacity: 1 });
    // },
    to: {
      // opacity: 1,
      display: "block",
    },
  },
  none: {
    // from: { display: "block", opacity: 1 },
    // to: [{ opacity: 0 }, { display: "none" }],
    // to: async (next, cancel) => {
    //   await next({ opacity: 0 });
    //   await next({ display: "none" });
    // },
    to: {
      // opacity: 0,
      display: "none",
    },
  },
};
