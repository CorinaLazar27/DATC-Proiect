using Microsoft.WindowsAzure.Storage.Table;

namespace API
{
    public class UserEntity : TableEntity
    {
        public UserEntity(string Email, string TypeOfUser)
        {
            this.PartitionKey=Email;
            this.RowKey=TypeOfUser;
        }

        public UserEntity(){}

        public string FirstName{get;set;}
        public string LastName{get;set;}
        public string Password{get;set;}

    }
}
