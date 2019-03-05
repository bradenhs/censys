import { Toaster, IToastProps, Position } from "@blueprintjs/core";

const toaster = Toaster.create({
  position: Position.BOTTOM_RIGHT
});

export function showToast(props: IToastProps) {
  toaster.show(props);
}
