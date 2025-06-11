/**
 * 产量预估页面功能
 */

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
  // 初始化权重滑块
  initWeightSliders();
  
  // 初始化预估模型切换
  initModelSelector();
  
  // 初始化运行预测按钮
  initRunButton();
  
  // 初始化说明折叠
  initNotesToggle();
  
  // 初始化图表
  initCharts();
  
  // 初始化导出功能
  initExportButtons();
});

/**
 * 初始化权重滑块
 */
function initWeightSliders() {
  const sliders = document.querySelectorAll('.weight-slider');
  
  sliders.forEach(slider => {
    const valueDisplay = slider.nextElementSibling;
    
    // 初始化显示
    if (valueDisplay) {
      valueDisplay.textContent = slider.value;
    }
    
    // 监听滑块变化
    slider.addEventListener('input', function() {
      valueDisplay.textContent = this.value;
    });
  });
}

/**
 * 初始化预估模型切换
 */
function initModelSelector() {
  const modelRadios = document.querySelectorAll('.model-item input[type="radio"]');
  const modelDetails = document.querySelector('.detail-item:nth-child(2) .detail-value');
  
  modelRadios.forEach(radio => {
    radio.addEventListener('change', function() {
      if (this.checked) {
        const modelId = this.id;
        let modelName = "未知模型";
        
        // 设置模型名称
        if (modelId === 'model-ai') {
          modelName = "AI预测模型 v2.3";
        } else if (modelId === 'model-statistical') {
          modelName = "统计分析模型 v1.8";
        } else if (modelId === 'model-historical') {
          modelName = "历史对比模型 v1.5";
        } else if (modelId === 'model-comprehensive') {
          modelName = "综合分析模型 v2.0";
        }
        
        // 更新模型名称显示
        if (modelDetails) {
          modelDetails.textContent = modelName;
        }
        
        console.log(`选择预估模型: ${modelName}`);
        
        // 在实际项目中，这里会根据选择的模型重新加载图表和数据
        initCharts();
      }
    });
  });
}

/**
 * 初始化运行预测按钮
 */
function initRunButton() {
  const runBtn = document.querySelector('.run-btn');
  
  if (runBtn) {
    runBtn.addEventListener('click', function() {
      // 显示加载状态
      this.disabled = true;
      this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 计算中...';
      
      // 获取参数
      const area = document.querySelector('.area-selector select').value;
      const cropType = document.querySelector('.crop-type-selector input:checked').id;
      const modelType = document.querySelector('.model-selector input:checked').id;
      const targetYear = document.getElementById('target-year').value;
      const confidenceInterval = document.getElementById('confidence-interval').value;
      const weatherWeight = document.getElementById('weather-weight').value;
      const growthWeight = document.getElementById('growth-weight').value;
      const soilWeight = document.getElementById('soil-weight').value;
      
      // 打印参数（实际项目中这里会发送请求到服务器）
      console.log('开始运行预测模型，参数：', {
        area, cropType, modelType, targetYear, confidenceInterval,
        weights: { weather: weatherWeight, growth: growthWeight, soil: soilWeight }
      });
      
      // 模拟异步请求
      setTimeout(() => {
        // 恢复按钮状态
        this.disabled = false;
        this.innerHTML = '运行预测';
        
        // 更新预测结果（在实际项目中，这里会使用服务器返回的数据）
        updatePredictionResults();
        
        // 重新初始化图表
        initCharts();
        
        // 显示成功消息
        showMessage('预测计算完成！', 'success');
      }, 2000);
    });
  }
}

/**
 * 更新预测结果
 */
function updatePredictionResults() {
  // 更新预测卡片
  document.querySelector('.forecast-card.total .forecast-value').textContent = '875,621';
  document.querySelector('.forecast-card.yield .forecast-value').textContent = '532';
  document.querySelector('.forecast-card.accuracy .forecast-value').textContent = '93.7';
  
  // 更新预测详情
  document.querySelector('.detail-item:nth-child(4) .detail-value').textContent = '932,450吨';
  document.querySelector('.detail-item:nth-child(5) .detail-value').textContent = '875,621吨';
  document.querySelector('.detail-item:nth-child(6) .detail-value').textContent = '821,390吨';
  
  // 更新预测时间
  const now = new Date();
  const timeString = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  document.querySelector('.detail-item:first-child .detail-value').textContent = timeString;
}

/**
 * 初始化说明折叠功能
 */
function initNotesToggle() {
  const toggleBtn = document.querySelector('.notes-toggle');
  const notesContent = document.querySelector('.notes-content');
  
  if (toggleBtn && notesContent) {
    toggleBtn.addEventListener('click', function() {
      if (notesContent.style.display === 'none') {
        notesContent.style.display = 'block';
        toggleBtn.querySelector('i').classList.replace('fa-chevron-up', 'fa-chevron-down');
      } else {
        notesContent.style.display = 'none';
        toggleBtn.querySelector('i').classList.replace('fa-chevron-down', 'fa-chevron-up');
      }
    });
  }
}

