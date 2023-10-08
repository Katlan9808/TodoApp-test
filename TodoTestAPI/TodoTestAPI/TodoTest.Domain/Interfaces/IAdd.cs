using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TodoTest.Domain.Interfaces
{
    public interface IAdd<T>
    {
        T Add(T entity);
    }
}
