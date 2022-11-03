using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SocialMediaApp.Data;
using SocialMediaApp.DTOs;
using SocialMediaApp.Entities;
using SQLitePCL;

namespace SocialMediaApp.Controllers
{
    public class AccountController : BaseApiController
    {
        private AppDbContext _context;
        public AccountController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public async Task<ActionResult<AppUser>> Register(RegisterDto registerDto)
        {
            if (await _context.Users.AnyAsync(u => u.UserName == registerDto.UserName))
                return BadRequest("Username is taken");

            var user = new AppUser
            {
                UserName = registerDto.UserName,
                Password = registerDto.Password
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return user;
        }

        [HttpPost("login")]
        public async Task<ActionResult<AppUser>> Login(LoginDto loginDto)
        {
            var user = await _context.Users
                .SingleOrDefaultAsync(u => u.UserName == loginDto.UserName);

            if (user == null) return Unauthorized("Invalid username or password");

            if (loginDto.Password != user.Password) return Unauthorized("Invalid username or password");

            return user;
        }
    }
}
