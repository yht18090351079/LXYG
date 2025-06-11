/**
 * 作物长势页面功能
 */

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
  // 初始化面板标签页功能
  initTabs();
  
  // 初始化时间轴功能
  initTimeline();
  
  // 初始化图例折叠功能
  initLegendToggle();
  
  // 初始化指标类型选择
  initIndexSelector();
  
  // 初始化地图交互
  initMapInteraction();
  
  // 初始化图表
  initCharts();
  
  // 初始化行政区域选择器
  initAreaSelector();
});

/**
 * 初始化面板标签页功能
 */
function initTabs() {
  const tabItems = document.querySelectorAll('.panel-tabs .tab-item');
  const tabPanes = document.querySelectorAll('.tab-pane');
  
  tabItems.forEach(item => {
    item.addEventListener('click', function() {
      // 移除所有活动状态
      tabItems.forEach(tab => tab.classList.remove('active'));
      tabPanes.forEach(pane => pane.classList.remove('active'));
      
      // 添加当前活动状态
      this.classList.add('active');
      const tabId = this.getAttribute('data-tab');
      const targetPane = document.getElementById(`${tabId}-panel`);
      
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });
}

/**
 * 初始化时间轴功能
 */
function initTimeline() {
  const timelineSlider = document.querySelector('.timeline-slider');
  const currentDate = document.querySelector('.current-date');
  const prevBtn = document.querySelector('.timeline-btn:first-child');
  const nextBtn = document.querySelector('.timeline-btn:nth-child(3)');
  const playBtn = document.querySelector('.play-btn');
  
  // 定义日期范围
  const startDate = new Date('2023-03-01');
  const endDate = new Date('2023-07-31');
  const totalDays = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
  
  let isPlaying = false;
  let playInterval;
  
  // 更新日期显示
  function updateDateDisplay(value) {
    const dayOffset = Math.floor(value / 100 * totalDays);
    const currentDate = new Date(startDate.getTime() + dayOffset * 24 * 60 * 60 * 1000);
    return formatDate(currentDate);
  }
  
  // 格式化日期
  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  // 初始化日期显示
  if (timelineSlider && currentDate) {
    currentDate.textContent = updateDateDisplay(timelineSlider.value);
    
    // 时间滑块变化
    timelineSlider.addEventListener('input', function() {
      currentDate.textContent = updateDateDisplay(this.value);
      updateMapData(this.value);
    });
  }
  
  // 上一步按钮
  if (prevBtn && timelineSlider) {
    prevBtn.addEventListener('click', function() {
      let value = parseInt(timelineSlider.value);
      if (value > 0) {
        value -= 5;
        if (value < 0) value = 0;
        timelineSlider.value = value;
        currentDate.textContent = updateDateDisplay(value);
        updateMapData(value);
      }
    });
  }
  
  // 下一步按钮
  if (nextBtn && timelineSlider) {
    nextBtn.addEventListener('click', function() {
      let value = parseInt(timelineSlider.value);
      if (value < 100) {
        value += 5;
        if (value > 100) value = 100;
        timelineSlider.value = value;
        currentDate.textContent = updateDateDisplay(value);
        updateMapData(value);
      }
    });
  }
  
  // 播放/暂停按钮
  if (playBtn && timelineSlider) {
    playBtn.addEventListener('click', function() {
      const icon = this.querySelector('i');
      
      if (isPlaying) {
        // 暂停
        clearInterval(playInterval);
        icon.classList.replace('fa-pause', 'fa-play');
      } else {
        // 播放
        playInterval = setInterval(function() {
          let value = parseInt(timelineSlider.value);
          if (value < 100) {
            value += 1;
            timelineSlider.value = value;
            currentDate.textContent = updateDateDisplay(value);
            updateMapData(value);
          } else {
            clearInterval(playInterval);
            icon.classList.replace('fa-pause', 'fa-play');
            isPlaying = false;
          }
        }, 500);
        
        icon.classList.replace('fa-play', 'fa-pause');
      }
      
      isPlaying = !isPlaying;
    });
  }
}

/**
 * 更新地图数据（模拟）
 */
function updateMapData(timelineValue) {
  // 在实际项目中，这里会根据时间点从服务器获取对应的遥感数据
  console.log(`更新地图数据到时间点: ${timelineValue}%`);
  
  // 这里简单模拟NDVI随时间的变化
  if (timelineValue < 20) {
    updateNdviStats(0.42, "较差");
  } else if (timelineValue < 40) {
    updateNdviStats(0.58, "一般");
  } else if (timelineValue < 60) {
    updateNdviStats(0.78, "良好");
  } else if (timelineValue < 80) {
    updateNdviStats(0.85, "优良");
  } else {
    updateNdviStats(0.82, "良好");
  }
}

/**
 * 更新NDVI统计信息
 */
function updateNdviStats(ndviValue, status) {
  const ndviElement = document.querySelector('.stat-card:first-child .stat-value');
  const statusElement = document.querySelector('.stat-status');
  
  if (ndviElement) {
    ndviElement.textContent = ndviValue.toFixed(2);
  }
  
  if (statusElement) {
    statusElement.textContent = status;
    
    // 更新状态样式
    statusElement.classList.remove('good', 'average', 'poor');
    
    if (status === "优良") {
      statusElement.classList.add('good');
    } else if (status === "良好") {
      statusElement.classList.add('good');
    } else if (status === "一般") {
      statusElement.classList.add('average');
    } else {
      statusElement.classList.add('poor');
    }
  }
}

/**
 * 初始化图例折叠功能
 */
function initLegendToggle() {
  const toggleBtn = document.querySelector('.legend-toggle');
  const legendContent = document.querySelector('.legend-content');
  
  if (toggleBtn && legendContent) {
    toggleBtn.addEventListener('click', function() {
      // 切换图例内容显示/隐藏
      if (legendContent.style.display === 'none') {
        legendContent.style.display = 'block';
        toggleBtn.querySelector('i').classList.replace('fa-chevron-up', 'fa-chevron-down');
      } else {
        legendContent.style.display = 'none';
        toggleBtn.querySelector('i').classList.replace('fa-chevron-down', 'fa-chevron-up');
      }
    });
  }
}

/**
 * 初始化指标类型选择
 */
function initIndexSelector() {
  const indexRadios = document.querySelectorAll('.index-item input[type="radio"]');
  const legendTitle = document.querySelector('.legend-header span');
  
  indexRadios.forEach(radio => {
    radio.addEventListener('change', function() {
      if (this.checked) {
        const indexId = this.id;
        console.log(`选择指标类型: ${indexId}`);
        
        // 更新图例标题
        if (legendTitle) {
          if (indexId === 'index-ndvi') {
            legendTitle.textContent = 'NDVI指数图例';
          } else if (indexId === 'index-lai') {
            legendTitle.textContent = 'LAI指数图例';
          } else if (indexId === 'index-evi') {
            legendTitle.textContent = 'EVI指数图例';
          } else if (indexId === 'index-msavi') {
            legendTitle.textContent = 'MSAVI指数图例';
          }
        }
        
        // 重新加载图表
        initCharts();
      }
    });
  });
}

/**
 * 初始化地图交互
 */
function initMapInteraction() {
  const map = document.getElementById('map');
  const toolBtns = document.querySelectorAll('.tool-btn');
  
  // 工具按钮点击事件
  toolBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // 移除所有活动状态
      toolBtns.forEach(b => b.classList.remove('active'));
      
      // 切换当前按钮的活动状态
      this.classList.toggle('active');
      
      const toolType = this.getAttribute('title');
      console.log(`激活工具: ${toolType}`);
    });
  });
  
  // 颜色方案选择
  const colorSchemeSelect = document.getElementById('color-scheme');
  if (colorSchemeSelect) {
    colorSchemeSelect.addEventListener('change', function() {
      const scheme = this.value;
      console.log(`选择色带: ${scheme}`);
      
      // 在实际项目中，这里会根据选择的色带更新地图渲染方式
      const gradientBar = document.querySelector('.gradient-bar');
      if (gradientBar) {
        if (scheme === 'green') {
          gradientBar.style.background = 'linear-gradient(to right, #f7fcf5, #e5f5e0, #c7e9c0, #a1d99b, #74c476, #41ab5d, #238b45, #006d2c, #00441b)';
        } else if (scheme === 'rainbow') {
          gradientBar.style.background = 'linear-gradient(to right, #d73027, #fc8d59, #fee08b, #d9ef8b, #91cf60)';
        } else if (scheme === 'spectral') {
          gradientBar.style.background = 'linear-gradient(to right, #9e0142, #d53e4f, #f46d43, #fdae61, #fee08b, #e6f598, #abdda4, #66c2a5, #3288bd, #5e4fa2)';
        }
      }
    });
  }
  
  // 显示设置
  const showAdminBoundary = document.getElementById('show-admin-boundary');
  const showContour = document.getElementById('show-contour');
  const showLabels = document.getElementById('show-labels');
  
  if (showAdminBoundary) {
    showAdminBoundary.addEventListener('change', function() {
      console.log(`行政边界: ${this.checked ? '显示' : '隐藏'}`);
    });
  }
  
  if (showContour) {
    showContour.addEventListener('change', function() {
      console.log(`等值线: ${this.checked ? '显示' : '隐藏'}`);
    });
  }
  
  if (showLabels) {
    showLabels.addEventListener('change', function() {
      console.log(`标注: ${this.checked ? '显示' : '隐藏'}`);
    });
  }
  
  // 快捷操作按钮
  const resetBtn = document.querySelector('.quick-btn[title="重置视图"]');
  if (resetBtn) {
    resetBtn.addEventListener('click', function() {
      console.log('重置视图');
      // 在实际项目中，这里会重置地图到初始状态
    });
  }
}

