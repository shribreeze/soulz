declare namespace NodeJS {
    interface ProcessEnv {
        ASI_API_KEY: string;
        ASI_ONE_API_KEY: string;
        NEXT_PUBLIC_ASI_ENDPOINT: string;
        NEXT_PUBLIC_ASI_AGENTIC_MODEL: string;
        NEXT_PUBLIC_ASI_MINI_MODEL: string;
        SUPABASE_URL: string;
        SUPABASE_KEY: string;
    }
}
