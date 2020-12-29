import React, { FC } from "react";
import { connect } from "../dva";

const one: FC<any> = (props: any) => {
  return <div>{props.one.txt}</div>;
};

const mapStateToProps = (state: any) => ({ one: state.one });
export default connect(mapStateToProps)(one);
