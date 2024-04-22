import { Button } from "antd";
import { useContext } from "react";
import { SupabaseContext } from "../Context";

const Header = () => {
  const { supabase, session } = useContext(SupabaseContext);

  return (
    session && (
      <>
        <span>Hello, {session.user.email}!</span>
        <Button type="link" onClick={() => supabase?.auth.signOut()}>
          Sign out
        </Button>
      </>
    )
  );
};
export default Header;
