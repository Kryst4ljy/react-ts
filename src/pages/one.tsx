import React, { FC, useEffect } from "react";
import { connect } from "../dva";
import { orderList } from "../apis/index";
import "./one.scss";

const One: FC<any> = (props: any) => {
  const { dispatch, one } = props;

  useEffect(() => {
    getOrderList();
  }, []);

  const getOrderList = async () => {
    const r = await orderList({});
    console.log(r);
  };

  return (
    <div>
      <div className="title">{one.txt}</div>
      <div
        onClick={() => {
          dispatch({ type: "one/initState", payload: { txt: "test" } });
        }}
      >
        测试
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({ one: state.one });
export default connect(mapStateToProps)(One);
