import type { GenerateTitle } from '@payloadcms/plugin-seo/types';

import { webpackBundler } from '@payloadcms/bundler-webpack';
import { postgresAdapter } from '@payloadcms/db-postgres';
import seoPlugin from '@payloadcms/plugin-seo';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { buildConfig } from 'payload/config';

import { Articles } from './cms/collections/Articles';
import { ContactFormRecords } from './cms/collections/ContactFormRecords';
import { InviteCodes } from './cms/collections/InviteCodes';
import { Users } from './cms/collections/Users';
import { WebsiteUsers } from './cms/collections/WebsiteUsers';
import { DashboardHeader } from './cms/components/DashboardHeader';
import { General } from './cms/globals/General';
import { SocialMedia } from './cms/globals/SocialMedia';
import { AboutPage } from './cms/globals/pages/AboutPage';
import { ContactPage } from './cms/globals/pages/ContactPage';
import { HomePage } from './cms/globals/pages/HomePage';
import { KendoPage } from './cms/globals/pages/KendoPage';
import { LoginPage } from './cms/globals/pages/LoginPage';
import { MemberPage } from './cms/globals/pages/MemberPage';
import { NewsAndArticlesPage } from './cms/globals/pages/NewsAndArticlesPage';
import { RentalPage } from './cms/globals/pages/RentalPage';

const generateArticleTitle: GenerateTitle = (props) => {
  const doc = props.doc as { title: { value: string } };
  return `Seishinkansg.com — ${doc.title.value}`;
};

export default buildConfig({
  admin: {
    bundler: webpackBundler(),
    components: { beforeDashboard: [DashboardHeader] },
  },
  collections: [ContactFormRecords, Users, WebsiteUsers, Articles, InviteCodes],
  cookiePrefix: 'ssk',
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
  editor: lexicalEditor({}),
  globals: [
    HomePage,
    AboutPage,
    ContactPage,
    KendoPage,
    NewsAndArticlesPage,
    RentalPage,
    LoginPage,
    MemberPage,
    General,
    SocialMedia,
  ],
  plugins: [
    seoPlugin({
      globals: [
        'home-page',
        'about-page',
        'contact-page',
        'kendo-page',
        'news-and-articles-page',
        'rental-page',
      ],
    }),
    seoPlugin({
      collections: ['articles'],
      generateTitle: generateArticleTitle,
    }),
  ],
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || '',
  telemetry: false,
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
});
