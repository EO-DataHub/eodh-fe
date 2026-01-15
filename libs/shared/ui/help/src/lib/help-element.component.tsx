import { ElementRenderer } from './components/elements/element-renderer.component';
import { THelpElement } from './types/help-config.types';

interface IHelpElementProps {
  readonly element: THelpElement;
  readonly pathToImages?: string;
  readonly className?: string;
}

export const HelpElement = ({ element, pathToImages, className }: IHelpElementProps) => {
  return (
    <div className={className}>
      <ElementRenderer element={element} pathToImages={pathToImages} />
    </div>
  );
};
