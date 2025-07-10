import React from 'react';
import { motion } from 'framer-motion';
import ReactECharts from 'echarts-for-react';

const FinancialChart = () => {
  const option = {
    title: {
      text: 'Revenue Trend',
      left: 'left',
      textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#374151'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: ['Revenue', 'Profit', 'Clients'],
      top: 30
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yAxis: [
      {
        type: 'value',
        name: 'Amount ($K)',
        position: 'left',
        axisLabel: {
          formatter: '${value}K'
        }
      },
      {
        type: 'value',
        name: 'Clients',
        position: 'right',
        axisLabel: {
          formatter: '{value}'
        }
      }
    ],
    series: [
      {
        name: 'Revenue',
        type: 'line',
        smooth: true,
        data: [120, 132, 101, 134, 90, 230, 210, 180, 250, 290, 320, 350],
        itemStyle: {
          color: '#3B82F6'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(59, 130, 246, 0.3)'
            }, {
              offset: 1, color: 'rgba(59, 130, 246, 0.1)'
            }]
          }
        }
      },
      {
        name: 'Profit',
        type: 'line',
        smooth: true,
        data: [80, 95, 70, 95, 60, 180, 160, 140, 200, 230, 260, 280],
        itemStyle: {
          color: '#10B981'
        }
      },
      {
        name: 'Clients',
        type: 'bar',
        yAxisIndex: 1,
        data: [15, 18, 12, 20, 14, 25, 22, 19, 28, 32, 35, 38],
        itemStyle: {
          color: '#8B5CF6'
        }
      }
    ]
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ReactECharts 
        option={option} 
        style={{ height: '400px' }}
        opts={{ renderer: 'svg' }}
      />
    </motion.div>
  );
};

export default FinancialChart;