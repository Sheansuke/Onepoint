
import axios from "axios"

const sendEmail = () => {
    axios.get('/api/test')
}


 const ComponentName = () => { 

return <button className='btn btn-primary' onClick={sendEmail}>Hook Typescript</button>; 

};

export default ComponentName;