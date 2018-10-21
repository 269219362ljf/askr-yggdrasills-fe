import React from 'react';
import {Row, Col, Card} from 'antd';
import D3SimpleForceChart from '../components/charts/D3SimpleForceChart';
import D3SimpleForceData from '../testdata/D3SimpleForceData';










class SimpleForceChart extends React.Component {

    componentDidMount(){
            try {
                let getdata=this.data;
                const res = fetch('http://localhost:8082/test/D3SimpleForceData',{
                    headers: {
                        'Accept': 'application/json',
                        'content-type':'application/json'
                    },
                    method:'get'
                }).then(response=>{
                    let tmpres=response.json().then(value => {
                        getdata=value;
                    }).catch(reason => console.log(reason));

                });
            } catch (err) {
                console.log(err);
            }
        };

    render(){
        let origindata = this.data?this.data:D3SimpleForceData;
        let data=JSON.parse(JSON.stringify(origindata));
        return (
            <div>
                <Row gutter={10}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="D3 简单力导向图" bordered={false}>
                                <D3SimpleForceChart data={data}/>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default SimpleForceChart;
