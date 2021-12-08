using Microsoft.WindowsAzure.Storage.Table;

namespace API
{
    public class RequestEntity : TableEntity
    {
        public RequestEntity(string Email, string TimeStamp)
        {
            this.PartitionKey=Email;
            this.RowKey=TimeStamp;
        }

        public RequestEntity(){}

        public double Latitude{get;set;}
        public double Longitude{get;set;}
        public string Status{get;set;}

    }
}
