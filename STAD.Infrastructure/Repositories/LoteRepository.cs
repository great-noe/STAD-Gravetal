using System.Threading.Tasks;
using STAD.Domain.Entities;
using STAD.Domain.Repositories;
using STAD.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace STAD.Infrastructure.Repositories;

public class LoteRepository : ILoteRepository
{
    private readonly ApplicationDbContext _context;

    public LoteRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task AddAsync(Lote lote)
    {
        await _context.Lotes.AddAsync(lote);
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
    public async Task<List<Lote>> ObtenerTodosAsync()
    {
        // Va a la base de datos y trae todos los lotes en forma de lista
        return await _context.Lotes.ToListAsync();
    }
}