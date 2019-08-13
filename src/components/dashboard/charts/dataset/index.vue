<!--  -->
<template>
<div class='calendar' id="calendar">    
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
          text: "数据集",
          textStyle: {
            color: "#fff"
          }
        },
        legend: {
          textStyle: {
            color: "#fff"
          }
        },
        tooltip: {},
        dataset: {
          source: [
            ["product", "2015", "2016", "2017"],
            ["Matcha Latte", 43.3, 85.8, 93.7],
            ["Milk Tea", 83.1, 73.4, 55.1],
            ["Cheese Cocoa", 86.4, 65.2, 82.5],
            ["Walnut Brownie", 72.4, 53.9, 39.1]
          ]
        },
        xAxis: {
          type: "category",
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
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }]
      }
    };
  },
  methods: {
    drawcalendar() {
      // 绘制图表
      myChart.setOption(this.option);
    }
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    myChart = this.$echarts.init(document.getElementById("calendar"));
    this.drawcalendar();
    // 窗口改变时重新绘制
    window.addEventListener("resize", this.$debounce(myChart.resize, 500));
  }
};
</script>
<style scoped>
.calendar {
  width: 100%;
  height: 100%;
}
</style>