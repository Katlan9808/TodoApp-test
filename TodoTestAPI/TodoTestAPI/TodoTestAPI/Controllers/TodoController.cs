using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TodoTest.Application.Services;
using TodoTest.DataInfrastructure.Context;
using TodoTest.DataInfrastructure.Repository;
using TodoTest.Domain.Entities;
using TodoTest.Models.Models;
using TodoTestAPI.Validations;

namespace TodoTestAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodoController : ControllerBase
    {

        TodoService createService()
        {
            TodoDbContext db = new TodoDbContext();
            TodoRepository repository = new TodoRepository(db);
            TodoService service = new TodoService(repository);

            return service;
        }

        [HttpGet]
        [Route(nameof(TodoController.Get))]
        public RequestResultModel<List<TodoDTO>> Get()
        {
            RequestResultModel<List<TodoDTO>> response = new RequestResultModel<List<TodoDTO>>();
            var service = createService();
            response.result = service.Get().Select(x => new TodoDTO
            {
                Id = x.ID,
                Description = x.DESCRIPTION,
                State = x.STATE,
            }).ToList();
            return response;
        }


        [HttpPost]
        [Route(nameof(TodoController.Create))]
        public RequestResultModel<TodoDTO> Create(TodoDTO objDto)
        {
            RequestResultModel<TodoDTO> response = new RequestResultModel<TodoDTO>();
            try
            {
                TodoValidation validat = new();
                var validatorResult = validat.Validate(objDto);

                if (validatorResult.Errors.Any())
                {
                    response.isSuccessful = false;
                    response.errorMessage = validatorResult.Errors.Select(s => s.ErrorMessage).Aggregate((a, b) => $"{a}, {b}");

                    return response;
                }

                TODO entity = new TODO
                {
                    ID = Guid.NewGuid(),
                    DESCRIPTION = objDto.Description,
                    STATE = objDto.State,
                };

                var service = createService();
                service.Add(entity);

                response.isSuccessful = true;
                response.result = new TodoDTO { Description = entity.DESCRIPTION };

                return response;
            }
            catch (Exception e)
            {
                response.isSuccessful = false;
                response.result = objDto;
                response.errorMessage = e.StackTrace + " " + e.Message;
                return response;
            }
        }

        [HttpPost]
        [Route(nameof(TodoController.Update))]
        public RequestResultModel<TodoDTO> Update(TodoDTO objDto)
        {
            RequestResultModel<TodoDTO> response = new RequestResultModel<TodoDTO>();
            try
            {
                TodoValidation validat = new();
                var validatorResult = validat.Validate(objDto);

                if (validatorResult.Errors.Any())
                {
                    response.isSuccessful = false;
                    response.errorMessage = validatorResult.Errors.Select(s => s.ErrorMessage).Aggregate((a, b) => $"{a}, {b}");

                    return response;
                }

                TODO entity = new TODO
                {
                    ID = objDto.Id,
                    DESCRIPTION = objDto.Description,
                    STATE = objDto.State,
                };

                var service = createService();
                service.Edit(entity);

                response.isSuccessful = true;
                response.result = new TodoDTO { Description = entity.DESCRIPTION };

                return response;
            }
            catch (Exception e)
            {
                response.isSuccessful = false;
                response.result = objDto;
                response.errorMessage = e.StackTrace + " " + e.Message;
                return response;
            }
        }

        [HttpDelete]
        [Route("{id:guid}")]
        public RequestResultModel<TodoDTO> Delete(Guid id)
        {
            RequestResultModel<TodoDTO> response = new RequestResultModel<TodoDTO>();
            try
            {
                var service = createService();
                service.Delete(id);
                response.isSuccessful = true;
                response.result = new TodoDTO { Id = id};

                return response;
            }
            catch (Exception e)
            {
                response.isSuccessful = false;
                response.result = new TodoDTO { Id = id }; ;
                response.errorMessage = e.StackTrace + " " + e.Message;
                return response;
            }
        }

    }
}
