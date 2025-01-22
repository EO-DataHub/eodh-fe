import { MapBrowserEvent } from 'ol';
import { Interaction } from 'ol/interaction';

export class KeyboardEventInteraction extends Interaction {
  private callback: (event: MapBrowserEvent<KeyboardEvent>) => boolean;

  public constructor(callback: (event: MapBrowserEvent<KeyboardEvent>) => boolean) {
    super();
    this.callback = callback;
  }

  public handleEvent(event: MapBrowserEvent<KeyboardEvent>) {
    if (this.callback) {
      return this.callback(event);
    }

    return true;
  }
}
