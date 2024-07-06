import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Modal } from "react-bootstrap"; // Import Modal from react-bootstrap
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);
  const [data5, setData5] = useState([]);
  const [data6, setData6] = useState([]);

  const [selectedDivision, setSelectedDivision] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [showDistrictModal, setShowDistrictModal] = useState(false);
  const [showSubDistrictModal, setShowSubDistrictModal] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/adminreport/reg/count_unsolved_solved_div/")
      .then((response) => response.json())
      .then((data) => {
        setData1(data);
        console.log("from bar Reg-----------", data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/adminreport/nonreg/count_unsolved_solved_div/")
      .then((response) => response.json())
      .then((data) => {
        setData2(data);
        console.log("from bar Non Reg-----------", data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleDivisionClick = (division) => {
    setSelectedDivision(division);
    fetchRegDistrictData(division);
    fetchNonRegDistrictData(division);
    setShowDistrictModal(true);
  };

  const handleDistrictClick = (district) => {
    setSelectedDistrict(district);
    fetchRegSubDistrictData(selectedDivision, district);
    fetchNonRegSubDistrictData(selectedDivision, district);
    setShowSubDistrictModal(true);
  };

  const fetchRegDistrictData = (division) => {
    fetch(
      `http://localhost:5000/adminreport/reg/count_unsolved_solved_district/${division}`
    )
      .then((response) => response.json())
      .then((data) => {
        setData3(data);
        console.log("from bar Reg district-----------", data);
      })
      .catch((error) => {
        console.error("Error fetching district data:", error);
      });
  };

  const fetchNonRegDistrictData = (division) => {
    fetch(
      `http://localhost:5000/adminreport/nonreg/count_unsolved_solved_district/${division}`
    )
      .then((response) => response.json())
      .then((data) => {
        setData4(data);
        console.log("from bar Non Reg district-----------", data);
      })
      .catch((error) => {
        console.error("Error fetching district data:", error);
      });
  };

  const fetchRegSubDistrictData = (division, district) => {
    fetch(
      `http://localhost:5000/adminreport/reg/count_unsolved_solved_subdistrict/${division}/${district}`
    ) // Corrected URL
      .then((response) => response.json())
      .then((data) => {
        setData5(data);
        console.log("from bar Reg subdistrict-----------", data);
      })
      .catch((error) => {
        console.error("Error fetching sub-district data:", error);
      });
  };

  const fetchNonRegSubDistrictData = (division, district) => {
    fetch(
      `http://localhost:5000/adminreport/nonreg/count_unsolved_solved_subdistrict/${division}/${district}`
    ) // Corrected URL
      .then((response) => response.json())
      .then((data) => {
        setData6(data);
        console.log("from bar NonReg subdistrict-----------", data);
      })
      .catch((error) => {
        console.error("Error fetching sub-district data:", error);
      });
  };

  const options_1 = {
    plugins: {
      title: {
        display: true,
        text: ["Registered Reports"],
        align: "center",
        color: "red",
        fullSize: false,
        position: "top",
        font: {
          size: 20,
          weight: "bold",
          family: "Arial",
          style: "italic",
        },
        padding: {
          top: 0,
          bottom: 5,
        },
      },
    },
    scales: {
      x: {
        title: {
          text: "Division",
          display: true,
          font: {
            size: 15,
            weight: "bold",
            family: "Arial",
            style: "italic",
          },
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  const options_2 = {
    plugins: {
      title: {
        display: true,
        text: ["Non Registered Reports"],
        align: "center",
        color: "red",
        fullSize: false,
        position: "top",
        font: {
          size: 20,
          weight: "bold",
          family: "Arial",
          style: "italic",
        },
        padding: {
          top: 0,
          bottom: 5,
        },
      },
    },
    scales: {
      x: {
        title: {
          text: "Division",
          display: true,
          font: {
            size: 15,
            weight: "bold",
            family: "Arial",
            style: "italic",
          },
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  const options_3 = {
    plugins: {
      title: {
        display: true,
        text: ["Registered Reports"],
        align: "center",
        color: "red",
        fullSize: false,
        position: "top",
        font: {
          size: 20,
          weight: "bold",
          family: "Arial",
          style: "italic",
        },
        padding: {
          top: 0,
          bottom: 5,
        },
      },
    },
    scales: {
      x: {
        title: {
          text: "District",
          display: true,
          font: {
            size: 15,
            weight: "bold",
            family: "Arial",
            style: "italic",
          },
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  const options_4 = {
    plugins: {
      title: {
        display: true,
        text: ["Non Registered Reports"],
        align: "center",
        color: "red",
        fullSize: false,
        position: "top",
        font: {
          size: 20,
          weight: "bold",
          family: "Arial",
          style: "italic",
        },
        padding: {
          top: 0,
          bottom: 5,
        },
      },
    },
    scales: {
      x: {
        title: {
          text: "District",
          display: true,
          font: {
            size: 15,
            weight: "bold",
            family: "Arial",
            style: "italic",
          },
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  const options_5 = {
    plugins: {
      title: {
        display: true,
        text: ["Registered Reports"],
        align: "center",
        color: "red",
        fullSize: false,
        position: "top",
        font: {
          size: 20,
          weight: "bold",
          family: "Arial",
          style: "italic",
        },
        padding: {
          top: 0,
          bottom: 5,
        },
      },
    },
    scales: {
      x: {
        title: {
          text: "Sub District",
          display: true,
          font: {
            size: 15,
            weight: "bold",
            family: "Arial",
            style: "italic",
          },
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  const options_6 = {
    plugins: {
      title: {
        display: true,
        text: ["Non Registered Reports"],
        align: "center",
        color: "red",
        fullSize: false,
        position: "top",
        font: {
          size: 20,
          weight: "bold",
          family: "Arial",
          style: "italic",
        },
        padding: {
          top: 0,
          bottom: 5,
        },
      },
    },
    scales: {
      x: {
        title: {
          text: "Sub District",
          display: true,
          font: {
            size: 15,
            weight: "bold",
            family: "Arial",
            style: "italic",
          },
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  const handleBarClickDivisionReg = (event, item) => {
    if (!item.length) return;
    const clickedDivision = data1[item[0].index].s_div;
    handleDivisionClick(clickedDivision);
  };

  const handleBarClickDivisionNonReg = (event, item) => {
    if (!item.length) return;
    const clickedDivision = data2[item[0].index].s_div;
    handleDivisionClick(clickedDivision);
  };

  const handleBarClickDistrictReg = (event, item) => {
    if (!item.length) return;
    const clickedDistrict = data3[item[0].index].s_dist;
    handleDistrictClick(clickedDistrict);
  };

  const handleBarClickDistrictNonReg = (event, item) => {
    if (!item.length) return;
    const clickedDistrict = data4[item[0].index].s_dist;
    handleDistrictClick(clickedDistrict);
  };

  return (
    <div style={{ display: "flex", marginTop: "60px" }}>
      <div style={{ flex: 1, marginRight: "20px" }}>
        {data1 && (
          <Bar
            data={{
              labels: data1.map((item) => item.s_div),
              datasets: [
                {
                  label: "Solved Reports",
                  backgroundColor: "rgba(75, 192, 192, 0.6)",
                  borderColor: "rgba(75, 192, 192, 1)",
                  borderWidth: 1,
                  data: data1.map((item) => item.solved_reports),
                },
                {
                  label: "Unsolved Reports",
                  backgroundColor: "rgba(255, 99, 132, 0.6)",
                  borderColor: "rgba(255, 99, 132, 1)",
                  borderWidth: 1,
                  data: data1.map((item) => item.unsolved_reports),
                },
              ],
            }}
            options={{
              ...options_1,
              maintainAspectRatio: false,
              aspectRatio: 2,
              onClick: handleBarClickDivisionReg, // Change the handleBarClick function to handleBarClickDivision
            }}
            height={400}
          />
        )}
      </div>

      <div style={{ flex: 1 }}>
        {data2 && (
          <Bar
            data={{
              labels: data2.map((item) => item.s_div),
              datasets: [
                {
                  label: "Solved Reports",
                  backgroundColor: "rgba(75, 192, 192, 0.6)",
                  borderColor: "rgba(75, 192, 192, 1)",
                  borderWidth: 1,
                  data: data2.map((item) => item.solved_reports),
                },
                {
                  label: "Unsolved Reports",
                  backgroundColor: "rgba(255, 99, 132, 0.6)",
                  borderColor: "rgba(255, 99, 132, 1)",
                  borderWidth: 1,
                  data: data2.map((item) => item.unsolved_reports),
                },
              ],
            }}
            options={{
              ...options_2,
              maintainAspectRatio: false,
              aspectRatio: 2,
              onClick: handleBarClickDivisionNonReg, // Change the handleBarClick function to handleBarClickDivision
            }}
            height={400}
          />
        )}
      </div>

      {/* Modal for District Report */}
      <Modal
        show={showDistrictModal}
        onHide={() => setShowDistrictModal(false)}
        size="lg"
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>District Data</Modal.Title>
        </Modal.Header>
        <Modal.Body className="report-modal-body">
          <h2>Districts of {selectedDivision} Division</h2>
          <div style={{ display: "flex" }}>
            <div style={{ flex: 1, marginRight: "20px" }}>
              {data3 && (
                <Bar
                  data={{
                    labels: data3.map((item) => item.s_dist),
                    datasets: [
                      {
                        label: "Solved Reports",
                        backgroundColor: "rgba(75, 192, 192, 0.6)",
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 1,
                        data: data3.map((item) => item.solved_reports),
                      },
                      {
                        label: "Unsolved Reports",
                        backgroundColor: "rgba(255, 99, 132, 0.6)",
                        borderColor: "rgba(255, 99, 132, 1)",
                        borderWidth: 1,
                        data: data3.map((item) => item.unsolved_reports),
                      },
                    ],
                  }}
                  options={{
                    ...options_3,
                    maintainAspectRatio: false,
                    aspectRatio: 2,
                    onClick: handleBarClickDistrictReg, // Change the handleBarClick function to handleBarClickDivision
                  }}
                  height={400}
                />
              )}
            </div>

            <div style={{ flex: 1 }}>
              {data4 && (
                <Bar
                  data={{
                    labels: data4.map((item) => item.s_dist),
                    datasets: [
                      {
                        label: "Solved Reports",
                        backgroundColor: "rgba(75, 192, 192, 0.6)",
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 1,
                        data: data4.map((item) => item.solved_reports),
                      },
                      {
                        label: "Unsolved Reports",
                        backgroundColor: "rgba(255, 99, 132, 0.6)",
                        borderColor: "rgba(255, 99, 132, 1)",
                        borderWidth: 1,
                        data: data4.map((item) => item.unsolved_reports),
                      },
                    ],
                  }}
                  options={{
                    ...options_4,
                    maintainAspectRatio: false,
                    aspectRatio: 2,
                    onClick: handleBarClickDistrictNonReg, // Change the handleBarClick function to handleBarClickDivision
                  }}
                  height={400}
                />
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Modal for Sub District Report */}
      <Modal
        show={showSubDistrictModal}
        onHide={() => setShowSubDistrictModal(false)}
        size="lg"
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Sub District Data</Modal.Title>
        </Modal.Header>
        <Modal.Body className="report-modal-body">
          <h2>Sub Districts of {selectedDistrict} District</h2>
          <div style={{ display: "flex" }}>
            <div style={{ flex: 1, marginRight: "20px" }}>
              {data5 && (
                <Bar
                  data={{
                    labels: data5.map((item) => item.s_subdist),
                    datasets: [
                      {
                        label: "Solved Reports",
                        backgroundColor: "rgba(75, 192, 192, 0.6)",
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 1,
                        data: data5.map((item) => item.solved_reports),
                      },
                      {
                        label: "Unsolved Reports",
                        backgroundColor: "rgba(255, 99, 132, 0.6)",
                        borderColor: "rgba(255, 99, 132, 1)",
                        borderWidth: 1,
                        data: data5.map((item) => item.unsolved_reports),
                      },
                    ],
                  }}
                  options={{
                    ...options_5,
                    maintainAspectRatio: false,
                    aspectRatio: 2,
                    // ,onClick: handleBarClickDistrictReg // Change the handleBarClick function to handleBarClickDivision
                  }}
                  height={400}
                />
              )}
            </div>

            <div style={{ flex: 1 }}>
              {data6 && (
                <Bar
                  data={{
                    labels: data6.map((item) => item.s_subdist),
                    datasets: [
                      {
                        label: "Solved Reports",
                        backgroundColor: "rgba(75, 192, 192, 0.6)",
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 1,
                        data: data6.map((item) => item.solved_reports),
                      },
                      {
                        label: "Unsolved Reports",
                        backgroundColor: "rgba(255, 99, 132, 0.6)",
                        borderColor: "rgba(255, 99, 132, 1)",
                        borderWidth: 1,
                        data: data6.map((item) => item.unsolved_reports),
                      },
                    ],
                  }}
                  options={{
                    ...options_6,
                    maintainAspectRatio: false,
                    aspectRatio: 2,
                    // ,onClick: handleBarClickDistrictNonReg // Change the handleBarClick function to handleBarClickDivision
                  }}
                  height={400}
                />
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default BarChart;

// import React, { useState, useEffect } from 'react';
// import { Bar } from "react-chartjs-2";
// import { Chart, CategoryScale, LinearScale, BarController, BarElement, Title, Tooltip, Legend } from "chart.js";

// Chart.register(CategoryScale, LinearScale, BarController, BarElement, Title, Tooltip, Legend);

// const BarChart = () => {
//   const [data1, setData1] = useState(null);
//   const [data2, setData2] = useState(null);

//   useEffect(() => {
//     fetch('http://localhost:5000/adminreport/reg/count_unsolved_solved_div/')
//       .then(response => response.json())
//       .then(data => {
//         setData1(data);
//         console.log("from bar Reg-----------",data);
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//       });
//   }, []);

//   useEffect(() => {
//     fetch('http://localhost:5000/adminreport/nonreg/count_unsolved_solved_div/')
//       .then(response => response.json())
//       .then(data => {
//         setData2(data);
//         console.log("from bar Non Reg-----------",data);
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//       });
//   }, []);

//   const options = {
//     scales: {
//       y: {
//         beginAtZero: true,
//       },
//     },
//   };

//   return (
//     <div style={{ display: "flex" }}>
//       <div style={{ flex: 1, marginRight: "20px" }}>
//         {data1 && <Bar data={{
//           labels: data1.map(item => item.s_div),
//           datasets: [
//             {
//               label: 'Solved Reports (Registered)',
//               backgroundColor: 'rgba(75, 192, 192, 0.6)',
//               borderColor: 'rgba(75, 192, 192, 1)',
//               borderWidth: 1,
//               data: data1.map(item => item.solved_reports),
//             },
//             {
//               label: 'Unsolved Reports (Registered)',
//               backgroundColor: 'rgba(255, 99, 132, 0.6)',
//               borderColor: 'rgba(255, 99, 132, 1)',
//               borderWidth: 1,
//               data: data1.map(item => item.unsolved_reports),
//             },
//           ],
//         }} options={options} />}
//       </div>
//       <div style={{ flex: 1 }}>
//         {data2 && <Bar data={{
//           labels: data2.map(item => item.s_div),
//           datasets: [
//             {
//               label: 'Solved Reports (Non-registered)',
//               backgroundColor: 'rgba(255, 205, 86, 0.6)',
//               borderColor: 'rgba(255, 205, 86, 1)',
//               borderWidth: 1,
//               data: data2.map(item => item.solved_reports),
//             },
//             {
//               label: 'Unsolved Reports (Non-registered)',
//               backgroundColor: 'rgba(54, 162, 235, 0.6)',
//               borderColor: 'rgba(54, 162, 235, 1)',
//               borderWidth: 1,
//               data: data2.map(item => item.unsolved_reports),
//             },
//           ],
//         }} options={options} />}
//       </div>
//     </div>
//   );
// };

// export default BarChart;

// import { useState, useEffect } from 'react';
// import { Bar } from "react-chartjs-2";
// import { Chart as ChartJS, CategoryScale, LinearScale, BarController, BarElement, Title, Tooltip, Legend } from "chart.js";

// ChartJS.register(CategoryScale, LinearScale, BarController, BarElement, Title, Tooltip, Legend);

// const BarChart = () => {
//   const [data1, setData1] = useState([]);
//   const [dummy1, setDummy1] = useState([]);
//   const [dummy2, setDummy2] = useState([]);
//   const [data2, setData2] = useState(null);

//   const [data3, setData3] = useState(null);
//   const [data4, setData4] = useState(null);

//   // const [data5, setData5] = useState(null);
//   // const [data6, setData6] = useState(null);

//   const [selectedDivision, setSelectedDivision] = useState(null);
//   // const [selectedDistrict, setSelectedDistrict] = useState(null);

//   const [showDistrictModal, setShowDistrictModal] = useState(false);
//   // const [showSubDistrictModal, setShowSubDistrictModal] = useState(false);

//   useEffect(() => {
//     fetch('http://localhost:5000/adminreport/reg/count_unsolved_solved_div/')
//       .then(response => response.json())
//       .then(data => {
//         // Process data here
//         setDummy1(data);
//         setData1(processData1(data));
//         console.log("from bar Reg-----------",data);
//         // setData2(processData2(data));
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//       });
//   }, []);

//   useEffect(() => {
//     fetch('http://localhost:5000/adminreport/nonreg/count_unsolved_solved_div/')
//       .then(response => response.json())
//       .then(data => {
//         console.log("from bar Non Reg-----------",data);
//         // Process data here
//         // setData1(processData1(data));
//         setDummy2(data);
//         setData2(processData2(data));
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//       });
//   }, []);

//   const handleDivisionClick = (division) => {
//     setSelectedDivision(division);
//     // Fetch district data based on the selected division
//     fetchRegDistrictData(division);
//     fetchNonRegDistrictData(division);
//   };

//   const fetchRegDistrictData = (division) => {
//     fetch(`http://localhost:5000/adminreport/reg/count_unsolved_solved_district/${division}`)
//       .then(response => response.json())
//       .then(data => {
//         setData3(processData3(data));
//         console.log("from bar Reg district-----------",data);
//         setShowDistrictModal(true);
//       })
//       .catch(error => {
//         console.error('Error fetching district data:', error);
//       });
//   };

//   const fetchNonRegDistrictData = (division) => {
//     fetch(`http://localhost:5000/adminreport/nonreg/count_unsolved_solved_district/${division}`)
//       .then(response => response.json())
//       .then(data => {
//         setData4(processData4(data));
//         console.log("from bar Reg district-----------",data);
//         setShowDistrictModal(true);
//       })
//       .catch(error => {
//         console.error('Error fetching district data:', error);
//       });
//   };

//   // const handleNonRegDivisionClick = (division) => {
//   //   // Fetch data for the districts of the clicked division
//   //   fetch(`http://localhost:5000/adminreport/${division}/count_unsolved_solved_district/`)
//   //     .then(response => response.json())
//   //     .then(data => {
//   //       // Process data here for districts
//   //       setData3(processDataDistricts(data));
//   //       setSelectedDivision(division);
//   //       setShowDistrictModal(true);
//   //     })
//   //     .catch(error => {
//   //       console.error('Error fetching data for districts:', error);
//   //     });
//   // };

//   // const handleDistrictClick = (district) => {
//   //   // Fetch data for the sub-districts of the clicked district
//   //   fetch(`http://localhost:5000/adminreport/${district}/count_unsolved_solved_subdistrict/`)
//   //     .then(response => response.json())
//   //     .then(data => {
//   //       // Process data here for sub-districts
//   //       setData5(processDataSubDistricts(data));
//   //       setSelectedDistrict(district);
//   //       setShowSubDistrictModal(true);
//   //     })
//   //     .catch(error => {
//   //       console.error('Error fetching data for sub-districts:', error);
//   //     });
//   // };

//   const processData1 = data => {
//     // Process data for data1 (Registered Reports)
//     // Example: Extract labels and counts for solved and unsolved reports
//     const labels = data.map(item => item.s_div);
//     const solvedCounts = data.map(item => item.solved_reports);
//     const unsolvedCounts = data.map(item => item.unsolved_reports);

//     return {
//       labels: labels,
//       datasets: [
//         {
//           label: 'Solved Reports',
//           backgroundColor: 'rgba(75, 192, 192, 0.6)',
//           borderColor: 'rgba(75, 192, 192, 1)',
//           borderWidth: 1,
//           data: solvedCounts,
//         },
//         {
//           label: 'Unsolved Reports',
//           backgroundColor: 'rgba(255, 99, 132, 0.6)',
//           borderColor: 'rgba(255, 99, 132, 1)',
//           borderWidth: 1,
//           data: unsolvedCounts,
//         },
//       ],
//     };
//   };

//   const processData2 = data => {
//     // Process data for data2 (Non-registered Reports)
//     // Example: Extract labels and counts for solved and unsolved reports
//     const labels = data.map(item => item.s_div);
//     const solvedCounts = data.map(item => item.solved_reports);
//     const unsolvedCounts = data.map(item => item.unsolved_reports);

//     return {
//       labels: labels,
//       datasets: [
//         {
//           label: 'Solved Reports',
//           backgroundColor: 'rgba(255, 205, 86, 0.6)',
//           borderColor: 'rgba(255, 205, 86, 1)',
//           borderWidth: 1,
//           data: solvedCounts,
//         },
//         {
//           label: 'Unsolved Reports',
//           backgroundColor: 'rgba(54, 162, 235, 0.6)',
//           borderColor: 'rgba(54, 162, 235, 1)',
//           borderWidth: 1,
//           data: unsolvedCounts,
//         },
//       ],
//     };
//   };

//   const processData3 = data => {
//     // Process data for data1 (Registered Reports)
//     // Example: Extract labels and counts for solved and unsolved reports
//     const labels = data.map(item => item.s_div);
//     const solvedCounts = data.map(item => item.solved_reports);
//     const unsolvedCounts = data.map(item => item.unsolved_reports);

//     return {
//       labels: labels,
//       datasets: [
//         {
//           label: 'Solved Reports',
//           backgroundColor: 'rgba(75, 192, 192, 0.6)',
//           borderColor: 'rgba(75, 192, 192, 1)',
//           borderWidth: 1,
//           data: solvedCounts,
//         },
//         {
//           label: 'Unsolved Reports',
//           backgroundColor: 'rgba(255, 99, 132, 0.6)',
//           borderColor: 'rgba(255, 99, 132, 1)',
//           borderWidth: 1,
//           data: unsolvedCounts,
//         },
//       ],
//     };
//   };

//   const processData4 = data => {
//     // Process data for data2 (Non-registered Reports)
//     // Example: Extract labels and counts for solved and unsolved reports
//     const labels = data.map(item => item.s_div);
//     const solvedCounts = data.map(item => item.solved_reports);
//     const unsolvedCounts = data.map(item => item.unsolved_reports);

//     return {
//       labels: labels,
//       datasets: [
//         {
//           label: 'Solved Reports',
//           backgroundColor: 'rgba(255, 205, 86, 0.6)',
//           borderColor: 'rgba(255, 205, 86, 1)',
//           borderWidth: 1,
//           data: solvedCounts,
//         },
//         {
//           label: 'Unsolved Reports',
//           backgroundColor: 'rgba(54, 162, 235, 0.6)',
//           borderColor: 'rgba(54, 162, 235, 1)',
//           borderWidth: 1,
//           data: unsolvedCounts,
//         },
//       ],
//     };
//   };

//   const options_1 = {
//     plugins: {
//        title: {
//         display: true,
//         text: ['Registered Reports'],
//         align: 'center',
//         color: 'red',
//         fullSize: false,
//         position: 'top',
//         font: {
//           size: 20,
//           weight: 'bold',
//           family: 'Arial',
//           style: 'italic'
//         },
//         padding: {
//           top: 0,
//           bottom: 5
//         }
//       }
//     },
//     scales: {

//       x: {
//         title:{
//           text: 'Division',
//           display: true,
//           // color: 'black',
//           font: {
//             size: 15,
//             weight: 'bold',
//             family: 'Arial',
//             style: 'italic'
//           },
//         }
//       },
//       y: {
//         beginAtZero: true,
//       },
//     },
//   };

//   const options_2 = {
//     plugins: {
//        title: {
//         display: true,
//         text: ['Non-registered Reports'],
//         align: 'center',
//         color: 'red',
//         fullSize: false,
//         position: 'top',
//         font: {
//           size: 20,
//           weight: 'bold',
//           family: 'Arial',
//           style: 'italic'
//         },
//         padding: {
//           top: 0,
//           bottom: 5
//         }
//       }
//     },
//     scales: {
//       x: {
//         title:{
//           text: 'Division',
//           display: true,
//           // color: 'black',
//           font: {
//             size: 15,
//             weight: 'bold',
//             family: 'Arial',
//             style: 'italic'
//           },
//         }
//       },
//       y: {
//         beginAtZero: true,
//       },
//     },
//   };

//   return (
//     <div style={{ display: "flex" }}>
//   {dummy1 && dummy1.map((item, index) => (
//     <div key={index} style={{ flex: 1, marginRight: "20px" }} onClick={() => handleDivisionClick(item.s_div)}>
//       <Bar data={data1} options={{ ...options_1, maintainAspectRatio: false, aspectRatio: 2 }} height={400} />
//     </div>
//   ))}
//   {dummy2 && dummy2.map((item, index) => (
//     <div key={index} style={{ flex: 1 }} onClick={() => handleDivisionClick(item.s_div)}>
//       <Bar data={data2} options={{ ...options_2, maintainAspectRatio: false, aspectRatio: 2 }} height={400} />
//     </div>
//   ))}
//   {/* Modal for displaying district charts */}
//   {showDistrictModal && (
//     <div className="modal">
//       <div className="modal-content">
//         <span className="close" onClick={() => setShowDistrictModal(false)}>&times;</span>
//         <h2>Districts of {selectedDivision}</h2>
//         <div style={{ display: "flex" }}>
//           <div style={{ flex: 1, marginRight: "20px" }} >
//             {data3 && <Bar data={data3} options={{ ...options_2, maintainAspectRatio: false, aspectRatio: 2 }} height={400} />}
//           </div>
//           <div style={{ flex: 1 }}>
//             {data4 && <Bar data={data4} options={{ ...options_2, maintainAspectRatio: false, aspectRatio: 2 }} height={400} />}
//           </div>
//         </div>
//       </div>
//     </div>
//   )}
// </div>

//   );

// };

// export default BarChart;

// import { useState, useEffect } from 'react';
// import { Bar } from "react-chartjs-2";
// import { Chart as ChartJS, CategoryScale, LinearScale, BarController, BarElement, Title, Tooltip, Legend } from "chart.js";

// ChartJS.register(CategoryScale, LinearScale, BarController, BarElement, Title, Tooltip, Legend);

// const BarChart = () => {
//   const [data1, setData1] = useState(null);
//   const [data2, setData2] = useState(null);

//   useEffect(() => {
//     fetch('http://localhost:5000/adminreport/reg/count_unsolved_solved_div/')
//       .then(response => response.json())
//       .then(data => {
//         // Process data here
//         setData1(processData1(data));
//         console.log("from bar Reg-----------",data);
//         // setData2(processData2(data));
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//       });
//   }, []);

//   useEffect(() => {
//     fetch('http://localhost:5000/adminreport/nonreg/count_unsolved_solved_div/')
//       .then(response => response.json())
//       .then(data => {
//         console.log("from bar Non Reg-----------",data);
//         // Process data here
//         // setData1(processData1(data));
//         setData2(processData2(data));
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//       });
//   }, []);

//   const processData1 = data => {
//     // Process data for data1 (Registered Reports)
//     // Example: Extract labels and counts for solved and unsolved reports
//     const labels = data.map(item => item.s_div);
//     const solvedCounts = data.map(item => item.solved_reports);
//     const unsolvedCounts = data.map(item => item.unsolved_reports);

//     return {
//       labels: labels,
//       datasets: [
//         {
//           label: 'Solved Reports (Registered)',
//           backgroundColor: 'rgba(75, 192, 192, 0.6)',
//           borderColor: 'rgba(75, 192, 192, 1)',
//           borderWidth: 1,
//           data: solvedCounts,
//         },
//         {
//           label: 'Unsolved Reports (Registered)',
//           backgroundColor: 'rgba(255, 99, 132, 0.6)',
//           borderColor: 'rgba(255, 99, 132, 1)',
//           borderWidth: 1,
//           data: unsolvedCounts,
//         },
//       ],
//     };
//   };

//   const processData2 = data => {
//     // Process data for data2 (Non-registered Reports)
//     // Example: Extract labels and counts for solved and unsolved reports
//     const labels = data.map(item => item.s_div);
//     const solvedCounts = data.map(item => item.solved_reports);
//     const unsolvedCounts = data.map(item => item.unsolved_reports);

//     return {
//       labels: labels,
//       datasets: [
//         {

//           label: 'Solved Reports (Non-registered)',
//           backgroundColor: 'rgba(255, 205, 86, 0.6)',
//           borderColor: 'rgba(255, 205, 86, 1)',
//           borderWidth: 1,
//           data: solvedCounts,
//         },
//         {
//           label: 'Unsolved Reports (Non-registered)',
//           backgroundColor: 'rgba(54, 162, 235, 0.6)',
//           borderColor: 'rgba(54, 162, 235, 1)',
//           borderWidth: 1,
//           data: unsolvedCounts,
//         },
//       ],
//     };
//   };

//   const options = {
//     scales: {
//       y: {
//         beginAtZero: true,
//       },
//     },
//   };

//   return (
//     <div style={{ display: "flex" }}>
//       <div style={{ flex: 1, marginRight: "20px" }}>
//         {data1 && <Bar data={data1} options={options} />}
//       </div>
//       <div style={{ flex: 1 }}>
//         {data2 && <Bar data={data2} options={options} />}
//       </div>
//     </div>
//   );
// };

// export default BarChart;

// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarController,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// } from "chart.js";

// ChartJS.register(
//   Title,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   BarController
// );

// const BarChart = () => {
//   const data = {
//     labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'],
//     datasets: [
//       {
//         label: 'Solved Reports (Registered)',
//         backgroundColor: 'rgba(75, 192, 192, 0.6)',
//         borderColor: 'rgba(75, 192, 192, 1)',
//         borderWidth: 1,
//         data: [10, 15, 8, 12, 5],
//       },
//       {
//         label: 'Unsolved Reports (Registered)',
//         backgroundColor: 'rgba(255, 99, 132, 0.6)',
//         borderColor: 'rgba(255, 99, 132, 1)',
//         borderWidth: 1,
//         data: [2, 4, 1, 3, 1],
//       },
//     ],
//   };

//   const data2 = {
//     labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'],
//     datasets: [
//       {
//         label: 'Solved Reports (Non-registered)',
//         backgroundColor: 'rgba(255, 205, 86, 0.6)',
//         borderColor: 'rgba(255, 205, 86, 1)',
//         borderWidth: 1,
//         data: [8, 10, 5, 7, 3],
//       },
//       {
//         label: 'Unsolved Reports (Non-registered)',
//         backgroundColor: 'rgba(54, 162, 235, 0.6)',
//         borderColor: 'rgba(54, 162, 235, 1)',
//         borderWidth: 1,
//         data: [1, 3, 2, 1, 2],
//       },
//     ],
//   };

//   const options = {
//     scales: {
//       y: {
//         beginAtZero: true,
//       },
//     },
//   };

//   return (
//     <div style={{ display: "flex" }}>
//       <div style={{ flex: 1, marginRight: "20px" }}>
//         <Bar data={data} options={options} />
//       </div>
//       <div style={{ flex: 1 }}>
//         <Bar data={data2} options={options} />
//       </div>
//     </div>
//   );
// };

// export default BarChart;
