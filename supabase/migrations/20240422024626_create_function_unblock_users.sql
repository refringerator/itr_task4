BEGIN;

create 
or replace function unblock_users (user_ids uuid[]) 
returns setof user_type language plpgsql security definer 
set 
  search_path = public as $$ 
  
begin 
    PERFORM check_auth();

    update 
        auth.users 
    set 
        banned_until = null
    where 
        id = any(user_ids);

    return query select * from users_list ();
end;
$$;

REVOKE ALL ON FUNCTION unblock_users (user_ids uuid[]) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION unblock_users (user_ids uuid[]) TO authenticated;

COMMIT;
