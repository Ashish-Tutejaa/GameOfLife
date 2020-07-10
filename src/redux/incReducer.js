export function incrementReducer(prevState, action){
    if(prevState.future.length !== 0){
        var fs = {};
        fs["past"] = prevState.past;
        fs["present"] = prevState.present;
        fs["future"] = prevState.future;
        fs["past"].push(fs["present"]);
        fs["present"] = fs["future"].pop();
        return Object.assign({}, prevState, fs);
    }
    var auxD = []
    var finD = []
    for(var i = 0 ; i<20 ; i++){
        var temp = []
        var finT = []
        for(var j = 0 ; j<40 ; j++){
        temp.push(prevState.present[i*40+j])
        finT.push('0')
        }
    auxD.push(temp)
    finD.push(finT)
    }

    var x = [0,0,1,-1,1,1,-1,-1];
    var y = [1,-1,0,0,1,-1,1,-1];

    const check = (x,y) => x>=0 && y>=0 && x<20 && y<40

    for(var i = 0 ; i<20 ; i++){
        for(var j = 0 ; j<40 ; j++){

            var count = 0
            for(var k = 0 ; k<8 ; k++){
                if(!check(i+x[k], j+y[k]))
                    continue;
            count += auxD[i+x[k]][j+y[k]] === '1' ? 1 : 0;
            }
            if(auxD[i][j] === '1'){
                if(count === 2 || count === 3){
                    finD[i][j] = '1';
                } else {
                    finD[i][j] = '0';
                }
            } else {
                if(count === 3){
                    finD[i][j] = '1';
                } else {
                    finD[i][j] = '0';
                }
            }
        }
    }
    var ns = [];
    for(var i = 0 ; i<20 ; i++){
        for(var j = 0 ; j<40 ; j++){
            ns.push(finD[i][j]);
        }
    }
    var fs = {};
    fs["past"] = prevState.past
    fs["past"].push(prevState.present)
    fs["present"] = ns.join('');
    // console.log(ns.join(''))
    return Object.assign({}, prevState, fs)
    
}