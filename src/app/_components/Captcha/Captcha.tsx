'use client';
import type { CSSProperties } from 'react';

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import { TURNSTILE_LOAD_FUNCTION } from '../../_utils/Constants';

const globalNamespace = (
  typeof globalThis !== 'undefined' ? globalThis : window
) as {
  [TURNSTILE_LOAD_FUNCTION]?: () => void;
  turnstile?: Turnstile.Turnstile;
} & typeof window;

type CaptchaState = 'ready' | 'unloaded';

let captchaState: CaptchaState =
  typeof globalNamespace.turnstile !== 'undefined' ? 'ready' : 'unloaded';

export interface CaptchaCallbacks {
  onAfterInteractive?: () => void;
  onBeforeInteractive?: () => void;
  onError?: () => void;
  onExpired?: (token: string) => void;
  onTimeout?: () => void;
  onUnsupported?: () => void;
  onVerify?: (token: string) => void;
}

export interface CaptchaProps extends CaptchaCallbacks {
  className?: HTMLDivElement['className'];
  id?: HTMLDivElement['id'];
  refreshExpiredMode?: Turnstile.RenderParameters['refresh-expired'];
  sitekey: Turnstile.RenderParameters['sitekey'];
  style?: CSSProperties;
}

export type CaptchaInnerFunctions = {
  reset: () => void;
};

export const Captcha = forwardRef((props: CaptchaProps, ref) => {
  const {
    id,
    className,
    onAfterInteractive,
    onBeforeInteractive,
    onError,
    onExpired,
    onTimeout,
    onUnsupported,
    onVerify,
    refreshExpiredMode,
    sitekey,
    style,
  } = props;
  const divRef = useRef<HTMLDivElement | null>(null);
  const [state, setState] = useState<CaptchaState>(captchaState);
  const widgetIdRef = useRef<null | string>(null);

  useImperativeHandle(
    ref,
    () =>
      ({
        reset: () => {
          if (widgetIdRef.current !== null) {
            globalNamespace.turnstile?.reset(widgetIdRef.current);
          }
        },
      }) satisfies CaptchaInnerFunctions,
    [],
  );

  const updateCaptchaState = useCallback((state: CaptchaState) => {
    captchaState = state;
    setState(state);
  }, []);

  useEffect(() => {
    if (state !== 'ready') {
      globalNamespace[TURNSTILE_LOAD_FUNCTION] = () => {
        updateCaptchaState('ready');
        delete globalNamespace[TURNSTILE_LOAD_FUNCTION];
      };
    }
  }, [state, updateCaptchaState]);

  useEffect(() => {
    if (!divRef.current) {
      return;
    }
    if (sitekey.length === 0) {
      return;
    }
    if (state === 'ready') {
      const turnstileOptions: Turnstile.RenderParameters = {
        'after-interactive-callback': () => {
          onAfterInteractive?.();
        },
        'before-interactive-callback': () => {
          onBeforeInteractive?.();
        },
        callback: (token) => {
          onVerify?.(token);
        },
        'error-callback': () => {
          onError?.();
        },
        'expired-callback': (token) => {
          onExpired?.(token);
        },
        'refresh-expired': refreshExpiredMode,
        sitekey,
        'timeout-callback': () => {
          onTimeout?.();
        },
        'unsupported-callback': () => {
          onUnsupported?.();
        },
      };
      const widgetId =
        globalNamespace.turnstile?.render(divRef.current, turnstileOptions) ??
        null;
      widgetIdRef.current = widgetId;
      return () => {
        widgetIdRef.current = null;
        widgetId && globalNamespace.turnstile?.remove(widgetId);
      };
    }
  }, [
    onAfterInteractive,
    onBeforeInteractive,
    onError,
    onExpired,
    onTimeout,
    onUnsupported,
    onVerify,
    refreshExpiredMode,
    sitekey,
    state,
  ]);

  return <div className={className} id={id} ref={divRef} style={style} />;
});
