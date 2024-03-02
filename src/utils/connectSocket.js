import { failureToast } from '../components/profile/toast/failure.js';

let failure = null;

export async function connectWebSocket() {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const ws = await new Promise((resolve, reject) => {
        const ws = new WebSocket('ws://localhost:8080');

        ws.onopen = () => resolve(ws);
        ws.onerror = () =>
          reject(new Error(`WebSocket connection failed. Retry... ${attempt}`));
      });
      return ws;
    } catch (error) {
      console.log('sad');
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
}
