CREATE TABLE [dbo].[Projects]
(
    [Id] INT NOT NULL IDENTITY PRIMARY KEY, 
    [Name] NVARCHAR(50) NOT NULL,  
    [TimeForSend] TIME NOT NULL,
    [Greeting] NVARCHAR(100) NULL, 
    [Signature] NVARCHAR(150) NULL, 
    [Addressees] NVARCHAR(200) NULL,
    [CopyAddressees] NVARCHAR(200) NULL, 
    [isSentToday] BIT NOT NULL DEFAULT 0,
)

GO

--CREATE CLUSTERED INDEX [IX_Projects_Id] ON [dbo].[Projects] ([Id])
