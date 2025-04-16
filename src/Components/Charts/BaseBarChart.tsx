import { BarPlot } from '@mui/x-charts/BarChart';
import {
  ChartsAxisHighlight,
  ChartsGrid,
  ChartsLegend,
  ChartsTooltip,
  ChartsXAxis,
  ChartsYAxis,
  ResponsiveChartContainer
} from '@mui/x-charts';
import { AxisValueFormatterContext } from '@mui/x-charts/internals';
import { DatasetType } from '@mui/x-charts/models/seriesType/config';

interface BarChartYAxis {
  data?: (null | number)[];
  label: string;
  color?: string;
  stack?: 'total';
  dataKey?: string;
}

interface BarChartXAxis<T> {
  data?: T[];
  dataKey?: string;
  scaleType: 'time' | 'band';
  valueFormatter?: (value: T, context: AxisValueFormatterContext) => string;
}

type BaseLineChartProps<T> = {
  xAxis: BarChartXAxis<T>[];
  yAxis: BarChartYAxis[];
  dataset?: DatasetType;
};

export const BaseBarChart = <T,>({ xAxis, yAxis, dataset }: BaseLineChartProps<T>) => {
  return (
    <ResponsiveChartContainer xAxis={xAxis} series={yAxis.map((axis) => ({ ...axis, type: 'bar' }))} dataset={dataset}>
      <BarPlot />
      <ChartsGrid vertical={true} horizontal={true} />
      <ChartsXAxis />
      <ChartsYAxis />
      <ChartsLegend />
      <ChartsTooltip />
      <ChartsAxisHighlight x={'band'} />
    </ResponsiveChartContainer>
  );
};
