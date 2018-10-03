CREATE TABLE [dbo].[Reminders]
(
	[Id] INT NOT NULL PRIMARY KEY, 
    [value] TIME NOT NULL, 
    [UserId] INT NOT NULL, 
	FOREIGN KEY (UserId) REFERENCES Users (Id),
)
