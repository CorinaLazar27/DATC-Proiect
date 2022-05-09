using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class RequestController : ControllerBase
    {
        private IRequestRepository _requestRepository;
        public RequestController(IRequestRepository requestRepository)
        {
            _requestRepository = requestRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<RequestEntity>> Get()
        {
            return await _requestRepository.GetAllRequests();
        }

        [HttpGet("{id}")]
        public async Task<RequestEntity> GetRequest([FromRoute] string id)
        {
            return await _requestRepository.GetRequest(id);
        }

        [HttpPost]
        public async Task<string> AddUser([FromBody] RequestEntity request)
        {
            try{
                await _requestRepository.AddNewRequest(request);
                return "Request successfully added!";
            }
            catch(System.Exception e)
            {
                return e.Message;
            }
        }

        [HttpDelete("{id}")]
        public async Task<string> Delete([FromRoute] string id)
        {
            try{
                await _requestRepository.DeleteRequest(id);
                return "Request successfully deleted";
            }
            catch(System.Exception e)
            {
                return e.Message;
            }
        }

        [HttpPut]
        public async Task<string> Edit([FromBody] RequestEntity request)
        {
            try{
                await _requestRepository.EditRequest(request);
                return "Request successfully modified!";
            }
            catch(System.Exception e)
            {
                return e.Message;
            }
        }
    }
}