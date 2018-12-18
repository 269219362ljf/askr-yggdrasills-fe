import React, {Component} from 'react';
import {connect} from 'react-redux';
import {todoItemReload, TODOITEMRELOAD} from "../../actions";
import {Card, Icon, Checkbox, Row, Button} from "antd";

export function todoItemCardReducer(state = {}, action) {
    switch (action.type) {
        case TODOITEMRELOAD:
            return Object.assign({}, state, {data: reload()});
        default:
            return state;
    }
}

//将state的数据映射到this.props
const mapStateToProps = (state) => {
    return {todoItemData: state.todoItemData.data};
};

//将dispatch方法映射到this.props
//映射后，调用该方法相当于发送了一个action
const mapDispatchToProps = (dispatch) => {
    return {
        todoItemReload: () => dispatch(todoItemReload())
    }
};

let cnt = 0;

//刷新按钮触发
function reload() {
    cnt++;
    let item = [];
    for (let i = 0; i < 3; i++) {
        item[i] = {finish: false, content: i + " reload content"};
    }
    return item;

    //TODO 改造此处，从服务器获取待办事项

}

class TodoItemCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            showSubmit: false
        };
        this.props.todoItemReload();
    }

    //当props发生变化时执行调用，线程安全，不会触发render
    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({items: nextProps.todoItemData});
    }

    makeTodoItem(items) {
        if (items === undefined || items.length === 0) {
            return (
                <p>正在加载中</p>
            );
        }
        let result = [];
        for (let i = 0; i < items.length; i++) {
            result[i] = (<Row key={i}>
                <Checkbox key={i} value={i} onChange={this.checkboxOnChange.bind(this)}
                          checked={items[i].finish}
                          style={{"textDecoration": items[i].finish === true ? "line-through" : ""}}>
                    {cnt} {items[i].content}
                </Checkbox>
            </Row>)
        }
        return result;
    }

    checkboxOnChange(e) {
        //获取state中的items副本
        let items = JSON.parse(JSON.stringify(this.state.items));
        items[e.target.value].finish = e.target.checked;
        //与props数据比较，如果相同，则不显示提交按钮，否则显示提交按钮
        if (JSON.stringify(items) === JSON.stringify(this.props.todoItemData)) {
            this.setState({items: items, showSubmit: false});
        } else {
            this.setState({items: items, showSubmit: true});
        }
    }

    finishEventSubmit(e) {
        //TODO 改造此处，将完成的事项上传到服务器
    }

    render() {
        const content = this.makeTodoItem(this.state.items);
        return (
            <Card
                title="待办事项"
                extra={
                    <div >
                        <a  style={{"float": "right","padding-left":"20px"}} href="#">
                            <Icon type="plus"/>
                        </a>
                        <a  style={{"float": "right"}} href="#" onClick={() => this.props.todoItemReload()}>
                            <Icon type="sync"/>
                        </a>
                    </div>}
                style={{width: 300}}>
                {content}
                <div style={{"display": this.state.showSubmit ? "inline" : "none"}}>
                    <Row type="flex" justify="end">
                        {/*onClick bind(this)表明传入的this是整个组件，而不是默认的button*/}
                        <Button type={"primary"} size={"small"} htmlType={"button"}
                                onClick={this.finishEventSubmit.bind(this)}>提交</Button>
                    </Row>
                </div>
            </Card>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoItemCard);
