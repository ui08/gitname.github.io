const chartTypes = [
    'Bar Chart', 'Line Chart', 'Pie Chart', 'Histogram', 'Scatter Plot',
    'Area Chart', 'Time Series Line Chart', 'Box Plot', 'Treemap',
    'Sunburst Chart', 'Force-Directed Graph', 'Radar Chart',
    'Calendar Heatmap', 'Chord Diagram', 'Sankey Diagram',
    'Heatmap', 'Parallel Coordinates', 'Waterfall Chart', // etc.
  ];
  
  function ChartSelector({ onSelect }) {
    return (
      <select onChange={(e) => onSelect(e.target.value)}>
        {chartTypes.map(type => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>
    );
  }
  