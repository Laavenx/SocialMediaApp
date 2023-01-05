using Microsoft.AspNetCore.Mvc;
using SocialMediaApp.Helpers;

namespace SocialMediaApp.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {

    }
}
