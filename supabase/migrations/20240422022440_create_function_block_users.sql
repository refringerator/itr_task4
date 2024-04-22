BEGIN;
create 
or replace function block_users (user_ids uuid[]) returns void language plpgsql security definer 
set 
  search_path = public as $$ 
  
begin 
PERFORM check_auth();

update 
  auth.users 
set 
  banned_until = '3000-01-31 23:59:59.999999+14' :: timestamp with time zone 
where 
  id = any(user_ids);
end;
$$;
REVOKE ALL ON FUNCTION block_users (user_ids uuid[]) 
FROM 
  PUBLIC;
GRANT EXECUTE ON FUNCTION block_users (user_ids uuid[]) TO authenticated;
GRANT USAGE ON SCHEMA public TO authenticated;
COMMIT;
