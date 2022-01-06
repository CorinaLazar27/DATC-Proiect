using Microsoft.WindowsAzure.Storage.Table;

namespace API
{
    public class HistoricEntity : TableEntity
    {
        public HistoricEntity(string Latitude, string Timestamp)
        {
            this.PartitionKey=Latitude;
            this.RowKey=Timestamp;
        }

        public HistoricEntity(){}

        public int Count{get;set;}

    }
}
