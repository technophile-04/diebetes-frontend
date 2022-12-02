import React from "react";
// import { CircularProgress } from "@material-ui/core";

type ButtonProp = {
  title: string;
  isLoading?: boolean;
  onClickFunc: any;
  children?: any;
  style?: any;
};

const ConnectButton: React.FC<ButtonProp> = ({
  title,
  onClickFunc,
  isLoading = false,
  children,
  style,
}) => {

  return (
    <button
      onClick={onClickFunc}
      // className={}
      disabled={isLoading}
      style={style}
    >
      {isLoading ? (
        <>
          
          {" Loading"}
        </>
      ) : (
        title
      )}
      {children}
    </button>
  );
};

export default ConnectButton;
