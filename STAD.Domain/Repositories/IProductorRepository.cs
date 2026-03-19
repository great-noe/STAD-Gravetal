using System.Threading.Tasks;
using STAD.Domain.Entities;

namespace STAD.Domain.Repositories;

public interface IProductorRepository
{
    Task AddAsync(Productor productor);
    Task SaveChangesAsync();
}
