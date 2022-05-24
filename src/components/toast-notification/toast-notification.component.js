import "./toast-notification.styles.css";

export default function Toast({ success, error }) {
  return (
    <div className="toast-container">
      <div className="toast-body">
        <div className="response-text">{error ? error : success}</div>
      </div>
    </div>
  );
}
