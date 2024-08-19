import type { Meta } from '@storybook/react';
import { useCallback, useState } from 'react';

import { Icon } from '../icon/icon';
import { Checkbox } from '../input/checkbox/checkbox';
import { Tree as TreeComponent } from './tree.component';
import { TreeItem } from './tree-item.component';

const SettingsButton = ({ value, onClick }: { value: boolean; onClick: () => void }) => {
  return (
    <button onClick={onClick}>
      {!value && <Icon name='Settings' className='my-2' />}
      {value && <Icon name='Settings' className='my-2 text-primary' />}
    </button>
  );
};

const Sentinel1 = () => {
  const [showSettings, setShowSettings] = useState(false);

  const toggleSettings = useCallback(() => {
    setShowSettings((value) => !value);
  }, []);

  return (
    <>
      <TreeItem
        title='Sentinel-1'
        icon={[
          { position: 'before', icon: <Icon name='Satellite' className='my-2' /> },
          { position: 'after', icon: <SettingsButton value={showSettings} onClick={toggleSettings} /> },
          { position: 'after', icon: <Checkbox name='Sentinel-1' /> },
        ]}
      />
      {showSettings && (
        <TreeComponent>
          <TreeItem title='Acquisition mode' />
          <TreeItem
            title='EW - Extra-Wide Swath 40m x 40m'
            icon={[{ position: 'after', icon: <Checkbox name='EW - Extra-Wide Swath 40m x 40m' /> }]}
          />
          <TreeItem title='Polarization' />
          <TreeItem title='HH' icon={[{ position: 'after', icon: <Checkbox name='HH' /> }]} />
          <TreeItem title='HH+HV' icon={[{ position: 'after', icon: <Checkbox name='HH+HV' /> }]} />
          <TreeItem
            title='IW - Interferometric Wide Swath 10m x 10m'
            icon={[{ position: 'after', icon: <Checkbox name='IW - Interferometric Wide Swath 10m x 10m' /> }]}
          />
          <TreeItem title='Polarization' />
          <TreeItem title='VV' icon={[{ position: 'after', icon: <Checkbox name='VV' /> }]} />
          <TreeItem title='VV+VH' icon={[{ position: 'after', icon: <Checkbox name='VV+VH' /> }]} />
          <TreeItem title='Orbit direction' />
          <TreeItem title='Ascending' icon={[{ position: 'after', icon: <Checkbox name='Ascending' /> }]} />
          <TreeItem title='Descending' icon={[{ position: 'after', icon: <Checkbox name='Descending' /> }]} />
        </TreeComponent>
      )}
    </>
  );
};

const Sentinel2 = () => {
  const [showSettings, setShowSettings] = useState(false);

  const toggleSettings = useCallback(() => {
    setShowSettings((value) => !value);
  }, []);

  return (
    <>
      <TreeItem
        title='Sentinel-2'
        icon={[
          { position: 'before', icon: <Icon name='Satellite' className='my-2' /> },
          { position: 'after', icon: <SettingsButton value={showSettings} onClick={toggleSettings} /> },
          { position: 'after', icon: <Checkbox name='Sentinel-1' /> },
        ]}
      />
      {showSettings && (
        <TreeComponent>
          <TreeItem title='L1C' icon={[{ position: 'after', icon: <Checkbox name='L1C' /> }]} />
          <TreeItem
            title='L2A (atmospherically corrected)'
            icon={[{ position: 'after', icon: <Checkbox name='L2A' /> }]}
          />
        </TreeComponent>
      )}
    </>
  );
};

