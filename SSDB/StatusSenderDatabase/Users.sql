CREATE TABLE [dbo].[Users]
(
	[Id] INT NOT NULL IDENTITY PRIMARY KEY, 
    [username] NVARCHAR(50) NOT NULL, 
    [password] NVARCHAR(50) NOT NULL, 
    [role] CHAR(10) NOT NULL
)
