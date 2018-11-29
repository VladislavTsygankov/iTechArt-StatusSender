CREATE TABLE [dbo].[Users]
(
    [Id] INT NOT NULL IDENTITY PRIMARY KEY, 
    [Username] NVARCHAR(50) NOT NULL, 
    [Password] NVARCHAR(100) NOT NULL, 
    [Role] NVARCHAR(50) NOT NULL
) 

GO

CREATE NONCLUSTERED INDEX [IX_Users_Username] ON [dbo].[Users] ([Username])
