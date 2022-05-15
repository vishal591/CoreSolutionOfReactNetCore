using Port.Domain.Models;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace Port.Domain.Provider
{
    public interface IShipDataProvider
    {
        Task<List<Ship>> GetAllShipsAsync();
        Task<Ship> AddShipAsync(Ship entity);
        Task<bool> DeleteShipAsync(int shipId);
        Task<Ship> GetShipAsync(int shipId);
        Task<Ship> UpdateShipAsync( Ship entity);
    }
}