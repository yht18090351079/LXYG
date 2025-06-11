/**
 * 气象一张图页面功能
 */

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
  // 初始化气象指标切换功能
  initWeatherIndexSelector();
  
  // 初始化时间类型切换功能
  initDateTypeSelector();
  
  // 初始化颜色方案切换功能
  initColorSchemeSelector();
  
  // 初始化应用设置按钮功能
  initApplyButton();
  
  // 初始化地图交互
  initMapInteraction();
  
  // 初始化日期控制器
  initDateControls();
  
  // 初始化统计图表
  initCharts();
  
  // 初始化站点数据交互
  initStationInteraction();
  
  // 初始化报告操作
  initReportActions();
});

/**
 * 初始化气象指标切换功能
 */
function initWeatherIndexSelector() {
  const indexRadios = document.querySelectorAll('.weather-index-item input[type="radio"]');
  const currentIndexTitle = document.querySelector('.current-index');
  const legendTitle = document.querySelector('.legend-title');
  const legendGradient = document.querySelector('.legend-gradient');
  const legendLabels = document.querySelector('.legend-labels');
  
  // 指标配置
  const indexConfigs = {
    'index-temperature': {
      title: '温度分布',
      legendTitle: '温度 (°C)',
      gradientClass: 'temperature-gradient',
      labels: ['15', '20', '25', '30', '35']
    },
    'index-rainfall': {
      title: '降水分布',
      legendTitle: '降水量 (mm)',
      gradientClass: 'rainfall-gradient',
      labels: ['0', '25', '50', '75', '100']
    },
    'index-humidity': {
      title: '湿度分布',
      legendTitle: '湿度 (%)',
      gradientClass: 'humidity-gradient',
      labels: ['30', '45', '60', '75', '90']
    },
    'index-sunlight': {
      title: '日照分布',
      legendTitle: '日照 (小时)',
      gradientClass: 'sunlight-gradient',
      labels: ['2', '4', '6', '8', '10']
    },
    'index-wind': {
      title: '风速分布',
      legendTitle: '风速 (m/s)',
      gradientClass: 'wind-gradient',
      labels: ['0', '3', '6', '9', '12']
    },
    'index-accumulated-temperature': {
      title: '积温分布',
      legendTitle: '积温 (°C·d)',
      gradientClass: 'accumulated-temp-gradient',
      labels: ['500', '1000', '1500', '2000', '2500']
    }
  };
  
  indexRadios.forEach(radio => {
    radio.addEventListener('change', function() {
      if (this.checked) {
        const indexId = this.id;
        const config = indexConfigs[indexId];
        
        // 更新标题和图例
        if (currentIndexTitle) {
          currentIndexTitle.textContent = config.title;
        }
        
        if (legendTitle) {
          legendTitle.textContent = config.legendTitle;
        }
        
        if (legendGradient) {
          // 移除所有渐变类
          legendGradient.classList.remove(
            'temperature-gradient', 
            'rainfall-gradient', 
            'humidity-gradient', 
            'sunlight-gradient', 
            'wind-gradient', 
            'accumulated-temp-gradient'
          );
          // 添加当前渐变类
          legendGradient.classList.add(config.gradientClass);
        }
        
        if (legendLabels) {
          // 更新标签
          const labelSpans = legendLabels.querySelectorAll('span');
          config.labels.forEach((label, index) => {
            if (labelSpans[index]) {
              labelSpans[index].textContent = label;
            }
          });
        }
        
        // 在实际项目中，这里会根据选择的指标重新加载地图数据
        console.log(`选择了气象指标: ${config.title}`);
      }
    });
  });
}

/**
 * 初始化时间类型切换功能
 */
