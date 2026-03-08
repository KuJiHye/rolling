import Input from "./Input";

function InputForm({ label, placeholder, receiverName, setReceiverName}){
    return(
        <div>
            <div>{label}</div>
            <Input
                placeholder={placeholder}
                receiverName={receiverName}
                setReceiverName={setReceiverName}/>
        </div>
    )   
}

export default InputForm;