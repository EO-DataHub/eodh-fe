import BaseEvent from 'ol/events/Event.js';
import EventType from 'ol/events/EventType.js';

/**
 * @classdesc
 * Event emitted on configuration or loading error.
 * @api
 */
class ErrorEvent extends BaseEvent {
  private error: Error;

  /**
   * @param {Error} error error object.
   * @api
   */
  constructor(error: Error) {
    super(EventType.ERROR);

    /**
     * @type {Error}
     * @api
     */
    this.error = error;
  }
}

export default ErrorEvent;
