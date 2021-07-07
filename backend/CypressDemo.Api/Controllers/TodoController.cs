using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CypressDemo.Api.Dtos;
using CypressDemo.Api.ViewModels;
using CypressDemo.Domain;
using CypressDemo.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace CypressDemo.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TodoController : ControllerBase
    {
        private readonly TodoRepository _todoRepository;
        private readonly ILogger<TodoController> _logger;

        public TodoController(TodoRepository todoRepository, ILogger<TodoController> logger)
        {
            _todoRepository = todoRepository;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IEnumerable<TodoViewModel>> GetAll()
        {
            return (await _todoRepository.GetAll())
                .Select(todo => new TodoViewModel
                {
                    Id = todo.Id,
                    Title = todo.Title,
                    Description = todo.Description,
                    Deadline = todo.Deadline.ToString("yyyy-MM-dd"),
                    IsCompleted = todo.IsCompleted
                });
        }

        [HttpGet("{id}")]
        public async Task<TodoViewModel> GetById([FromRoute] string id)
        {
            var todo = await _todoRepository.GetById(id);
            return new TodoViewModel
            {
                Id = todo.Id,
                Title = todo.Title,
                Description = todo.Description,
                Deadline = todo.Deadline.ToString("yyyy-MM-dd"),
                IsCompleted = todo.IsCompleted
            };
        }

        [HttpPost]
        public async Task<string> Create(TodoDto dto)
        {
            var todo = new Todo(dto.Title, dto.Description, dto.Deadline, dto.IsCompleted);
            return await _todoRepository.Create(todo);
        }

        [HttpPut("{id}")]
        public async Task Update([FromRoute] string id, TodoDto dto)
        {
            var todo = new Todo(id, dto.Title, dto.Description, dto.Deadline, dto.IsCompleted);
            await _todoRepository.Update(todo);
        }

        [HttpDelete]
        public async Task DeleteAll()
        {
            await _todoRepository.DeleteAll();
        }

        [HttpDelete("{id}")]
        public async Task DeleteById([FromRoute] string id)
        {
            await _todoRepository.DeleteById(id);
        }
    }
}
