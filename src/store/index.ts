// Import necessary functions and types from zustand and local types.
import { create } from 'zustand'; // Function to create a store.
import { persist } from 'zustand/middleware'; // Middleware for persisting store state.
import { Theme, Widget, Task } from '../types'; // Importing custom types for Theme, Widget, and Task.

// Define the shape of the dashboard state.
interface DashboardState {
  // Current theme of the dashboard (light or dark).
  theme: Theme;
  
  // Array of widgets currently in the dashboard.
  widgets: Widget[];
  
  // Array of tasks associated with the dashboard.
  tasks: Task[];
  
  // Function to set the current theme.
  setTheme: (theme: Theme) => void;
  
  // Function to add a new widget to the dashboard.
  addWidget: (widget: Widget) => void;
  
  // Function to remove a widget from the dashboard by its id.
  removeWidget: (id: string) => void;
  
  // Function to update the position of widgets in the dashboard.
  updateWidgetPosition: (widgets: Widget[]) => void;
  
  // Function to add a new task to the dashboard.
  addTask: (task: Task) => void;
  
  // Function to update an existing task.
  updateTask: (task: Task) => void;
  
  // Function to remove a task from the dashboard by its id.
  removeTask: (id: string) => void;
}

// Create a Zustand store for the dashboard state with persistence.
export const useDashboardStore = create<DashboardState>()(
  persist(
    (set) => ({
      // Initial state of the dashboard.
      theme: 'light', // Default theme is set to light.
      widgets: [], // Initial empty array for widgets.
      tasks: [], // Initial empty array for tasks.
      
      // Function to set the theme of the dashboard.
      setTheme: (theme) => set({ theme }),
      
      // Function to add a new widget to the widgets array.
      addWidget: (widget) =>
        set((state) => ({ widgets: [...state.widgets, widget] })),
      
      // Function to remove a widget by filtering out the widget with the given id.
      removeWidget: (id) =>
        set((state) => ({
          widgets: state.widgets.filter((w) => w.id !== id),
        })),
      
      // Function to update the position of widgets by replacing the current array.
      updateWidgetPosition: (widgets) => set({ widgets }),
      
      // Function to add a new task to the tasks array.
      addTask: (task) =>
        set((state) => ({ tasks: [...state.tasks, task] })),
      
      // Function to update an existing task by mapping over the tasks array.
      updateTask: (task) =>
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
        })),
      
      // Function to remove a task by filtering out the task with the given id.
      removeTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        })),
    }),
    {
      // Configuration for persistence, specifying the storage key.
      name: 'dashboard-storage', // Key for local storage.
    }
  )
);