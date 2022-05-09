using Microsoft.WindowsAzure.Storage.Table;

namespace API
{
    public class RequestEntity : TableEntity
    {
        public RequestEntity(string Latitude, string Longitude)
        {
            this.PartitionKey=Latitude;
            this.RowKey=Longitude;
        }

        public RequestEntity(){}
        public string Adresa{get;set;}
        public string Status{get;set;}

    }
}
