@echo off 

SET datetimestamp=%date:~6,8%%date:~3,2%%date:~0,2%%time:~0,2%%time:~3,2%%time:~6,2%

SET backupdir=E:\DatabaseBackup
SET mysqluername=root
SET mysqlpassword=raj2neo
SET database=shipping

"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqldump.exe" -u root -praj2neo %database%> E:\dbbackup\shipping_%datetimestamp%.sql
