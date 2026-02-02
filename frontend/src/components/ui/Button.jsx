function Button({ children, variant = 'primary', type = 'button', disabled = false }) {
  const buttonClass = variant === 'primary' ? 'btn btn-primary' : 'btn btn-secondary';

  return (
    <button
      type={type}
      disabled={disabled}
      className={buttonClass}
      style={disabled ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
    >
      {children}
    </button>
  );
}

export default Button;
