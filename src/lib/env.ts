export const ENV = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL,
  serviceRole: process.env.SUPABASE_SERVICE_ROLE_KEY,
};

if (!ENV.url || !ENV.serviceRole) {
  throw new Error("Missing Supabase env vars");
}