const Sentinel3 = () => {
  const [showSettings, setShowSettings] = useState(false);

  const toggleSettings = useCallback(() => {
    setShowSettings((value) => !value);
  }, []);

  return (
    <>
      <TreeItem
        title='Sentinel-3'
        icon={[
          { position: 'before', icon: <Icon name='Satellite' className='my-2' /> },
          { position: 'after', icon: <SettingsButton value={showSettings} onClick={toggleSettings} /> },
          { position: 'after', icon: <Checkbox name='Sentinel-1' /> },
        ]}
      />
      {showSettings && (
        <TreeComponent>
          <TreeItem title='SLSTR' icon={[{ position: 'after', icon: <Checkbox name='SLSTR' /> }]} />
          <TreeItem title='OLCI' icon={[{ position: 'after', icon: <Checkbox name='OLCI' /> }]} />
        </TreeComponent>
      )}
    </>
  );
};

const Sentinel5P = () => {
  const [showSettings, setShowSettings] = useState(false);

  const toggleSettings = useCallback(() => {
    setShowSettings((value) => !value);
  }, []);

  return (
    <>
      <TreeItem
        title='Sentinel-5P'
        icon={[
          { position: 'before', icon: <Icon name='Satellite' className='my-2' /> },
          { position: 'after', icon: <SettingsButton value={showSettings} onClick={toggleSettings} /> },
          { position: 'after', icon: <Checkbox name='Sentinel-1' /> },
        ]}
      />
      {showSettings && (
        <TreeComponent>
          <TreeItem title='AER AI (Aerosol Index)' icon={[{ position: 'after', icon: <Checkbox name='AER AI' /> }]} />
          <TreeItem title='CH4 (Methane)' icon={[{ position: 'after', icon: <Checkbox name='CH4' /> }]} />
          <TreeItem title='Cloud' icon={[{ position: 'after', icon: <Checkbox name='Cloud' /> }]} />
          <TreeItem title='CO (Carbon monoxide)' icon={[{ position: 'after', icon: <Checkbox name='CO' /> }]} />
          <TreeItem title='HCHO (Formaldehyde)' icon={[{ position: 'after', icon: <Checkbox name='HCHO' /> }]} />
          <TreeItem title='NO2 (Nitrogen dioxide)' icon={[{ position: 'after', icon: <Checkbox name='NO2' /> }]} />
          <TreeItem title='O3 (Ozone)' icon={[{ position: 'after', icon: <Checkbox name='O3' /> }]} />
          <TreeItem title='SO2 (Sulfur dioxide)' icon={[{ position: 'after', icon: <Checkbox name='SO2' /> }]} />
        </TreeComponent>
      )}
    </>
  );
};

const TreeTemplate = () => {
  return (
    <TreeComponent>
      <TreeItem title='Public'>
        <TreeItem title='Copernicus'>
          <Sentinel1 />
          <Sentinel2 />
          <Sentinel3 />
          <Sentinel5P />
        </TreeItem>
      </TreeItem>
      <TreeItem title='Commercial'>
        <TreeItem title='Planet'>
          <TreeItem
            title='PlanetScope'
            icon={[
              { position: 'before', icon: <Icon name='Satellite' /> },
              { position: 'after', icon: <Icon name='Settings' className='my-2' /> },
              { position: 'after', icon: <Checkbox name='Sentinel-1' /> },
            ]}
          />
          <TreeItem
            title='SkySat'
            icon={[
              { position: 'before', icon: <Icon name='Satellite' /> },
              { position: 'after', icon: <Icon name='Settings' className='my-2' /> },
              { position: 'after', icon: <Checkbox name='Sentinel-1' /> },
            ]}
          />
          <TreeItem
            title='RapidEye'
            icon={[
              { position: 'before', icon: <Icon name='Satellite' /> },
              { position: 'after', icon: <Icon name='Settings' className='my-2' /> },
              { position: 'after', icon: <Checkbox name='Sentinel-1' /> },
            ]}
          />
        </TreeItem>
        <TreeItem title='AirBus' />
      </TreeItem>
    </TreeComponent>
  );
};

const meta: Meta<typeof TreeTemplate> = {
  component: TreeTemplate,
  title: 'libs/shared/design-system/Tree',
};
export default meta;

export const Tree = {
  args: {},
};
