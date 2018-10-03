CREATE TABLE [dbo].[Projects]
(
	[Id] INT NOT NULL IDENTITY PRIMARY KEY, 
    [name] NVARCHAR(50) NOT NULL, 
    [timeForSend] TIME NOT NULL, 
    [greeting] NVARCHAR(50) NULL, 
    [signature] NVARCHAR(50) NULL, 
    [addressees] NVARCHAR(50) NOT NULL, 
    [copyAddressees] NVARCHAR(50) NULL
)
