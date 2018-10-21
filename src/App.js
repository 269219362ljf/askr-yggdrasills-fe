import React, {Component} from 'react';
import {Layout} from 'antd';

import RootHeader from './components/layout/RootHeader';
import {ContentRoute, SiderMenusRoute, RootBreadcrumbRoute} from "./routes";
import './App.css';

const {Content, Sider, Footer} = Layout;

class App extends Component {
    state = {
        collapsed: false
    };
    onCollapse = (collapsed) => {
        this.setState({collapsed});
    };

    render() {
        return (
            <Layout style={{minHeight: '100vh'}}>
                <RootHeader/>
                <Layout style={{paddingTop: '64px'}}>
                    <Sider
                        width={200}
                        style={{background: '#333'}}
                        collapsible
                        collapsed={this.state.collapsed}
                        onCollapse={this.onCollapse}
                        className="fixed"
                    >
                        <SiderMenusRoute/>
                    </Sider>
                    <Layout className={this.state.collapsed ? 'content-normal' : 'content-max'}>
                        <RootBreadcrumbRoute/>
                        <Content style={{margin: 0, minHeight: 280}}>
                            <ContentRoute/>
                        </Content>
                        <Footer style={{textAlign: 'center'}}>
                        </Footer>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

export default App;
