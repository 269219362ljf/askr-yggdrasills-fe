import React from 'react'
import PropTypes from 'prop-types'
import {Menu, Icon, Badge} from 'antd';
import {Link} from 'react-router-dom';

const {SubMenu} = Menu;

const SiderMenus = ({match}) => (
    <div style={{paddingBottom: '120px'}}>
        <Menu theme="dark"
              defaultSelectedKeys={[match.url]}
              selectedKeys={[match.url]} defaultOpenKeys={['sub4']} mode="inline">
        <Menu.Item key="/">
                <Link to="/">
                    <Icon type="home"/>
                    <span>首页</span>
                </Link>
            </Menu.Item>
            <SubMenu
                key={"testsub"}
                title={<span><Icon type="switcher"/><span>测试组</span></span>}
            >
                <Menu.Item>
                    <Menu.Item key="/D3SimpleForceChart"><Link to="/D3SimpleForceChart">简单力导图</Link></Menu.Item>
                </Menu.Item>
            </SubMenu>

        </Menu>
    </div>
);

SiderMenus.propTypes = {
    match: PropTypes.object.isRequired
};

export default SiderMenus;

