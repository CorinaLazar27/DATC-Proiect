using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Table;
using System;

namespace API
{
    public class HistoricRepository : IHistoricRepository
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
            await GetRequest();
        }

        public HistoricRepository(IConfiguration configuration)
        {
            connectionString = configuration.GetValue(typeof(string), "AzureStorageAccountConnectionString").ToString();
            Task.Run(async () => {await InitializeTable(); }).GetAwaiter().GetResult();
        }
        public async Task AddNewHistoric(string status, int count)
        {
            var historic = new HistoricEntity(status, DateTime.UtcNow.ToString("yyyy-MM-dd-HH-mm-ss-fffffff"));
            historic.Count = count;

            var addOperation=TableOperation.Insert(historic);
            await historicTable.ExecuteAsync(addOperation);
            
        }

        public async Task GetRequest()
        {
            TableQuery<RequestEntity> query = new TableQuery<RequestEntity>();
            TableContinuationToken token = null;

            string[] status= new string[10];
            int[] count = new int[10];

            do 
            {
                TableQuerySegment<RequestEntity> resultSegment = await requestsTable.ExecuteQuerySegmentedAsync(query, token);
                token = resultSegment.ContinuationToken;

                int i=0;
                int k=0;
                int lenght=0;
                foreach(RequestEntity entity in resultSegment.Results)
                {
                    if(entity.PartitionKey!=status[k])
                    {
                        k++;
                        status[k]=entity.PartitionKey; 
                    }


                    int index = Array.IndexOf(status, entity.PartitionKey);

                    if (index > -1)
                    {
                        count[index]++;
                    }
                    else
                    {
                        status[i]=entity.PartitionKey;
                        i++;
                    }
                    lenght=index;
                }

               status[lenght+1]="General";
               for(int a=0;a<=lenght;a++)
               {
                   count[lenght+1]+=count[a];
               }
                

                for (int j = 1; j <= lenght+1; j++)
                {
                    await AddNewHistoric(status[j],count[j]);
                }
                
            }while(token != null);
        }
    }
}
