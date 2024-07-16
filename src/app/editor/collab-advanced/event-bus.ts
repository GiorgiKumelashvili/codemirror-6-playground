export class EventBus {
  private eventObject: { [key: string]: CallableFunction[] };

  constructor() {
    // initialize event list
    this.eventObject = {};
  }
  // publish event
  publish(eventName: string, ...args: any[]) {
    // Get all the callback functions of the current event
    const callbackList = this.eventObject[eventName];

    if (!callbackList) return console.warn(eventName + ' not found!');

    // execute each callback function
    for (let callback of callbackList) {
      // pass parameters when executing
      callback(...args);
    }
  }
  // Subscribe to events
  subscribe(eventName: string, callback: CallableFunction) {
    // initialize this event
    if (!this.eventObject[eventName]) {
      this.eventObject[eventName] = [];
    }

    // store the callback function of the subscriber
    this.eventObject[eventName].push(callback);
  }
}

// test
// const eventBus = new EventBus();

// // Subscribe to event eventX
// eventBus.subscribe('eventX', (obj: object) => {
//   console.log('Module A', obj);
// });
// eventBus.subscribe('eventX', (obj: object) => {
//   console.log('Module B', obj);
// });
// eventBus.subscribe('eventX', (obj: object) => {
//   console.log('Module C', obj);
// });

// // publish event eventX
// eventBus.publish('eventX', { msg: 'EventX published!' });
