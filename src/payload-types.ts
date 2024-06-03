/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  collections: {
    'contact-form-records': ContactFormRecord;
    users: User;
    'website-users': WebsiteUser;
    articles: Article;
    'invite-codes': InviteCode;
    'profile-media': ProfileMedia;
    media: Media;
    'article-media': ArticleMedia;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  globals: {
    'home-page': HomePage;
    'about-page': AboutPage;
    'contact-page': ContactPage;
    'kendo-page': KendoPage;
    'news-and-articles-page': NewsAndArticlesPage;
    'rental-page': RentalPage;
    'login-page': LoginPage;
    'member-page': MemberPage;
    general: General;
    'social-media': SocialMedia;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "contact-form-records".
 */
export interface ContactFormRecord {
  id: number;
  name: string;
  email: string;
  message: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  roles?: ('admin' | 'user')[] | null;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "website-users".
 */
export interface WebsiteUser {
  id: number;
  signUpInviteCode?: string | null;
  userRole?: ('none' | 'full_time_kendo_member') | null;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  _verified?: boolean | null;
  _verificationToken?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "articles".
 */
export interface Article {
  id: number;
  image: number | ArticleMedia;
  title: string;
  date: string;
  slug?: string | null;
  summary: string;
  content: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  };
  content_html?: string | null;
  meta?: {
    title?: string | null;
    description?: string | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "article-media".
 */
export interface ArticleMedia {
  id: number;
  alt?: string | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
  sizes?: {
    thumbnail?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    card?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "invite-codes".
 */
export interface InviteCode {
  id: number;
  inviteCode: string;
  usage: number;
  usageCounter?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "profile-media".
 */
export interface ProfileMedia {
  id: number;
  alt?: string | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
  sizes?: {
    thumbnail?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: number;
  alt?: string | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
  sizes?: {
    thumbnail?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    card?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    mobileHero?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    halfHero?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    hero?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: number;
  user:
    | {
        relationTo: 'users';
        value: number | User;
      }
    | {
        relationTo: 'website-users';
        value: number | WebsiteUser;
      };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: number;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "home-page".
 */
export interface HomePage {
  id: number;
  heroImage: number | Media;
  meta?: {
    title?: string | null;
    description?: string | null;
  };
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "about-page".
 */
export interface AboutPage {
  id: number;
  enabled?: boolean | null;
  heroImage: number | Media;
  visionDescription: string;
  missionDescription: string;
  team: {
    profileImage: number | ProfileMedia;
    name: string;
    title?: string | null;
    introduction: string;
    achievements?:
      | {
          title: string;
          description: string;
          id?: string | null;
        }[]
      | null;
    id?: string | null;
  }[];
  meta?: {
    title?: string | null;
    description?: string | null;
  };
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "contact-page".
 */
export interface ContactPage {
  id: number;
  enabled?: boolean | null;
  heroImage: number | Media;
  googleMapEmbededLink: string;
  meta?: {
    title?: string | null;
    description?: string | null;
  };
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "kendo-page".
 */
export interface KendoPage {
  id: number;
  enabled?: boolean | null;
  heroImage: number | Media;
  kendoIntroduction: {
    title: string;
    description: {
      root: {
        type: string;
        children: {
          type: string;
          version: number;
          [k: string]: unknown;
        }[];
        direction: ('ltr' | 'rtl') | null;
        format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
        indent: number;
        version: number;
      };
      [k: string]: unknown;
    };
    description_html?: string | null;
    id?: string | null;
  }[];
  kendoClasses: {
    title: string;
    classSchedule: {
      title: string;
      startTime: string;
      endTime?: string | null;
      id?: string | null;
    }[];
    description: {
      root: {
        type: string;
        children: {
          type: string;
          version: number;
          [k: string]: unknown;
        }[];
        direction: ('ltr' | 'rtl') | null;
        format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
        indent: number;
        version: number;
      };
      [k: string]: unknown;
    };
    description_html?: string | null;
    id?: string | null;
  }[];
  faqs?:
    | {
        title: string;
        description: string;
        id?: string | null;
      }[]
    | null;
  meta?: {
    title?: string | null;
    description?: string | null;
  };
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "news-and-articles-page".
 */
export interface NewsAndArticlesPage {
  id: number;
  enabled?: boolean | null;
  heroImage: number | Media;
  pinnedArticles?: (number | Article)[] | null;
  meta?: {
    title?: string | null;
    description?: string | null;
  };
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "rental-page".
 */
export interface RentalPage {
  id: number;
  enabled?: boolean | null;
  heroImage: number | Media;
  meta?: {
    title?: string | null;
    description?: string | null;
  };
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "login-page".
 */
export interface LoginPage {
  id: number;
  enabled?: boolean | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "member-page".
 */
export interface MemberPage {
  id: number;
  enabled?: boolean | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "general".
 */
export interface General {
  id: number;
  email: string;
  address: string;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "social-media".
 */
export interface SocialMedia {
  id: number;
  facebookUrl?: string | null;
  instagramUrl?: string | null;
  youtubeUrl?: string | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}