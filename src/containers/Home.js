import React from 'react';
import {Row,Col,Card} from "antd";


class Home extends React.Component{

    render(){
        return (
            <div  className="gutter-example button-demo todo-card" >
                <Row gutter={10}>
                    <Col>
                        <Card
                            title="待办事项"
                            extra={<a href="#">More</a>}
                            style={{ width: 300 }}>
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    };

}

export default Home;
