using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class HistoricController : ControllerBase
    {
        private IHistoricRepository _historicRepository;
        public HistoricController(IHistoricRepository historicRepository)
        {
            _historicRepository = historicRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<HistoricEntity>> Get()
        {
            return await _historicRepository.GetAllRequests();
        }
    }
}