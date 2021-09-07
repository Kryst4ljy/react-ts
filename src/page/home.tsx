import React, { FC, useEffect } from "react";
import { connect } from "../dva";
import styles from "./styles/home.module.scss";
import { orderList } from "../apis/index";

const Home: FC<any> = (props: any) => {
  const { dispatch, home } = props;

  useEffect(() => {
    // getOrderList();
  }, []);

  const getOrderList = async () => {
    const r = await orderList({});
    console.log(r);
  };

  return (
    <div>
      <div className={styles.title}>{home.name}</div>
      <div
        onClick={() => {
          dispatch({ type: "home/initState", payload: { name: "kryst4l" } });
        }}
      >
        点我
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({ home: state.home });
export default connect(mapStateToProps)(Home);
