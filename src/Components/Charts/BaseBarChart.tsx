import { BarPlot } from '@mui/x-charts/BarChart';
import {
  ChartsAxisHighlight,
  ChartsGrid,
  ChartsTooltip,
  ChartsXAxis,
  ChartsYAxis,
  ChartsContainer
} from '@mui/x-charts';
import { AxisValueFormatterContext } from '@mui/x-charts/models';
import { Box } from '@mui/material';
import { ComponentProps, Fragment } from 'react';
import { BaseBarChartLegend } from './BaseBarChartLegend';

export interface BarChartYAxis {
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
  dataset?: ComponentProps<typeof ChartsContainer>['dataset'];
};

export const BaseBarChart = <T,>({ xAxis, yAxis, dataset }: BaseLineChartProps<T>) => {
  return (
    <Fragment>
      <Box sx={{ height: 300 }}>
        <ChartsContainer
          xAxis={xAxis}
          margin={{ top: 20, left: 35, right: 20, bottom: 35 }}
          series={yAxis.map((axis) => ({ ...axis, type: 'bar' }))}
          dataset={dataset}>
          <BarPlot />
          <ChartsGrid vertical={true} horizontal={true} />
          <ChartsXAxis />
          <ChartsYAxis />
          <ChartsTooltip sx={{ zIndex: 2000 }} />
          <ChartsAxisHighlight x={'band'} />
        </ChartsContainer>
      </Box>
      <BaseBarChartLegend yAxis={yAxis} />
    </Fragment>
  );
};
