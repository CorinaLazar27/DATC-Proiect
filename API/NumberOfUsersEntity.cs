using Microsoft.WindowsAzure.Storage.Table;

namespace API
{
    public class NumberOfUsersEntity : TableEntity
    {
        public NumberOfUsersEntity(string Email, string Timestamp)
        {
            this.PartitionKey=Email;
            this.RowKey=Timestamp;
        }

        public NumberOfUsersEntity(){}

        public int Count{get;set;}

    }
}
