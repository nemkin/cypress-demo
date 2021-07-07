using System;
using System.Collections.Generic;
using System.Text;

namespace CypressDemo.Infrastructure.Configuration
{
    public class MongoDbConfiguration
    {
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
        public string TodosCollection { get; set; }
    }
}
