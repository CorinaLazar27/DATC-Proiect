using System.Collections.Generic;
using System.Threading.Tasks;
using API;
public interface IUserRepository
{
    Task<List<UserEntity>> GetAllUsers();
    
    Task<UserEntity> GetUser(string id);
    
    Task AddNewUser(UserEntity user);
    
    Task EditUser(UserEntity user);
    Task DeleteUser(string id);
}