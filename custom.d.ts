// custom.d.ts

declare namespace NodeJS {
    interface ProcessEnv {
      DB_URL: string;
      JWT_SECRET : any
      // Add other environment variables here
    }
  }
  