import { atom } from 'jotai';

export enum LoginStatus {
  LOGGED_IN,
  EXPIRED,
  UNAUTHORISED,
  UNKNOWN,
}

// TODO: initialise by checking cookie and validate against server
export const loginStateAtom = atom<LoginStatus>(LoginStatus.UNAUTHORISED);
