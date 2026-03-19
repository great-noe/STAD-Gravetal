using System.Threading.Tasks;
using STAD.Domain.Entities;

namespace STAD.Domain.Repositories;

public interface ILoteRepository
{
    Task AddAsync(Lote lote);
    Task SaveChangesAsync();
}