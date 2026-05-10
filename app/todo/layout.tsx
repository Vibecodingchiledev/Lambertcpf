import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Todo List - Task Management App',
  description: 'A modern todo list application with local storage. Create, organize, and track your tasks with automatic saving.',
  keywords: 'todo, task management, productivity, local storage',
};

export default function TodoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