function initDateTypeSelector() {
  const dateTypeRadios = document.querySelectorAll('.date-type-item input[type="radio"]');
  const datePicker = document.querySelector('.date-picker-container');
  const forecastPeriod = document.querySelector('.forecast-period');
  
  dateTypeRadios.forEach(radio => {
    radio.addEventListener('change', function() {
      if (this.checked) {
        const dateType = this.id;
        
        // 显示/隐藏相应的控件
        if (dateType === 'date-type-real') {
          datePicker.style.display = 'flex';
          forecastPeriod.style.display = 'none';
        } else if (dateType === 'date-type-history') {
          datePicker.style.display = 'flex';
          forecastPeriod.style.display = 'none';
        } else if (dateType === 'date-type-forecast') {
          datePicker.style.display = 'flex';
          forecastPeriod.style.display = 'block';
        }
        
        console.log(`选择了时间类型: ${dateType}`);
      }
    });
  });
}

/**
 * 初始化颜色方案切换功能
 */
function initColorSchemeSelector() {
  const colorOptions = document.querySelectorAll('.color-option');
  
  colorOptions.forEach(option => {
    option.addEventListener('click', function() {
      // 移除所有激活状态
      colorOptions.forEach(opt => opt.classList.remove('active'));
      
      // 添加当前选项激活状态
      this.classList.add('active');
      
      const scheme = this.getAttribute('data-scheme');
      console.log(`选择了配色方案: ${scheme}`);
    });
  });
}

/**
 * 初始化应用设置按钮功能
 */
function initApplyButton() {
  const applyBtn = document.querySelector('.apply-btn');
  
  if (applyBtn) {
    applyBtn.addEventListener('click', function() {
      // 获取当前设置
      const showGrid = document.getElementById('show-grid').checked;
      const showContour = document.getElementById('show-contour').checked;
      const showLabel = document.getElementById('show-label').checked;
      const showBoundary = document.getElementById('show-boundary').checked;
      const colorScheme = document.querySelector('.color-option.active').getAttribute('data-scheme');
      
      // 应用设置（在实际项目中，这里会更新地图显示）
      console.log('应用显示设置:', {
        showGrid,
        showContour,
        showLabel,
        showBoundary,
        colorScheme
      });
      
      // 显示成功提示
      showToast('设置已应用');
    });
  }
}

/**
 * 初始化地图交互功能
 */
function initMapInteraction() {
  // 放大按钮
  const zoomInBtn = document.querySelector('.tool-btn[title="放大"]');
  if (zoomInBtn) {
    zoomInBtn.addEventListener('click', function() {
      console.log('地图放大');
    });
  }
  
  // 缩小按钮
  const zoomOutBtn = document.querySelector('.tool-btn[title="缩小"]');
  if (zoomOutBtn) {
    zoomOutBtn.addEventListener('click', function() {
      console.log('地图缩小');
    });
  }
  
  // 全屏按钮
  const fullscreenBtn = document.querySelector('.tool-btn[title="全屏查看"]');
  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', function() {
      const mapContainer = document.querySelector('.weather-map-container');
      if (mapContainer) {
        if (!document.fullscreenElement) {
          mapContainer.requestFullscreen().catch(err => {
            console.error('全屏请求被拒绝:', err);
          });
        } else {
          document.exitFullscreen();
        }
      }
    });
  }
  
  // 截图按钮
  const screenshotBtn = document.querySelector('.tool-btn[title="截图"]');
  if (screenshotBtn) {
    screenshotBtn.addEventListener('click', function() {
      console.log('地图截图');
      showToast('截图已保存');
    });
  }
  
  // 下载按钮
  const downloadBtn = document.querySelector('.tool-btn[title="下载"]');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', function() {
      console.log('下载地图数据');
      showToast('地图数据开始下载');
    });
  }
  
  // 分享按钮
  const shareBtn = document.querySelector('.tool-btn[title="分享"]');
  if (shareBtn) {
    shareBtn.addEventListener('click', function() {
      console.log('分享地图');
      showToast('链接已复制到剪贴板');
    });
  }
  
  // 图层控制
  const layerCheckboxes = document.querySelectorAll('.layer-item input[type="checkbox"]');
  layerCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      const layerId = this.id;
      const isChecked = this.checked;
      console.log(`图层 ${layerId} 设置为 ${isChecked ? '显示' : '隐藏'}`);
    });
  });
}

/**
 * 初始化日期控制器
 */
