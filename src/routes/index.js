import React from 'react';
import {Route,Switch} from 'react-router-dom';
import SiderMenus from '../components/layout/SiderMenus';

import Home from '../containers/Home';
import SimpleForceChart from '../containers/charts/SimpleForceChart';
import SystemSetting from "../containers/systemSetting/SystemSetting";

export const SiderMenusRoute=()=>
    <Route path="*" component={SiderMenus}/>;

export const ContentRoute=()=>
    <Switch>
        <Route exact path={'/'} component={Home}/>
        <Route exact path={'/SimpleForceChart'} component={SimpleForceChart}/>
        <Route exact path={'/SystemSetting'} component={SystemSetting}/>
    </Switch>;




export default ContentRoute;
