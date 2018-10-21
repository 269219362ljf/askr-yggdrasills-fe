import React from 'react';
import {Layout, Menu, Badge, Icon, Avatar} from 'antd'

const {SubMenu} = Menu;
const {Header} = Layout;

const RootHeader = () => (
    <Header className={"header clearfix fixed"} style={{background: '#404040'}}>
        <div className={"logo"}>赤月幼狼</div>

        <div className={"right-menu"}
             style={{float: 'right', width: '30%'}}
        >
            <Menu
                theme={"dark"}
                mode={"horizontal"}
                style={{lineHeight: '64px', float: 'right', background: '#404040'}}
            >
                <SubMenu title={"设置"}>
                    <Menu.ItemGroup title={"个人中心"}>
                        <Menu.Item key={"setting:1"}>个人信息</Menu.Item>
                        <Menu.Item key={"setting:2"}>密码修改</Menu.Item>
                    </Menu.ItemGroup>

                </SubMenu>
            </Menu>
        </div>

    </Header>
);

export default RootHeader;
