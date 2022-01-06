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
    public class UserRepository : IUserRepository
    {
        private string connectionString;
        private CloudTableClient tableClient;
        private CloudTable usersTable;
        private CloudTable numberOfUsersTable;
        private async Task InitializeTable()
        {
            var account = CloudStorageAccount.Parse( connectionString );
            tableClient = account.CreateCloudTableClient();
            usersTable = tableClient.GetTableReference( "users" );
            numberOfUsersTable = tableClient.GetTableReference( "numberOfUsers" );
            await usersTable.CreateIfNotExistsAsync();
            await numberOfUsersTable.CreateIfNotExistsAsync();
        }

        public UserRepository(IConfiguration configuration)
        {
            connectionString = configuration.GetValue(typeof(string), "AzureStorageAccountConnectionString").ToString();
            Task.Run(async () => {await InitializeTable(); }).GetAwaiter().GetResult();
        }
        public async Task AddNewNumberOfUsers(string typeOfUser, int count)
        {
            var numberodusers = new NumberOfUsersEntity(typeOfUser, DateTime.UtcNow.ToString("yyyy-MM-dd-HH-mm-ss-fffffff"));
            numberodusers.Count = count;

            var addOperation=TableOperation.Insert(numberodusers);
            await numberOfUsersTable.ExecuteAsync(addOperation);
            
        }

         public async Task<List<UserEntity>> GetAllUsers()
        {
            var user = new List<UserEntity>();
            TableQuery<UserEntity> query = new TableQuery<UserEntity>();
            TableContinuationToken token = null;

            int count=0;
            string[] type = new string[10];
            
            do
            {
                TableQuerySegment<UserEntity> segment = await usersTable.ExecuteQuerySegmentedAsync( query, token );
                token = segment.ContinuationToken;
                user.AddRange( segment.Results );
                
                foreach(UserEntity entity in segment.Results)
                {
                    count ++; 
                }
               await AddNewNumberOfUsers("Total",count);
            }while( token != null );
            return user;
        }

        public async Task<UserEntity> GetUser(string id)
        {
            var parsedId = ParseUserId( id );
            var partitionKey = parsedId.Item1;
            var rowKey = parsedId.Item2;
            var query = TableOperation.Retrieve<UserEntity>( partitionKey, rowKey );
            var result = await usersTable.ExecuteAsync( query );
            return (UserEntity)result.Result;
        }

        public async Task AddNewUser(UserEntity user)
        {
            var addOperation=TableOperation.Insert(user);
            await usersTable.ExecuteAsync(addOperation);
        }

        public async Task DeleteUser(string id)
        {
            var parsedId = ParseUserId( id );
            var partitionKey = parsedId.Item1;
            var rowKey = parsedId.Item2;
            
            var entity = new DynamicTableEntity(partitionKey, rowKey)
            {
                ETag="*"
            };
            await usersTable.ExecuteAsync(TableOperation.Delete(entity));
            
        }

        public async Task EditUser(UserEntity user)
        {
            var editOperation=TableOperation.Merge(user);

            try
            {
                await usersTable.ExecuteAsync(editOperation);
            }
            catch(StorageException e)
            {
                if(e.RequestInformation.HttpStatusCode==(int)HttpStatusCode.PreconditionFailed)
                throw new System.Exception("Userul a fost deja modificat. Te rog sa reincarci");
            }
        }

        private(string, string) ParseUserId(string id)
        {
            var element = id.Split('-');
            return( element[0], element[1] );
        }

       
    }
}
