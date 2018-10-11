CREATE TABLE [dbo].[Reminders]
(
    [Id] INT NOT NULL IDENTITY PRIMARY KEY, 
    [Value] TIME NOT NULL, 
    [UserId] INT NOT NULL, 
    FOREIGN KEY (UserId) REFERENCES Users (Id),
)
