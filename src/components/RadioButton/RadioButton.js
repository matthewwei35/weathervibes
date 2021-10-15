function RadioButton(props) {
const { name, label, checked, onChange } = props;

  return (
    <label>
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
      />
      {label}
    </label>
  );
}

export default RadioButton;
