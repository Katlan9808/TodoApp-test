using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TodoTest.Domain.Interfaces;


namespace TodoTest.Application.Interfaces
{
    public interface ITodoService<T, TId> : IAdd<T>, IEdit<T>, IDelete<TId>, IListE<T, TId>
    {

    }
}
