import React from 'react';
import {Redirect,Route,Switch} from 'react-router-dom';

import RootHeader from '../components/layout/RootHeader';
import SiderMenus from '../components/layout/SiderMenus';

import Home from '../containers/Home';
import D3SimpleForceChart from '../containers/SimpleForceChart';

export const SiderMenusRoute=()=>
    <Route path="*" component={SiderMenus}/>;


export const RootBreadcrumbRoute = () =>
    <Route path="*" component={null}/>;

export const ContentRoute=()=>
    <Switch>
        <Route exact path={'/'} component={Home}/>
        <Route exact path={'/D3SimpleForceChart'} component={D3SimpleForceChart}/>
    </Switch>;

export default ContentRoute;
