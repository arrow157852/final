import style from "./button.module.css"

const Button = ({ name, onClick, type = 'button' }) => {
  return (
    <button className={style.button} onClick={onClick} type={type}>
      {name}
    </button>
  );
}

export default Button;