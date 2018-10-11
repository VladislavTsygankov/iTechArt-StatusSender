CREATE TABLE [dbo].[Projects]
(
    [Id] INT NOT NULL IDENTITY PRIMARY KEY, 
    [Name] NVARCHAR(50) NOT NULL,  
    [TimeForSend] TIME NOT NULL,
    [Greeting] NVARCHAR(50) NULL, 
    [Signature] NVARCHAR(50) NULL, 
    [Addressees] NVARCHAR(200) NOT NULL,
    [CopyAddressees] NVARCHAR(200) NULL
)
