import React, {Component} from 'react';
import {connect} from 'react-redux';
import {todoItemReload, TODOITEMRELOAD} from "../../actions";
import {Card, Icon} from "antd";

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
    return [<p key={1}>{cnt} reload content</p>, <p key={2}>{cnt} reload content</p>, <p key={3}>{cnt} reload content</p>];
}

class TodoItemCard extends Component{

    createDefaultContent(){
        let result=[(<p key={1}>Card content</p>),<p key={2}>Card content</p>,<p key={3}>Card content</p>];
        return result;
    }

    componentDidMount(){
        //this.props.todoItemReload();
    };


    render(){
        const content=this.props.todoItemData?this.props.todoItemData:this.createDefaultContent();
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
