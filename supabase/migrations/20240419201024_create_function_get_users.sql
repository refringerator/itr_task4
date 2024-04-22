BEGIN;

create
or replace function get_users () returns setof user_type 
LANGUAGE plpgsql SECURITY DEFINER
set
  search_path = public as $$

begin
    PERFORM check_auth();

    return query select * from users_list ();
end;
$$;

REVOKE ALL ON FUNCTION get_users () FROM PUBLIC;
GRANT EXECUTE ON FUNCTION get_users () TO authenticated;

COMMIT;
