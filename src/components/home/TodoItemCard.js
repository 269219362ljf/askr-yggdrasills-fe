import React, {Component} from 'react';
import {connect} from 'react-redux';
import {todoItemReload, TODOITEMRELOAD} from "../../actions";
import {Card, Icon,Checkbox, Row } from "antd";

export function todoItemCardReducer(state={},action){
    switch (action.type) {
        case TODOITEMRELOAD:
            return Object.assign({},state,{data:reload()});
        default:return state;
    }
}

//将state的数据映射到this.props
const mapStateToProps=(state)=>{
    return {todoItemData:state.todoItemData.data};
};

//将dispatch方法映射到this.props
//映射后，调用该方法相当于发送了一个action
const mapDispatchToProps=(dispatch)=>{
    return {
        todoItemReload:()=>dispatch(todoItemReload())
    }
};

let cnt = 0;
//刷新按钮触发
function reload() {
    cnt++;
    let item=[];
    for(let i=0;i<3;i++){
        item[i]={finish:false,content:i+" reload content"};
    }
    return item;
}

class TodoItemCard extends Component{

    constructor(props){
        super(props);
        this.state={
            items:[]
        };
    }

    //当props发生变化时执行调用，线程安全，不会触发render
    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({items:nextProps.todoItemData});
    }

    makeTodoItem(items){
        if(items===undefined||items.length===0){
            return(
              <p>正在加载中</p>
            );
        }
        let result=[];
        for(let i=0;i<items.length;i++){
            result[i]=(<Row key={i}>
                <Checkbox key={i} value={i} onChange={this.checkboxOnChange.bind(this)}
                          style={{"textDecoration":items[i].finish===true?"line-through":""}}>
                    {cnt} {items[i].content}
                </Checkbox>
            </Row>)
        }
        return result;
    }

    checkboxOnChange(e){
        //获取state中的items副本
        let items=JSON.parse(JSON.stringify(this.state.items));
        items[e.target.value].finish = e.target.checked;
        this.setState({items:items});
    }

    render(){
        const content=this.makeTodoItem(this.state.items);
        return(
            <Card
                title="待办事项"
                extra={<a className="card-tool" href="#" onClick={()=>this.props.todoItemReload()}>
                    <Icon type="sync" />
                    </a>}
                style={{ width: 300 }}>
               {content}
            </Card>
        );
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(TodoItemCard);
