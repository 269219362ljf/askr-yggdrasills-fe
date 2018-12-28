import React from 'react';
import {Row, Col, Card} from 'antd';
import {connect} from 'react-redux';
import {LOADSYSFORCEDATA,loadSysForceData} from '../../actions'
import D3SimpleForceChart from '../../components/simpleForceChart/D3SimpleForceChart';
import D3SimpleForceData from '../../testdata/D3SimpleForceData';

//reducer接收自己对应的state和群发的action，根据action的内容对state进行更新
export function SimpleForceChartDataReducer(state={},action){
    switch (action.type) {
        case LOADSYSFORCEDATA:
            return Object.assign({},state,{data:transformData(action.data)});
        default:return state;
    }
}

//将action的数据进行处理
function transformData(data){
    return data;
}

//将state的数据映射到this.props
const mapStateToProps=(state)=>{
    return {sysForceData:state.sysForceData.data};
};

//将dispatch方法映射到this.props
//映射后，调用该方法相当于发送了一个action
const mapDispatchToProps=(dispatch)=>{
    return {
        loadSysForceData:(data)=>dispatch(loadSysForceData(data))
    }
};


class SimpleForceChart extends React.Component {

    constructor(props){
        super(props);
    }

    componentDidUpdate(){

    }

    componentDidMount(){
        //this.fetchData();
        //this.props.loadSysForceData(data);
        };

    fetchData(){
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
                    console.log("response data",value);
                }).catch(reason => console.log(reason));
            });
        } catch (err) {
            console.log(err);
        }
    }

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

export default connect(mapStateToProps,mapDispatchToProps)(SimpleForceChart);
