import React from 'react';
import { Form,  Input, Button, Row,Col,Card,Table } from 'antd';
import SystemSettingData from '../../testdata/SystemSettingData';

const FormItem = Form.Item;

class SystemSettingAddFormClass extends React.Component{

    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <Form layout="inline"
                  onSubmit={this.handleSubmit}>
                <Row>
                    <Col span={6}>
                <FormItem label="系统配置名">
                    {getFieldDecorator('systemSettingName', {
                        rules: [{ required: true, message: 'systemSettingName is required!' }],
                    })(<Input />)}
                </FormItem>
                    </Col>
                    <Col span={6}>
                <FormItem label="系统配置值">
                    {getFieldDecorator('systemSettingValue', {
                        rules: [{ required: true, message: 'systemSettingValue is required!' }],
                    })(<Input />)}
                </FormItem>
                    </Col>
                    <Col span={6}>
                <FormItem label="权限校验码">
                    {getFieldDecorator('authorityCode', {
                        rules: [{ required: true, message: 'authorityCode is required!' }],
                    })(<Input />)}
                </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={22} style={{ textAlign: 'right' }}>
                        <Button type="primary" htmlType="submit">提交</Button>
                        <Button style={{ marginLeft: 12 }} onClick={this.handleReset}>
                            清空
                        </Button>
                    </Col>
                </Row>
            </Form>
        )
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log('Received values of form: ', values);
        });
    }

    handleReset = () => {
        this.props.form.resetFields();
    }
}

const SystemSettingAddForm = Form.create()(SystemSettingAddFormClass);

class SystemQueryFormClass extends React.Component{
    render(){
        const { getFieldDecorator } = this.props.form;
        //console.log("SystemQueryFormClass",this.props.table);
        return(
        <Form layout="inline"
              onSubmit={this.handleQuery}>
            <Row>
                <Col span={6}>
                    <FormItem label="系统配置名">
                        {getFieldDecorator('systemSettingName', {
                            rules: [{ required: true, message: 'systemSettingName is required!' }],
                        })(<Input />)}
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span={22} style={{ textAlign: 'right' }}>
                    <Button type="primary" htmlType="submit">查询</Button>
                    <Button style={{ marginLeft: 12 }} onClick={this.handleReset}>
                        清空
                    </Button>
                </Col>
            </Row>
        </Form>
        );
    }

    handleQuery = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log('Received values of form: ', values);
        });
    }

    handleReset = () => {
        this.props.form.resetFields();
    }
}

const SystemQueryForm=Form.create()(SystemQueryFormClass);

class SystemSettingTable extends React.Component{

    columns = [{
        title: '系统参数名',
        dataIndex: 'name',
        key: 'name',
        align:'center'
    }, {
        title: '系统参数值',
        dataIndex: 'value',
        key: 'value',
        align:'center'
    }];

    render(){
        return(
            <Card>
                <Row>
                    <SystemQueryForm table={this}/>
                </Row>
                <Row>
                    <Table columns={this.columns} dataSource={SystemSettingData} />
                </Row>
            </Card>
        )
    }



}




class SystemSetting extends React.Component{

   render(){
       return(
         <div>
             <Row>
                 <Card title="系统参数增加/更新">
                     <SystemSettingAddForm/>
                 </Card>
                 <SystemSettingTable/>
             </Row>
         </div>
       );
   }
}

export default SystemSetting;



























