//REDUCER HERE
import { incrementReducer } from './incReducer.js'

export const reducer = (prevState, action) => {
    const init = "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";
    switch(action.type){
        case 'CLR':
            var fs = {};
            fs["present"] = init;
            fs["past"] = [];
            fs["future"] = [];
            return fs;    
        case 'INC':
            return incrementReducer(prevState, action);
        case 'DEC':
            if(prevState.past.length === 0)
                return prevState
            var fs = {};
            fs["past"] = prevState.past;
            fs["present"] = prevState.present;
            fs["future"] = prevState.future;
            fs["future"].push(fs["present"]);
            fs["present"] = fs["past"].pop();
            return Object.assign({}, prevState, fs);
        case 'TOG':
            if(action.invalid)
                return prevState
            var t = prevState.present.split('').map( (char,index) => {
                if(index == action.id)
                    return char === '0' ? '1' : '0';
                return char;
            })
            var ns = {};
            ns["present"] = t.join('');
            var res = Object.assign({}, prevState, ns)
            return res;
        default:
            return prevState;
    } 
}