function initDateControls() {
  const prevDateBtn = document.getElementById('prevDate');
  const nextDateBtn = document.getElementById('nextDate');
  const playPauseBtn = document.getElementById('playPause');
  const currentDateDisplay = document.querySelector('.current-date');
  
  let isPlaying = false;
  let playInterval;
  
  // 更新当前显示的日期
  function updateDateDisplay(date) {
    if (currentDateDisplay) {
      const formattedDate = formatDate(date);
      currentDateDisplay.textContent = formattedDate;
    }
  }
  
  // 格式化日期
  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }
  
  // 获取当前显示的日期
  function getCurrentDate() {
    const dateString = currentDateDisplay.textContent;
    return new Date(dateString);
  }
  
  // 向前一天
  if (prevDateBtn) {
    prevDateBtn.addEventListener('click', function() {
      const currentDate = getCurrentDate();
      currentDate.setDate(currentDate.getDate() - 1);
      updateDateDisplay(currentDate);
    });
  }
  
  // 向后一天
  if (nextDateBtn) {
    nextDateBtn.addEventListener('click', function() {
      const currentDate = getCurrentDate();
      currentDate.setDate(currentDate.getDate() + 1);
      updateDateDisplay(currentDate);
    });
  }
  
  // 播放/暂停
  if (playPauseBtn) {
    playPauseBtn.addEventListener('click', function() {
      const icon = this.querySelector('i');
      
      if (!isPlaying) {
        // 开始播放
        isPlaying = true;
        icon.classList.replace('fa-play', 'fa-pause');
        
        // 每3秒前进一天
        playInterval = setInterval(() => {
          const currentDate = getCurrentDate();
          currentDate.setDate(currentDate.getDate() + 1);
          updateDateDisplay(currentDate);
        }, 3000);
      } else {
        // 暂停播放
        isPlaying = false;
        icon.classList.replace('fa-pause', 'fa-play');
        clearInterval(playInterval);
      }
    });
  }
}

/**
 * 初始化统计图表
 */
function initCharts() {
  // 初始化标签页切换功能
  const tabItems = document.querySelectorAll('.chart-tabs .tab-item');
  const tabPanes = document.querySelectorAll('.tab-pane');
  
  tabItems.forEach(item => {
    item.addEventListener('click', function() {
      const tabId = this.getAttribute('data-tab');
      
      // 切换标签页
      tabItems.forEach(tab => tab.classList.remove('active'));
      tabPanes.forEach(pane => pane.classList.remove('active'));
      
      this.classList.add('active');
      document.getElementById(tabId).classList.add('active');
      
      // 重新初始化当前图表
      switch (tabId) {
        case 'temp-trend':
          initTempTrendChart();
          break;
        case 'rainfall-trend':
          initRainfallTrendChart();
          break;
        case 'area-compare':
          initAreaCompareChart();
          break;
        case 'year-compare':
          initYearCompareChart();
          break;
      }
    });
  });
  
  // 初始化默认显示的图表
  initTempTrendChart();
}

/**
 * 初始化温度趋势图表
 */
