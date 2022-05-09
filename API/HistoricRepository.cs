using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Table;
using API;
using System;

namespace API
{
    public class HistoricRepository : IHistoricRepository
    {
        private string connectionString;
        private CloudTableClient tableClient;
        private CloudTable historicTable;
        private async Task InitializeTable()
        {
            var account = CloudStorageAccount.Parse( connectionString );
            tableClient = account.CreateCloudTableClient();
            historicTable = tableClient.GetTableReference( "historic" );
            await historicTable.CreateIfNotExistsAsync();
        }

        public HistoricRepository(IConfiguration configuration)
        {
            connectionString = configuration.GetValue(typeof(string), "AzureStorageAccountConnectionString").ToString();
            Task.Run(async () => {await InitializeTable(); }).GetAwaiter().GetResult();
        }


        public async Task<List<HistoricEntity>> GetAllRequests()
        {
            var request = new List<HistoricEntity>();
            TableQuery<HistoricEntity> query = new TableQuery<HistoricEntity>();
            TableContinuationToken token = null;
            
            do
            {
                TableQuerySegment<HistoricEntity> segment = await historicTable.ExecuteQuerySegmentedAsync( query, token );
                token = segment.ContinuationToken;
                request.AddRange( segment.Results );
                
            }while( token != null );
            return request;

        }
    }
}
