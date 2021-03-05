@echo off
REM ----------------------------------------------------------------
REM Create a directory to save mysql backup files if not already exists REM ----------------------------------------------------------------

IF NOT EXIST "C:\Database_Backup" mkdir C:\Database_Backup

REM ----------------------------------------------------------------
REM append date and time to mysqldump files
REM ----------------------------------------------------------------

SET dt=%date:~-4%_%date:~3,2%_%date:~0,2%_%time:~0,2%_%time:~3,2%_%time:~6,2%


set bkupfilename=%dt%.sql

REM ----------------------------------------------------------------
REM Display some message on the screen about the backup
REM ----------------------------------------------------------------
ECHO Starting Database Backup
ECHO Backup is going to save in C:\Database_Backup\ folder.
ECHO Please wait ...

REM ----------------------------------------------------------------
REM mysqldump backup command. append date and time in filename
REM ----------------------------------------------------------------

"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqldump.exe"  --routines -u root -praj2neo shipping> C:\Database_Backup\"shipping_%bkupfilename%"

REM ----------------------------------------------------------------
REM delete mysqldump backups older than 60 days
REM ----------------------------------------------------------------

ECHO.
ECHO deleting backups older than 60 days if found....
forfiles /p C:\Database_Backup /s /m *.* /d -3 /c "cmd /c del @file : date >= 60days"

ECHO.
ECHO Backup completed !
ECHO Backup saved in C:\Database_Backup


PAUSE

REM Show user the backup files
REM EXPLORER C:\Database_Backup
EXIT
