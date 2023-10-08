using FluentValidation;
using TodoTest.Models.Models;

namespace TodoTestAPI.Validations
{
    public class TodoValidation : AbstractValidator<TodoDTO>
    {
        public TodoValidation()
        {
            RuleFor(x => x.Description).NotEmpty().Must(x => x.Length > 0).MaximumLength(100); 
            RuleFor(x => x.State).NotEmpty().Must(x => x.Length > 0).MaximumLength(20);
        }
    }
}
