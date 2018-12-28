import React from 'react';
import {Row,Col,Card,Icon,Timeline,Calendar} from "antd";
import TodoItemCard from "../components/home/TodoItemCard";

class Home extends React.Component{

    render(){
        return (
            <div  className="gutter-example button-demo todo-card" >
                <Row gutter={8}>
                    <Col span={4}>
                        {/*<Card*/}
                            {/*title="待办事项"*/}
                            {/*extra={<a href="#">More</a>}*/}
                            {/*style={{ width: 300 }}>*/}
                            {/*<p>Card content</p>*/}
                            {/*<p>Card content</p>*/}
                            {/*<p>Card content</p>*/}
                        {/*</Card>*/}
                        <TodoItemCard/>
                    </Col>
                </Row>
                <Row type="flex" justify="start">
                    <Col >
                        <Card
                            title="任务进程"
                        extra={<a className="card-tool"><Icon type="sync" /></a>}
                        style={{width:500}}>
                            <Timeline mode="alternate">
                                <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                                <Timeline.Item color="green">Solve initial network problems 2015-09-01</Timeline.Item>
                                <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</Timeline.Item>
                                <Timeline.Item color="red">Network problems being solved 2015-09-01</Timeline.Item>
                                <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                                <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}>Technical testing 2015-09-01</Timeline.Item>
                            </Timeline>
                        </Card>
                    </Col>
                    <Col>
                        <div style={{ width: 500, border: '1px solid #d9d9d9', borderRadius: 4 }}>
                            <Calendar fullscreen={false}  />
                        </div>
                    </Col>
                </Row>
                <Row>
                </Row>
            </div>
        );
    };

}

export default Home;
