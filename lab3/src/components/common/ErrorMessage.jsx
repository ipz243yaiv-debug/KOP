function ErrorMessage({ message, onRetry }) {
  return (
    <div className="empty-state" role="alert">
      <p>{message}</p>
      <button className="retry-button" type="button" onClick={onRetry}>
        Спробувати ще раз
      </button>
    </div>
  );
}

export default ErrorMessage;
