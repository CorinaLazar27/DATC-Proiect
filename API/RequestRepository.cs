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
    public class RequestRepository : IRequestRepository
    {
        private string connectionString;
        private CloudTableClient tableClient;
        private CloudTable requestsTable;
        private CloudTable historicTable;
        private async Task InitializeTable()
        {
            var account = CloudStorageAccount.Parse( connectionString );
            tableClient = account.CreateCloudTableClient();
            requestsTable = tableClient.GetTableReference( "requests" );
            historicTable = tableClient.GetTableReference( "historic" );
            await requestsTable.CreateIfNotExistsAsync();
            await historicTable.CreateIfNotExistsAsync();
        }

        public RequestRepository(IConfiguration configuration)
        {
            connectionString = configuration.GetValue(typeof(string), "AzureStorageAccountConnectionString").ToString();
            Task.Run(async () => {await InitializeTable(); }).GetAwaiter().GetResult();
        }

        public async Task AddNewHistory(string Latitude, int count)
        {
            var metric = new HistoricEntity(Latitude, DateTime.UtcNow.ToString("yyyy-MM-dd-HH-mm-ss-fffffff"));
            metric.Count = count;

            var addOperation=TableOperation.Insert(metric);
            await historicTable.ExecuteAsync(addOperation);
            
        }

        public async Task<List<RequestEntity>> GetAllRequests()
        {
            var request = new List<RequestEntity>();
            TableQuery<RequestEntity> query = new TableQuery<RequestEntity>();
            TableContinuationToken token = null;
            int count=0;
            
            do
            {
                TableQuerySegment<RequestEntity> segment = await requestsTable.ExecuteQuerySegmentedAsync( query, token );
                token = segment.ContinuationToken;
                request.AddRange( segment.Results );
                foreach(RequestEntity entity in segment.Results)
                {
                    count++;
                }
                await AddNewHistory("Total",count);
                
            }while( token != null );
            return request;

        }

        public async Task<RequestEntity> GetRequest(string id)
        {
            var parsedId = ParseRequestId( id );
            var partitionKey = parsedId.Item1;
            var rowKey = parsedId.Item2;
            var query = TableOperation.Retrieve<RequestEntity>( partitionKey, rowKey );
            var result = await requestsTable.ExecuteAsync( query );
            return (RequestEntity)result.Result;
        }

        public async Task AddNewRequest(RequestEntity request)
        {
            var addOperation=TableOperation.Insert(request);
            await requestsTable.ExecuteAsync(addOperation);
        }

        public async Task DeleteRequest(string id)
        {
            var parsedId = ParseRequestId( id );
            var partitionKey = parsedId.Item1;
            var rowKey = parsedId.Item2;
            
            var entity = new DynamicTableEntity(partitionKey, rowKey)
            {
                ETag="*"
            };
            await requestsTable.ExecuteAsync(TableOperation.Delete(entity));
            
        }

        public async Task EditRequest(RequestEntity request)
        {
            var editOperation=TableOperation.Merge(request);

            try
            {
                await requestsTable.ExecuteAsync(editOperation);
            }
            catch(StorageException e)
            {
                if(e.RequestInformation.HttpStatusCode==(int)HttpStatusCode.PreconditionFailed)
                throw new System.Exception("Cererea a fost deja modificat. Te rog sa reincarci");
            }
        }

        private(string, string) ParseRequestId(string id)
        {
            var element = id.Split('-');
            return( element[0], element[1] );
        }

       
    }
}
