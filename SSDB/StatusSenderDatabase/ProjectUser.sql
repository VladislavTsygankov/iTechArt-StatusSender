CREATE TABLE [dbo].[ProjectUser]
(
	[Id] INT NOT NULL IDENTITY PRIMARY KEY, 
    [ProjectId] INT NOT NULL,
	[UserId] INT NOT NULL, 
    FOREIGN KEY (ProjectId) REFERENCES Projects (Id), 
	FOREIGN KEY (UserId) REFERENCES Users (Id), 
)
