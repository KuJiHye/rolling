import Input from "./Input";

function InputForm({ label, placeholder, value, onChange}){
    return(
        <div>
            <div>{label}</div>
            <Input
                placeholder={placeholder}
                value={value}
                onChange={onChange}/>
        </div>
    )   
}

export default InputForm;
