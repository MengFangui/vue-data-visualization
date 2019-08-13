<!--  -->
<template>
  <div class='line' id="line"></div>
</template>

<script>
let myChart = null;
export default {
  components: {},
  data() {
    return {
      option: {
        title: {
          text: "折线图",
          textStyle: {
            color: "#fff"
          }
        },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          axisLine: {
            lineStyle: {
              color: "#fff",
              width: 1
            }
          },
          axisLabel: {
            // 防止坐标轴标签显示空间不全
            rotate: -30
          },
          // 防止坐标轴标签显示空间不全
          interval: 0
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#fff",
              width: 1
            }
          }
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line"
          }
        ],
        // 图例区域太大导致遮挡住图表
        grid: {
          left: "3%",
          right: "3%",
          bottom: 80,
          containLabel: true
        },
      }
    };
  },
  methods: {
    drawLine() {
      // 绘制图表
      myChart.setOption(this.option);
    }
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    myChart = this.$echarts.init(document.getElementById("line"));
    this.drawLine();
    // 窗口改变时重新绘制
    window.addEventListener("resize", this.$debounce(myChart.resize, 500));
  }
};
</script>
<style scoped>
.line {
  width: 100%;
  height: 100%;
}
</style>