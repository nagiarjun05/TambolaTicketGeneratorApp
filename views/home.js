const logout=document.getElementById('logout');
const search=document.getElementById('search');
const generateTickets=document.getElementById('ticket-form');
const ticketDisplay=document.getElementById('ticket-list');
const ticketIdDisplay=document.getElementById('ticket-id-display');

const token=localStorage.getItem('token');

generateTickets.addEventListener('submit',ticketGenerator)

async function ticketGenerator(e){
    e.preventDefault()
    let ticketNumbers=e.target.ticketcounts.value
    if(!ticketNumbers || ticketNumbers==0 || ticketNumbers==undefined){
        return alert("Please fill the valid number")
    }
    try{
        const res= await axios({
            method:'post',
            url:`http://localhost:8080/ticket/ticketgenerator`,
            data:{ ticketcounts: ticketNumbers },
            headers:{'Authorization':token}
        });
        ticketIdDisplay.innerText=`Tickets with ID of ${res.data.tickets.id}`
        if(res.data.tickets.tickets){
            res.data.tickets.tickets.forEach((element,i) => {
                
                var outerli = document.createElement('li');
                outerli.className='ticket-item';                

                let h5=document.createElement('h5')
                h5.innerHTML=`Ticket ${i+1}`
                outerli.append(h5)

                for(let i=0;i<element.length;i++){
                    var li = document.createElement('li');
                    li.className=`row${i}-item`;
                    li.innerHTML=`  ${element[i]}`;
                    outerli.append(li)
                }

                ticketDisplay.append(outerli) 
                ticketDisplay.append(document.createElement('br'))
            });

            let display=document.getElementById('ticket-display')
            display.style.display='block';
            alert(res.data.message);

        }
    }
    catch(err){
        if (err.response.status === 500) {
            alert(err.response.data.message);
        }else{
            console.log(err)
        }
    }
};


logout.addEventListener('click',(e)=>{
    localStorage.removeItem('token')
    window.location.href='/login.html'
});
search.addEventListener('click',e=>window.location.href='/search.html');