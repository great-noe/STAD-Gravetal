using System.Threading.Tasks;
using STAD.Domain.Entities;
using STAD.Domain.Repositories;
using STAD.Infrastructure.Data;

namespace STAD.Infrastructure.Repositories;

public class MovimientoRepository : IMovimientoRepository
{
    private readonly ApplicationDbContext _context;

    public MovimientoRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task AddAsync(Movimiento movimiento)
    {
        await _context.Movimientos.AddAsync(movimiento);
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}
