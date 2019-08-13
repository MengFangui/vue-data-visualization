# 大屏数据可视化
## 效果图
![image](https://note.youdao.com/yws/public/resource/37560477869e49d436491028e210a537/xmlnote/4459220E3F6E42D9AFE912F447572348/D8780668A9D2477EA510FE5C551CFAA3/16912)  
![image](https://note.youdao.com/yws/public/resource/37560477869e49d436491028e210a537/xmlnote/4459220E3F6E42D9AFE912F447572348/80901FF41C1943549A748BB89D44F7AB/16911)

![image](https://note.youdao.com/yws/public/resource/37560477869e49d436491028e210a537/xmlnote/4459220E3F6E42D9AFE912F447572348/5F2CF265DDC94121BEF52B5496F7C36E/16910)
## 技术栈
- vue
- echarts
- grid布局

## echarts
1. echart方法挂载到vue原型上

```
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
```
2. echarts 重绘
window resize时，需要echart重新绘制，同时考虑dom渲染的性能，因此需要函数防抖。 

函数防抖的封装：

```
// 函数防抖
export function debounce(fn, wait, immediate) {
    let timer;
    return function () {
        if (timer) clearTimeout(timer);
        if (immediate) {
            // 如果已经执行过，不再执行
            var callNow = !timer;
            timer = setTimeout(() => {
                timer = null;
            }, wait)
            if (callNow) {
                fn.apply(this, arguments)
            }
        } else {
            timer = setTimeout(() => {
                fn.apply(this, arguments)
            }, wait);
        }
    }
}
```
main.js中：

```
import { debounce } from './libs/util'
Vue.prototype.$debounce = debounce

```
在图表组件中：

```
mounted() {
    // 窗口改变时重新绘制
    window.addEventListener("resize", this.$debounce(myChart.resize, 500));
  }
```
## echarts 图表组件细节优化
1. 图例区域太大导致遮挡住图表 

在option中设置grid，主要设置top值。

```
grid: {
  left: "3%",
  right: "3%",
  top: "3%",
  containLabel: true
},
```
2. 防止坐标轴标签显示空间不全 

在option中设置interval和rotate：

```
axisLabel: {
    // 防止坐标轴标签显示空间不全
    rotate: -30
},
// 防止坐标轴标签显示空间不全
interval: 0
```
## grid布局
1. 三行三列布局


```
 /* 网格布局 */
  display: grid;
  grid-template-columns: 29% 40% 29%;
  grid-template-rows: 32.333% 33.333% 32.333%;
  /* 行与行的间隔（行间距） */
  /* grid-row-gap: 20px; */
  /* 列与列的间隔（列间距） */
  /* grid-column-gap: 20px; */
  /* 行间距和列间距均是1% */
  grid-gap: 1% 1%;
``` 
2. 行合并 

html：

```
<div class='dashboard'>
    <div class="item item-1">
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
</div>
```
css：

```
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
  /* 行与行的间隔（行间距） */
  /* grid-row-gap: 20px; */
  /* 列与列的间隔（列间距） */
  /* grid-column-gap: 20px; */
  /* 行间距和列间距均是1% */
  grid-gap: 1% 1%;
}
.item{
  border: 2px solid red
}
.item-1 {
  /* 行合并 */
  grid-column-start: 1;
  grid-column-end: 3;
}
</style>
```
2. 列合并 

html：

```
<div class='dashboard'>
    <div class="item item-1">
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
</div>
```
css：

```
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
  /* 行与行的间隔（行间距） */
  /* grid-row-gap: 20px; */
  /* 列与列的间隔（列间距） */
  /* grid-column-gap: 20px; */
  /* 行间距和列间距均是1% */
  grid-gap: 1% 1%;
}
.item{
  border: 2px solid red
}
.item-1 {
  /* 行合并 */
  grid-row-start: 1;
  grid-row-end: 3;
}
</style>
```
4. 左侧固定，右侧自适应布局

```
display: grid;
/* 左侧固定，右侧自适应布局 */
grid-template-columns: 150px 1fr; 
/* grid-template-columns: 150px auto; */
```

5. repeat属性

将页面水平和垂直方向均分为100分。

```
.grid {
	height: 100%;
	display: grid;
	grid-template-columns: repeat(100, 1%);
	grid-template-rows: repeat(100, 1%);
}

.item {
	border: 1px solid red;
}

.item-1 {
/* item-1 dom元素在水平和垂直页面占据左上角的20% */
	grid-column-start: 1;
	grid-column-end: 21;
	grid-row-start: 1;
	grid-row-end: 21;
}
```

grid布局参考[grid](http://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)




## normalize 通用css引入

```
<style scoped>
@import '/css/normalize.min.css'
</style>
```
