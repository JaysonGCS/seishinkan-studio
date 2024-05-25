export const TOAST_ERROR_DURATION = 10000;
export const TOAST_INFO_DURATION = 5000;

export const SSK_WEB_COOKIE_HEADER = 'ssk-web-token';
export const SSK_WEB_LOGIN_STATUS_HEADER = 'ssk-web-logged-in';

export const TURNSTILE_LOAD_FUNCTION = '__TurnstileOnLoad';
export const TURNSTILE_SCRIPT = `https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=${TURNSTILE_LOAD_FUNCTION}`;
