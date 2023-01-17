create or alter procedure getAllCaffine
as
begin
select *from caffine where isDelete !=1
end