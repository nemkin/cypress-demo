using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace CypressDemo.Infrastructure
{
    public class TodoDbo
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public BsonDateTime Deadline { get; set; }

        public bool IsCompleted { get; set; }
    }
}
