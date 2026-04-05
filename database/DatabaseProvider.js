// Base class that defines the interface for database providers
class DatabaseProvider {
  async connect() {
    throw new Error('connect() must be implemented');
  }

  async getAllTodos() {
    throw new Error('getAllTodos() must be implemented');
  }

  async addTodo(text) {
    throw new Error('addTodo() must be implemented');
  }

  async updateTodo(id, isComplete) {
    throw new Error('updateTodo() must be implemented');
  }

  async deleteTodo(id) {
    throw new Error('deleteTodo() must be implemented');
  }
}

module.exports = DatabaseProvider;
