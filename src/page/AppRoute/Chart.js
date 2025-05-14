// Chart.js
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Chart = ({ data, config }) => {
  const chartRef = useRef();
  
  useEffect(() => {
    if (!data || !config) return;
    
    const svg = d3.select(chartRef.current);
    svg.selectAll('*').remove(); // Clear previous chart
    
    const margin = { top: 20, right: 20, bottom: 60, left: 60 };
    const width = 800 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
    
    const chart = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    
    // Parse data
    const parsedData = data.map(d => ({
      x: d[config.xAxis],
      y: config.type !== 'pie' ? parseFloat(d[config.yAxis]) : null,
      label: d[config.xAxis],
      value: config.type === 'pie' ? parseFloat(d[config.yAxis || config.xAxis]) : null
    }));
    
    // Create scales based on chart type
    switch (config.type) {
      case 'bar':
        drawBarChart();
        break;
      case 'line':
        drawLineChart();
        break;
      case 'pie':
        drawPieChart();
        break;
      case 'scatter':
        drawScatterPlot();
        break;
      default:
        drawBarChart();
    }
    
    function drawBarChart() {
      const x = d3.scaleBand()
        .domain(parsedData.map(d => d.x))
        .range([0, width])
        .padding(0.2);
      
      const y = d3.scaleLinear()
        .domain([0, d3.max(parsedData, d => d.y)])
        .range([height, 0]);
      
      // Add x axis
      chart.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll('text')
        .attr('transform', 'rotate(-45)')
        .style('text-anchor', 'end');
      
      // Add y axis
      chart.append('g')
        .call(d3.axisLeft(y));
      
      // Add bars
      chart.selectAll('.bar')
        .data(parsedData)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d.x))
        .attr('y', d => y(d.y))
        .attr('width', x.bandwidth())
        .attr('height', d => height - y(d.y))
        .attr('fill', config.color);
      
      // Add labels
      svg.append('text')
        .attr('x', width / 2 + margin.left)
        .attr('y', height + margin.top + margin.bottom - 10)
        .style('text-anchor', 'middle')
        .text(config.xAxis);
      
      svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 10)
        .attr('x', -height / 2)
        .style('text-anchor', 'middle')
        .text(config.yAxis);
    }
    
    function drawLineChart() {
      // Similar to bar chart but with lines
      // Implementation omitted for brevity
    }
    
    function drawPieChart() {
      // Pie chart implementation
      // Implementation omitted for brevity
    }
    
    function drawScatterPlot() {
      // Scatter plot implementation
      // Implementation omitted for brevity
    }
    
  }, [data, config]);
  
  return (
    <svg 
      ref={chartRef} 
      width={800} 
      height={500}
      style={{ display: 'block', margin: '0 auto' }}
    />
  );
};

export default Chart;