const logout=document.getElementById('logout');
const home=document.getElementById('home');
const searchTickets=document.getElementById('search-form');
const ticketDisplay=document.getElementById('ticket-id-list')
const ticketIdDisplay=document.getElementById('ticket-id')

const token=localStorage.getItem('token');

searchTickets.addEventListener('submit',searchById)

async function searchById(e){
    e.preventDefault()
    let Id=e.target.searchId.value
    try{
        const res= await axios({
            method:'get',
            url:`http://localhost:8080/ticket/fetchbyid?id=${Id}`,
            headers:{'Authorization':token}
        });

        ticketIdDisplay.innerText=`${res.data.tickets.tickets.length} Tickets associated with ID of ${res.data.tickets.id}`

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
    
            let display=document.getElementById('ticket-id-display')
            display.style.display='block';
            alert(res.data.message);

        }
    }
    catch(err){
        if (err.response.status === 404) {
            alert(err.response.data.message);
        }else if (err.response.status === 500) {
            alert(err.response.data.message);
        }else{
            console.log(err);
        }
    }
};


logout.addEventListener('click',(e)=>{
    localStorage.removeItem('token');
    window.location.href='/login.html'
});

home.addEventListener('click',e=>window.location.href='/home.html');
