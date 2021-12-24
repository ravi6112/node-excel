// let mrvar = setInterval(callback,1000);

const { worker } = require("cluster");


// function callback(intervalRef) {
//     console.log("pakaya1");
//     while(true){
//      console.log("pakaya2");
//     }

//     clearInterval(intervalRef);
// }

var i_array=new Array();
function Parallel(func,datas){
    //   $(datas).each(function(i,v){
             i_array[i]=setInterval(()=>{
                         clearInterval(i_array[i]);
                         window[func](datas[i]);
                         },10);
            //  });
}

const timeOutFunc = (data) => {
    setInterval(() => {
        console.log("Kariya");
    }, 1000);  
};

const workerFunc = (data) => {
    while(true){
        console.log("Pakaya");
    }
};

Parallel(timeOutFunc, "samiya");

Parallel(workerFunc, "samiyass");