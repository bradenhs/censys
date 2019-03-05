import React from "react";
import { observer } from "mobx-react-lite";
import { style, keyframes, classes } from "typestyle";

const commonTransitionProperties = {
  animationFillMode: "both",
  animationDuration: "300ms"
};

const slideInClassName = style({
  ...commonTransitionProperties,
  animationName: keyframes({
    from: {
      opacity: 0,
      transform: "translateY(10px)"
    },
    to: {
      opacity: 1,
      transform: "translateY(0px)"
    }
  })
});

const fadeInClassName = style({
  ...commonTransitionProperties,
  animationName: keyframes({
    from: {
      opacity: 0
    },
    to: {
      opacity: 1
    }
  })
});

type Props = {
  children: React.ReactNode;
  type: "slide" | "fade";
  className?: string;
  delay?: number;
};

export const TransitionIn = observer((props: Props) => {
  return (
    <div
      style={{ animationDelay: (props.delay || 0) + "ms" }}
      className={classes(
        props.className,
        props.type === "slide" ? slideInClassName : fadeInClassName
      )}
    >
      {props.children}
    </div>
  );
});
