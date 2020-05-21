<template>
    <div :class="className" :style="{ height:height, width:width }" />
</template>

<script>
    import echarts from 'echarts';
    require('echarts/theme/macarons');

	export default {
		name: 'line-chart',
        props: {
			className: {
				type: String,
                default: 'chart'
            },
	        width: {
		        type: String,
		        default: '100%'
	        },
	        height: {
		        type: String,
		        default: '350px'
	        },
            chartData: {
				type: Object,
                required: true
            }
        },
        data() {
			return {
				chart: null
            }
        },
        watch: {
			chartData: {
				deep: true,
                handler(val) {
					this.setOptions(val)
                }
            }
        },
        mounted() {
			this.$nextTick(() => {
				this.initChart()
            })
        },
        beforeDestroy() {
			if (!this.chart) return;
			this.chart.dispose();
			this.chart = null;
        },
        methods: {
			initChart() {
				this.chart = echarts.init(this.$el, 'macarons');
				this.setOptions(this.chartData);
            },
            setOptions({ expectedData, actualData } = {}) {
				this.chart.setOption({
                    xAxis: {
	                    data: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
	                    boundaryGap: false,
	                    axisTick: {
		                    show: false
	                    }
                    },
                    grid: {
	                    left: 10,
	                    right: 10,
	                    bottom: 20,
	                    top: 30,
	                    containLabel: true
                    },
                    tooltip: {
	                    trigger: 'axis',
	                    axisPointer: {
		                    type: 'cross'
	                    },
	                    padding: [5, 10]
                    },
                    yAxis: {
	                    axisTick: {
		                    show: false
	                    }
                    },
                    legend: {
	                    data: ['Ожидаемо', 'Актуально']
                    },
                    series: [{
	                    name: 'Ожидаемо', itemStyle: {
		                    normal: {
			                    color: '#F56C6C',
			                    lineStyle: {
				                    color: '#F56C6C',
				                    width: 2
			                    }
		                    }
	                    },
	                    smooth: true,
	                    type: 'line',
	                    data: expectedData,
	                    animationDuration: 2800,
	                    animationEasing: 'cubicInOut'
                    },
	                    {
		                    name: 'Актуально',
		                    smooth: true,
		                    type: 'line',
		                    itemStyle: {
			                    normal: {
				                    color: '#409EFF',
				                    lineStyle: {
					                    color: '#409EFF',
					                    width: 2
				                    },
				                    areaStyle: {
					                    color: '#f3f8ff'
				                    }
			                    }
		                    },
		                    data: actualData,
		                    animationDuration: 2800,
		                    animationEasing: 'quadraticOut'
                    }]
                })
            }
        }
	}
</script>

<style scoped>

</style>