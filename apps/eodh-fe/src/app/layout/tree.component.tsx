import { Checkbox, Icon, Spacing, Text } from '@ukri/shared/design-system';
import { Tree, TreeItem } from '@ukri/shared/design-system';
import { PropsWithChildren, useCallback, useMemo, useState } from 'react';

const SettingsButton = ({ value, onClick }: { value: boolean; onClick: () => void }) => {
  return (
    <button onClick={onClick}>
      {!value && <Icon name='Settings' />}
      {value && <Icon name='Settings' className='text-primary' />}
    </button>
  );
};

const Title = ({
  title,
  className = '',
  fontWeight = 'bold',
}: {
  title: string;
  className?: string;
  fontWeight?: 'bold' | 'regular';
}) => {
  return (
    <Text
      content={title}
      type='p'
      fontSize='medium'
      fontWeight={fontWeight}
      className={`text-neutral-dark ${className}`}
    />
  );
};

const SettingsTree = ({ children }: PropsWithChildren) => {
  return (
    <Tree spacing='1'>
      <Spacing spacing='0.5' />
      {children}
      <Spacing spacing='0.5' />
    </Tree>
  );
};

const SettingSection = ({ title, children }: PropsWithChildren<{ title: string }>) => {
  return (
    <>
      <TreeItem title={<Title title={title} />} />
      {children}
    </>
  );
};

const SettingItem = ({ title, name }: { title: string; name?: string }) => {
  return <TreeItem title={title} icon={[{ position: 'after', icon: <Checkbox name={name ? name : title} /> }]} />;
};

const SatelliteItem = ({ title, name, children }: PropsWithChildren<{ title: string; name?: string }>) => {
  const [showSettings, setShowSettings] = useState(false);

  const toggleSettings = useCallback(() => {
    setShowSettings((value) => !value);
  }, []);

  const renderChildren = useMemo(() => {
    if (!showSettings) {
      return null;
    }

    return <SettingsTree>{children}</SettingsTree>;
  }, [children, showSettings]);

  return (
    <TreeItem
      title={<Title title={title} fontWeight='regular' />}
      icon={[
        { position: 'before', icon: <Icon name='Satellite' /> },
        { position: 'after', icon: <SettingsButton value={showSettings} onClick={toggleSettings} /> },
        { position: 'after', icon: <Checkbox name={name ? name : title} /> },
      ]}
      collapsable={false}
    >
      {renderChildren}
    </TreeItem>
  );
};

const Sentinel1 = () => {
  return (
    <SatelliteItem title='Sentinel-1'>
      <SettingSection title='Acquisition mode:'>
        <SettingItem title='EW - Extra-Wide Swath 40m x 40m' />
      </SettingSection>

      <SettingSection title='Polarization'>
        <SettingItem title='HH' />
        <SettingItem title='HH+HV' />
        <SettingItem title='IW - Interferometric Wide Swath 10m x 10m' />
      </SettingSection>

      <SettingSection title='Polarization'>
        <SettingItem title='VV' />
        <SettingItem title='VV+VH' />
      </SettingSection>

      <SettingSection title='Orbit direction:'>
        <SettingItem title='Ascending' />
        <SettingItem title='Descending' />
      </SettingSection>
    </SatelliteItem>
  );
};

const Sentinel2 = () => {
  return (
    <SatelliteItem title='Sentinel-2'>
      <SettingItem title='L1C' />
      <SettingItem title='L2A (atmospherically corrected)' name='L2A' />
    </SatelliteItem>
  );
};

const Sentinel3 = () => {
  return (
    <SatelliteItem title='Sentinel-3'>
      <SettingItem title='SLSTR' />
      <SettingItem title='OLCI' />
    </SatelliteItem>
  );
};

const Sentinel5P = () => {
  return (
    <SatelliteItem title='Sentinel-5P'>
      <SettingItem title='AER AI (Aerosol Index)' name='AER_AI' />
      <SettingItem title='CH4 (Methane)' name='CH4' />
      <SettingItem title='Cloud' name='Cloud' />
      <SettingItem title='CO (Carbon monoxide)' name='CO' />
      <SettingItem title='HCHO (Formaldehyde)' name='HCHO' />
      <SettingItem title='NO2 (Nitrogen dioxide)' name='NO2' />
      <SettingItem title='O3 (Ozone)' name='O3' />
      <SettingItem title='SO2 (Sulfur dioxide)' name='SO2' />
    </SatelliteItem>
  );
};

export const SatelliteTree = () => {
  return (
    <Tree>
      <TreeItem title='Public' className='text-text-primary'>
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
              { position: 'after', icon: <Icon name='Settings' /> },
              { position: 'after', icon: <Checkbox name='Sentinel-1' /> },
            ]}
          />
          <TreeItem
            title='SkySat'
            icon={[
              { position: 'before', icon: <Icon name='Satellite' /> },
              { position: 'after', icon: <Icon name='Settings' /> },
              { position: 'after', icon: <Checkbox name='Sentinel-1' /> },
            ]}
          />
          <TreeItem
            title='RapidEye'
            icon={[
              { position: 'before', icon: <Icon name='Satellite' /> },
              { position: 'after', icon: <Icon name='Settings' /> },
              { position: 'after', icon: <Checkbox name='Sentinel-1' /> },
            ]}
          />
        </TreeItem>
        <TreeItem title='AirBus' />
      </TreeItem>
    </Tree>
  );
};
