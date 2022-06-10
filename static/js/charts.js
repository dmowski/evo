import { DateTime } from "https://cdn.skypack.dev/luxon";

const colors = [
  "rgba(254, 95, 85, 1)",
  "rgb(225, 15, 230)",
  "rgba(95, 211, 234, 1)",
  "rgb(238, 130, 238)",
  "rgb(60, 179, 113)",
  "rgb(255, 165, 0)",
  "rgb(255, 15, 20)",
  "rgb(25, 15, 120)",
  "rgba(54, 95, 85, 1)",
  "rgba(95, 31, 234, 1)",
  "rgb(238, 130, 238)",
  "rgb(60, 179, 53)",
  "rgb(255, 165, 0)",
  "rgb(25, 115, 120)",
];

const chatUrl = "/api/v1/chart.get";

async function fetchChartData(start, end, chart_name) {
  const requestData = {
    start,
    end,
    chart_name,
  };
  const response = await fetch(chatUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  });
  const responseData = await response.json();
  if (responseData.error) {
    alert("Error of chart request: " + responseData.error);
  }
  return responseData;
}

const generateChartWidget = (canvas) => {
  return new Chart(canvas, {
    type: "line",
    data: {},
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
};

export const charts = () => {
  const formatDate = "yyyy'-'MM'-'dd";

  const charts = document.querySelectorAll(".chart-container");

  charts.forEach(async (domContainer, i) => {
    const chartName = domContainer.dataset["chartName"];
    const legendContainer = domContainer.querySelector(".legend");
    const endInput = domContainer.querySelector("input[name=end]");
    const startInput = domContainer.querySelector("input[name=start]");
    const canvas = domContainer.querySelector(".line-chart").getContext("2d");
    const periodControlPanel = domContainer.querySelector(".period");

    const chartWidget = generateChartWidget(canvas);

    let chartState = {
      chartName,
      indicatorsList: [],
      selectedIndicators: [],
      startTimestamp: null,
      endTimestamp: null,
      dataCache: {}, //key = `${start}_{end}`, value: [{position, name, value}]
    };
    const setState = (newState) => {
      chartState = { ...chartState, ...newState };
      console.log("New state", chartState);
      render();
    };

    const getCurrentDataKey = () => {
      return `${chartState.startTimestamp}_${chartState.endTimestamp}`;
    };

    const getIndicatorColor = (indicatorName) => {
      const indicatorIndex = chartState.indicatorsList.indexOf(indicatorName);
      return colors[indicatorIndex];
    };

    const renderLegend = () => {
      legendContainer.innerHTML = "";
      const newLegendTemplate = chartState.selectedIndicators
        .map((indicatorName) => {
          const color = getIndicatorColor(indicatorName);
          const indicatorTemplate = `
            <div>
              <div class="color" style="background-color: ${color}"></div>
              <span>${indicatorName}</span>
            </div>
          `;
          return indicatorTemplate;
        })
        .join("");
      legendContainer.innerHTML = newLegendTemplate;
    };

    const renderChartWidget = () => {
      const keyData = getCurrentDataKey();
      const cacheData = chartState.dataCache[keyData];
      chartWidget.data.labels = [];
      chartWidget.data.datasets = [];
      chartWidget.update();

      if (!cacheData) {
        return;
      }

      const labels = cacheData.reduce((labels, statValue) => {
        if (!labels.includes(statValue.position)) {
          labels.push(statValue.position);
        }

        return labels;
      }, []);

      chartWidget.data.labels = labels;

      const dataset = chartState.selectedIndicators.map((indicatorName) => {
        const indicatorColor = getIndicatorColor(indicatorName);
        const indicatorData = cacheData
          .filter((statValue) => {
            return statValue.name === indicatorName;
          })
          .map((statValue) => {
            return statValue.value;
          });
        return {
          data: indicatorData,
          borderColor: indicatorColor,
          fill: false,
          borderWidth: 3,
        };
      });
      chartWidget.data.datasets = dataset;
      chartWidget.update();
    };

    const renderTimeInputs = () => {
      if (!chartState.endTimestamp || !chartState.startTimestamp) {
        return;
      }
      endInput.value = DateTime.fromMillis(chartState.endTimestamp).toFormat(formatDate);
      startInput.value = DateTime.fromMillis(chartState.startTimestamp).toFormat(formatDate);

      startInput.max = endInput.value;
      endInput.min = startInput.value;
    };

    const render = () => {
      renderLegend();
      renderChartWidget();
      renderTimeInputs();
    };

    const initIndicatorsSwitcher = () => {
      domContainer.querySelectorAll(".indicators input").forEach((indicatorInput) => {
        const indicatorName = indicatorInput.name;
        setState({ indicatorsList: [...chartState.indicatorsList, indicatorName] });

        if (indicatorInput.checked) {
          setState({ selectedIndicators: [...chartState.selectedIndicators, indicatorName] });
        }

        indicatorInput.addEventListener("change", (event) => {
          const inputTarget = event.target;
          if (inputTarget.checked) {
            setState({ selectedIndicators: [...chartState.selectedIndicators, inputTarget.name] });
          } else {
            const newSelectedIndicators = chartState.selectedIndicators.filter(
              (indicatorName) => indicatorName !== inputTarget.name
            );
            setState({
              selectedIndicators: newSelectedIndicators,
            });
          }
        });
      });
    };

    const updateDataCache = async () => {
      if (!chartState.endTimestamp || !chartState.startTimestamp) {
        return;
      }
      const dataKey = getCurrentDataKey();
      if (chartState.dataCache[dataKey]) {
        return;
      }

      const newTimeData = await fetchChartData(
        chartState.startTimestamp,
        chartState.endTimestamp,
        chartState.chartName
      );
      const newData = {
        ...chartState.dataCache,
        [dataKey]: newTimeData,
      };
      setState({ dataCache: newData });
    };

    const initTimeInputs = () => {
      const initDateEnd = DateTime.local().setZone("Europe/Moscow");
      const initDateStart = initDateEnd.minus({ month: 1 });

      const initEndDateInputValue = initDateEnd.toFormat(formatDate);
      const initStartDateInputValue = initDateStart.toFormat(formatDate);

      endInput.addEventListener("change", async ({ target }) => {
        setState({
          endTimestamp: DateTime.fromISO(target.value).ts,
        });
        updateDataCache();
      });

      startInput.addEventListener("change", async ({ target }) => {
        setState({
          startTimestamp: DateTime.fromISO(target.value).ts,
        });
        updateDataCache();
      });

      endInput.value = initEndDateInputValue;
      startInput.value = initStartDateInputValue;

      setState({
        startTimestamp: initDateStart.ts,
        endTimestamp: initDateEnd.ts,
      });
      updateDataCache();
    };

    const initButtonSwitcher = () => {
      periodControlPanel.addEventListener("click", ({ target }) => {
        const timeSwitchValue = target.dataset.time;
        if (!timeSwitchValue) {
          return;
        }
        const dayBefore = parseInt(timeSwitchValue);
        const newStartTime = chartState.endTimestamp - 1000 * 60 * 60 * 24 * dayBefore;
        setState({ startTimestamp: newStartTime });
        updateDataCache();
      });
    };

    const init = async () => {
      initIndicatorsSwitcher();
      initTimeInputs();
      initButtonSwitcher();
    };

    init();
  });
};
