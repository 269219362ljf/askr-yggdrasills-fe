import {SimpleForceChartDataReducer} from '../containers/charts/SimpleForceChart';
import {todoItemCardReducer} from '../components/home/TodoItemCard';

import {combineReducers} from "redux";


//指明reducer处理的state的名字，state是store的一个属性，
// 所有的reducer都会收到发出的action，进行处理后，对对应的state进行更新
// 在更新后，react组件会检查store并进行界面的更新
const reducers=combineReducers({
    sysForceData:SimpleForceChartDataReducer,
    todoItemData:todoItemCardReducer
});

export default reducers;


