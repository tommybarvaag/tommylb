declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GITHUB_API_USERNAME: string;
      GITHUB_API_RELEASE_PAT: string;
      DATABASE_URL: string;
      NEXT_PUBLIC_APP_URL: string;
      TLB_STRAVA_CLIENT_ID: string;
      TLB_STRAVA_CLIENT_SECRET: string;
      TLB_STRAVA_REFRESH_TOKEN: string;
      RESEND_EMAIL_SENDING_API_KEY: string;
      RESEND_EMAIL_RECIPIENT: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
