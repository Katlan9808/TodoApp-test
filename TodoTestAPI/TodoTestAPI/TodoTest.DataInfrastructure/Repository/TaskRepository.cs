using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using TodoTest.DataInfrastructure.Context;
using TodoTest.Domain.Entities;
using TodoTest.Domain.Interfaces;
using TodoTest.Domain.Repository;

namespace TodoTest.DataInfrastructure.Repository
{
    public class TodoRepository : IBaseRepository<TODO, Guid>
    {
        private TodoDbContext _db;

        public TodoRepository(TodoDbContext db)
        {
            this._db = db;
        }

        public TODO Add(TODO entity)
        {
            _db.Add(entity);
            return entity;
        }

        public Guid Delete(Guid id)
        {
            var register = _db.TODO.Where(w => w.ID.Equals(id)).FirstOrDefault();

            if (register != null)
                _db.TODO.Remove(register);

            return id;

        }

        public TODO Edit(TODO entity)
        {
            var register = _db.TODO.Where(w => w.ID.Equals(entity.ID)).FirstOrDefault();
            if (register != null)
            {
                register.STATE = entity.STATE;

                _db.Entry(register).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            }
            return register;
        }

        public TODO GeById(Guid TId)
        {
            return _db.TODO.Where(x => x.ID.Equals(TId)).FirstOrDefault();
        }

        public List<TODO> Get()
        {
            return _db.TODO.ToList();
        }

        public void saveChanges()
        {
            _db.SaveChanges();
        }

    }
}
