using System.Threading.Tasks;
using STAD.Domain.Entities;
using STAD.Domain.Repositories;
using STAD.Infrastructure.Data;

namespace STAD.Infrastructure.Repositories;

public class SiloRepository : ISiloRepository
{
    private readonly ApplicationDbContext _context;

    public SiloRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task AddAsync(Silo silo)
    {
        await _context.Silos.AddAsync(silo);
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}
