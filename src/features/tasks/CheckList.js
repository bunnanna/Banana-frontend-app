const CheckList = ({Clist}) => {
    const onCompleteSubTask = Clist.check ? <span>✔</span>:<span>✕</span>
return( 
        <div>
            {onCompleteSubTask}
            <span>{Clist.subtask}</span>
        </div>
     );
}
 
export default CheckList;