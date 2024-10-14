import { TPresets } from './presets.model';

export const formatPresetsResponse = (response: TPresets): TPresets => {
  response.functions.forEach((func) => {
    if (func.thumbnail_b64) {
      func.thumbnail_b64 = `data:image/jpeg;base64,${func.thumbnail_b64}`;
    }
  });

  return response;
};
