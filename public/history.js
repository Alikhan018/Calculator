// class History {
//     constructor(){
//         this.setHistory();
//     }
//     setHistory() {
//         const results = JSON.parse(localStorage.getItem("results"));
//         if(results.length === 0) {
//             let noTextSpan = document.createElement('span');
//             noTextSpan.innerText = 'No History Found'
//             noTextSpan.style.color = "white";
//             let div = document.getElementById("container")
//             div.append(noTextSpan)
//             return
//         }
//         results.forEach((tuple) => {
//             this.renderHistory(tuple);
//         })
//     }
//     renderHistory(data) {
//         let historyTupleSpan = document.createElement('span');
//         historyTupleSpan.classList = "tuple"
//         historyTupleSpan.innerText = `${data.expr} = ${data.result}`;  
//         let div = document.getElementById("container")
//         div.append(historyTupleSpan);
//     }
// }
// document.addEventListener("DOMContentLoaded", function() {
//     new History();
// })