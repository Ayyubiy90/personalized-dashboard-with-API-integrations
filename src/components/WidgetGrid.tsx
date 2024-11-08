// Import necessary libraries and components.
import React from "react"; // Import React library for building the component.
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"; // Import drag-and-drop context and components from the Pangea DnD library.
import { useDashboardStore } from "../store"; // Import the Zustand store for managing dashboard state.
import { WeatherWidget } from "./widgets/WeatherWidget"; // Import the WeatherWidget component.
import { CryptoWidget } from "./widgets/CryptoWidget"; // Import the CryptoWidget component.
import { NewsWidget } from "./widgets/NewsWidget"; // Import the NewsWidget component.
import { TaskWidget } from "./widgets/TaskWidget"; // Import the TaskWidget component.
import CalendarWidget from "./widgets/CalenderWidget"; // Import the CalendarWidget component.
import { Widget } from "../types"; // Import the Widget type definition.
import { X, GripHorizontal } from "lucide-react"; // Import icons for removing and dragging widgets.

// Map of widget types to their corresponding components.
const widgetComponents = {
  weather: WeatherWidget, // Map 'weather' type to WeatherWidget component.
  crypto: CryptoWidget, // Map 'crypto' type to CryptoWidget component.
  news: NewsWidget, // Map 'news' type to NewsWidget component.
  tasks: TaskWidget, // Map 'tasks' type to TaskWidget component.
  calendar: CalendarWidget, // Map 'calendar' type to CalendarWidget component.
};

// Define the WidgetGrid component.
export const WidgetGrid: React.FC = () => {
  // Destructure widgets, updateWidgetPosition, and removeWidget from the Zustand store.
  const { widgets, updateWidgetPosition, removeWidget } = useDashboardStore();

  // Handle the end of a drag event.
  const handleDragEnd = (result: any) => {
    // If there is no destination, exit the function.
    if (!result.destination) return;

    // Create a new array from the current widgets.
    const items = Array.from(widgets);
    // Remove the dragged item from its original position.
    const [reorderedItem] = items.splice(result.source.index, 1);
    // Insert the dragged item into its new position.
    items.splice(result.destination.index, 0, reorderedItem);

    // Update the position of each widget based on the new order.
    const updatedWidgets = items.map((item, index) => ({
      ...item,
      position: index, // Set the new position for each widget.
    }));

    // Call the store function to update the widget positions.
    updateWidgetPosition(updatedWidgets);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      {/* Set up the drag-and-drop context with the handleDragEnd function. */}
      <Droppable droppableId="widgets">
        {(
          provided // Correctly use the function-as-child pattern
        ) => (
          <div
            {...provided.droppableProps} // Spread droppable props to the div.
            ref={provided.innerRef} // Set the ref for the droppable area.
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" // Define a responsive grid layout for the widgets.
          >
            {widgets.map((widget: Widget, index: number) => {
              // Map over the widgets to render each one.
              const WidgetComponent = widgetComponents[widget.type]; // Get the corresponding component for the widget type.
              return (
                <Draggable
                  key={widget.id} // Set a unique key for each draggable widget.
                  draggableId={widget.id} // Set the draggable ID for the widget.
                  index={index} // Set the index for the draggable item.
                >
                  {(
                    provided // Correctly use the function-as-child pattern
                  ) => (
                    <div
                      ref={provided.innerRef} // Set the ref for the draggable item.
                      {...provided.draggableProps} // Spread draggable props to the div.
                      {...provided.dragHandleProps} // Spread drag handle props to the div.
                      className={`widget-card relative group ${
                        provided.isDragging ? "shadow-2xl scale-105" : "" // Apply styles when the widget is being dragged.
                      }`}>
                      <div className="absolute top-2 right-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {/* Container for the remove and drag handle buttons. */}
                        <button
                          onClick={() => removeWidget(widget.id)} // Call removeWidget with the widget ID on button click.
                          className="p-1 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500 transition-colors" // Button styling for removing the widget.
                          title="Remove widget" // Tooltip for the remove button.
                        >
                          <X className="w-4 h-4" />{" "}
                          {/* Icon for removing the widget. */}
                        </button>
                        <div
                          className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/30 text-gray-400 cursor-grab transition-colors" // Styling for the drag handle.
                          title="Drag to reorder" // Tooltip for the drag handle.
                        >
                          <GripHorizontal className="w-4 h-4" />{" "}
                          {/* Icon for dragging the widget. */}
                        </div>
                      </div>
                      <WidgetComponent widget={widget} />{" "}
                      {/* Render the specific widget component with its data. */}
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}{" "}
            {/* Placeholder for the draggable area to maintain layout during dragging. */}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
