import { waitFor } from '@testing-library/react';
import { createRoot, Root } from 'react-dom/client';
import { destroyFrameRoot, getOrCreateFrameRoot, watchFrameRoot } from './Root';

vi.mock('react-dom/client', () => ({ createRoot: vi.fn() }));

describe('frame root lifecycle', () => {
  const pushState = history.pushState;
  const replaceState = history.replaceState;
  let observers: MutationObserver[];
  let popstateListener: EventListenerOrEventListenerObject | undefined;

  beforeEach(() => {
    observers = [];
    const NativeObserver = MutationObserver;
    vi.stubGlobal(
      'MutationObserver',
      class extends NativeObserver {
        constructor(callback: MutationCallback) {
          super(callback);
          observers.push(this);
        }
      }
    );
    const addEventListener = window.addEventListener.bind(window);
    vi.spyOn(window, 'addEventListener').mockImplementation((type, listener, options) => {
      if (type === 'popstate' && listener) popstateListener = listener;
      addEventListener(type, listener, options);
    });
    vi.mocked(createRoot).mockImplementation(() => ({ render: vi.fn(), unmount: vi.fn() }) as unknown as Root);
  });

  afterEach(() => {
    observers.forEach((observer) => observer.disconnect());
    if (popstateListener) window.removeEventListener('popstate', popstateListener);
    popstateListener = undefined;
    history.pushState = pushState;
    history.replaceState = replaceState;
    destroyFrameRoot();
    vi.unstubAllGlobals();
  });

  it('reuses one root and removes its container when destroyed', () => {
    const root = getOrCreateFrameRoot();

    expect(getOrCreateFrameRoot()).toBe(root);
    expect(document.querySelectorAll('#ui-coverage-agent-root')).toHaveLength(1);
    expect(document.getElementById('ui-coverage-agent-root')?.style.pointerEvents).toBe('none');

    destroyFrameRoot();
    expect(root.unmount).toHaveBeenCalledOnce();
    expect(document.getElementById('ui-coverage-agent-root')).not.toBeInTheDocument();

    destroyFrameRoot();
    expect(root.unmount).toHaveBeenCalledOnce();
    expect(getOrCreateFrameRoot()).not.toBe(root);
  });

  it('recreates the overlay for SPA navigation and ignores unchanged URLs', async () => {
    const getFrame = vi.fn(() => <span>Overlay</span>);
    watchFrameRoot(getFrame);
    const firstRoot = getOrCreateFrameRoot();
    expect(firstRoot.render).toHaveBeenCalledWith(<span>Overlay</span>);

    history.pushState({}, '', location.href);
    expect(firstRoot.unmount).not.toHaveBeenCalled();

    history.pushState({}, '', '/first');
    expect(firstRoot.unmount).toHaveBeenCalledOnce();
    const secondRoot = getOrCreateFrameRoot();

    history.replaceState({}, '', '/second');
    expect(secondRoot.unmount).toHaveBeenCalledOnce();
    const thirdRoot = getOrCreateFrameRoot();

    replaceState.call(history, {}, '', '/back');
    window.dispatchEvent(new PopStateEvent('popstate'));
    expect(thirdRoot.unmount).toHaveBeenCalledOnce();
    const fourthRoot = getOrCreateFrameRoot();

    replaceState.call(history, {}, '', '/observed');
    document.body.appendChild(document.createElement('p'));
    await waitFor(() => expect(fourthRoot.unmount).toHaveBeenCalledOnce());
    expect(getFrame).toHaveBeenCalledTimes(5);
  });
});
