using Grievance_Management_System.Auth;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Grievance_Management_System.Service
{
    public class TokenService(IConfiguration config)
    {
        public readonly IConfiguration _config = config;

        public string CreateToken(User user)
        {
            //A claim is a key-value pair stored inside JWT
            //what info inside the token
            var claims = new[]
        {

            new Claim("Email", user.Email),
            new Claim("Role", user.Role.ToString())
        };

            //Sign the token Prevent modification this is secrete key
            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            //Prove that this token was created by my serve hamcha for fast and secure
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            //JWT object

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"], //who created this token
                audience: _config["Jwt:Audience"], //who is alowed to usee
                claims: claims,
                expires: DateTime.Now.AddMinutes(
                    Convert.ToDouble(_config["Jwt:ExpireMinutes"])),
                signingCredentials: creds
            );

            //JWT is sent as string HTTP headers only accept strings
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
