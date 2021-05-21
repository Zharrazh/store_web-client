import React, { useCallback, useRef } from "react";
import { Button, Menu, MenuItem } from "@material-ui/core";
import { AuthAsyncActions } from "../../../../data/auth/thunks";
import { useDispatch } from "react-redux";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import ArrowDropDownOutlinedIcon from "@material-ui/icons/ArrowDropDownOutlined";
import ArrowDropUpOutlinedIcon from "@material-ui/icons/ArrowDropUpOutlined";
import { Authorize } from "../../../authorize/Authorize";
import { Route, Switch } from "react-router-dom";
import { history } from "../../../../index";

type Props = {
  userName: string;
};
export const UserMenu: React.FC<Props> = React.memo(({ userName }) => {
  const dispatch = useDispatch();
  const buttonRef = useRef(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = () => {
    setAnchorEl(buttonRef.current);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const logoutHandle = useCallback(() => {
    dispatch(AuthAsyncActions.logoutAsync());
    handleClose();
  }, [dispatch]);
  return (
    <div>
      <Button
        ref={buttonRef}
        onClick={handleClick}
        style={{ color: "white" }}
        variant={"text"}
      >
        <AccountCircleOutlinedIcon style={{ marginRight: "12px" }} />
        <span style={{ marginRight: "8px" }}>{userName}</span>
        {anchorEl ? <ArrowDropUpOutlinedIcon /> : <ArrowDropDownOutlinedIcon />}
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        onClose={handleClose}
        open={Boolean(anchorEl)}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        getContentAnchorEl={null}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>Cart</MenuItem>
        <hr />
        <MenuItem onClick={logoutHandle}>Logout</MenuItem>
        <Authorize
          admin
          successRender={() => (
            <>
              <hr />
              <Switch>
                <Route
                  path={"/dashboard"}
                  render={() => (
                    <MenuItem
                      onClick={() => {
                        history.push("/");
                      }}
                    >
                      Go to site
                    </MenuItem>
                  )}
                />
                <Route
                  path={"/"}
                  render={() => (
                    <MenuItem
                      onClick={() => {
                        history.push("/dashboard");
                      }}
                    >
                      Go to dashboard
                    </MenuItem>
                  )}
                />
              </Switch>
            </>
          )}
        />
      </Menu>
    </div>
  );
});
