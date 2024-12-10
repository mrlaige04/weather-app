import {Condition} from './condition';

export interface CurrentWeather {
  temp_c: number;
  temp_f: number;
  condition: Condition;
}

