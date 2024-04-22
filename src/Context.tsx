import { Session, SupabaseClient } from "@supabase/supabase-js";
import { createContext } from "react";
import supabase from "./supabase";

export const SupabaseContext = createContext<{
  supabase: SupabaseClient;
  session: Session | null;
}>({ supabase, session: null });
