import { Text } from '../../text/text';
import { LoadingSpinner } from '../loading-spinner';

export const ResultsViewLoader = () => {
  return (
    <div className='text-text text-center mx-4 mt-28'>
      <LoadingSpinner classNameContainer='mx-auto' />
      <Text
        type='h1'
        fontSize='large'
        fontWeight='bold'
        content='GLOBAL.DESIGN_SYSTEM.LOADER.RESULTS_VIEW_LOADER'
        className='my-4'
      />
    </div>
  );
};
