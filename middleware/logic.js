//Function to generate a single random integer within a range
const randomInteger=(min,max)=>Math.floor(Math.random()*(max-min+1))+min;

//This function creates random integers from a given range, example- range(1-10)
function randomIntegerGenerator(min,max,count){ 
    let [res,result,i]=[new Set(),[],0]
    while(i<count){
        let r=randomInteger(min,max)
        if(!res.has(r)) res.add(r),result.push(r),i++ }
    return result;
};

//This function generate random intergers for every columns, i.e., from 1st column to 9th column 
//It also ensure that the Each column must have at least 1 number.

//RULE #2 - Each column is assigned a range of numbers only: 1-10 can appear only in column 1, 11-20 
//can appear only in column 2, 81-90 can appear only in column 9
// RULE #4 - Each column must have at least 1 number
function integersForEveryColumns(){
    let[min,max,result]=[1,10,[]]
    while(min<=81 && max<=90){
        result.push(randomIntegerGenerator(min,max,randomInteger(1,3)))
        min+=10,max+=10
    }
    return result;
};

//This function create a row ticket which have '0's for the empty space
function generateRawTicket(){
    let [res,ref]=[[new Array(9).fill(0),new Array(9).fill(0),new Array(9).fill(0)],integersForEveryColumns()]
    for(let i=0;i<res[0].length;i++){
        for(let j=0;j<3;j++){
            if(ref[i][j]!=undefined) res[j][i]=ref[i][j]
        }
    }
    return res;
};


// This function is to check the total number of numbers presents in a ticket, and to remove or add elements if needed
function TicketCheck(t){
    let [intCount,zerosCount,intHash,zerosHash]=[0,0,{},{}]
    for(let row=0;row<t.length;row++) {
        for(let col=0;col<t[row].length;col++) {
            if(t[row][col]!==0) intCount++,intHash[intCount]=[row,col,t[row][col]]
            else if(t[row][col]==0) zerosCount++,zerosHash[zerosCount]=[row,col,t[row][col]]
        }
    }
    // console.log(t)
    if(intCount>15){
        for(let x=0;x<intCount-15;x++) {
            let temp=intHash[randomInteger(1,intCount)]
            t[temp[0]][temp[1]]=0
        }
    }else if(intCount<15){
        for(let x=0;x<15-intCount;x++) {
            let temp=zerosHash[randomInteger(1,zerosCount)]
            let min=(temp[1]*10)+1
            let max=min+9
            let a=randomInteger(min,max)
            while(a===t[0][temp[0]] || a===t[1][temp[0]] || a===t[2][temp[0]]) a=randomInteger(min,max)
            t[temp[0]][temp[1]]=a
        }
    }
    return t;
}

// This function is to check the total number of numbers presents in a row, and to remove or add elements if needed
// RULE #1 - Each row cannot have more than 5 numbers
function rowCheck(t){
    for(let row=0;row<t.length;row++) {
        let [intCount,zerosCount,intHash,zerosHash]=[0,0,{},{}]
        for(let col=0;col<t[row].length;col++) {
            if(t[row][col]!==0) intCount++,intHash[intCount]=[row,col,t[row][col]]
            else if(t[row][col]==0) zerosCount++,zerosHash[zerosCount]=[row,col,t[row][col]]
        }
        // console.log(intCount)
        if(intCount>5){
            for(let x=0;x<intCount-5;x++) {
                let temp=intHash[randomInteger(1,intCount)]
                t[temp[0]][temp[1]]=0
            }
        }else if(intCount<5){
            // console.log(`intCount ${5-intCount}`)
            for(let x=0;x<5-intCount;x++) {
                let temp=zerosHash[randomInteger(1,zerosCount)]
                let min=(temp[1]*10)+1
                let max=min+9
                let a=randomInteger(min,max)
                while(a===t[0][temp[0]] || a===t[1][temp[0]] || a===t[2][temp[0]]) {
                    a=randomInteger(min,max)}
                t[temp[0]][temp[1]]=a
            }
        }

    }
    return t;
}

//This function is to sort the column's elements in ascending order
// RULE #3 - In a specific column, numbers must be arranged in ascending order from top to bottom
function sortCol(ticket){
    //For each column in the ticket
    for(var col=0;col<9;col++){
        //If all three rows has numbers
        if(ticket[0][col] != 0 && ticket[1][col] !=0 && ticket[2][col]!=0){
          for(var r=0;r<2;r++){
            if(ticket[r][col] > ticket[r+1][col]){
                var temp = ticket[r][col];
                ticket[r][col] = ticket[r+1][col];
                ticket[r+1][col] = temp;
            }
          }
        }
        //If 1st and 2nd rows are populated
        else if(ticket[0][col]!=0 && ticket[1][col]!=0 && ticket[2][col]==0){
          if(ticket[0][col] > ticket[1][col]){
            var temp = ticket[0][col];
            ticket[0][col] = ticket[1][col];
            ticket[1][col] = temp;
          }
        }
        //If 1st and 3rd rows are populated
        else if(ticket[0][col]!=0 && ticket[1][col]==0 && ticket[2][col]!=0){
          if(ticket[0][col] > ticket[2][col]){
            var temp = ticket[0][col];
            ticket[0][col] = ticket[2][col];
            ticket[2][col] = temp;
          }
        }
        //If 2nd and 3rd rows are populated
        else if(ticket[0][col]==0 && ticket[1][col]!=0 && ticket[2][col]!=0){
          if(ticket[1][col] > ticket[2][col]){
            var temp = ticket[1][col];
            ticket[1][col] = ticket[2][col];
            ticket[2][col] = temp;
          }
        }
      }
      return ticket;
}



function generateTicket(count){
    let res=[]
    for(let i=0;i<count;i++){
        var t=generateRawTicket()
        TicketCheck(t)
        rowCheck(t)
        sortCol(t)
        res.push(t)
    }
    return res;
}


module.exports={
    generateTicket
};