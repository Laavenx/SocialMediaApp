using Microsoft.AspNetCore.Components.Forms;
using Microsoft.AspNetCore.Mvc;
using SocialMediaApp.DTOs;
using SocialMediaApp.Entities;
using SocialMediaApp.Extensions;
using SocialMediaApp.Helpers;
using SocialMediaApp.Interfaces;

namespace SocialMediaApp.Controllers
{
    public class LikesController : BaseApiController
    {
        private readonly IUnitOfWork _uow;
        public LikesController(IUnitOfWork uow)
        {
            _uow = uow;
        }

        [HttpPost("{id}")]
        public async Task<ActionResult> AddLike(int id)
        {
            var sourceUserId = User.GetUserId();
            var likedUser = await _uow.UserRepository.GetUserByIdAsync(id);
            var sourceUser = await _uow.LikesRepository.GetUserWithLikes(sourceUserId);

            if (likedUser == null) return NotFound();

            if (sourceUser.Id == id) return BadRequest("You can't like yourself");

            var userLike = await _uow.LikesRepository.GetUserLike(sourceUserId, likedUser.Id);

            if (userLike != null)
            {
                sourceUser.LikedUsers.Remove(userLike);
                if (await _uow.Complete()) return Ok();
            }

            userLike = new UserLike
            {
                SourceUserId = sourceUserId,
                TargetUserId = likedUser.Id
            };

            sourceUser.LikedUsers.Add(userLike);

            if (await _uow.Complete()) return Ok();

            return BadRequest("Failed to like user");
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<LikeDto>>> GetUserLike([FromQuery] LikesParams likesParams)
        {
            likesParams.UserId = User.GetUserId();

            var users = await _uow.LikesRepository.GetUserLikes(likesParams);

            foreach (var user in users)
            {
                var userLike = await _uow.LikesRepository.GetUserLike(User.GetUserId(), user.Id);
                if (userLike != null) user.IsLiked = true;
            }

            Response.AddPaginationHeader(new PaginationHeader(users.CurrentPage, users.PageSize,
                users.TotalCount, users.TotalPages));

            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PagedList<LikeDto>>> GetFollow(int id)
        {
            var userLike = await _uow.LikesRepository.GetUserLike(User.GetUserId(), id);
            if (userLike != null) return Ok(true);
            else return Ok(false);
        }
    }
}
