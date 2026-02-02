function Input({ label, type = 'text', placeholder, icon: Icon, name }) {
  return (
    <div className="input-group">
      {label && <label>{label}</label>}
      <div className="input-wrapper">
        {Icon && <Icon size={20} />}
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          className="input-field"
        />
      </div>
    </div>
  );
}

export default Input;