/**
 * 初始化导出功能
 */
function initExportButtons() {
  // 导出PDF按钮
  const exportPdfBtn = document.querySelector('.action-btn:first-child');
  if (exportPdfBtn) {
    exportPdfBtn.addEventListener('click', function() {
      console.log('导出PDF报告');
      showMessage('正在生成PDF报告...', 'info');
      
      // 模拟导出延迟
      setTimeout(() => {
        showMessage('PDF报告已生成，正在下载...', 'success');
      }, 1500);
    });
  }
  
  // 分享结果按钮
  const shareBtn = document.querySelector('.action-btn:last-child');
  if (shareBtn) {
    shareBtn.addEventListener('click', function() {
      console.log('分享预测结果');
      showMessage('分享链接已复制到剪贴板', 'success');
    });
  }
  
  // 图表导出按钮
  const downloadButtons = document.querySelectorAll('.chart-actions .fa-download');
  downloadButtons.forEach(btn => {
    btn.parentElement.addEventListener('click', function() {
      const chartTitle = this.closest('.chart-header').querySelector('.chart-title').textContent;
      console.log(`导出图表: ${chartTitle}`);
      showMessage(`正在导出"${chartTitle}"图表...`, 'info');
      
      // 模拟导出延迟
      setTimeout(() => {
        showMessage(`"${chartTitle}"图表已导出`, 'success');
      }, 1000);
    });
  });
  
  // 地图导出按钮
  const exportMapBtn = document.querySelector('.map-tools .map-btn:first-child');
  if (exportMapBtn) {
    exportMapBtn.addEventListener('click', function() {
      console.log('导出地图图片');
      showMessage('正在导出地图图片...', 'info');
      
      // 模拟导出延迟
      setTimeout(() => {
        showMessage('地图图片已导出', 'success');
      }, 1000);
    });
  }
}

/**
 * 显示消息提示
 * @param {string} message - 消息内容
 * @param {string} type - 消息类型 (success/warning/error/info)
 */
function showMessage(message, type = 'info') {
  // 创建消息元素
  const msgEl = document.createElement('div');
  msgEl.className = `message message-${type}`;
  msgEl.innerHTML = message;
  
  // 添加到页面
  const container = document.querySelector('.message-container') || document.body;
  container.appendChild(msgEl);
  
  // 显示动画
  setTimeout(() => {
    msgEl.classList.add('show');
  }, 10);
  
  // 设置自动消失
  setTimeout(() => {
    msgEl.classList.remove('show');
    setTimeout(() => {
      msgEl.remove();
    }, 300); // 消失动画时长
  }, 3000);
}

/**
 * 初始化图表
 */
function initCharts() {
  // 初始化产量趋势预测图表
  initYieldTrendChart();
  
  // 初始化区域产量分布图表
  initRegionYieldChart();
  
  // 初始化影响因子分析图表
  initFactorAnalysisChart();
  
  // 初始化历史产量对比图表
  initHistoricalComparisonChart();
}

/**
 * 初始化产量趋势预测图表
 */
function initYieldTrendChart() {
  const chartDom = document.getElementById('yieldTrendChart');
  if (!chartDom) return;
  
  const chart = echarts.init(chartDom);
  
  // 模拟数据
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: ['历史产量', '预测产量', '预测区间'],
      bottom: 0
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      top: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['2018', '2019', '2020', '2021', '2022', '2023'],
      axisPointer: {
        type: 'shadow'
      }
    },
    yAxis: {
      type: 'value',
      name: '产量(万吨)',
      min: 70,
      max: 100
    },
    series: [
      {
        name: '历史产量',
        type: 'line',
        data: [73.85, 76.58, 78.24, 81.03, 81.95, null],
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: {
          width: 3
        },
        itemStyle: {
          color: '#1890FF'
        }
      },
      {
        name: '预测产量',
        type: 'line',
        data: [null, null, null, null, null, 87.56],
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: {
          width: 0
        },
        itemStyle: {
          color: '#52C41A'
        }
      },
      {
        name: '预测区间',
        type: 'line',
        data: [null, null, null, null, null, 87.56],
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: {
          width: 3,
          type: 'dashed'
        },
        itemStyle: {
          color: '#52C41A'
        },
        markArea: {
          itemStyle: {
            color: 'rgba(82, 196, 26, 0.2)'
          },
          data: [
            [
              {
                name: '95%置信区间',
                xAxis: 4.5,
                yAxis: 82.14
              },
              {
                xAxis: 5.5,
                yAxis: 93.25
              }
            ]
          ]
        }
      }
    ]
  };
  
  chart.setOption(option);
  
  // 响应窗口大小变化
  window.addEventListener('resize', function() {
    chart.resize();
  });
}

