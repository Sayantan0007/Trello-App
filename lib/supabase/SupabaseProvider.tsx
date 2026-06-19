"use client";
import { createContext, useContext, useMemo } from "react";
import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { useSession } from "@clerk/nextjs";

type SupabaseContext = {
  supabase: SupabaseClient | null;
  isLoaded: boolean;
};

const Context = createContext<SupabaseContext | undefined>({
  supabase: null,
  isLoaded: false,
});
export default function SupabaseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoaded: isSessionLoaded, session } = useSession();

  const supabase = useMemo(() => {
    if (!isSessionLoaded || !session) return null;

    return createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      {
        accessToken: async () => session.getToken() ?? null,
      },
    );
  }, [isSessionLoaded, session]);

  const isLoaded = isSessionLoaded;

  return (
    <Context.Provider value={{ supabase, isLoaded }}>
      {isLoaded ? children : <div>Loading...</div>}
    </Context.Provider>
  );
}

export const useSupabase = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("useSupabase must be used within a SupabaseProvider");
  }

  return context;
};
