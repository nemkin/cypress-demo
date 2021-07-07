using System;

namespace CypressDemo.Domain
{
    public class Todo
    {
        private string _id;
        private string _title;
        private string _description;
        private DateTime _deadline;
        private bool _isCompleted;

        public string Id => _id;
        public string Title  => _title;
        public string Description => _description;
        public DateTime Deadline => _deadline;
        public bool IsCompleted => _isCompleted;

        public Todo(string id, string title, string description, DateTime deadline, bool isCompleted)
        {
            _id = id;
            _title = title;
            _description = description;
            _deadline = deadline;
            _isCompleted = isCompleted;
        }

        public Todo(string title, string description, DateTime deadline, bool isCompleted)
        {
            _title = title;
            _description = description;
            _deadline = deadline;
            _isCompleted = isCompleted;
        }
    }
}