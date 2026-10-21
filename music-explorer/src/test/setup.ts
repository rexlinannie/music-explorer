import "@testing-library/jest-dom";
class IntersectionObserverMock {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
  constructor(_callback: IntersectionObserverCallback) {}
}
Object.defineProperty(globalThis, "IntersectionObserver", { writable: true, configurable: true, value: IntersectionObserverMock });
