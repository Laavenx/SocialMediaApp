using AutoMapper;
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
        private readonly IMapper _mapper;
        private readonly ITokenService _tokenService;
        private readonly UserManager<AppUser> _userManager;
        private readonly IUnitOfWork _uow;
        public AccountController(UserManager<AppUser> userManager, ITokenService tokenService,
            IMapper mapper, IUnitOfWork uow)
        {
            _uow = uow;
            _mapper = mapper;
            _userManager = userManager;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            
            if (await _userManager.Users.AnyAsync(u => u.UserName == registerDto.Username))
                return BadRequest("Username is taken");

            registerDto.CreatedAt = DateTime.UtcNow;

            var user = _mapper.Map<AppUser>(registerDto);

            user.UUID = user.UUID = Guid.NewGuid().ToString();

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded) BadRequest(result.Errors);

            var roleResults = await _userManager.AddToRoleAsync(user, "Member");

            if (!roleResults.Succeeded) return BadRequest(result.Errors);

            var userUpdate = await _uow.UserRepository.GetUserByUsernameAsync(user.UserName);
            userUpdate.LastActive = DateTime.UtcNow;
            if (await _uow.Complete()) {
                return new UserDto
                {
                    Token = await _tokenService.CreateToken(user),
                    KnownAs = user.KnownAs,
                    Gender = user.Gender,
                    UUID = user.UUID
                };
            }

            return BadRequest("Problem registering");

        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.Users
                .Include(p => p.Photos)
                .SingleOrDefaultAsync(u => u.UserName == loginDto.Username);

            if (user == null) return Unauthorized("Invalid username or password");

            var result = await _userManager.CheckPasswordAsync(user, loginDto.Password);

            if (!result) return Unauthorized("Invalid username or password");

            user.LastActive = DateTime.UtcNow;
            if (await _uow.Complete())
            {
                return new UserDto
                {
                    Token = await _tokenService.CreateToken(user),
                    PhotoUrl = user.Photos.FirstOrDefault(x => x.IsMain)?.Url,
                    KnownAs = user.KnownAs,
                    Gender = user.Gender,
                    UUID = user.UUID
                };
            }

            return BadRequest("Problem logging-in");
        }
    }
}
