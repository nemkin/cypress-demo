using CypressDemo.Domain;
using CypressDemo.Infrastructure.Configuration;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CypressDemo.Infrastructure
{
    public class TodoRepository
    {
        private readonly MongoDbConfiguration _config;
        private readonly IMongoCollection<TodoDbo> _todoCollection;

        public TodoRepository(IOptions<MongoDbConfiguration> config)
        {
            _config = config.Value;

            var client = new MongoClient(_config.ConnectionString);
            var database = client.GetDatabase(_config.DatabaseName);
            _todoCollection = database.GetCollection<TodoDbo>(_config.TodosCollection);
        }

        public async Task<IEnumerable<Todo>> GetAll()
        {
            return (await _todoCollection.Find(FilterDefinition<TodoDbo>.Empty).ToListAsync())
                .Select(dbo => new Todo(dbo.Id, dbo.Title, dbo.Description, dbo.Deadline.ToLocalTime(), dbo.IsCompleted));
        }

        public async Task<Todo> GetById(string id)
        {
            var dbo = await _todoCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
            return new Todo(dbo.Id, dbo.Title, dbo.Description, dbo.Deadline.ToLocalTime(), dbo.IsCompleted);
        }

        public async Task<string> Create(Todo todo)
        {
            var dbo = new TodoDbo
            {
                Title = todo.Title,
                Description = todo.Description,
                Deadline = todo.Deadline,
                IsCompleted = todo.IsCompleted
            };
            await _todoCollection.InsertOneAsync(dbo);
            return dbo.Id;
        }

        public async Task Update(Todo todo)
        {
            var dbo = new TodoDbo
            {
                Id = todo.Id,
                Title = todo.Title,
                Description = todo.Description,
                Deadline = todo.Deadline,
                IsCompleted = todo.IsCompleted
            };
            await _todoCollection.ReplaceOneAsync(x => x.Id == todo.Id, dbo);
        }

        public async Task DeleteAll()
        {
            await _todoCollection.DeleteManyAsync(FilterDefinition<TodoDbo>.Empty);
        }

        public async Task DeleteById(string id)
        {
            await _todoCollection.DeleteOneAsync(x => x.Id == id);
        }
    }
}
