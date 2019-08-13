<!--  -->
<template>
<div class='scatter' id="scatter">    
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
          text: "散点图",
          textStyle: {
            color: "#fff"
          }
        },
        xAxis: {
          axisLine: {
            lineStyle: {
              color: "#fff",
              width: 1
            }
          }
        },
        yAxis: {
          axisLine: {
            lineStyle: {
              color: "#fff",
              width: 1
            }
          }
        },
        series: [
          {
            symbolSize: 20,
            data: [
              [10.0, 8.04],
              [8.0, 6.95],
              [13.0, 7.58],
              [9.0, 8.81],
              [11.0, 8.33],
              [14.0, 9.96],
              [6.0, 7.24],
              [4.0, 4.26],
              [12.0, 10.84],
              [7.0, 4.82],
              [5.0, 5.68]
            ],
            type: "scatter"
          }
        ]
      }
    };
  },
  methods: {
    drawscatter() {
      // 绘制图表
      myChart.setOption(this.option);
    }
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    myChart = this.$echarts.init(document.getElementById("scatter"));
    this.drawscatter();
    // 窗口改变时重新绘制
    window.addEventListener("resize", this.$debounce(myChart.resize, 500));
  }
};
</script>
<style scoped>
.scatter {
  width: 100%;
  height: 100%;
}
</style>