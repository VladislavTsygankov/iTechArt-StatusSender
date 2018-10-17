CREATE TABLE [dbo].[StatusHistories]
(
    [Id] INT NOT NULL IDENTITY PRIMARY KEY, 
    [ProjectId] INT NOT NULL,
    [UserId] INT NOT NULL,
    [Status] NVARCHAR(4000) NOT NULL, 
    [Date] DATE NOT NULL, 
    [Time] TIME NOT NULL,
    FOREIGN KEY (ProjectId) REFERENCES Projects (Id)  ON DELETE CASCADE, 
    FOREIGN KEY (UserId) REFERENCES Users (Id)  ON DELETE CASCADE, 
)