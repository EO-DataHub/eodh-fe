import { Help as HelpContent } from '@ukri/shared/ui/help';
import { useFeatureFlag } from '@ukri/shared/utils/feature-flag';

import { Container, Content, Footer } from '../container.component';
import { getHelpContent } from './translation-keys';

const pathToImages = '/assets/images';

export const Help = () => {
  const downloadingAssetsEnabled = useFeatureFlag('downloadAsset');
  const disabledQuestionIds = downloadingAssetsEnabled ? ['HOW_DO_I_DOWNLOAD_A_WORKFLOW_OR_SEARCH_RESULTS'] : [];

  return (
    <Container>
      <Content>
        <HelpContent
          helpContentConfig={getHelpContent(disabledQuestionIds)}
          className='p-4'
          pathToImages={pathToImages}
        />
      </Content>
      <Footer></Footer>
    </Container>
  );
};
