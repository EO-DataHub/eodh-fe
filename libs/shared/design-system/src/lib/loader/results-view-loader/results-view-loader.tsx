import { Text } from '../../text/text';
import { LoadingSpinner } from '../loading-spinner';

export const ResultsViewLoader = () => {
  return (
    <div className='text-text text-center p-4'>
      <LoadingSpinner className='mx-auto' />
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
