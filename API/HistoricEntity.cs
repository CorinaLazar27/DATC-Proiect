using Microsoft.WindowsAzure.Storage.Table;

namespace API
{
    public class HistoricEntity : TableEntity
    {
        public HistoricEntity(string Status, string TimeStamp)
        {
            this.PartitionKey=Status;
            this.RowKey=TimeStamp;
        }

        public HistoricEntity(){}

        public int Count{get;set;}

    }
}
