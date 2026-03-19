using System.Threading.Tasks;
using STAD.Domain.Entities;
using STAD.Domain.Repositories;
using STAD.Infrastructure.Data;

namespace STAD.Infrastructure.Repositories;

public class ProductorRepository : IProductorRepository
{
    private readonly ApplicationDbContext _context;

    public ProductorRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task AddAsync(Productor productor)
    {
        await _context.Productores.AddAsync(productor);
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}
