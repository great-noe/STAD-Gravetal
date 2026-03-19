using System.Threading.Tasks;
using STAD.Domain.Entities;

namespace STAD.Domain.Repositories;

public interface ISiloRepository
{
    Task AddAsync(Silo silo);
    Task SaveChangesAsync();
}
