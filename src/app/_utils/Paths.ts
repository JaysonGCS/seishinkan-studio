import type {
  AboutPage,
  ContactPage,
  HomePage,
  KendoPage,
  LoginPage,
  MemberPage,
  NewsAndArticlesPage,
  RentalPage,
} from '@/src/payload-types';
import type { GeneratedTypes } from 'payload';

export enum MainPage {
  ABOUT = '/about',
  CONTACT = '/contact',
  HOME = '/',
  KENDO = '/kendo',
  LOGIN = '/login',
  MEMBER = '/member',
  NEWS_AND_ARTICLES = '/news-and-articles',
  RENTAL = '/rental',
}

export enum OtherPage {
  LOGOUT = '/logout',
}

export const isOtherPage = (path: string): path is OtherPage => {
  return Object.values<string>(OtherPage).includes(path);
};

export const ValidPageSlugRecord: Record<
  keyof GeneratedTypes['globals'],
  keyof GeneratedTypes['globals'] | undefined
> = {
  'about-page': 'about-page',
  'contact-page': 'contact-page',
  general: undefined,
  'home-page': 'home-page',
  'kendo-page': 'kendo-page',
  'login-page': 'login-page',
  'member-page': 'member-page',
  'news-and-articles-page': 'news-and-articles-page',
  'rental-page': 'rental-page',
  'social-media': undefined,
};

export const isMainPage = (path: string): path is MainPage => {
  return Object.values<string>(MainPage).includes(path);
};

export const isPageSlug = (
  pageSlug: string,
): pageSlug is keyof GeneratedTypes['globals'] => {
  return ValidPageSlugRecord[pageSlug] !== undefined;
};

export const pageToAnchor = {
  [MainPage.KENDO]: {
    classes: 'kendo-classes',
    faq: 'faq',
    introduction: 'introduction',
  },
};

export const pageToCollectionSlugRecord: Record<
  MainPage,
  keyof GeneratedTypes['globals']
> = {
  [MainPage.ABOUT]: 'about-page',
  [MainPage.CONTACT]: 'contact-page',
  [MainPage.HOME]: 'home-page',
  [MainPage.KENDO]: 'kendo-page',
  [MainPage.LOGIN]: 'login-page',
  [MainPage.MEMBER]: 'member-page',
  [MainPage.NEWS_AND_ARTICLES]: 'news-and-articles-page',
  [MainPage.RENTAL]: 'rental-page',
};

export type MainPageToPageDetails = {
  [MainPage.ABOUT]: AboutPage;
  [MainPage.CONTACT]: ContactPage;
  [MainPage.HOME]: HomePage;
  [MainPage.KENDO]: KendoPage;
  [MainPage.LOGIN]: LoginPage;
  [MainPage.MEMBER]: MemberPage;
  [MainPage.NEWS_AND_ARTICLES]: NewsAndArticlesPage;
  [MainPage.RENTAL]: RentalPage;
};
