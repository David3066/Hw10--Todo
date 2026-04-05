const { MongoClient, ObjectId } = require('mongodb');
const DatabaseProvider = require('./DatabaseProvider');

class MongoDBProvider extends DatabaseProvider {
  constructor(mongoUri) {
    super();
    this.mongoUri = mongoUri;
    this.client = null;
    this.db = null;
    this.todosCollection = null;
  }

  async connect() {
    try {
      this.client = new MongoClient(this.mongoUri);
      await this.client.connect();
      this.db = this.client.db('todo_app');
      this.todosCollection = this.db.collection('todos');

      // Create an index on created_at for sorting
      await this.todosCollection.createIndex({ created_at: -1 });

      console.log('✅ Connected to MongoDB');
      return true;
    } catch (error) {
      console.error('❌ MongoDB connection failed:', error.message);
      throw error;
    }
  }

  async getAllTodos() {
    try {
      const todos = await this.todosCollection
        .find({})
        .sort({ created_at: -1 })
        .toArray();

      return todos.map(todo => ({
        id: todo._id.toString(),
        task: todo.task,
        is_complete: todo.is_complete,
        created_at: todo.created_at
      }));
    } catch (error) {
      console.error('Error fetching todos:', error);
      return [];
    }
  }

  async addTodo(text) {
    try {
      const result = await this.todosCollection.insertOne({
        task: text,
        is_complete: false,
        created_at: new Date()
      });

      return {
        id: result.insertedId.toString(),
        task: text,
        is_complete: false
      };
    } catch (error) {
      console.error('Error adding todo:', error);
      throw error;
    }
  }

  async updateTodo(id, isComplete) {
    try {
      const result = await this.todosCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { is_complete: isComplete } }
      );

      if (result.matchedCount === 0) throw new Error('Todo not found');
      return { id, is_complete: isComplete };
    } catch (error) {
      console.error('Error updating todo:', error);
      throw error;
    }
  }

  async deleteTodo(id) {
    try {
      const result = await this.todosCollection.deleteOne({
        _id: new ObjectId(id)
      });

      if (result.deletedCount === 0) throw new Error('Todo not found');
      return true;
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw error;
    }
  }

  async disconnect() {
    if (this.client) {
      await this.client.close();
      console.log('Disconnected from MongoDB');
    }
  }
}

module.exports = MongoDBProvider;
