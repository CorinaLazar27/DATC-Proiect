using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class UserController:ControllerBase
    {
        private IUserRepository _userRepository;
        public UserController(IUserRepository userRepository)
        {
            _userRepository=userRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<UserEntity>> Get()
        {
            return await _userRepository.GetAllUsers();
        }

        [HttpGet("{id}")]
        public async Task<UserEntity> GetUser([FromRoute] string id)
        {
            return await _userRepository.GetUser(id);
        }

        [HttpPost]
        public async Task<string> AddUser([FromBody] UserEntity user)
        {
            try{
                await _userRepository.AddNewUser(user);
                return "User successfully added!";
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
                await _userRepository.DeleteUser(id);
                return "User successfully deleted";
            }
            catch(System.Exception e)
            {
                return e.Message;
            }
        }

        [HttpPut]
        public async Task<string> Edit([FromBody] UserEntity user)
        {
            try{
                await _userRepository.EditUser(user);
                return "User successfully modified!";
            }
            catch(System.Exception e)
            {
                return e.Message;
            }
        }
    }
}