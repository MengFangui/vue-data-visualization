# 基于VUE、echarts和Grid的大屏数据可视化实现技术

## 简介

数据可视化技术是将把比较复杂、抽象的数据通过可视的技术以人们更易理解的形式展示出来，数据可视化技术促进了数据信息的传播和应用。 数据可视化技术是抽象数据的具象表达。 

大屏数据可视化是以大屏为主要展示载体的数据可视化。目前市场上大屏设备有1280*768的笔记本，也有7680*4320的8K显示屏，设备分辨率宽泛。“面积大、炫酷动效、丰富色彩、可交互”是大屏数据可视化的特点。大屏数据可视化技术主要应用场景有：信息展示、数据分析和监控预警三类。

本文阐述基于VUE.js、echarts图表和Grid布局的大屏数据可视化技术。

## 技术栈

* vue
* echarts
* Grid布局

## echarts图标库使用

echarts官网：https://www.echartsjs.com/zh/index.html

1. echarts导入VUE项目

``` 
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
```

2. echarts 使用性能优化

当window resize时，echart需要重新绘制。若window resize实时对echart重绘，页面会卡顿，页面性能会降低，因此需要考虑dom渲染的性能，加入函数防抖。 下面简单解释一下函数防抖和函数节流。

### 函数节流throttle

函数节流throttle通俗解释：假设你正在乘电梯上楼，当电梯门关闭之前发现有人也要乘电梯，礼貌起见，你会按下开门开关，然后等他进电梯； 但是，你是个没耐心的人，你最多只会等待电梯停留一分钟； 在这一分钟内，你会开门让别人进来，但是过了一分钟之后，你就会关门，让电梯上楼。

所以函数节流throttle的作用是，预先设定一个执行周期，当调用动作的时刻大于等于执行周期则执行该动作，然后进入下一个新的时间周期。

函数节流throttle应用：在指定时间，事件最多触发一次。

### 函数防抖debounce

函数防抖debounce通俗解释假设你正在乘电梯上楼，当电梯门关闭之前发现有人也要乘电梯，礼貌起见，你会按下开门开关，然后等他进电梯； 如果在电梯门关闭之前，又有人来了，你会继续开门； 这样一直进行下去，你可能需要等待几分钟，最终没人进电梯了，才会关闭电梯门，然后上楼。

所以函数防抖debounce的作用是，当调用动作触发一段时间后，才会执行该动作，若在这段时间间隔内又调用此动作则将重新计算时间间隔。

函数防抖debounce应用：百度首页的搜索按钮。

函数节流throttle和函数防抖debounce在函数式编程，如lodash库都有实现。

函数防抖debounce的封装：

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

Vue项目main.js中引入函数防抖：

``` 
import { debounce } from './libs/util'
Vue.prototype.$debounce = debounce

```

echarts图表组件初始化函数防抖：

``` 
mounted() {
    // 窗口改变时重新绘制
    window.addEventListener("resize", this.$debounce(myChart.resize, 500));
  }
```

## echarts 图表使用时细节优化处理

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

## Grid布局

首先说明的是grid布局不是bootstrap框架，element ui等UI的栅格布局。目前CSS布局方式有table，浮动，定位，flex和grid布局。

Grid布局说明：https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout

Grid和flex布局十分相似，但却有极大的不同。Flex 布局是一维布局，即轴线布局，只能指定"项目"针对轴线的位置。Grid 布局则是将容器划分成"行"和"列"，产生单元格，然后指定"项目所在"的单元格，因此是二维布局。
在大屏数据可视化技术需要解决屏幕的响应式布局。常见的响应式布局有媒体查询，flex布局、百分比布局和Grid布局。相比于媒体查询，flex布局和百分比布局，Grid布局在实现大屏数据可视化技术响应式布局更便捷。有一点需要注意的是Grid存在浏览器兼容，请参考：https://caniuse.com/#search=grid，即在IE浏览器不兼容，对于Edge、Fifefox和Chrome主流浏览器兼容性良好。

1. Grid布局三行三列布局核心配置示例

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

2. Grid布局中行合并示例配置 

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

2. Grid布局中列合并示例配置 

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

4. Grid布局左侧固定，右侧自适应布局示例配置

```

display: grid; 
/* 左侧固定，右侧自适应布局 */
grid-template-columns: 150px 1fr; 
/* grid-template-columns: 150px auto; */

``` 

5. Grid布局repeat属性

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

## VUe项目引入normalize 库初始化浏览器默认样式

```

<style scoped>
@import '/css/normalize.min.css'
</style>
```

## 项目代码：https://github.com/MengFangui/vue-data-visualization

## 效果图

![image](https://note.youdao.com/yws/public/resource/37560477869e49d436491028e210a537/xmlnote/4459220E3F6E42D9AFE912F447572348/75CCAAD6133F4D11BE615C78C3030AB5/16955)

  

![image](https://note.youdao.com/yws/public/resource/37560477869e49d436491028e210a537/xmlnote/4459220E3F6E42D9AFE912F447572348/1D407F8E78C4493EB1AD095501E8DAF8/16953)

![image](https://note.youdao.com/yws/public/resource/37560477869e49d436491028e210a537/xmlnote/4459220E3F6E42D9AFE912F447572348/347ED3EBEF9A4C9E9F1A1D9DA0B98A2E/16954)

