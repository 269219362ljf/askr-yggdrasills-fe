import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {Layout} from 'antd';
import RootHeader from './components/layout/RootHeader';
import {ContentRoute, SiderMenusRoute} from './routes';
import reducers from './reducers';
import './App.css';
import AppBreadcrumbRoute from "./components/layout/AppBreadcrumbRoute";

const {Content, Sider,Footer} = Layout;

function configureStore(initialState) {
    const store = applyMiddleware(thunkMiddleware)(createStore)(reducers,initialState);
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('./reducers', () => {
            const nextReducers = require('./reducers/index');
            store.replaceReducer(nextReducers);
        });
    }
    return store;
}


class App extends Component {
    state = {
        collapsed: false,
    };
    onCollapse = (collapsed) => {
        this.setState({collapsed});
    };

    render() {
        const store = configureStore();
        return (
            // <!-- provider要与connect共用，
            // 父组件使用provider为子组件提供store
            // 子组件使用connect从父组件获取store并进行映射
            //  -->
            <Provider store={store}>
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
                            <AppBreadcrumbRoute />
                            <Content style={{margin: 0, minHeight: 280}}>
                                <ContentRoute/>
                            </Content>
                        </Layout>
                    </Layout>
                    <Footer style={{ textAlign: 'center' }}>
                        personalWebSite ©2018 Created by lu All rights reserved (粤ICP备18158503号-1)
                    </Footer>
                </Layout>
            </Provider>
        );
    }
}

export default App;
