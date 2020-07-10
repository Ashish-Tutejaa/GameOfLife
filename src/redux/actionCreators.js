export function clear(){
    return {
        type : "CLR"
    }
}

export function increment(){
    return {
        type : "INC"
    }
}

export function decrement(){
    return {
        type : "DEC"
    }
}

export function toggle(number){

    if(Number.isNaN(number) || number>=800 || number<0) {
        return { invalid : true }
    } 

    return {
        type : "TOG",
        id : number
    }
}