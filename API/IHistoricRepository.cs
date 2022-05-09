using System.Collections.Generic;
using System.Threading.Tasks;
using API;
public interface IHistoricRepository
{
     Task<List<HistoricEntity>> GetAllRequests();
}