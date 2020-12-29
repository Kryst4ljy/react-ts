/**
 * 创建公共histroy，Link 方便管理
 */
import { createBrowserHistory } from "history";
import { Link } from "react-router-dom";
import { History as H } from "history";

export default createBrowserHistory();
export { Link };
export type History = H;
