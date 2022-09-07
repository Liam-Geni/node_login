/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { auth } from "../_actions/user_action";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function (SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck(props) {
    let navigate = useNavigate();
    let user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
      //To know my current status, send Auth request
      dispatch(auth()).then((response) => {
        //Not Loggined in Status
        if (!response.payload.isAuth) {
          if (option) {
            navigate("/login");
          }
          //Loggined in Status
        } else {
          //supposed to be Admin page, but not admin person wants to go inside
          if (adminRoute && !response.payload.isAdmin) {
            navigate("/");
          }
          //Logged in Status, but Try to go into log in page
          else {
            if (option === false) {
              navigate("/");
            }
          }
        }
      });
    }, []);

    return <SpecificComponent {...props} user={user} />;
  }
  return AuthenticationCheck;
}
