export const sliderStyles = {
  container: 'h-[76px] w-full relative bg-background-main',
  innerContainer: 'w-full px-6 pb-4 pt-[17px] absolute top-0',
  slider: `h-2
  [&_.MuiSlider-track]:border-none
  [&_.MuiSlider-track]:h-[5px]
  [&_.MuiSlider-track]:bg-blue-600
  [&_.MuiSlider-track]:z-10
  [&_.MuiSlider-thumb]:h-[20px]
  [&_.MuiSlider-thumb]:w-[20px]
  [&_.MuiSlider-thumb]:z-20
  [&_.MuiSlider-thumb]:bg-blue-600
  [&_.MuiSlider-thumb]:border-[3px]
  [&_.MuiSlider-thumb]:border-white
  [&_.MuiSlider-thumb:hover]:shadow-[0px_0px_0px_8px_rgba(25,118,210,0.16)]
  [&_.MuiSlider-thumb.Mui-active]:shadow-[0px_0px_0px_14px_rgba(25,118,210,0.16)]
  [&_.MuiSlider-rail]:opacity-100
  [&_.MuiSlider-rail]:bg-gray-200
  [&_.MuiSlider-rail]]:h-[5px]
  [&_.MuiSlider-mark]:bg-gray-300
  [&_.MuiSlider-mark]:h-3
  [&_.MuiSlider-mark]:w-0.5
  [&_.MuiSlider-markLabel]:text-gray-500
  [&_.MuiSlider-markLabel]:text-xs`,
};
