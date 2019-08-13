<!--  -->
<template>
<div class='graph' id="graph">    
</div>
</template>

<script>
let myChart = null;
export default {
  components: {},
  data() {
    return {
      option: {
        title: {
          text: "Graph 示例",
          textStyle: {
            color: "#fff"
          }
        },
        tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: "quinticInOut",
        series: [
          {
            type: "graph",
            layout: "none",
            symbolSize: 50,
            roam: true,
            label: {
              normal: {
                show: true
              }
            },
            edgeSymbol: ["circle", "arrow"],
            edgeSymbolSize: [4, 10],
            edgeLabel: {
              normal: {
                textStyle: {
                  fontSize: 20
                }
              }
            },
            data: [
              {
                name: "节点1",
                x: 300,
                y: 300
              },
              {
                name: "节点2",
                x: 800,
                y: 300
              },
              {
                name: "节点3",
                x: 550,
                y: 100
              },
              {
                name: "节点4",
                x: 550,
                y: 500
              }
            ],
            // links: [],
            links: [
              {
                source: 0,
                target: 1,
                symbolSize: [5, 20],
                label: {
                  normal: {
                    show: true
                  }
                },
                lineStyle: {
                  normal: {
                    width: 5,
                    curveness: 0.2
                  }
                }
              },
              {
                source: "节点2",
                target: "节点1",
                label: {
                  normal: {
                    show: true
                  }
                },
                lineStyle: {
                  normal: { curveness: 0.2 }
                }
              },
              {
                source: "节点1",
                target: "节点3"
              },
              {
                source: "节点2",
                target: "节点3"
              },
              {
                source: "节点2",
                target: "节点4"
              },
              {
                source: "节点1",
                target: "节点4"
              }
            ],
            lineStyle: {
              normal: {
                opacity: 0.9,
                width: 2,
                curveness: 0
              }
            }
          }
        ]
      }
    };
  },
  methods: {
    drawgraph() {
      // 绘制图表
      myChart.setOption(this.option);
    }
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    myChart = this.$echarts.init(document.getElementById("graph"));
    this.drawgraph();
    // 窗口改变时重新绘制
    window.addEventListener("resize", this.$debounce(myChart.resize, 500));
  }
};
</script>
<style scoped>
.graph {
  width: 100%;
  height: 100%;
}
</style>