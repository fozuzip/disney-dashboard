import { useRef } from "react";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const options = {
  chart: {
    type: "pie",
    style: {
      fontFamily: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
      color: "red",
    },

    backgroundColor: "transparent",
  },
  title: {
    text: undefined,
  },
  colors: [
    "rgba(158, 1, 66, 1)",
    "rgba(213, 62, 79, 1)",
    "rgba(244, 109, 67, 1)",
    "rgba(253, 174, 97, 1)",
    "rgba(254, 224, 139, 1)",
    "rgba(230, 245, 152, 1)",
    "rgba(171, 221, 164, 1)",
    "rgba(102, 194, 165, 1)",
    "rgba(50, 136, 189, 1)",
    "rgba(94, 79, 162, 1)",
  ],
  tooltip: {
    backgroundColor: "#020817",
    borderColor: "#1e293b",
    borderRadius: "0.5rem",
    padding: 12,
    style: {
      color: "hsl(210, 40%, 98%)",
    },
    formatter: function () {
      const formattedPercentage = this.percentage.toFixed(2);
      const filmsList: string = this.point.films
        .map((film: string) => `${film}<br/>`)
        .join("");
      const truncatedFilmsList =
        filmsList.length > 300 ? filmsList.slice(0, 300) + "..." : filmsList;

      return (
        "<b>" +
        formattedPercentage +
        " % </b> of total films <br/><br/>" +
        truncatedFilmsList
      );
    } as Highcharts.TooltipFormatterCallbackFunction,
  },
  plotOptions: {
    pie: {
      borderColor: "hsl(217.2, 32.6%, 17.5%)",
    },
    series: {
      allowPointSelect: true,
      cursor: "pointer",
      dataLabels: [
        {
          enabled: true,
          distance: 20,
          color: "hsl(210, 40%, 98%)",
        },
        {
          enabled: true,
          distance: -40,
          format: "{point.percentage:.1f}%",
          style: {
            fontSize: "1.2em",
            textOutline: "none",
            opacity: 0.7,
          },
          filter: {
            operator: ">",
            property: "percentage",
            value: 10,
          },
        },
      ],
    },
  },
};

type ChartModalProps = {
  series: Highcharts.SeriesOptionsType[];
};

export const PieChart = ({ series }: ChartModalProps) => {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={{
        ...options,
        series,
      }}
      ref={chartComponentRef}
    />
  );
};
