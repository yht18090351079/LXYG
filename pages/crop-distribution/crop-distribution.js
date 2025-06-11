/**
 * 作物分布页面功能
 */

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
  // 初始化底部表格展开折叠功能
  initTableExpand();
  
  // 初始化作物类型选择功能
  initCropTypeSelector();
  
  // 初始化季节选择功能
  initSeasonSelector();
  
  // 初始化地图工具栏功能
  initMapToolbar();
  
  // 初始化底图切换功能
  initBasemapSwitch();
  
  // 初始化单位切换功能
  initUnitSwitch();
  
  // 初始化图表
  initCharts();
});

/**
 * 初始化底部表格展开折叠功能
 */
function initTableExpand() {
  const tableContainer = document.getElementById('dataTableContainer');
  const tableHandle = document.querySelector('.table-handle');
  
  if (tableContainer && tableHandle) {
    tableHandle.addEventListener('click', function() {
      tableContainer.classList.toggle('expanded');
      
      // 更新图标方向
      const icon = tableHandle.querySelector('i');
      if (tableContainer.classList.contains('expanded')) {
        icon.classList.replace('fa-grip-lines', 'fa-chevron-down');
      } else {
        icon.classList.replace('fa-chevron-down', 'fa-grip-lines');
      }
    });
  }
}

/**
 * 初始化作物类型选择功能
 */
function initCropTypeSelector() {
  const selectAllBtn = document.querySelector('.select-all');
  const clearAllBtn = document.querySelector('.clear-all');
  const cropCheckboxes = document.querySelectorAll('.crop-item input[type="checkbox"]');
  
  // 全选按钮
  if (selectAllBtn) {
    selectAllBtn.addEventListener('click', function() {
      cropCheckboxes.forEach(checkbox => {
        checkbox.checked = true;
        updateMapLayer(checkbox.id, true);
      });
    });
  }
  
  // 清除按钮
  if (clearAllBtn) {
    clearAllBtn.addEventListener('click', function() {
      cropCheckboxes.forEach(checkbox => {
        checkbox.checked = false;
        updateMapLayer(checkbox.id, false);
      });
    });
  }
  
  // 单个复选框变化
  cropCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      updateMapLayer(this.id, this.checked);
    });
  });
}

/**
 * 更新地图图层（模拟）
 */
function updateMapLayer(layerId, isVisible) {
  console.log(`${layerId} 图层 ${isVisible ? '显示' : '隐藏'}`);
  
  // 实际项目中，这里会调用地图API更新图层显示/隐藏
}

/**
 * 初始化季节选择功能
 */
function initSeasonSelector() {
  const seasonBtns = document.querySelectorAll('.season-btn');
  
  seasonBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // 移除其他按钮的激活状态
      seasonBtns.forEach(b => b.classList.remove('active'));
      
      // 添加当前按钮的激活状态
      this.classList.add('active');
      
      // 选中内部的单选按钮
      const radio = this.querySelector('input[type="radio"]');
      if (radio) {
        radio.checked = true;
        
        // 模拟更新数据
        console.log(`选择季节: ${radio.value}`);
        updateSeasonData(radio.value);
      }
    });
  });
}

/**
 * 更新季节数据（模拟）
 */
function updateSeasonData(season) {
  // 实际项目中，这里会根据选择的季节重新加载数据
  // 模拟数据变化
  if (season === 'spring') {
    document.querySelector('.total-number').textContent = '789.6';
    document.querySelector('.trend.up').innerHTML = '<i class="fas fa-arrow-up"></i> 7.3%';
  } else if (season === 'summer') {
    document.querySelector('.total-number').textContent = '923.4';
    document.querySelector('.trend.up').innerHTML = '<i class="fas fa-arrow-up"></i> 12.1%';
  } else if (season === 'autumn') {
    document.querySelector('.total-number').textContent = '876.2';
    document.querySelector('.trend.up').innerHTML = '<i class="fas fa-arrow-up"></i> 5.8%';
  } else if (season === 'winter') {
    document.querySelector('.total-number').textContent = '651.7';
    document.querySelector('.trend.up').innerHTML = '<i class="fas fa-arrow-down"></i> -2.3%';
    document.querySelector('.trend.up').classList.replace('up', 'down');
  }
  
  // 重新初始化图表
  initCharts();
}

/**
 * 初始化地图工具栏功能
 */
function initMapToolbar() {
  const toolBtns = document.querySelectorAll('.tool-btn');
  
  toolBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // 移除所有按钮的激活状态
      toolBtns.forEach(b => b.classList.remove('active'));
      
      // 切换当前按钮的激活状态
      this.classList.toggle('active');
      
      // 根据工具类型执行相应功能
      const toolType = this.getAttribute('title');
      console.log(`激活工具: ${toolType}`);
      
      // 实际项目中，这里会根据工具类型激活相应的地图功能
    });
  });
}

/**
 * 初始化底图切换功能
 */
