using System.Threading.Tasks;
using STAD.Domain.Entities;

namespace STAD.Domain.Repositories;

public interface IMovimientoRepository
{
    Task AddAsync(Movimiento movimiento);
    Task SaveChangesAsync();
}
