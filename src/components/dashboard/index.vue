<!--  -->
<template>
<div class='dashboard'>
    <div class="item">
      <button>操作相关按钮</button>
      <line-chart></line-chart>
    </div>
    <div class="item">
      <bar-chart></bar-chart>
    </div>
    <div class="item">
      <pie-chart></pie-chart>
    </div>
    <div class="item">
      <scatter-chart></scatter-chart>
    </div>
    <div class="item">
      <radar-chart></radar-chart>
    </div>
    <div class="item">
      <graph-chart></graph-chart>
    </div>
    <div class="item">
      <gauge-chart></gauge-chart>
    </div>
    <div class="item">
      <dataset-chart></dataset-chart>
    </div>
    <div class="item">
      <bar2-chart></bar2-chart>
    </div>
</div>
</template>

<script>
import lineChart from './charts/line'
import barChart from './charts/bar'
import pieChart from './charts/pie'
import scatterChart from './charts/scatter'
import radarChart from './charts/radar'
import graphChart from './charts/graph'
import gaugeChart from './charts/gauge'
import datasetChart from './charts/dataset'
import bar2Chart from './charts/bar2'
export default {
  components: {lineChart,barChart,pieChart,scatterChart,radarChart,graphChart,gaugeChart,datasetChart,bar2Chart},
  data() {
    return {};
  },
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style scoped>
.dashboard {
  width: 100%;
  height: 100%;
  /* public文件夹下文件使用绝对路径即可 */
  background: #000 url(/bg.jpg) no-repeat center center;
  /* 网格布局 */
  display: grid;
  grid-template-columns: 29% 40% 29%;
  grid-template-rows: 32.333% 33.333% 32.333%;
  /* 行间距和列间距均是1% */
  grid-gap: 1% 1%;
}
.item{
  border: 2px solid #fff
}
</style>