import { Text } from '@ukri/shared/design-system';
import { useWorkspace } from '@ukri/shared/utils/authorization';
import { PropsWithChildren } from 'react';

import { Container, Content, Footer } from '../container.component';
import { NoAvailableWorkspacesMessage } from './no-workspace-message.component';
import { workspaceStyles } from './workspace.styles';
import { WorkspaceList } from './workspace-list.component';

const Wrapper = ({ children }: PropsWithChildren) => {
  return (
    <Container>
      <Content>
        <section className={workspaceStyles.workspaceContainer}>
          <section className={workspaceStyles.activeWorkspace.content.container}>
            <section>
              <Text
                type='h3'
                content='MAP.ACTION_CREATOR_PANEL.WORKSPACES.SELECT_WORKSPACE.HEADER.TITLE'
                fontSize='large'
                fontWeight='semibold'
              />

              <Text
                type='p'
                content='MAP.ACTION_CREATOR_PANEL.WORKSPACES.SELECT_WORKSPACE.HEADER.DESCRIPTION'
                fontSize='medium'
                fontWeight='regular'
                className={workspaceStyles.activeWorkspace.content.description}
              />
            </section>

            {children}
          </section>
        </section>
      </Content>
      <Footer></Footer>
    </Container>
  );
};

export const Workspace = () => {
  const { workspaces } = useWorkspace();

  if (!workspaces.length) {
    return (
      <Wrapper>
        <NoAvailableWorkspacesMessage />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <WorkspaceList />
    </Wrapper>
  );
};
