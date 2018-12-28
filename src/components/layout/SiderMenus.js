import React from 'react'
import PropTypes from 'prop-types'
import {Menu} from 'antd';
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
                title={<span className="iconfont icon-tongji">测试组</span>}>
            </SubMenu>
            <SubMenu
                title={<span className="iconfont icon-shujukanban">图表</span>}>
                <Menu.Item key="/SimpleForceChart">
                    <Link to="/SimpleForceChart">简单力导图</Link>
                </Menu.Item>
            </SubMenu>
            <SubMenu
                title={<span className="iconfont icon-ruanjiankaifabao">在线工具</span>}>
            </SubMenu>
            <SubMenu
                title={<span className="iconfont icon-yuanquyunwei">在线编辑</span>}>
            </SubMenu>
            <SubMenu
                title={<span className="iconfont icon-renjijiaohu">设计工具</span>}>
            </SubMenu>
            <SubMenu
                title={<span className="iconfont icon-icon_renwujincheng">任务设置</span>}>
            </SubMenu>
            <SubMenu
                title={<span className="iconfont icon-icon_shezhi">系统设置</span>}>
                <Menu.Item key="/SystemSetting">
                    <Link to="/SystemSetting">系统设置</Link>
                </Menu.Item>
            </SubMenu>
        </Menu>
    </div>
);

SiderMenus.propTypes = {
    match: PropTypes.object.isRequired
};

export default SiderMenus;

