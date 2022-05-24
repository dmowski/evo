document.addEventListener("DOMContentLoaded", () => {
  const charts = document.querySelectorAll(".chart");
  charts.forEach((chart, i) => {
    const name = `chart_${i + 1}`;
    const labels = chart.querySelector(".chart-labels").textContent.split(",");
    const values = chart.querySelectorAll(".chart-one-line");
    let valuesForChart = [];
    values.forEach((v) => {
      valuesForChart.push(v.textContent.split(","));
    });
    const radioGroup = chart.querySelectorAll(`input[name=${name}]`);
    const defaultCountDays = chart.querySelector(`input[name=${name}]:checked`).value;
    const ctxL = chart.querySelector(".line-chart").getContext("2d");
    radioGroup.forEach((input) => {
      input.addEventListener("change", (event) => {
        const currentCountDays = document.querySelector(`input[name=${name}]:checked`).value;
        changeChart(setDataForChart(labels, valuesForChart, currentCountDays), lineChart);
      });
    });
    const lineChart = newChart(setDataForChart(labels, valuesForChart, defaultCountDays), ctxL);
  });

  function setDataForChart(labels, valuesForChart, countDays) {
    return {
      labels: labels.slice(labels.length - countDays),
      values: valuesForChart.map((oneLineValue) =>
        oneLineValue.slice(oneLineValue.length - countDays)
      ),
    };
  }

  function setDataset(values) {
    let datasets = [];
    for (let i = 0; i < values.length; i++) {
      datasets.push({
        label: "Dataset",
        data: values[i],
        backgroundColor: ["rgba(105, 0, 132, .2)"],
        borderColor: [colors[i]],
        borderWidth: 2,
      });
    }
    return datasets;
  }

  function newChart({ labels, values }, ctxL) {
    const datasets = setDataset(values);
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

  function changeChart({ labels, values }, chart) {
    chart.data.datasets.pop();
    const datasets = setDataset(values);
    chart.data.labels = labels;
    chart.data.datasets = datasets;
    chart.update();
  }
});
