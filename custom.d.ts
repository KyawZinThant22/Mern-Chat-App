// custom.d.ts

declare namespace NodeJS {
    interface ProcessEnv {
      DB_URL: string;
      // Add other environment variables here
    }
  }
  