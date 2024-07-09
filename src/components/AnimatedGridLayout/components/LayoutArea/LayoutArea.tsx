import { animated, useSpring } from "react-spring";
import { SPRING_CONFIG } from "./constants";

export interface LayoutAreaProps {
  name: string;
  hidden?: boolean;
  children: React.ReactNode;
}

export function LayoutArea(props: LayoutAreaProps) {
  const { hidden = false, name, children } = props;
  const display = hidden ? "none" : "block";
  const springs = useSpring(SPRING_CONFIG[display]);

  return (
    <animated.div
      style={{
        gridArea: name,
        position: "relative",
        ...springs,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
        }}
      >
        {children}
      </div>
    </animated.div>
  );
}
