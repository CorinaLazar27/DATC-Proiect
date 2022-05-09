using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class NumberOfUsersController : ControllerBase
    {
        private INumberOfUsersRepository _numberRepository;
        public NumberOfUsersController(INumberOfUsersRepository numberRepository)
        {
            _numberRepository = numberRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<NumberOfUsersEntity>> Get()
        {
            return await _numberRepository.GetAllRequests();
        }
    }
}