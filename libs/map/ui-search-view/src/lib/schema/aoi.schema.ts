import isObject from 'lodash/isObject';
import Geometry from 'ol/geom/Geometry';
import { z } from 'zod';

export const aoiSchema = z.custom<Geometry>((value) => isObject(value));
