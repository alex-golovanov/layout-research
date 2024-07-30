import { easings } from "@react-spring/web";

export const DEFAULT_ROWS = ["1fr"];
export const SPRING_ANIMATION_CONFIG = {
  tension: 280,
  friction: 120,
  // precision: 0.25,
  // velocity: 0.025,
  // clamp: true,
  easing: easings.easeInCirc,
};