/**
 * 初始化图表
 */
function initCharts() {
  // 初始化NDVI等级分布图表
  initNdviDistributionChart();
  
  // 初始化区域对比图表
  initRegionComparisonChart();
  
  // 初始化历年对比图表
  initYearlyComparisonChart();
  
  // 初始化生长曲线图表
  initGrowthCurveChart();
}

/**
 * 初始化NDVI等级分布图表
 */
function initNdviDistributionChart() {
  const chartDom = document.getElementById('ndviDistributionChart');
  if (!chartDom) return;
  
  const chart = echarts.init(chartDom);
  
  // 模拟数据
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} km² ({d}%)'
    },
    legend: {
      orient: 'vertical',
      right: 10,
      top: 'center',
      data: ['优良', '良好', '一般', '不良', '严重不良']
    },
    color: ['#91cf60', '#d9ef8b', '#fee08b', '#fc8d59', '#d73027'],
    series: [
      {
        name: 'NDVI等级面积',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 14,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 63.5, name: '优良' },
          { value: 42.8, name: '良好' },
          { value: 25.6, name: '一般' },
          { value: 15.2, name: '不良' },
          { value: 6.3, name: '严重不良' }
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
 * 初始化区域对比图表
 */
function initRegionComparisonChart() {
  const chartDom = document.getElementById('regionComparisonChart');
  if (!chartDom) return;
  
  const chart = echarts.init(chartDom);
  
  // 使用临夏州的实际县市数据
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      min: 0,
      max: 1,
      splitLine: {
        show: false
      }
    },
    yAxis: {
      type: 'category',
      data: ['临夏市', '临夏县', '康乐县', '永靖县', '广河县', '和政县', '东乡族自治县', '积石山县'],
      axisLabel: {
        fontSize: 12
      }
    },
    series: [
      {
        name: 'NDVI',
        type: 'bar',
        data: [0.76, 0.81, 0.79, 0.73, 0.77, 0.80, 0.75, 0.72],
        itemStyle: {
          color: function(params) {
            const value = params.value;
            if (value >= 0.8) return '#91cf60';
            if (value >= 0.6) return '#d9ef8b';
            if (value >= 0.4) return '#fee08b';
            if (value >= 0.2) return '#fc8d59';
            return '#d73027';
          }
        },
        barWidth: '60%',
        label: {
          show: true,
          position: 'right',
          formatter: '{c}'
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
 * 初始化历年对比图表
 */
function initYearlyComparisonChart() {
  const chartDom = document.getElementById('yearlyComparisonChart');
  if (!chartDom) return;
  
  const chart = echarts.init(chartDom);
  
  // 模拟数据
  const option = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['2023', '2022', '五年平均'],
      bottom: 0
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      top: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['3月', '4月', '5月', '6月', '7月']
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 1
    },
    series: [
      {
        name: '2023',
        type: 'line',
        data: [0.42, 0.58, 0.78, 0.85, 0.82],
        symbolSize: 6,
        lineStyle: { width: 3 },
        itemStyle: { color: '#1890FF' }
      },
      {
        name: '2022',
        type: 'line',
        data: [0.38, 0.55, 0.73, 0.82, 0.80],
        symbolSize: 6,
        lineStyle: { width: 3 },
        itemStyle: { color: '#73D13D' }
      },
      {
        name: '五年平均',
        type: 'line',
        data: [0.40, 0.56, 0.75, 0.83, 0.81],
        symbolSize: 6,
        lineStyle: { 
          width: 3,
          type: 'dashed'
        },
        itemStyle: { color: '#FAAD14' }
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
 * 初始化生长曲线图表
 */
function initGrowthCurveChart() {
  const chartDom = document.getElementById('growthCurveChart');
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
      data: ['NDVI指数', '温度', '降水量'],
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
        data: ['3月初', '3月中', '3月末', '4月初', '4月中', '4月末', '5月初', '5月中', '5月末', '6月初', '6月中', '6月末', '7月初', '7月中', '7月末'],
        axisLabel: {
          interval: 2
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: 'NDVI',
        min: 0,
        max: 1,
        position: 'left',
        axisLine: {
          show: true,
          lineStyle: {
            color: '#1890FF'
          }
        }
      },
      {
        type: 'value',
        name: '温度 (°C)',
        min: 0,
        max: 40,
        position: 'right',
        offset: 0,
        axisLine: {
          show: true,
          lineStyle: {
            color: '#FAAD14'
          }
        }
      },
      {
        type: 'value',
        name: '降水量 (mm)',
        min: 0,
        max: 80,
        position: 'right',
        offset: 60,
        axisLine: {
          show: true,
          lineStyle: {
            color: '#73D13D'
          }
        }
      }
    ],
    series: [
      {
        name: 'NDVI指数',
        type: 'line',
        yAxisIndex: 0,
        data: [0.35, 0.40, 0.48, 0.52, 0.58, 0.65, 0.72, 0.78, 0.82, 0.85, 0.84, 0.83, 0.82, 0.80, 0.78],
        symbolSize: 6,
        lineStyle: { width: 3 },
        itemStyle: { color: '#1890FF' },
        markPoint: {
          data: [
            { name: '当前', coord: [8, 0.82], symbol: 'pin', symbolSize: 40, label: { show: true, position: 'top', formatter: '当前' } }
          ]
        },
        markLine: {
          data: [
            { 
              name: '生长阶段', 
              xAxis: 8,
              lineStyle: { color: '#F5222D', type: 'dashed', width: 2 }
            }
          ]
        }
      },
      {
        name: '温度',
        type: 'line',
        yAxisIndex: 1,
        data: [8, 10, 12, 15, 18, 20, 22, 25, 27, 28, 30, 32, 34, 35, 33],
        symbolSize: 0,
        lineStyle: { width: 2 },
        itemStyle: { color: '#FAAD14' }
      },
      {
        name: '降水量',
        type: 'bar',
        yAxisIndex: 2,
        data: [12, 15, 8, 20, 10, 30, 15, 25, 18, 35, 20, 15, 10, 20, 15],
        itemStyle: { 
          color: '#73D13D',
          opacity: 0.6
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
 * 初始化行政区域选择器及地图下钻功能
 */
function initAreaSelector() {
  // 获取各级行政区域选择器
  const areaLevelSelector = document.getElementById('area-level');
  const stateSelector = document.getElementById('state-selector');
  const citySelector = document.getElementById('city-selector');
  const townSelector = document.getElementById('town-selector');
  const villageSelector = document.getElementById('village-selector');
  
  // 临夏州乡镇数据（部分示例数据）
  const townData = {
    'linxia-city': [
      { value: 'chengguan', label: '城关镇' },
      { value: 'bozhou', label: '波州镇' },
      { value: 'anjiapo', label: '安家坡镇' },
      { value: 'dongxiang', label: '东乡族镇' },
      { value: 'hexi', label: '河西镇' }
    ],
    'linxia-county': [
      { value: 'lianghe', label: '莲花镇' },
      { value: 'yongjing', label: '漫路镇' },
      { value: 'kangle', label: '韩集镇' },
      { value: 'xincheng', label: '新集镇' },
      { value: 'dahejia', label: '大河家镇' }
    ],
    'kangle': [
      { value: 'jishi', label: '景视镇' },
      { value: 'songmingyan', label: '松鸣岩镇' },
      { value: 'pingan', label: '平安镇' },
      { value: 'yangzi', label: '杨子镇' }
    ],
    'yongjing': [
      { value: 'liuji', label: '刘家峡镇' },
      { value: 'xiaohe', label: '小河镇' },
      { value: 'dahejia', label: '大河家镇' },
      { value: 'yanguanying', label: '盐官营镇' }
    ],
    'guanghe': [
      { value: 'chengguan', label: '城关镇' },
      { value: 'xinhe', label: '新河镇' },
      { value: 'zhaoxin', label: '朝阳镇' },
      { value: 'sanhe', label: '三甲集镇' }
    ],
    'hezheng': [
      { value: 'chengguan', label: '城关镇' },
      { value: 'xinmin', label: '新民镇' },
      { value: 'songshan', label: '松山镇' },
      { value: 'dashu', label: '大树镇' }
    ],
    'dongxiang': [
      { value: 'bajiao', label: '坝角镇' },
      { value: 'longquan', label: '龙泉镇' },
      { value: 'wozhan', label: '锁南镇' },
      { value: 'daban', label: '达板镇' }
    ],
    'jishishan': [
      { value: 'chengguan', label: '城关镇' },
      { value: 'liuji', label: '吹麻滩镇' },
      { value: 'wenquan', label: '温泉镇' },
      { value: 'wushan', label: '五寨镇' }
    ]
  };
  
  // 村级数据（仅展示部分示例数据）
  const villageData = {
    // 临夏市城关镇下的村庄
    'chengguan': [
      { value: 'v1', label: '东关村' },
      { value: 'v2', label: '西关村' },
      { value: 'v3', label: '北关村' },
      { value: 'v4', label: '南关村' },
      { value: 'v5', label: '城北村' }
    ],
    // 其他乡镇下的村庄数据可以按需添加
  };
  
  // 监听行政层级选择变化
  if (areaLevelSelector) {
    areaLevelSelector.addEventListener('change', function() {
      const level = this.value;
      
      // 隐藏所有选择器
      stateSelector.style.display = 'none';
      citySelector.style.display = 'none';
      townSelector.style.display = 'none';
      villageSelector.style.display = 'none';
      
      // 根据选择的层级显示对应的选择器
      switch (level) {
        case 'state':
          stateSelector.style.display = 'block';
          updateMapLevel('state');
          break;
        case 'city':
          stateSelector.style.display = 'block';
          citySelector.style.display = 'block';
          updateMapLevel('city');
          break;
        case 'town':
          stateSelector.style.display = 'block';
          citySelector.style.display = 'block';
          townSelector.style.display = 'block';
          updateMapLevel('town');
          break;
        case 'village':
          stateSelector.style.display = 'block';
          citySelector.style.display = 'block';
          townSelector.style.display = 'block';
          villageSelector.style.display = 'block';
          updateMapLevel('village');
          break;
      }
    });
  }
  
  // 县市级选择变化时更新乡镇选项
  if (citySelector) {
    citySelector.addEventListener('change', function() {
      const cityValue = this.value;
      
      // 清空乡镇选择器
      townSelector.innerHTML = '<option value="all">全部乡镇</option>';
      villageSelector.innerHTML = '<option value="all">全部村</option>';
      
      // 如果选择了特定县市，则加载其下属乡镇
      if (cityValue !== 'all' && townData[cityValue]) {
        townData[cityValue].forEach(town => {
          const option = document.createElement('option');
          option.value = town.value;
          option.textContent = town.label;
          townSelector.appendChild(option);
        });
      }
      
      // 更新地图显示
      updateMapView('city', cityValue);
    });
  }
  
  // 乡镇选择变化时更新村级选项
  if (townSelector) {
    townSelector.addEventListener('change', function() {
      const townValue = this.value;
      
      // 清空村级选择器
      villageSelector.innerHTML = '<option value="all">全部村</option>';
      
      // 如果选择了特定乡镇，则加载其下属村庄
      if (townValue !== 'all' && villageData[townValue]) {
        villageData[townValue].forEach(village => {
          const option = document.createElement('option');
          option.value = village.value;
          option.textContent = village.label;
          villageSelector.appendChild(option);
        });
      }
      
      // 更新地图显示
      updateMapView('town', townValue);
    });
  }
  
  // 村级选择变化时更新地图
  if (villageSelector) {
    villageSelector.addEventListener('change', function() {
      const villageValue = this.value;
      
      // 更新地图显示
      updateMapView('village', villageValue);
    });
  }
  
  // 初始化地图层级
  updateMapLevel('state');
}

/**
 * 更新地图层级（下钻功能）
 * @param {string} level - 地图层级（state/city/town/village）
 */
function updateMapLevel(level) {
  console.log(`更新地图层级为: ${level}`);
  
  // 在实际项目中，这里会根据层级切换地图的缩放级别和显示内容
  // 例如加载不同精度的边界数据、调整缩放级别等
  
  // 获取地图实例（实际项目中可能是GIS地图组件的实例）
  const mapElement = document.getElementById('map');
  
  if (mapElement) {
    // 模拟更新地图层级
    switch (level) {
      case 'state':
        // 州级视图，显示整个临夏州
        mapElement.setAttribute('data-zoom', '8');
        mapElement.setAttribute('data-level', 'state');
        break;
      case 'city':
        // 县市级视图，显示县市边界
        mapElement.setAttribute('data-zoom', '10');
        mapElement.setAttribute('data-level', 'city');
        break;
      case 'town':
        // 乡镇级视图，显示乡镇边界
        mapElement.setAttribute('data-zoom', '12');
        mapElement.setAttribute('data-level', 'town');
        break;
      case 'village':
        // 村级视图，显示村级边界
        mapElement.setAttribute('data-zoom', '14');
        mapElement.setAttribute('data-level', 'village');
        break;
    }
  }
}

/**
 * 更新地图视图
 * @param {string} type - 区域类型（city/town/village）
 * @param {string} value - 区域值
 */
function updateMapView(type, value) {
  console.log(`更新地图视图: ${type} = ${value}`);
  
  // 在实际项目中，这里会根据选择的区域更新地图显示范围
  // 例如放大到特定区域、高亮显示选中区域等
  
  // 获取地图实例
  const mapElement = document.getElementById('map');
  
  if (mapElement) {
    // 设置地图中心点和边界（模拟）
    mapElement.setAttribute('data-center', value);
    
    // 更新数据展示面板
    updateDataPanel(type, value);
  }
}

/**
 * 更新数据展示面板
 * @param {string} type - 区域类型
 * @param {string} value - 区域值
 */
function updateDataPanel(type, value) {
  // 根据选择的区域更新右侧数据面板内容
  // 在实际项目中，这里会请求服务器获取选定区域的数据
  
  if (value === 'all') {
    // 如果选择"全部"，则显示汇总数据
    console.log(`显示${type}级别的汇总数据`);
  } else {
    // 显示特定区域的数据
    console.log(`显示${value}的详细数据`);
  }
  
  // 重新初始化图表以反映新数据
  initCharts();
} 