import React from 'react';
import {Route,Switch} from 'react-router-dom';

import SiderMenus from '../components/layout/SiderMenus';

import Home from '../containers/Home';
import SimpleForceChart from '../containers/SimpleForceChart';

export const SiderMenusRoute=()=>
    <Route path="*" component={SiderMenus}/>;


export const RootBreadcrumbRoute = () =>
    <Route path="*" component={null}/>;

export const ContentRoute=()=>
    <Switch>
        <Route exact path={'/'} component={Home}/>
        <Route exact path={'/SimpleForceChart'} component={SimpleForceChart}/>
    </Switch>;

export default ContentRoute;
