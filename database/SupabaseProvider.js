const { createClient } = require('@supabase/supabase-js');
const DatabaseProvider = require('./DatabaseProvider');

class SupabaseProvider extends DatabaseProvider {
  constructor(url, key) {
    super();
    this.supabase = createClient(url, key);
  }

  async connect() {
    try {
      // Test connection by querying the table
      const { data, error } = await this.supabase.from('todos').select('count');
      if (error) throw error;
      console.log('✅ Connected to Supabase');
      return true;
    } catch (error) {
      console.error('❌ Supabase connection failed:', error.message);
      throw error;
    }
  }

  async getAllTodos() {
    try {
      const { data, error } = await this.supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching todos:', error);
      return [];
    }
  }

  async addTodo(text) {
    try {
      const { data, error } = await this.supabase
        .from('todos')
        .insert([{ task: text, is_complete: false }])
        .select();

      if (error) throw error;
      return data[0];
    } catch (error) {
      console.error('Error adding todo:', error);
      throw error;
    }
  }

  async updateTodo(id, isComplete) {
    try {
      const { data, error } = await this.supabase
        .from('todos')
        .update({ is_complete: isComplete })
        .eq('id', id)
        .select();

      if (error) throw error;
      return data[0];
    } catch (error) {
      console.error('Error updating todo:', error);
      throw error;
    }
  }

  async deleteTodo(id) {
    try {
      const { error } = await this.supabase
        .from('todos')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw error;
    }
  }
}

module.exports = SupabaseProvider;
