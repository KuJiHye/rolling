import Input from "./Input";

function InputForm({ label, placeholder }){
    return(
        <div>
            <div>{label}</div>
            <Input placeholder={placeholder}/>
        </div>
    )   
}

export default InputForm;