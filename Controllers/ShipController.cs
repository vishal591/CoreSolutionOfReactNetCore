using Microsoft.AspNetCore.Mvc;
using Port.Domain.Data;
using Port.Domain.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using Port.Domain.Provider;
using System;
using Port.Domain.ErrorHandling;

namespace Port.Controller
{
    [ApiController]
    [Route("Ship")]
    public class ShipController : ControllerBase
    {
        //public const string API_RESOURCE_NOT_FOUND_ERROR  = "API_RESOURCE_NOT_FOUND_ERROR";
        //private readonly ShipDataContext _context;
        private readonly IShipDataProvider _shipDataProvider;
        public ShipController(ShipDataContext context, IShipDataProvider shipDataProvider)
        {
            _shipDataProvider = shipDataProvider;
        }

        [HttpGet]
        [Route("GetAllShips")]
        public async Task<ActionResult<List<Ship>>> GetAllShips([FromServices] ShipDataContext context)
        {
            try
            {
                var ships = await _shipDataProvider.GetAllShipsAsync();
                if(ships.Count >  0)
                return ships;
                else 
                return Problem(statusCode:404,detail: "No record found",title:ApiErrorCodes.API_RESOURCE_NOT_FOUND_ERROR,type:"internal");
     
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }



        [HttpPost]
        [Route("AddShip")]
        public async Task<ActionResult<Ship>> Post([FromBody] Ship model)
        {
            try
            {
                if (!ModelState.IsValid)
                return BadRequest(ModelState);
                    //return Problem(statusCode:400,detail: "One or more validations failed",title:ApiErrorCodes.API_RESOURCE_VALIDATION_ERROR,type:"internal");

                await _shipDataProvider.AddShipAsync(model);
                return model;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpGet]
        [Route("GetShip/{Id}")]
         public async Task<ActionResult<Ship>> GetShip(int id)
        {
            try
            {
                Ship ship = await _shipDataProvider.GetShipAsync(id);
                if(ship!=null)
                return ship;
                else
                return Problem(statusCode:404,detail: "Record doesnt exist for give Id",title:ApiErrorCodes.API_RESOURCE_NOT_FOUND_ERROR,type:"internal");
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPut]
        [Route("UpdateShip")]
        public async Task<ActionResult<Ship>> UpdateShip([FromBody] Ship model)
        {
            try
            {
                Ship ship = await _shipDataProvider.UpdateShipAsync(model);
                if(ship!=null)
                return ship;
                else
                return Problem(statusCode:404,detail: "Record doesnt exist for give Id",title:ApiErrorCodes.API_RESOURCE_NOT_FOUND_ERROR,type:"internal");
               // return BadRequest(new ApiBadRequestException(ApiErrorCodes.API_RESOURCE_NOT_FOUND_ERROR,"Record doesnt exist for give Id"));
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpDelete]
        [Route("DeleteShip/{Id}")]
        public async Task<ActionResult<bool>> DeleteShip(int id)
        {
            try
            {
              bool result= await _shipDataProvider.DeleteShipAsync(id);
              if(result==true)
              return result;
              else 
              return Problem(statusCode:404,detail: "Record doesnt exist for give Id",title:ApiErrorCodes.API_RESOURCE_NOT_FOUND_ERROR,type:"internal");
              //return BadRequest(new ApiBadRequestException(ApiErrorCodes.API_RESOURCE_NOT_FOUND_ERROR,"Record doesnt exist for give Id"));
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


    }

   
}