/**
 * 初始化区域产量分布图表
 */
function initRegionYieldChart() {
  const chartDom = document.getElementById('regionYieldChart');
  if (!chartDom) return;
  
  const chart = echarts.init(chartDom);
  
  // 模拟数据
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c}万吨 ({d}%)'
    },
    legend: {
      orient: 'horizontal',
      bottom: 0,
      data: ['北部区域', '南部区域', '东部区域', '西部区域']
    },
    series: [
      {
        name: '区域产量',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 32.58, name: '北部区域' },
          { value: 19.27, name: '南部区域' },
          { value: 25.43, name: '东部区域' },
          { value: 10.28, name: '西部区域' }
        ]
      }
    ]
  };
  
  chart.setOption(option);
  
  // 响应窗口大小变化
  window.addEventListener('resize', function() {
    chart.resize();
  });
}

/**
 * 初始化影响因子分析图表
 */
function initFactorAnalysisChart() {
  const chartDom = document.getElementById('factorAnalysisChart');
  if (!chartDom) return;
  
  const chart = echarts.init(chartDom);
  
  // 模拟数据
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['因子得分', '同比变化'],
      bottom: 0
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      top: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'value',
        max: 10,
        axisLabel: {
          formatter: '{value} 分'
        },
        splitLine: {
          show: false
        }
      },
      {
        type: 'value',
        max: 15,
        min: -15,
        axisLabel: {
          formatter: '{value} %'
        },
        splitLine: {
          show: false
        }
      }
    ],
    yAxis: {
      type: 'category',
      data: ['降水量', '积温', 'NDVI均值', '土壤水分', '日照时数'],
      axisLabel: {
        fontSize: 12
      }
    },
    series: [
      {
        name: '因子得分',
        type: 'bar',
        data: [8.5, 7.8, 8.3, 6.5, 7.2],
        label: {
          show: true,
          position: 'right',
          formatter: '{c} 分'
        },
        itemStyle: {
          color: '#1890FF'
        }
      },
      {
        name: '同比变化',
        type: 'bar',
        yAxisIndex: 0,
        xAxisIndex: 1,
        data: [12.5, 5.2, 3.7, -1.8, 2.1],
        label: {
          show: true,
          position: 'right',
          formatter: function(params) {
            return params.value > 0 ? `+${params.value}%` : `${params.value}%`;
          }
        },
        itemStyle: {
          color: function(params) {
            return params.value >= 0 ? '#52C41A' : '#F5222D';
          }
        }
      }
    ]
  };
  
  chart.setOption(option);
  
  // 响应窗口大小变化
  window.addEventListener('resize', function() {
    chart.resize();
  });
}

/**
 * 初始化历史产量对比图表
 */
function initHistoricalComparisonChart() {
  const chartDom = document.getElementById('historicalComparisonChart');
  if (!chartDom) return;
  
  const chart = echarts.init(chartDom);
  
  // 模拟数据
  const option = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['实际产量', '预测产量', '误差率'],
      bottom: 0
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      top: '10%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: ['2018', '2019', '2020', '2021', '2022'],
        axisPointer: {
          type: 'shadow'
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '产量(万吨)',
        min: 70,
        max: 85,
        position: 'left',
        axisLine: {
          lineStyle: {
            color: '#1890FF'
          }
        },
        axisLabel: {
          formatter: '{value}'
        }
      },
      {
        type: 'value',
        name: '误差率(%)',
        min: -5,
        max: 5,
        position: 'right',
        axisLine: {
          lineStyle: {
            color: '#FAAD14'
          }
        },
        axisLabel: {
          formatter: '{value}%'
        }
      }
    ],
    series: [
      {
        name: '实际产量',
        type: 'bar',
        barWidth: '25%',
        data: [73.85, 76.58, 78.24, 81.03, 81.95],
        itemStyle: {
          color: '#1890FF'
        }
      },
      {
        name: '预测产量',
        type: 'bar',
        barWidth: '25%',
        data: [75.26, 79.01, 77.68, 79.22, 82.53],
        itemStyle: {
          color: '#52C41A'
        }
      },
      {
        name: '误差率',
        type: 'line',
        yAxisIndex: 1,
        data: [1.9, 3.2, -0.7, -2.2, 0.7],
        symbolSize: 8,
        lineStyle: {
          width: 3,
          type: 'dashed'
        },
        itemStyle: {
          color: '#FAAD14'
        },
        label: {
          show: true,
          position: 'top',
          formatter: function(params) {
            return params.value > 0 ? `+${params.value}%` : `${params.value}%`;
          }
        }
      }
    ]
  };
  
  chart.setOption(option);
  
  // 响应窗口大小变化
  window.addEventListener('resize', function() {
    chart.resize();
  });
} 