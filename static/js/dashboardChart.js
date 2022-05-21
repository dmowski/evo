const formatData = (number) => {
  return number < 10 ? `0${number}` : `${number}`;
};
const getDataForChart = () => {
  let data = [];
  const startData = new Date();
  for (let i = 0; i < 90; i++) {
    const nextDay = new Date(startData);
    nextDay.setDate(nextDay.getDate() - i);
    const day = formatData(nextDay.getDate());
    const month = formatData(nextDay.getMonth());
    data.push({ label: `${day}/${month}`, values: [Math.random(), Math.random()] });
  }
  return data.reverse();
};
const dataForChart = [getDataForChart(), getDataForChart(), getDataForChart()];
////////////////////
const colors = ["rgba(254, 95, 85, 1)", "rgba(95, 211, 234, 1)"];
const charts = document.querySelectorAll(".chart");
charts.forEach((chart, i) => {
  const name = `chart_${i + 1}`;
  const radioGroup = chart.querySelectorAll(`input[name=${name}]`);
  const defaultCountDays = chart.querySelector(`input[name=${name}]:checked`).value;
  const ctxL = chart.querySelector(".line-chart").getContext("2d");
  radioGroup.forEach((input) => {
    input.addEventListener("change", (event) => {
      const currentCountDays = document.querySelector(`input[name=${name}]:checked`).value;
      changeChart(dataForChart[i].slice(dataForChart[i].length - currentCountDays), lineChart);
    });
  });
  const lineChart = newChart(
    dataForChart[i].slice(dataForChart[i].length - defaultCountDays),
    ctxL
  );
});
function newChart(data, ctxL) {
  const { labels, datasets } = treatmentData(data);
  return new Chart(ctxL, {
    type: "line",
    data: {
      labels,
      datasets,
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
      },
      elements: {
        line: {
          tension: 0.3,
        },
      },
    },
  });
}

const changeChart = (dataForChart, chart) => {
  chart.data.datasets.pop();
  const { labels, datasets } = treatmentData(dataForChart);
  chart.data.labels = labels;
  chart.data.datasets = datasets;
  chart.update();
};

function treatmentData(data) {
  const labels = data.map((data) => data.label);
  const values = data.map((data) => data.values);
  let datasets = [];
  for (let i = 0; i < values[0].length; i++) {
    datasets.push({
      label: "My First dataset",
      data: values.map((v) => v[i]),
      backgroundColor: ["rgba(105, 0, 132, .2)"],
      borderColor: [colors[i]],
      borderWidth: 2,
    });
  }
  return {
    labels,
    datasets,
  };
}
