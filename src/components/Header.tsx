import { observer } from "mobx-react-lite";
import {
  Navbar,
  Alignment,
  Button,
  Classes,
  Popover,
  Menu,
  MenuItem
} from "@blueprintjs/core";
import React from "react";
import logo from "../assets/logo.svg";
import { style } from "typestyle";
import { useAppModel } from "../utils/useAppModel";
import { TransitionIn } from "./TransitionIn";
import { signOut } from "../actions/signOut";
import { useWindowSize } from "react-use";
import { SMALL_FORM_MAX_WIDTH } from "../constants/layout";

const logoClassName = style({
  height: "26px"
});

export const Header = observer(() => {
  const appModel = useAppModel();
  const { width } = useWindowSize();

  return (
    <Navbar>
      <Navbar.Group align={Alignment.LEFT}>
        <img src={logo} className={logoClassName} />
      </Navbar.Group>
      {appModel.authDetails && (
        <TransitionIn type="fade">
          <Navbar.Group align={Alignment.RIGHT}>
            <Popover minimal>
              <Button
                className={Classes.MINIMAL}
                icon="user"
                text={
                  width > SMALL_FORM_MAX_WIDTH
                    ? appModel.authDetails.login
                    : undefined
                }
                rightIcon="caret-down"
              />
              <Menu>
                <MenuItem
                  text="Sign out"
                  icon="log-out"
                  onClick={handleClick}
                />
              </Menu>
            </Popover>
          </Navbar.Group>
        </TransitionIn>
      )}
    </Navbar>
  );

  function handleClick() {
    signOut(appModel);
  }
});
