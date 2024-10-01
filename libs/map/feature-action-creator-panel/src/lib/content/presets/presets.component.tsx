import { Preset } from './preset.component';

export const Presets = () => {
  return (
    <section className='text-text-primary'>
      <Preset
        imageUrl='/assets/images/imageSample2.png'
        title='Sample title message'
        description='Some super interesting sample description to preset functionality'
        onLoadPresetClick={() => {}}
      />
    </section>
  );
};
