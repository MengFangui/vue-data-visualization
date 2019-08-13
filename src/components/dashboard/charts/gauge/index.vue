<!--  -->
<template>
<div class='gauge' id="gauge">    
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
          text: "仪表盘",
          textStyle: {
            color: "#fff"
          }
        },
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },
        toolbox: {
          feature: {
            restore: {},
            saveAsImage: {}
          }
        },
        series: [
          {
            name: "业务指标",
            type: "gauge",
            detail: { formatter: "{value}%" },
            data: [{ value: 50, name: "完成率" }]
          }
        ]
      }
    };
  },
  methods: {
    drawgauge() {
      // 绘制图表
      myChart.setOption(this.option);
    }
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    myChart = this.$echarts.init(document.getElementById("gauge"));
    this.drawgauge();
    // 窗口改变时重新绘制
    window.addEventListener("resize", this.$debounce(myChart.resize, 500));
  }
};
</script>
<style scoped>
.gauge {
  width: 100%;
  height: 100%;
}
</style>