function initBasemapSwitch() {
  const basemapBtns = document.querySelectorAll('.basemap-btn');
  const opacitySlider = document.querySelector('.opacity-slider');
  
  basemapBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // 移除所有按钮的激活状态
      basemapBtns.forEach(b => b.classList.remove('active'));
      
      // 添加当前按钮的激活状态
      this.classList.add('active');
      
      const mapType = this.getAttribute('data-type');
      console.log(`切换底图: ${mapType}`);
      
      // 模拟切换底图
      const map = document.getElementById('map');
      if (map) {
        // 在实际项目中，这里会调用地图API切换底图
        // 这里仅做简单样式模拟
        if (mapType === 'base') {
          map.style.filter = 'none';
        } else if (mapType === 'satellite') {
          map.style.filter = 'saturate(1.2)';
        } else if (mapType === 'terrain') {
          map.style.filter = 'contrast(1.1) brightness(1.1)';
        }
      }
    });
  });
  
  // 透明度滑块
  if (opacitySlider) {
    opacitySlider.addEventListener('input', function() {
      const opacity = this.value / 100;
      console.log(`设置透明度: ${opacity}`);
      
      // 模拟设置透明度
      const map = document.getElementById('map');
      if (map) {
        // 在实际项目中，这里会调用地图API设置图层透明度
        // 这里仅做简单样式模拟
        map.style.opacity = opacity;
      }
    });
  }
}

/**
 * 初始化单位切换功能
 */
function initUnitSwitch() {
  const unitBtns = document.querySelectorAll('.unit');
  const totalNumber = document.querySelector('.total-number');
  
  if (!totalNumber) return;
  
  let currentValue = parseFloat(totalNumber.textContent);
  
  unitBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // 如果已经是激活状态，不做处理
      if (this.classList.contains('active')) return;
      
      // 移除所有按钮的激活状态
      unitBtns.forEach(b => b.classList.remove('active'));
      
      // 添加当前按钮的激活状态
      this.classList.add('active');
      
      const unitType = this.getAttribute('data-unit');
      
      // 转换单位
      if (unitType === 'km2' && currentValue > 1000) {
        // 亩转平方公里
        currentValue = currentValue / 1500;
        totalNumber.textContent = currentValue.toFixed(1);
      } else if (unitType === 'mu' && currentValue < 1000) {
        // 平方公里转亩
        currentValue = currentValue * 1500;
        totalNumber.textContent = Math.round(currentValue);
      }
    });
  });
}

/**
 * 初始化图表
 */
function initCharts() {
  // 初始化作物占比饼图
  initPieChart();
  
  // 初始化作物面积条形图
  initBarChart();
  
  // 初始化历年变化折线图
  initLineChart();
}

/**
 * 初始化作物占比饼图
 */
function initPieChart() {
  const chartDom = document.getElementById('pieChart');
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
      data: ['小麦', '玉米', '蔬菜', '大棚']
    },
    series: [
      {
        name: '作物面积',
        type: 'pie',
        radius: ['45%', '70%'],
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
            fontSize: 14,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 156.3, name: '小麦', itemStyle: { color: '#E8D639' } },
          { value: 203.7, name: '玉米', itemStyle: { color: '#61D836' } },
          { value: 138.2, name: '蔬菜', itemStyle: { color: '#36D8AD' } },
          { value: 291.4, name: '大棚', itemStyle: { color: '#36A0D8' } }
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
 * 初始化作物面积条形图
 */
function initBarChart() {
  const chartDom = document.getElementById('barChart');
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
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} km²'
      }
    },
    yAxis: {
      type: 'category',
      data: ['小麦', '玉米', '蔬菜', '大棚'],
      axisLabel: {
        fontSize: 12
      }
    },
    series: [
      {
        name: '面积',
        type: 'bar',
        data: [
          { value: 156.3, itemStyle: { color: '#E8D639' } },
          { value: 203.7, itemStyle: { color: '#61D836' } },
          { value: 138.2, itemStyle: { color: '#36D8AD' } },
          { value: 291.4, itemStyle: { color: '#36A0D8' } }
        ],
        label: {
          show: true,
          position: 'right',
          formatter: '{c} km²'
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
 * 初始化历年变化折线图
 */
function initLineChart() {
  const chartDom = document.getElementById('lineChart');
  if (!chartDom) return;
  
  const chart = echarts.init(chartDom);
  
  // 模拟数据
  const option = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['小麦', '玉米', '蔬菜', '大棚'],
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
      boundaryGap: false,
      data: ['2019', '2020', '2021', '2022', '2023']
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} km²'
      }
    },
    series: [
      {
        name: '小麦',
        type: 'line',
        data: [120.5, 132.1, 140.8, 148.5, 156.3],
        itemStyle: { color: '#E8D639' },
        lineStyle: { width: 3 }
      },
      {
        name: '玉米',
        type: 'line',
        data: [150.2, 165.8, 178.4, 188.5, 203.7],
        itemStyle: { color: '#61D836' },
        lineStyle: { width: 3 }
      },
      {
        name: '蔬菜',
        type: 'line',
        data: [110.4, 118.9, 125.6, 133.2, 138.2],
        itemStyle: { color: '#36D8AD' },
        lineStyle: { width: 3 }
      },
      {
        name: '大棚',
        type: 'line',
        data: [220.5, 245.8, 280.2, 298.4, 291.4],
        itemStyle: { color: '#36A0D8' },
        lineStyle: { width: 3 }
      }
    ]
  };
  
  chart.setOption(option);
  
  // 响应窗口大小变化
  window.addEventListener('resize', function() {
    chart.resize();
  });
} 