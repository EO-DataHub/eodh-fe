import { Login } from '@ukri/authorization/ui';
import { AoiLayer, DrawCircleButton, DrawPolygonButton, DrawRectangleButton } from '@ukri/map/ui-map';

import { Logo } from './logo.component';

export const TopBar = () => {
  return (
    <div className='w-full bg-background border-b-[1px] border-bright-mid flex items-center text-text divide-bright-mid divide-x divide-x-reverse'>
      <div className='w-[360px] h-full bg-bright-main flex items-center border-bright-mid border-r-[1px]'>
        <a className='ml-4 my-4 no-underline' href='/'>
          <Logo className='h-11' />
        </a>
      </div>
      <AoiLayer>
        <DrawRectangleButton />
        <DrawCircleButton />
        <DrawPolygonButton />
      </AoiLayer>
      <Login className='ml-auto' />
    </div>
  );
};
