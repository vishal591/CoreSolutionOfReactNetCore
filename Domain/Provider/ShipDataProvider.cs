using Port.Domain.Models;
using System.Threading.Tasks;
using System.Collections.Generic;
using Port.Domain.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace Port.Domain.Provider
{
    public class ShipDataProvider : IShipDataProvider
    {
        private readonly ShipDataContext _context;
       private readonly NumberGenerator _numbergenerator;
        public ShipDataProvider(ShipDataContext context, NumberGenerator numbergenerator)
        {
            _context = context;
            _numbergenerator = numbergenerator;
        }
  
        public async Task<List<Ship>> GetAllShipsAsync()
        {
            if (_context != null)
            {
                var ships = await _context.Ships.ToListAsync();
                return ships;
            }
            return null;
        }

        public async Task<Ship> AddShipAsync(Ship entity)
        {
            if ((_context != null) && (entity != null))
            {
                 entity.Code = Convert.ToString(entity.Code).ToUpper();
                _context.Ships.Add(entity);
                await _context.SaveChangesAsync();
                return entity;
            }
            return null;
        }
        public async Task<bool> DeleteShipAsync(int shipId)
        {
            if (_context != null)
            {
                Ship shipObj = _context.Ships.Where(ship => ship.Id == shipId).SingleOrDefault();
                if (shipObj != null)
                {
                    _context.Ships.Remove(shipObj);
                    await _context.SaveChangesAsync();
                    return true;
                }
                return false;
            }
            return false;
        }

        public async Task<Ship> GetShipAsync(int shipId)
        {
            if (_context != null)
            {
                Ship ship = await _context.Ships.Where(temp => temp.Id == shipId).SingleOrDefaultAsync();
                return ship;
            }
            return null;
        }

        public async Task<Ship> UpdateShipAsync(Ship entity)
        {
            Ship existingShip = await _context.Ships.Where(temp => temp.Id == entity.Id).SingleAsync();
            if ((existingShip != null) && (_context != null))
            {
                entity.Id = existingShip.Id;
                _context.Entry(existingShip).CurrentValues.SetValues(entity);
                await _context.SaveChangesAsync();
                return entity;
            }
            return null;
        }
    }
}