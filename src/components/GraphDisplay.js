import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "",
    },
  },
};

export default class GraphDisplay extends Component {
  state = {
    stocks: {
      datasets: [
        {
          label: "Dataset 1",
          data: [],
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    },
  };

  addDays = (date, days) => {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  getNextDates = (total) => {
    let result = [];
    let current = new Date();
    while (true) {
      if (current.getDay() === 0 || current.getDay() === 6) {
        current = this.addDays(current, 1);
        continue;
      } else {
        result.push(current.toDateString());
        current = this.addDays(current, 1);
      }

      if (result.length > total) {
        break;
      }
    }

    return result;
  };

  componentDidMount = () => {
    let previousdata = this.props?.stocks?.original_data.map((a) => a[1]);
    let previousdates = this.props.stocks?.original_data.map((a) =>
      new Date(a[0]).toDateString()
    );
    let nextDates = this.getNextDates(
      this.props.stocks?.predicted_days_data.length
    );
    let nextData = this.props.stocks?.predicted_days_data;

    let data = {
      labels: previousdates.concat(nextDates),
      datasets: [
        {
          label: "History Stock Prices",
          data: previousdata.concat(nextData.map((a) => NaN)),
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: "Predicted Stock Prices",
          data: previousdata.map((a) => NaN).concat(nextData),
          borderColor: "RGBA(76,175,80)",
          backgroundColor: "rgba(76,175,80,0.5)",
        },
      ],
    };

    console.log("data setting to stocks", data);

    this.setState({
      stocks: data,
    });
  };

  componentDidUpdate = (prevProps, prevState) => {
    console.log(
      "component did updated with props and state",
      this.props.stocks
    );

    if (prevProps.stocks !== this.props.stocks) {
      let previousdata = this.props?.stocks?.original_data.map((a) => a[1]);
      let previousdates = this.props.stocks?.original_data.map((a) =>
        new Date(a[0]).toDateString()
      );
      let nextDates = this.getNextDates(
        this.props.stocks?.predicted_days_data.length
      );
      let nextData = this.props.stocks?.predicted_days_data;
      let data = {
        labels: previousdates.concat(nextDates),
        datasets: [
          {
            label: "History Stock Prices",
            data: previousdata.concat(nextData.map((a) => NaN)),
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
          {
            label: "Predicted Stock Prices",
            data: previousdata.map((a) => NaN).concat(nextData),
            borderColor: "RGBA(76,175,80)",
            backgroundColor: "rgba(76,175,80,0.5)",
          },
        ],
      };

      console.log("data setting to stocks", data);

      this.setState({
        stocks: data,
      });
    } else {
      console.log("Not changed ");
    }
  };

  render() {
    return (
      <div
        id="graphDisplay"
        className="w-full h-screen flex flex-center justify-center mt-10 sm:m-0"
      >
        <div
          className="wrapper flex flex-col my-auto sm:w-96 px-3 py-10 rounded-md border-2 shadow-md"
          style={{ width: "75rem" }}
        >
          <div className="text-skin-dark text-center font-bold text-lg mb-4">
            Graph for the the stock {this.props.stockName}
          </div>
          <Line options={options} data={this.state.stocks} />
        </div>
      </div>
    );
  }
}
