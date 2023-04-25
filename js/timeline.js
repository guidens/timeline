// Load the data from a JSON file or API endpoint
d3.json('data/data.json').then(function(data) {
  console.log("Loaded JSON");
  
  // Filter the data to keep only events within the time range
  const filteredData = data.filter(function(d) {
  const date = new Date(d.date);
  return date.getHours() === 19 && date.getMinutes() >= 30 ||
  date.getHours() === 20 && date.getMinutes() <= 00;
  });
  console.log("Filtered data:", filteredData);
  
  // Create a D3 scale for mapping data.type to colors
  const colorScale = d3.scaleOrdinal()
  .domain([
  'ENTERED_STORE',
  'CART_INITIALIZED',
  'PRODUCT_ADDED_TO_CART',
  'MESSAGE_SENT',
  'LIKE_BUTTON',
  'CLICK_FEATURED',
  'CHECKOUT_STARTED'
  ])
  .range(['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']);
  console.log("Color scale created:", colorScale);
  
  // Create a D3 scale for mapping time to horizontal position
  const xScale = d3.scaleTime()
  .domain([new Date('2023-04-17T19:30:00Z'), new Date('2023-04-17T20:00:00Z')])
  .range([0, 800]);
  console.log("X scale created:", xScale);
  
  // Create a D3 SVG element for the timeline
  const svg = d3.select('#timeline')
  .append('svg')
  .attr('width', 900)
  .attr('height', 100);
  console.log("SVG element created:", svg);
  
  // Add circles to the SVG for each data point
  svg.selectAll('circle')
  .data(filteredData)
  .enter()
  .append('circle')
  .attr('cx', function(d) { return xScale(new Date(d.date)); })
  .attr('cy', 50)
  .attr('r', 10)
  .attr('fill', function(d) { return colorScale(d.data.type); });
  console.log("Circles added to SVG");
  });