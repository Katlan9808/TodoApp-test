using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TodoTest.Application.Interfaces;
using TodoTest.Domain.Entities;
using TodoTest.Domain.Repository;


namespace TodoTest.Application.Services
{
    public class TodoService : IBaseService<TODO, Guid>
    {
        private readonly IBaseRepository<TODO, Guid> _todoRepository;

        public TodoService(IBaseRepository<TODO, Guid> todoRepository)
        {
            _todoRepository = todoRepository;
        }

        public TODO Add(TODO entity)
        {
            var result = _todoRepository.Add(entity); ;
            _todoRepository.saveChanges();
            return result;
        }

        public Guid Delete(Guid entity)
        {
            var result = _todoRepository.Delete(entity); ;
            _todoRepository.saveChanges();
            return result;
        }

        public TODO Edit(TODO entity)
        {
            var result = _todoRepository.Edit(entity); 
            _todoRepository.saveChanges();
            return result;
        }

        public TODO GeById(Guid TId)
        {
            var result = _todoRepository.GeById(TId); ;
            return result;
        }

        public List<TODO> Get()
        {
            var result = _todoRepository.Get(); ;
            return result;
        }
    }
}
