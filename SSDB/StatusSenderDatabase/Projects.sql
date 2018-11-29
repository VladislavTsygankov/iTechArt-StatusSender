CREATE TABLE [dbo].[Projects]
(
    [Id] INT NOT NULL IDENTITY PRIMARY KEY, 
    [Name] NVARCHAR(50) NOT NULL,  
    [TimeForSend] TIME NOT NULL,
    [Greeting] NVARCHAR(100) NULL, 
    [Signature] NVARCHAR(150) NULL, 
    [Addressees] NVARCHAR(200) NULL,
    [CopyAddressees] NVARCHAR(200) NULL, 
    [LastSentDate] DATE NULL ,
)

GO

CREATE NONCLUSTERED INDEX [IX_Projects_Name] ON [dbo].[Projects] ([Name])

GO 

CREATE NONCLUSTERED INDEX [IX_Projects_TimForSend] ON [dbo].[Projects] ([TimeForSend])

GO 

CREATE NONCLUSTERED  INDEX [IX_Projects_TimeForSend] ON [dbo].[Projects] ([LastSentDate])
