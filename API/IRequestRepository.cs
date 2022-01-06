using System.Collections.Generic;
using System.Threading.Tasks;
using API;
public interface IRequestRepository
{
     Task<List<RequestEntity>> GetAllRequests();
    
    Task<RequestEntity> GetRequest(string id);
    
    Task AddNewRequest(RequestEntity request);
    
    Task EditRequest(RequestEntity request);
    Task DeleteRequest(string id);
}