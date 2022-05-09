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
    public class NumberOfUsersRepository : INumberOfUsersRepository
    {
        private string connectionString;
        private CloudTableClient tableClient;
        private CloudTable numberTable;
        private async Task InitializeTable()
        {
            var account = CloudStorageAccount.Parse( connectionString );
            tableClient = account.CreateCloudTableClient();
            numberTable = tableClient.GetTableReference( "numberOfUsers" );
            await numberTable.CreateIfNotExistsAsync();
        }

        public NumberOfUsersRepository(IConfiguration configuration)
        {
            connectionString = configuration.GetValue(typeof(string), "AzureStorageAccountConnectionString").ToString();
            Task.Run(async () => {await InitializeTable(); }).GetAwaiter().GetResult();
        }


        public async Task<List<NumberOfUsersEntity>> GetAllRequests()
        {
            var request = new List<NumberOfUsersEntity>();
            TableQuery<NumberOfUsersEntity> query = new TableQuery<NumberOfUsersEntity>();
            TableContinuationToken token = null;
            
            do
            {
                TableQuerySegment<NumberOfUsersEntity> segment = await numberTable.ExecuteQuerySegmentedAsync( query, token );
                token = segment.ContinuationToken;
                request.AddRange( segment.Results );
                
            }while( token != null );
            return request;

        }
    }
}
