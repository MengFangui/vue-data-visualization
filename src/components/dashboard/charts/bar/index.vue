<!--  -->
<template>
<div class='bar' id="bar">    
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
          text: "柱状图",
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
          }
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
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar"
          }
        ]
      }
    };
  },
  methods: {
    drawbar() {
      // 绘制图表
      myChart.setOption(this.option);
    }
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    myChart = this.$echarts.init(document.getElementById("bar"));
    this.drawbar();
    // 窗口改变时重新绘制
    window.addEventListener("resize", this.$debounce(myChart.resize, 500));
  }
};
</script>
<style scoped>
.bar {
  width: 100%;
  height: 100%;
}
</style>