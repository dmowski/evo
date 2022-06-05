document.addEventListener("DOMContentLoaded", () => {
  const datePickers = document.querySelectorAll("input[type='date']");
  datePickers.forEach((datePicker) => {
    const currentDate = new Date().toISOString().split("T")[0];
    datePicker.max = currentDate;
    datePicker.value = currentDate;
  });
  const colors = [
    "rgba(254, 95, 85, 1)",
    "rgba(95, 211, 234, 1)",
    "rgb(238, 130, 238)",
    "rgb(60, 179, 113)",
    "rgb(255, 165, 0)",
  ];
  const chatUrl = "/api/v1/chart.get";

  async function fetchData(start, end, linesNames) {
    const requestData = {
      data: {
        start,
        end,
        linesNames: linesNames,
      },
    };
    console.log(requestData);
    const response = await fetch(chatUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });
    const responseData = await response.json();
    console.log(responseData);
    return responseData;
  }

  const charts = document.querySelectorAll(".chart");
  charts.forEach(async (chart, i) => {
    const indicatorName = `indicator_${i + 1}`;

    const listLines = chart.querySelectorAll(".line-name");
    const linesNames = [];
    listLines.forEach((l) => linesNames.push(l.getAttribute("value")));

    const dataPickerEnd = chart.querySelector("input[name='end']");
    const dataPickerStart = chart.querySelector("input[name='start']");

    let endDate = new Date(dataPickerEnd.value);
    const currentDateForStart = new Date();
    currentDateForStart.setMonth(currentDateForStart.getMonth() - 3);
    dataPickerStart.max = currentDateForStart.toISOString().split("T")[0];
    updateDate(endDate);

    dataPickerStart.addEventListener("change", async (event) => {
      endDate = new Date(event.target.value);
      endDate.setMonth(endDate.getMonth() + 3);
      dataPickerEnd.value = endDate.toISOString().split("T")[0];
      updateDate(endDate);
      dataResponse = await fetchData(dataPickerStart.value, dataPickerEnd.value, linesNames);
      changeChart(lineChart);
    });

    dataPickerEnd.addEventListener("change", async (event) => {
      endDate = new Date(event.target.value);
      updateDate(endDate);
      dataResponse = await fetchData(dataPickerStart.value, dataPickerEnd.value, linesNames);
      changeChart(lineChart);
    });

    let dataResponse = await fetchData(dataPickerStart.value, dataPickerEnd.value, linesNames);
    const countLines = Object.keys(dataResponse.chart[0].lines).length;

    const indicators = document.querySelectorAll(`input[name=${indicatorName}]`);
    let currentIndicatorValue = document.querySelector(
      `input[name=${indicatorName}]:checked`
    ).value;
    indicators.forEach((input) => {
      input.addEventListener("change", (event) => {
        currentIndicatorValue = document.querySelector(
          `input[name=${indicatorName}]:checked`
        ).value;
        changeChart(lineChart);
      });
    });

    let labelsAndValues = getLabelsAndValues(
      dataResponse.chart,
      countLines,
      currentIndicatorValue,
      linesNames
    );

    const select = chart.querySelector("select");
    let countDays = select.value;
    select.addEventListener("change", (event) => {
      countDays = event.target.value;
      changeChart(lineChart);
    });

    const ctxL = chart.querySelector(".line-chart").getContext("2d");
    const lineChart = newChart(formatDataForChart(labelsAndValues, countDays), ctxL);

    function changeChart(chart) {
      const dataForChart = getLabelsAndValues(
        dataResponse.chart,
        countLines,
        currentIndicatorValue,
        linesNames
      );
      const { labels, values } = formatDataForChart(dataForChart, countDays);
      chart.data.datasets.pop();
      const datasets = setDataset(values);
      chart.data.labels = labels;
      chart.data.datasets = datasets;
      chart.update();
    }

    function updateDate(startDate) {
      startDate.setMonth(startDate.getMonth() - 3);
      const currentDate = startDate.toISOString().split("T")[0];
      dataPickerStart.value = currentDate;
    }
  });

  function formatDataForChart(chart, countDays) {
    if (countDays > 0) {
      return {
        labels: chart.labels.slice(chart.labels.length - countDays),
        values: chart.values.map((oneLineValue) =>
          oneLineValue.slice(oneLineValue.length - countDays)
        ),
      };
    }
    return {
      labels: chart.labels,
      values: chart.values.map((oneLineValue) => oneLineValue),
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

  function getLabelsAndValues(chart, countLines, indicator, linesNames) {
    const labels = chart.map((position) => position.date);
    const values = [];
    for (let i = 0; i < countLines; i++) {
      values.push(
        chart.map((position) => {
          const line = position.lines[linesNames[i]][0];
          return line[indicator];
        })
      );
    }
    return { labels, values };
  }
});
