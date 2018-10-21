import React from 'react';
import PropTypes from 'prop-types'
import * as d3 from 'd3';

class D3SimpleForceChart extends React.Component {

    constructor(props) {
        super(props);
        this.data={
            nodes:[],
            edges:[]
        };
        this.updateData();
    }

    //初始化各项组件
    init() {
        //初始化布局
        const containerWidth = this.chartRef.parentElement.offsetWidth;
        const margin = {top: 60, right: 60, bottom: 60, left: 60};
        const width = containerWidth - margin.left - margin.right;
        const height = 700 - margin.top - margin.bottom;
        this.chart = d3.select(this.chartRef)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom);
        //输出标题
        this.chart.append("g")
            .attr("class", "bar--title")
            .append("text")
            .attr("fill", "#000")
            .attr("font-size", "16px")
            .attr("font-weight", "700")
            .attr("text-anchor", "middle")
            .attr("x", containerWidth / 2)
            .attr("y", 20)
            .text("D3简单力导图");
        //在返回组件中增加一个group
        this.g = this.chart.append("g").attr(
            "transform", "translate(" + margin.left + "," + margin.top + ")"
        ).attr('class', "all");
        //构建力导向图
        this.simulation = d3.forceSimulation() // 构建力导向图
            .force('link',
                d3.forceLink().id(function (d, i) {
                    return i;
                })
                    .distance(function (d) {
                        //return d.value * 100; //设置链接线长度，长度为edges的value*200
                        return 50;
                    }))
            .force("charge", d3.forceManyBody().strength(-2500))
            .force("center", d3.forceCenter(width / 2, height / 2))//设置整个图形的中心点
            .force("x", d3.forceX())
            .force("y", d3.forceY());
        //.force("collide", d3.forceCollide().strength(0.2));
        //箭头
        this.chart.append("marker")
            .attr("id", "resolved")
            .attr("markerUnits", "strokeWidth")//设置为strokeWidth箭头会随着线的粗细发生变化
            .attr("markerUnits", "userSpaceOnUse")
            .attr("viewBox", "0 -5 10 10")//坐标系的区域
            .attr("refX", 32)//箭头坐标
            .attr("refY", -1)
            .attr("markerWidth", 12)//标识的大小
            .attr("markerHeight", 12)
            .attr("orient", "auto")//绘制方向，可设定为：auto（自动确认方向）和 角度值
            .attr("stroke-width", 2)//箭头宽度
            .append("path")
            .attr("d", "M0,-5L10,0L0,5")//箭头的路径
            .attr('fill', '#000000');//箭头颜色
        //初始化图层，后者更高
        this.glink=this.g.append("g");
        this.glinkText=this.g.append("g");
        this.gnode=this.g.append("g");
    }

    //更新数据和组件
    update(){
        this.updateData();
        let link=this.updateSupport(this.glink,"line",this.data.edges,this.printLinks);
        let linkText=this.updateSupport(this.glinkText,"text.link-text",this.data.edges,this.printLinkText);
        let node=this.updateSupport(this.gnode,".nodes",this.data.nodes,this.printNodes,link,linkText,this.simulation);
        let tick=this.maketick(link,linkText,node);
        this.simulation.nodes(this.data.nodes).on("tick", tick);
        this.simulation.force("link").links(this.data.edges);
    }

    //更新辅助
    updateSupport(g,target,data,printfunction,...params){
        let result=g.selectAll(target).data(data);
        result.exit().remove();
        return printfunction(result.enter(),...params).merge(result);
    }

    //连接线，根据数据的数量画相应数量的线
    printLinks(links){
        return links.append("line")//增加线条
            .attr("stroke",function(d){
                return  d3.scaleOrdinal(d3.schemeCategory10)(d.source);
            })//颜色设置
            .attr("stroke-width",1)//宽度设置
            .attr("marker-end", "url(#resolved)" );
    }

    //连接线上的文字
    printLinkText(linkText){
        return linkText.append("text")
            .style("fill-opacity",0)//默认隐藏
            .attr("class","link-text")
            .text(function (d) {
                return d.relation;
            });//具体文字为绑定数据的relation属性
    }

    //画点
    printNodes(node,link,linkText,simulation){
        let z=d3.scaleOrdinal(d3.schemeCategory10);
        let result=node.append("g")
        //鼠标停留则触发
            .on("mouseover", function (d, i) {
                //显示链接线上的文字
                linkText.style("fill-opacity", function (edge) {

                    if (edge.source === d) {
                        return 1;
                    }else{
                        return 0;
                    }
                });
                //链接线加粗
                link.style("stroke-width", function (edge) {
                    if (edge.source === d) {
                        return '2px';
                    }
                })
            })
            //鼠标离开则触发
            .on("mouseout", function (d, i) {
                //隐去链接线上的文字
                linkText.style("fill-opacity", function (edge) {
                    return 0;
                });
                //链接线减粗
                link.style("stroke-width", function (edge) {
                    if (edge.source === d) {
                        return '1px';
                    }
                })
            })
            //支持拖动，dragstarted，dragged，dragended分别为拖动时，元素的更新方程
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged))
            .attr("class","nodes");
        //.on("end", dragended));
        //圆圈的大小
        result.append("circle")
            .attr("r", 28)
            .attr("fill", function (d, i) {
                return z(i);
            });
        //圆圈的文字
        result.append("text")
            .attr("fill", function (d, i) {
                return z(i);
            })//填充颜色
            .attr("y", -20)//文字位置在圆圈下方20个单位
            .attr("dy", "5em")//单位设置
            .text(function (d) {
                return d.name;
            });//实际文字内容

        function dragstarted(d) {
            if (!d3.event.active) {
                simulation.alphaTarget(0.5).restart();
            }
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }

        function dragged(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }

        function dragended(d) {
            if (!d3.event.active) {
                simulation.alphaTarget(0);
            }
            d.fx = null;
            d.fy = null;
        }
        return result;
    }

    // 返回力导向图变化函数，让点，线和文字到达对应的位置
    maketick(link,linkText,node) {
        return function tick()
        {
            link
                .attr("x1",  (d)=> {
                    return d.source.x;
                })
                .attr("y1", function (d) {
                    return d.source.y;
                })
                .attr("x2", function (d) {
                    return d.target.x;
                })
                .attr("y2", function (d) {
                    return d.target.y;
                });
            linkText
                .attr("x", function (d) {
                    return (d.source.x + d.target.x) / 2;
                })
                .attr("y", function (d) {
                    return (d.source.y + d.target.y) / 2;
                });
            node
                .attr("transform", function (d) {
                    return "translate(" + d.x + "," + d.y + ")";
                });
        }
    }

    //更新数据
    updateData(){
        this.data.nodes.splice(0,this.data.nodes.length);
        this.data.edges.splice(0,this.data.edges.length);
        Object.assign(this.data.nodes,this.props.data.nodes);
        Object.assign(this.data.edges,this.props.data.edges);
    }

    componentDidMount() {
        this.init();
        this.update();
    }

    componentDidUpdate(){
        this.update();
    }

    render() {
        return (
            <div className={"force-chart--test"}>
                {/*React提供的这个ref属性，表示为对组件真正实例的引用，其实就是ReactDOM.render()返回的组件实例*/}
                <svg ref={(r) => this.chartRef = r}/>
            </div>
        );
    }
}

//react的一个验证工具，验证接收的数据格式和规定数据字段属性的必要性
D3SimpleForceChart.propTypes = {
    data: PropTypes.shape({
        nodes: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired,
            // href:PropTypes.string.isRequired,
        }).isRequired).isRequired,
        edges: PropTypes.arrayOf(PropTypes.shape({
            source: PropTypes.number.isRequired,
            target: PropTypes.number.isRequired,
            relation: PropTypes.string.isRequired,
        }).isRequired).isRequired,
    }).isRequired
};

export default D3SimpleForceChart;
