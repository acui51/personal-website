// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/line
import { ResponsiveLine } from "@nivo/line";

const ChartTooltip = ({ point, theme }) => {
  return (
    <div
      className={
        "flex flex-col items-center p-1 rounded-md " +
        (theme === "dark" ? "dark-background" : "bg-gray-50")
      }
    >
      <div className="flex items-center">
        <div
          style={{ backgroundColor: point.serieColor }}
          className="h-3 mr-1 w-3"
        />
        <div>{`${point.serieId}: ${point.data.y}`}</div>
      </div>
      <div>{point.data.xFormatted} seconds</div>
    </div>
  );
};

const MyResponsiveLine = ({ data, axisLeftName, axisBottomName, theme }) => {
  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 40, right: 60, left: 60, bottom: 50 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
        reverse: false
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: axisBottomName,
        legendOffset: 36,
        legendPosition: "middle"
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: axisLeftName,
        legendOffset: -40,
        legendPosition: "middle"
      }}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      theme={{
        background: theme === "dark" ? "#121212" : "#fff",
        textColor: theme === "dark" ? "#fff" : "#000",
        fontSize: 11
      }}
      tooltip={({ point }) => {
        return <ChartTooltip point={point} theme={theme} />;
      }}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1
              }
            }
          ]
        }
      ]}
    />
  );
};

export default MyResponsiveLine;
