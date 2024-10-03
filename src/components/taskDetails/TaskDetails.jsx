export function TaskDetails({ task }) {
  if (!task) return null;

  return (
    <div className="task-details-container">
      <h2>{task.title}</h2>
    </div>
  );
}
