CREATE TABLE [dbo].[StatusHistory]
(
	[Id] INT NOT NULL IDENTITY PRIMARY KEY, 
    [ProjectId] INT NOT NULL,
	[UserId] INT NOT NULL,
    [status] CHAR(10) NOT NULL, 
    [date] DATE NOT NULL, 
    [time] NCHAR(10) NOT NULL,
	FOREIGN KEY (ProjectId) REFERENCES Projects (Id), 
	FOREIGN KEY (UserId) REFERENCES Users (Id), 
)
