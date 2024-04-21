BEGIN;

create or replace function get_users() 
returns setof auth.users LANGUAGE plpgsql SECURITY DEFINER set search_path = public
as $$
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
          auth.users 
        where id = userId
      union
        select true 
        
      limit 1) as subquery;

    if is_blocked then
      RAISE sqlstate 'PT401' using
        message = 'Unauthorized';
    end if;   

    return query 
        select * 
        from auth.users 
        order by created_at asc;
end;
$$;

REVOKE ALL ON FUNCTION get_users() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION get_users() TO authenticated;

COMMIT;