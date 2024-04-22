BEGIN;

create
or replace function check_auth () returns VOID LANGUAGE plpgsql SECURITY DEFINER
set
  search_path = public as $$
declare 
  userId uuid;
  is_blocked boolean;

begin
    userId = auth.uid();
    if userId IS NULL then
      RAISE sqlstate 'PT401' using
        message = 'Unauthorized';
    end if;   

    select is_b into is_blocked from (
      select
          case when banned_until is not null then true else false end as is_b
        from 
          auth.users as users
        where users.id = userId
      union
        select true 
        
      limit 1) as subquery;

    if is_blocked then
      RAISE sqlstate 'PT401' using
        message = 'Unauthorized';
    end if;   

end;
$$;

REVOKE ALL ON FUNCTION check_auth () FROM PUBLIC;
GRANT EXECUTE ON FUNCTION check_auth () TO authenticated;
GRANT USAGE ON SCHEMA public TO authenticated;

COMMIT;
