CREATE TABLE [dbo].[Reminders]
(
    [Id] INT NOT NULL IDENTITY PRIMARY KEY, 
    [Value] TIME NOT NULL, 
    [UserId] INT NOT NULL, 
    FOREIGN KEY (UserId) REFERENCES Users (Id)  ON DELETE CASCADE,
)

GO

CREATE NONCLUSTERED INDEX [IX_Reminders_UserId] ON [dbo].[Reminders] ([UserId])
