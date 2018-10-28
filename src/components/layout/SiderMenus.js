import React from 'react'
import PropTypes from 'prop-types'
import {Menu, Icon} from 'antd';
import {Link} from 'react-router-dom';
const {SubMenu} = Menu;

const SiderMenus = ({match}) => (
    <div style={{paddingBottom: '120px'}}>
        <Menu theme="dark"
              defaultSelectedKeys={[match.url]}
              selectedKeys={[match.url]}
              defaultOpenKeys={["testsub"]} mode="inline">
        <Menu.Item key="/">
                <Link to="/">
                    <span className="iconfont icon-shouye">首页</span>
                </Link>
            </Menu.Item>
            <SubMenu
                key={"testsub"}
                title={<span className="iconfont icon-tongji">测试组</span>}>
                    <Menu.Item key="/SimpleForceChart">
                        <Link to="/SimpleForceChart">简单力导图</Link>
                    </Menu.Item>
            </SubMenu>
        </Menu>
    </div>
);

SiderMenus.propTypes = {
    match: PropTypes.object.isRequired
};

export default SiderMenus;

