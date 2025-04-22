const radioButtonBase = 'w-full justify-between flex-row-reverse [&>span]:ml-0 border-b-[1px] border-bright-mid pb-2';

export const workspaceStyles = {
  workspaceContainer: 'flex flex-col p-4',
  activeWorkspace: {
    content: {
      container: 'text-text-primary',
      description: 'mt-4',
    },
    radioButton: {
      container: 'mt-4 flex flex-col gap-2',
      button: (active: boolean) => (active ? `${radioButtonBase} text-primary` : radioButtonBase),
    },
    infoContainer: 'mt-4',
    buttonsContainer: 'mt-4 flex justify-end',
  },
  noWorkspaceMessage: {
    container: 'mt-4',
  },
};
