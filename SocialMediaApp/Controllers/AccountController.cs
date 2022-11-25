using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SocialMediaApp.Data;
using SocialMediaApp.DTOs;
using SocialMediaApp.Entities;
using SocialMediaApp.Interfaces;
using SQLitePCL;

namespace SocialMediaApp.Controllers
{
    public class AccountController : BaseApiController
    {
        private AppDbContext _context;
        private ITokenService _tokenService;
        public AccountController(AppDbContext context, ITokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await _context.Users.AnyAsync(u => u.UserName == registerDto.Username))
                return BadRequest("Username is taken");

            var user = new AppUser
            {
                UserName = registerDto.Username,
                Password = registerDto.Password
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return new UserDto
            {
                Username = user.UserName,
                Token = _tokenService.createToken(user)
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _context.Users
                .SingleOrDefaultAsync(u => u.UserName == loginDto.Username);

            if (user == null) return Unauthorized("Invalid username or password");

            if (loginDto.Password != user.Password) return Unauthorized("Invalid username or password");

            return new UserDto
            {
                Username = user.UserName,
                Token = _tokenService.createToken(user)
            };
        }
    }
}
