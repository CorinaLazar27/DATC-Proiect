using System.Collections.Generic;
using System.Threading.Tasks;
using API;
public interface INumberOfUsersRepository
{
     Task<List<NumberOfUsersEntity>> GetAllRequests();
}