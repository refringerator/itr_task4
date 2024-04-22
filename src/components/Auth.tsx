import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useContext } from "react";
import { SupabaseContext } from "../Context";

const Auth = () => {
  const { supabase } = useContext(SupabaseContext);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <SupabaseAuth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={[]}
      />
    </div>
  );
};

export default Auth;
