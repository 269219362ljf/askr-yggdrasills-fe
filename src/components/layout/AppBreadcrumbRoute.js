import React, {Component} from 'react';
import {componentUrlNameMap} from '../../constants';
import {Link, withRouter } from 'react-router-dom';
import { Breadcrumb } from 'antd';



class AppBreadcrumbRoute extends Component{

    getBreadcrumItem(path){
        const breadcrumpath = path.split('/').filter(i => i);
        let breadcrumbItems=[];
        //if(breadcrumpath.length==0){
            breadcrumbItems=breadcrumbItems.concat((
                <Breadcrumb.Item key="home">
                    <Link to="/"> {componentUrlNameMap['home']}</Link>
                </Breadcrumb.Item>
            ));
       //}
        breadcrumbItems=breadcrumbItems.concat(breadcrumpath.map((item, index) => {
            let url = `/${item}`;
            return (
                <Breadcrumb.Item key={url}>
                    <Link to={url}>
                        {componentUrlNameMap[item]}
                    </Link>
                </Breadcrumb.Item>
            );
        }));
        return breadcrumbItems;
    };


    render() {
        let breadcrumbItems=this.getBreadcrumItem(this.props.location.pathname);
        return (
            <Breadcrumb separator={">"} className={'appbreadcrumb'} >
                {breadcrumbItems}
            </Breadcrumb>
        );
    }
}

export default withRouter(AppBreadcrumbRoute);



