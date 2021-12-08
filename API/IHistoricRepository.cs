using System.Collections.Generic;
using System.Threading.Tasks;
using API;
public interface IHistoricRepository
{
    Task GetRequest();
    Task AddNewHistoric(string status, int count);
}