function initTempTrendChart() {
  const chartDom = document.getElementById('tempTrendChart');
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
      data: ['平均温度', '最高温度', '最低温度', '历史同期'],
      bottom: 0
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      top: '8%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['7/1', '7/2', '7/3', '7/4', '7/5', '7/6', '7/7', '7/8', '7/9', '7/10', '7/11', '7/12', '7/13', '7/14', '7/15']
    },
    yAxis: {
      type: 'value',
      name: '温度(°C)',
      min: 15,
      max: 35
    },
    series: [
      {
        name: '平均温度',
        type: 'line',
        data: [24.5, 25.2, 26.1, 25.8, 26.5, 27.2, 28.1, 28.5, 27.9, 26.8, 25.9, 26.2, 26.5, 27.1, 26.5],
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: {
          width: 3
        },
        itemStyle: {
          color: '#1890FF'
        }
      },
      {
        name: '最高温度',
        type: 'line',
        data: [29.2, 30.1, 31.5, 30.8, 31.2, 32.5, 33.2, 33.6, 32.8, 31.5, 30.2, 31.1, 32.2, 32.8, 32.8],
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: {
          width: 2
        },
        itemStyle: {
          color: '#F5222D'
        }
      },
      {
        name: '最低温度',
        type: 'line',
        data: [20.2, 20.8, 21.5, 21.2, 22.1, 22.5, 23.2, 23.8, 23.5, 22.8, 22.2, 21.5, 21.2, 21.8, 21.2],
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: {
          width: 2
        },
        itemStyle: {
          color: '#13C2C2'
        }
      },
      {
        name: '历史同期',
        type: 'line',
        data: [23.5, 24.1, 24.8, 25.2, 25.5, 25.8, 26.2, 26.5, 26.8, 26.2, 25.5, 25.2, 24.8, 25.2, 25.3],
        symbol: 'none',
        lineStyle: {
          type: 'dashed',
          width: 2
        },
        itemStyle: {
          color: '#8C8C8C'
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
 * 初始化降水趋势图表
 */
function initRainfallTrendChart() {
  const chartDom = document.getElementById('rainfallTrendChart');
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
      data: ['日降水量', '累计降水量', '历史同期累计'],
      bottom: 0
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      top: '8%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['7/1', '7/2', '7/3', '7/4', '7/5', '7/6', '7/7', '7/8', '7/9', '7/10', '7/11', '7/12', '7/13', '7/14', '7/15']
    },
    yAxis: [
      {
        type: 'value',
        name: '日降水量(mm)',
        min: 0,
        max: 50,
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
        name: '累计降水量(mm)',
        min: 0,
        max: 200,
        position: 'right',
        axisLine: {
          lineStyle: {
            color: '#722ED1'
          }
        },
        axisLabel: {
          formatter: '{value}'
        }
      }
    ],
    series: [
      {
        name: '日降水量',
        type: 'bar',
        data: [12.5, 0, 0, 8.2, 18.6, 0, 0, 5.2, 32.5, 15.8, 2.3, 0, 35.2, 9.8, 5.5],
        barWidth: '50%',
        itemStyle: {
          color: '#1890FF'
        }
      },
      {
        name: '累计降水量',
        type: 'line',
        yAxisIndex: 1,
        data: [12.5, 12.5, 12.5, 20.7, 39.3, 39.3, 39.3, 44.5, 77.0, 92.8, 95.1, 95.1, 130.3, 140.1, 145.6],
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: {
          width: 3
        },
        itemStyle: {
          color: '#722ED1'
        }
      },
      {
        name: '历史同期累计',
        type: 'line',
        yAxisIndex: 1,
        data: [8.2, 15.5, 22.1, 28.3, 35.6, 42.8, 50.2, 58.5, 65.8, 73.2, 80.5, 88.2, 95.8, 103.2, 110.5],
        symbol: 'none',
        lineStyle: {
          type: 'dashed',
          width: 2
        },
        itemStyle: {
          color: '#8C8C8C'
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
 * 初始化区域对比图表
 */
function initAreaCompareChart() {
  const chartDom = document.getElementById('areaCompareChart');
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
      data: ['平均温度', '累计降水', '日照时数'],
      bottom: 0
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      top: '8%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['北部区域', '南部区域', '东部区域', '西部区域', '中心区域']
    },
    yAxis: [
      {
        type: 'value',
        name: '温度/日照',
        axisLabel: {
          formatter: '{value}'
        }
      },
      {
        type: 'value',
        name: '降水量(mm)',
        axisLabel: {
          formatter: '{value}'
        }
      }
    ],
    series: [
      {
        name: '平均温度',
        type: 'bar',
        data: [25.8, 27.2, 28.5, 24.6, 26.5],
        itemStyle: {
          color: '#F5222D'
        }
      },
      {
        name: '累计降水',
        type: 'bar',
        yAxisIndex: 1,
        data: [132.5, 156.8, 128.2, 165.2, 145.6],
        itemStyle: {
          color: '#1890FF'
        }
      },
      {
        name: '日照时数',
        type: 'bar',
        data: [182.5, 175.8, 195.2, 165.8, 186.4],
        itemStyle: {
          color: '#FAAD14'
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
 * 初始化年际对比图表
 */
function initYearCompareChart() {
  const chartDom = document.getElementById('yearCompareChart');
  if (!chartDom) return;
  
  const chart = echarts.init(chartDom);
  
  // 模拟数据
  const option = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['2023年', '2022年', '2021年', '2020年', '近5年平均'],
      bottom: 0
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      top: '8%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['7/1', '7/5', '7/10', '7/15', '7/20', '7/25', '7/30']
    },
    yAxis: {
      type: 'value',
      name: '温度(°C)',
      min: 20,
      max: 35
    },
    series: [
      {
        name: '2023年',
        type: 'line',
        data: [24.5, 26.5, 26.8, 26.5, null, null, null],
        lineStyle: {
          width: 3
        },
        itemStyle: {
          color: '#1890FF'
        }
      },
      {
        name: '2022年',
        type: 'line',
        data: [25.2, 27.2, 28.5, 27.8, 28.2, 29.5, 28.8],
        lineStyle: {
          width: 2
        },
        itemStyle: {
          color: '#13C2C2'
        }
      },
      {
        name: '2021年',
        type: 'line',
        data: [23.8, 25.6, 26.8, 27.2, 28.5, 28.2, 27.5],
        lineStyle: {
          width: 2
        },
        itemStyle: {
          color: '#722ED1'
        }
      },
      {
        name: '2020年',
        type: 'line',
        data: [24.2, 26.2, 27.5, 28.1, 28.8, 27.6, 26.8],
        lineStyle: {
          width: 2
        },
        itemStyle: {
          color: '#FA8C16'
        }
      },
      {
        name: '近5年平均',
        type: 'line',
        data: [24.5, 26.3, 27.2, 27.5, 28.2, 28.5, 27.6],
        lineStyle: {
          type: 'dashed',
          width: 2
        },
        itemStyle: {
          color: '#8C8C8C'
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
 * 初始化站点数据交互
 */
function initStationInteraction() {
  // 站点搜索
  const stationSearchInput = document.querySelector('.station-filter .form-input');
  const stationItems = document.querySelectorAll('.station-item');
  
  if (stationSearchInput) {
    stationSearchInput.addEventListener('input', function() {
      const searchText = this.value.toLowerCase();
      
      stationItems.forEach(item => {
        const stationName = item.querySelector('.station-name').textContent.toLowerCase();
        const stationId = item.querySelector('.station-id').textContent.toLowerCase();
        
        if (stationName.includes(searchText) || stationId.includes(searchText)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }
  
  // 站点选择
  stationItems.forEach(item => {
    item.addEventListener('click', function() {
      stationItems.forEach(si => si.classList.remove('active'));
      this.classList.add('active');
      
      const stationName = this.querySelector('.station-name').textContent;
      console.log(`选择站点: ${stationName}`);
      
      // 在实际项目中，这里会在地图上突出显示选中的站点
    });
  });
}

/**
 * 初始化报告操作
 */
function initReportActions() {
  // 下载报告按钮
  const downloadReportBtn = document.querySelector('.report-btn:first-child');
  if (downloadReportBtn) {
    downloadReportBtn.addEventListener('click', function() {
      console.log('下载气象报告');
      showToast('气象报告开始下载');
    });
  }
  
  // 导出PDF按钮
  const exportPdfBtn = document.querySelector('.report-btn:last-child');
  if (exportPdfBtn) {
    exportPdfBtn.addEventListener('click', function() {
      console.log('导出PDF报告');
      showToast('正在生成PDF报告...');
      
      // 模拟导出延迟
      setTimeout(() => {
        showToast('PDF报告已生成，开始下载');
      }, 1500);
    });
  }
  
  // 查看完整报告链接
  const viewReportLink = document.querySelector('.report-view-more .link');
  if (viewReportLink) {
    viewReportLink.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('查看完整报告');
      showToast('正在加载完整报告...');
    });
  }
}

/**
 * 显示提示信息
 * @param {string} message - 提示信息内容
 */
function showToast(message) {
  // 创建提示元素
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  
  // 添加到页面
  document.body.appendChild(toast);
  
  // 显示动画
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);
  
  // 自动消失
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
} 