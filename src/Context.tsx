import { SupabaseClient } from "@supabase/supabase-js";
import { createContext } from "react";
import supabase from "./supabase";

export const SupabaseContext = createContext<SupabaseClient>(supabase);
