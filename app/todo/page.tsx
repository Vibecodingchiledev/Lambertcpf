'use client';

import { useState, useEffect } from 'react';
import { Trash2, Plus, Check } from 'lucide-react';
import Link from 'next/link';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

type FilterType = 'all' | 'active' | 'completed';

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [mounted, setMounted] = useState(false);

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      try {
        setTodos(JSON.parse(savedTodos));
      } catch (error) {
        console.error('Failed to load todos:', error);
      }
    }
    setMounted(true);
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos, mounted]);

  const addTodo = () => {
    if (input.trim() === '') return;

    const newTodo: Todo = {
      id: Date.now().toString(),
      text: input.trim(),
      completed: false,
      createdAt: Date.now(),
    };

    setTodos([newTodo, ...todos]);
    setInput('');
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  // Filter todos based on current filter
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeCount = todos.filter(todo => !todo.completed).length;
  const completedCount = todos.filter(todo => todo.completed).length;

  if (!mounted) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-indigo-100 sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Todo List
          </h1>
          <div className="flex gap-4">
            <Link 
              href="/" 
              className="text-indigo-600 hover:text-indigo-700 transition-colors font-medium"
            >
              ← Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Manage Your Tasks</h2>
            <p className="text-gray-600">Stay organized with automatic saving to your device</p>
          </div>

          {/* Input Section */}
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add a new task..."
              className="flex-1 px-4 py-3 rounded-lg border-2 border-indigo-200 focus:border-indigo-500 focus:outline-none text-gray-900 placeholder-gray-500 transition-colors"
            />
            <button
              onClick={addTodo}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 flex items-center gap-2 font-medium"
            >
              <Plus size={20} />
              Add
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-blue-600 font-semibold text-lg">{todos.length}</p>
              <p className="text-blue-600 text-sm">Total Tasks</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-green-600 font-semibold text-lg">{activeCount}</p>
              <p className="text-green-600 text-sm">Active</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <p className="text-purple-600 font-semibold text-lg">{completedCount}</p>
              <p className="text-purple-600 text-sm">Completed</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-8 bg-white rounded-xl p-1 shadow-md w-fit">
          {(['all', 'active', 'completed'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg font-medium transition-all capitalize ${
                filter === f
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Todos List */}
        <div className="space-y-3 mb-8">
          {filteredTodos.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center shadow-md">
              <p className="text-gray-500 text-lg">
                {todos.length === 0
                  ? '✨ No tasks yet. Add one to get started!'
                  : `📭 No ${filter} tasks to show`}
              </p>
            </div>
          ) : (
            filteredTodos.map(todo => (
              <div
                key={todo.id}
                className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all group flex items-center gap-4 border-l-4 border-indigo-200 hover:border-indigo-500"
              >
                {/* Checkbox */}
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                    todo.completed
                      ? 'bg-gradient-to-r from-green-400 to-emerald-500 border-green-500'
                      : 'border-indigo-300 hover:border-indigo-500'
                  }`}
                >
                  {todo.completed && <Check size={16} className="text-white" />}
                </button>

                {/* Todo Text */}
                <span
                  className={`flex-1 text-lg transition-all ${
                    todo.completed
                      ? 'text-gray-400 line-through'
                      : 'text-gray-900 font-medium'
                  }`}
                >
                  {todo.text}
                </span>

                {/* Delete Button */}
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="flex-shrink-0 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                  title="Delete task"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Clear Completed Button */}
        {completedCount > 0 && (
          <div className="text-center">
            <button
              onClick={clearCompleted}
              className="text-red-500 hover:text-red-700 hover:bg-red-50 px-6 py-2 rounded-lg transition-colors font-medium"
            >
              Clear {completedCount} Completed Task{completedCount !== 1 ? 's' : ''}
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-white/80 to-transparent p-4 text-center text-sm text-gray-600">
        <p>💾 Your tasks are automatically saved to your device</p>
      </div>
    </div>
  );
}
