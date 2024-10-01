import "./switch.css";

const Switch = ({
  isOn,
  isDisabled,
  handleToggle,
  onClick, // Optional onClick prop
}: {
  isOn: boolean;
  isDisabled: boolean;
  handleToggle: any;
  onClick?: () => void;
}) => {
  return (
    <>
      <input
        checked={isOn}
        onChange={handleToggle}
        disabled={isDisabled}
        className="react-switch-checkbox"
        id={`react-switch-new`}
        type="checkbox"
        onClick={onClick}
      />
      <label
        style={{ background: isOn ? "#06D6A0" : undefined }}
        className="react-switch-label"
        htmlFor={`react-switch-new`}
      >
        <span className={`react-switch-button`} />
      </label>
    </>
  );
};

export default Switch;
