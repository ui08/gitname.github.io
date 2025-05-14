// import React from 'react';
// import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

// const data = [
//   { name: 'Net AUM', value: 20.99 },
//   { name: 'Held AUM', value: 10.99 },
//   { name: 'Held Away', value: 10.00 },
// ];

// const COLORS = ['#0088FE', '#FFBB28', '#FF8042'];

// function AUMChart() {
//   return (
//     <ResponsiveContainer width="100%" height={200}>
//       <PieChart>
//         <Pie
//           data={data}
//           cx="50%"
//           cy="50%"
//           innerRadius={60}
//           outerRadius={80}
//           fill="#8884d8"
//           paddingAngle={5}
//           dataKey="value"
//         >
//           {data.map((entry, index) => (
//             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//           ))}
//         </Pie>
//         <Tooltip />
//       </PieChart>
//     </ResponsiveContainer>
//   );
// }

// export default AUMChart;


import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Card, Container, Row, Col } from 'react-bootstrap';
import 'chart.js/auto';

const AUMChart = () => {
  // Static data
  const aumData = {
    netAUM: 20.99,
    holdAUM: 10.99,
    heldAwayAUM: 10.00,
  };

  // Data for the Doughnut chart
  const data = {
    labels: ['Net AUM', 'Hold AUM', 'Held Away AUM'],
    datasets: [
      {
        data: [aumData.netAUM, aumData.holdAUM, aumData.heldAwayAUM],
        backgroundColor: ['#8B5CF6', '#FCD34D', '#F87171'],
        hoverBackgroundColor: ['#7C3AED', '#FBBF24', '#F87171'],
        borderWidth: 0,
        cutout: '75%',
        rotation: -90,
        circumference: 180,
      },
    ],
  };

  // Chart options
  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    rotation: -90,
    circumference: 180,
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>AUM</Card.Title>
              <Doughnut data={data} options={options} />
              <div className="d-flex justify-content-around">
                <div className="text-center">
                  <p>Net AUM{data.datasets.backgroundColor}</p>
                  <h5>{aumData.netAUM} Cr</h5>
                </div>
                <div className="text-center">
                  <p>Hold AUM</p>
                  <h5>{aumData.holdAUM} Cr</h5>
                </div>
                <div className="text-center">
                  <p>Held Away AUM</p>
                  <h5>{aumData.heldAwayAUM} Cr</h5>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AUMChart;
