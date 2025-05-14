import {
  arc,
  axisBottom,
  axisLeft,
  csvParse,
  curveLinearClosed,
  histogram,
  interpolateBlues,
  line,
  lineRadial,
  max,
  mean,
  pie,
  scaleBand,
  scaleLinear,
  scaleSequential,
  schemeCategory10,
  select,
  timeParse,
} from "d3";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import * as topojson from "topojson-client";

const CSVChartVisualizer = () => {
  // State management
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [chartType, setChartType] = useState("bar");
  const [xAxis, setXAxis] = useState("");
  const [yAxis, setYAxis] = useState("");
  const [color, setColor] = useState("#4e79a7");
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [geoData, setGeoData] = useState(null);
  const [mapProjection, setMapProjection] = useState("geoMercator");
  const [hierarchyLevels, setHierarchyLevels] = useState([]);
  const [radarAxes, setRadarAxes] = useState([]);
  const [parallelAxes, setParallelAxes] = useState([]);

  const svgRef = useRef(null);
  const tooltipRef = useRef(null);

  // Chart type definitions
  const chartTypes = [
    // Basic charts
    { value: "bar", label: "Bar Chart" },
    { value: "column", label: "Column Chart" },
    { value: "line", label: "Line Chart" },
    { value: "area", label: "Area Chart" },
    { value: "scatter", label: "Scatter Plot" },
    { value: "pie", label: "Pie Chart" },
    { value: "donut", label: "Donut Chart" },

    // Statistical charts
    { value: "timeSeries", label: "Time Series Line Chart" },
    { value: "histogram", label: "Histogram" },
    { value: "boxPlot", label: "Box Plot" },
    { value: "density", label: "Density Plot" },
    { value: "violin", label: "Violin Plot" },

    // Geographic charts
    { value: "choropleth", label: "Choropleth Map" },
    { value: "bubbleMap", label: "Bubble Map" },
    { value: "geoJson", label: "GeoJSON World Map" },

    // Hierarchy charts
    { value: "treemap", label: "Treemap" },
    { value: "sunburst", label: "Sunburst Chart" },
    { value: "circlePack", label: "Circle Packing" },

    // Network charts
    { value: "radialNetwork", label: "Radial Network" },
    { value: "chord", label: "Chord Diagram" },

    // Specialized charts
    { value: "radar", label: "Radar Chart" },
    { value: "circularBar", label: "Circular Barplot" },
    { value: "rose", label: "Rose Chart / Polar Area" },
    { value: "clock", label: "Clock Chart" },
    { value: "streamgraph", label: "Streamgraph" },
    { value: "heatmap", label: "Heatmap" },
    { value: "calendarHeatmap", label: "Calendar Heatmap" },
    { value: "parallel", label: "Parallel Coordinates" },
    { value: "bullet", label: "Bullet Chart" },
    { value: "waterfall", label: "Waterfall Chart" },
  ];

  const mapProjections = [
    { value: "geoMercator", label: "Mercator" },
    { value: "geoAlbers", label: "Albers" },
    { value: "geoAlbersUsa", label: "Albers USA" },
    { value: "geoAzimuthalEqualArea", label: "Azimuthal Equal Area" },
    { value: "geoAzimuthalEquidistant", label: "Azimuthal Equidistant" },
    { value: "geoConicConformal", label: "Conic Conformal" },
    { value: "geoConicEqualArea", label: "Conic Equal Area" },
    { value: "geoConicEquidistant", label: "Conic Equidistant" },
    { value: "geoEqualEarth", label: "Equal Earth" },
    { value: "geoEquirectangular", label: "Equirectangular" },
    { value: "geoGnomonic", label: "Gnomonic" },
    { value: "geoOrthographic", label: "Orthographic" },
    { value: "geoStereographic", label: "Stereographic" },
    { value: "geoTransverseMercator", label: "Transverse Mercator" },
  ];

  // Process CSV data when it changes
  const processedData = useMemo(() => {
    if (data.length === 0) return [];

    switch (chartType) {
      case "timeSeries":
        return data
          .map((d) => ({
            date: timeParse("%Y-%m-%d")(d[xAxis]) || new Date(d[xAxis]),
            value: +d[yAxis] || 0,
          }))
          .sort((a, b) => a.date - b.date);

      case "histogram":
        return histogram()
          .value((d) => +d[yAxis] || 0)
          .thresholds(20)(data);

      case "boxPlot":
        return [data.map((d) => +d[yAxis] || 0)];

      case "violin":
      case "density":
        return data.map((d) => +d[yAxis] || 0);

      case "heatmap":
        return data.map((d) => ({
          x: d[xAxis],
          y: headers.find((h) => h !== xAxis),
          value: +d[yAxis] || 0,
        }));

      case "radar":
        return headers
          .filter((h) => h !== xAxis)
          .map((header) => ({
            axis: header,
            value: mean(data, (d) => +d[header] || 0),
          }));

      case "parallel":
        return data;

      case "waterfall":
        return data.map((d, i) => ({
          name: d[xAxis],
          value: +d[yAxis] || 0,
          isTotal: i === data.length - 1,
        }));

      default:
        return data.map((d) => ({
          x: d[xAxis],
          y: +d[yAxis] || 0,
          ...d,
        }));
    }
  }, [data, chartType, xAxis, yAxis, headers]);

  // Handle file drops
  const { getRootProps: getCSVRootProps, getInputProps: getCSVInputProps } =
    useDropzone({
      accept: ".csv",
      onDrop: (acceptedFiles) => {
        if (acceptedFiles.length) parseCSV(acceptedFiles[0]);
      },
    });

  const { getRootProps: getGeoRootProps, getInputProps: getGeoInputProps } =
    useDropzone({
      accept: [".json", ".geojson", ".topojson"],
      onDrop: (acceptedFiles) => {
        if (acceptedFiles.length) parseGeoJSON(acceptedFiles[0]);
      },
    });

  // Parse CSV file
  const parseCSV = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const csvData = csvParse(reader.result);
      setData(csvData);
      const headers = Object.keys(csvData[0] || {});
      setHeaders(headers);

      if (headers.length > 0) {
        setXAxis(headers[0]);
        setYAxis(headers[1] || headers[0]);

        // For radar and parallel coordinates
        if (headers.length > 2) {
          setRadarAxes(headers.slice(1, 6));
          setParallelAxes(headers.slice(0, 5));
        }
      }
    };
    reader.readAsText(file);
  };

  // Parse GeoJSON file
  const parseGeoJSON = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const jsonData = JSON.parse(reader.result);
        if (jsonData.type === "Topology") {
          const objectName = Object.keys(jsonData.objects)[0];
          const geoJson = topojson.feature(
            jsonData,
            jsonData.objects[objectName]
          );
          setGeoData(geoJson);
        } else if (
          jsonData.type === "FeatureCollection" ||
          jsonData.type === "Feature"
        ) {
          setGeoData(jsonData);
        }
      } catch (e) {
        console.error("Error parsing GeoJSON:", e);
      }
    };
    reader.readAsText(file);
  };

  // Initialize tooltip
  useEffect(() => {
    if (!tooltipRef.current) {
      tooltipRef.current = select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0)
        .style("position", "absolute")
        .style("background", "white")
        .style("padding", "5px")
        .style("border", "1px solid #ccc")
        .style("border-radius", "5px")
        .style("pointer-events", "none");
    }
  }, []);

  // Main chart rendering effect
  useEffect(() => {
    if (data.length === 0 || !xAxis) return;

    const svg = select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous chart

    const margin = { top: 50, right: 50, bottom: 70, left: 60 };
    const width = dimensions.width - margin.left - margin.right;
    const height = dimensions.height - margin.top - margin.bottom;

    const chartGroup = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Draw the selected chart type
    switch (chartType) {
      case "bar":
      case "column":
        drawBarChart(chartGroup, processedData, width, height);
        break;
      case "line":
        drawLineChart(chartGroup, processedData, width, height);
        break;
      // case "area":
      //   drawAreaChart(chartGroup, processedData, width, height);
      //   break;
      case "scatter":
        drawScatterPlot(chartGroup, processedData, width, height);
        break;
      case "pie":
        drawPieChart(chartGroup, processedData, width, height);
        break;
      case "donut":
        drawDonutChart(chartGroup, processedData, width, height);
        break;
      // case "timeSeries":
      //   drawTimeSeries(chartGroup, processedData, width, height);
      //   break;
      // case "histogram":
      //   drawHistogram(chartGroup, processedData, width, height);
      //   break;
      case "boxPlot":
        drawBoxPlot(chartGroup, processedData, width, height);
        break;
      case "density":
        drawDensityPlot(chartGroup, processedData, width, height);
        break;
      case "violin":
        drawViolinPlot(chartGroup, processedData, width, height);
        break;
      case "choropleth":
      case "bubbleMap":
      case "geoJson":
        if (geoData) drawMap(chartGroup, geoData, width, height);
        break;
      case "treemap":
        drawTreemap(chartGroup, processedData, width, height);
        break;
      case "sunburst":
        drawSunburst(chartGroup, processedData, width, height);
        break;
      case "circlePack":
        drawCirclePacking(chartGroup, processedData, width, height);
        break;
      case "radialNetwork":
        drawRadialNetwork(chartGroup, processedData, width, height);
        break;
      case "chord":
        drawChordDiagram(chartGroup, processedData, width, height);
        break;
      case "radar":
        drawRadarChart(chartGroup, processedData, width, height);
        break;
      case "circularBar":
        drawCircularBarplot(chartGroup, processedData, width, height);
        break;
      case "rose":
        drawRoseChart(chartGroup, processedData, width, height);
        break;
      case "clock":
        drawClockChart(chartGroup, processedData, width, height);
        break;
      case "streamgraph":
        drawStreamgraph(chartGroup, processedData, width, height);
        break;
      case "heatmap":
        drawHeatmap(chartGroup, processedData, width, height);
        break;
      case "calendarHeatmap":
        drawCalendarHeatmap(chartGroup, processedData, width, height);
        break;
      case "parallel":
        drawParallelCoordinates(chartGroup, processedData, width, height);
        break;
      case "bullet":
        drawBulletChart(chartGroup, processedData, width, height);
        break;
      case "waterfall":
        drawWaterfallChart(chartGroup, processedData, width, height);
        break;
      default:
        drawBarChart(chartGroup, processedData, width, height);
    }

    // Add chart title
    svg
      .append("text")
      .attr("x", dimensions.width / 2)
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .text(`${chartTypes.find((c) => c.value === chartType).label}`);
  }, [
    data,
    chartType,
    xAxis,
    yAxis,
    color,
    dimensions,
    geoData,
    mapProjection,
    processedData,
  ]);

  // Chart drawing functions
  const drawBarChart = (group, data, width, height) => {
    const xScale = scaleBand()
      .domain(data.map((d) => d.x))
      .range([0, width])
      .padding(0.2);

    const yScale = scaleLinear()
      .domain([0, max(data, (d) => d.y)])
      .range([height, 0]);

    // Add axes
    group
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(axisBottom(xScale))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    group.append("g").call(axisLeft(yScale));

    // Draw bars
    group
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => xScale(d.x))
      .attr("y", (d) => yScale(d.y))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => height - yScale(d.y))
      .attr("fill", color)
      .on("mouseover", showTooltip)
      .on("mouseout", hideTooltip);
  };

  const drawLineChart = (group, data, width, height) => {
    const xScale = scaleBand()
      .domain(data.map((d) => d.x))
      .range([0, width])
      .padding(0.2);

    const yScale = scaleLinear()
      .domain([0, max(data, (d) => d.y)])
      .range([height, 0]);

    // Add axes
    group
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(axisBottom(xScale))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    group.append("g").call(axisLeft(yScale));

    // Draw line
    const lineGenerator = line()
      .x((d) => xScale(d.x) + xScale.bandwidth() / 2)
      .y((d) => yScale(d.y));

    group
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", color)
      .attr("stroke-width", 2)
      .attr("d", lineGenerator);

    // Add points
    group
      .selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d.x) + xScale.bandwidth() / 2)
      .attr("cy", (d) => yScale(d.y))
      .attr("r", 4)
      .attr("fill", color)
      .on("mouseover", showTooltip)
      .on("mouseout", hideTooltip);
  };

  const drawPieChart = (group, data, width, height) => {
    const radius = Math.min(width, height) / 2;
    const pieGenerator = pie().value((d) => d.y);
    const arcGenerator = arc().innerRadius(0).outerRadius(radius);

    const arcs = group
      .selectAll(".arc")
      .data(pieGenerator(data))
      .enter()
      .append("g")
      .attr("class", "arc")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    arcs
      .append("path")
      .attr("d", arcGenerator)
      .attr("fill", (d, i) => schemeCategory10[i % 10])
      .on("mouseover", (event, d) => {
        showTooltip(event, { x: d.data.x, y: d.data.y });
        select(event.currentTarget)
          .attr("stroke", "#000")
          .attr("stroke-width", 2);
      })
      .on("mouseout", (event) => {
        hideTooltip();
        select(event.currentTarget).attr("stroke", "none");
      });

    arcs
      .append("text")
      .attr("transform", (d) => `translate(${arcGenerator.centroid(d)})`)
      .attr("text-anchor", "middle")
      .text((d) => d.data.x)
      .style("font-size", "10px");
  };

  const drawDonutChart = (group, data, width, height) => {
    const radius = Math.min(width, height) / 2;
    const pieGenerator = pie().value((d) => d.y);
    const arcGenerator = arc()
      .innerRadius(radius * 0.6)
      .outerRadius(radius);

    const arcs = group
      .selectAll(".arc")
      .data(pieGenerator(data))
      .enter()
      .append("g")
      .attr("class", "arc")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    arcs
      .append("path")
      .attr("d", arcGenerator)
      .attr("fill", (d, i) => schemeCategory10[i % 10])
      .on("mouseover", (event, d) => {
        showTooltip(event, { x: d.data.x, y: d.data.y });
        select(event.currentTarget)
          .attr("stroke", "#000")
          .attr("stroke-width", 2);
      })
      .on("mouseout", (event) => {
        hideTooltip();
        select(event.currentTarget).attr("stroke", "none");
      });

    // Add center text
    group
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", ".3em")
      .attr("transform", `translate(${width / 2},${height / 2})`)
      .text("Total")
      .style("font-size", "12px");
  };

  const drawRadarChart = (group, data, width, height) => {
    const radius = (Math.min(width, height) / 2) * 0.8;
    const angleSlice = (Math.PI * 2) / data.length;

    // Scale for the radar
    const rScale = scaleLinear()
      .domain([0, max(data, (d) => d.value)])
      .range([0, radius]);

    // Create the radar chart background
    const levels = 5;
    for (let level = 0; level < levels; level++) {
      const levelFactor = radius * ((level + 1) / levels);

      group
        .append("path")
        .attr(
          "d",
          arc()({
            outerRadius: levelFactor,
            innerRadius: levelFactor,
            startAngle: 0,
            endAngle: Math.PI * 2,
          })
        )
        .attr("transform", `translate(${width / 2},${height / 2})`)
        .attr("fill", "#CDCDCD")
        .attr("fill-opacity", 0.1)
        .attr("stroke", "#CDCDCD");
    }

    // Draw axes
    data.forEach((d, i) => {
      const angle = angleSlice * i - Math.PI / 2;

      group
        .append("line")
        .attr("x1", width / 2)
        .attr("y1", height / 2)
        .attr("x2", width / 2 + Math.cos(angle) * radius)
        .attr("y2", height / 2 + Math.sin(angle) * radius)
        .attr("stroke", "#CDCDCD");

      // Add axis labels
      group
        .append("text")
        .attr("x", width / 2 + Math.cos(angle) * (radius + 10))
        .attr("y", height / 2 + Math.sin(angle) * (radius + 10))
        .text(d.axis)
        .style("font-size", "10px");
    });

    // Draw the radar
    const radarLine = lineRadial()
      .angle((d, i) => angleSlice * i - Math.PI / 2)
      .radius((d) => rScale(d.value))
      .curve(curveLinearClosed);

    group
      .append("path")
      .datum(data)
      .attr("d", radarLine)
      .attr("transform", `translate(${width / 2},${height / 2})`)
      .attr("fill", color)
      .attr("fill-opacity", 0.3)
      .attr("stroke", color)
      .attr("stroke-width", 2);
  };

  const drawHeatmap = (group, data, width, height) => {
    const xCategories = [...new Set(data.map((d) => d.x))];
    const yCategories = [...new Set(data.map((d) => d.y))];

    const xScale = scaleBand()
      .domain(xCategories)
      .range([0, width])
      .padding(0.05);

    const yScale = scaleBand()
      .domain(yCategories)
      .range([0, height])
      .padding(0.05);

    const colorScale = scaleSequential(interpolateBlues).domain([
      0,
      max(data, (d) => d.value),
    ]);

    // Draw cells
    group
      .selectAll()
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d.x))
      .attr("y", (d) => yScale(d.y))
      .attr("width", xScale.bandwidth())
      .attr("height", yScale.bandwidth())
      .attr("fill", (d) => colorScale(d.value))
      .attr("stroke", "#fff")
      .on("mouseover", showTooltip)
      .on("mouseout", hideTooltip);

    // Add axes
    group
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(axisBottom(xScale))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    group.append("g").call(axisLeft(yScale));
  };

  const drawWaterfallChart = (group, data, width, height) => {
    const xScale = scaleBand()
      .domain(data.map((d) => d.name))
      .range([0, width])
      .padding(0.2);

    const yScale = scaleLinear()
      .domain([
        0,
        max(data, (d) => {
          let sum = 0;
          for (let i = 0; i <= data.indexOf(d); i++) {
            sum += data[i].value;
          }
          return sum;
        }) * 1.1,
      ])
      .range([height, 0]);

    // Add axes
    group
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(axisBottom(xScale));

    group.append("g").call(axisLeft(yScale));

    // Draw bars
    let cumulative = 0;
    data.forEach((d, i) => {
      const barHeight = yScale(cumulative) - yScale(cumulative + d.value);
      const yPos = yScale(cumulative + d.value);

      group
        .append("rect")
        .attr("x", xScale(d.name))
        .attr("y", yPos)
        .attr("width", xScale.bandwidth())
        .attr("height", barHeight)
        .attr(
          "fill",
          d.isTotal ? "#4CAF50" : d.value >= 0 ? "#2196F3" : "#F44336"
        )
        .on("mouseover", showTooltip)
        .on("mouseout", hideTooltip);

      // Add connector lines
      if (i > 0 && !d.isTotal) {
        group
          .append("line")
          .attr("x1", xScale(data[i - 1].name) + xScale.bandwidth())
          .attr("y1", yScale(cumulative))
          .attr("x2", xScale(d.name))
          .attr("y2", yScale(cumulative))
          .attr("stroke", "#000")
          .attr("stroke-width", 1);
      }

      cumulative += d.value;
    });
  };

  // Tooltip functions
  const showTooltip = (event, d) => {
    tooltipRef.current.transition().duration(200).style("opacity", 0.9);
    tooltipRef.current
      .html(
        `<strong>${d.x || d.name || d.axis}</strong><br/>Value: ${
          d.y || d.value
        }`
      )
      .style("left", event.pageX + "px")
      .style("top", event.pageY - 28 + "px");
  };

  const hideTooltip = () => {
    tooltipRef.current.transition().duration(500).style("opacity", 0);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Advanced CSV to Chart Visualizer</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginBottom: "20px",
        }}
      >
        <div
          {...getCSVRootProps()}
          style={{
            border: "2px dashed #ccc",
            borderRadius: "4px",
            padding: "20px",
            textAlign: "center",
            cursor: "pointer",
          }}
        >
          <input {...getCSVInputProps()} />
          <p>Drag & drop a CSV file here, or click to select</p>
        </div>

        {(chartType === "choropleth" ||
          chartType === "bubbleMap" ||
          chartType === "geoJson") && (
          <div
            {...getGeoRootProps()}
            style={{
              border: "2px dashed #ccc",
              borderRadius: "4px",
              padding: "20px",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            <input {...getGeoInputProps()} />
            <p>Drag & drop a GeoJSON/TopoJSON file here</p>
          </div>
        )}
      </div>

      {data.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "300px 1fr",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          <div
            style={{
              background: "#f5f5f5",
              padding: "15px",
              borderRadius: "4px",
            }}
          >
            <h3>Chart Settings</h3>

            <div style={{ marginBottom: "15px" }}>
              <label>Chart Type:</label>
              <select
                value={chartType}
                onChange={(e) => setChartType(e.target.value)}
                style={{ width: "100%", padding: "8px" }}
              >
                {chartTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>X-Axis:</label>
              <select
                value={xAxis}
                onChange={(e) => setXAxis(e.target.value)}
                style={{ width: "100%", padding: "8px" }}
              >
                {headers.map((header) => (
                  <option key={header} value={header}>
                    {header}
                  </option>
                ))}
              </select>
            </div>

            {![
              "pie",
              "donut",
              "sunburst",
              "circlePack",
              "choropleth",
              "bubbleMap",
              "geoJson",
              "radar",
            ].includes(chartType) && (
              <div style={{ marginBottom: "15px" }}>
                <label>Y-Axis:</label>
                <select
                  value={yAxis}
                  onChange={(e) => setYAxis(e.target.value)}
                  style={{ width: "100%", padding: "8px" }}
                >
                  {headers.map((header) => (
                    <option key={header} value={header}>
                      {header}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div style={{ marginBottom: "15px" }}>
              <label>Color:</label>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                style={{ width: "100%" }}
              />
            </div>

            {(chartType === "choropleth" ||
              chartType === "bubbleMap" ||
              chartType === "geoJson") && (
              <div style={{ marginBottom: "15px" }}>
                <label>Map Projection:</label>
                <select
                  value={mapProjection}
                  onChange={(e) => setMapProjection(e.target.value)}
                  style={{ width: "100%", padding: "8px" }}
                >
                  {mapProjections.map((proj) => (
                    <option key={proj.value} value={proj.value}>
                      {proj.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div style={{ marginBottom: "15px" }}>
              <label>Width:</label>
              <input
                type="range"
                min="300"
                max="1200"
                value={dimensions.width}
                onChange={(e) =>
                  setDimensions({
                    ...dimensions,
                    width: parseInt(e.target.value),
                  })
                }
                style={{ width: "100%" }}
              />
              <span>{dimensions.width}px</span>
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Height:</label>
              <input
                type="range"
                min="200"
                max="1000"
                value={dimensions.height}
                onChange={(e) =>
                  setDimensions({
                    ...dimensions,
                    height: parseInt(e.target.value),
                  })
                }
                style={{ width: "100%" }}
              />
              <span>{dimensions.height}px</span>
            </div>
          </div>

          <div style={{ overflow: "auto" }}>
            <svg
              ref={svgRef}
              width={dimensions.width}
              height={dimensions.height}
              style={{ border: "1px solid #ddd", borderRadius: "4px" }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CSVChartVisualizer;
