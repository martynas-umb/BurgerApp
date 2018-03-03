
const App = (function () {

    const DOMstrings={
        menu:document.querySelector('.menu ul'),
        menuItems:null,
        table:document.querySelector('.table ul'),
        tableTotal:document.querySelector('.tables .table .total'),
        dayTotal:document.querySelector('.menu h2 span'),
        checkout:document.querySelector('.table .btn')
    };

    const menuData=[];

    let tableData=[];

    let dayTotal=0;


    function populateMenu() {
        var url ='http://localhost:3000/BT/P31/compiler/dist//script/menu.json';
        $.getJSON(url, function (data) {

            data.menu.forEach(item=>{
                const html=`<li>${item.name}<span>${item.price}</span></li>`;
                DOMstrings.menu.insertAdjacentHTML('beforeend', html);
                menuData.push(item);
            });
            // surenku visus meniu itemus i sarasa
            DOMstrings.menuItems=document.querySelectorAll('.menu li');
            console.log(DOMstrings.menuItems);
            console.log(menuData);
            // uzdeam event listenerius ant meniu itemu
            addEvents()
        });
    }

    function addEvents() {
        DOMstrings.menuItems.forEach((item, i)=>{
            item.addEventListener('click', function () {
                console.log(i);
                addOrder(i)
            })
        })
        DOMstrings.table.addEventListener('click',function (e) {
            if(e.target.matches('span') && e.target.classList.contains('remove')){
                DOMstrings.table.removeChild(e.target.parentNode);
                const orderId = e.target.parentNode.dataset.id;
                const sorted = tableData.filter(item=>item.id!=orderId);
                tableData=sorted;
                getTotal();
            }

        });
        DOMstrings.checkout.addEventListener('click',function () {
            dayTotal+=getTotal();
            DOMstrings.dayTotal.textContent=`${dayTotal.toFixed(2)}$`;
            DOMstrings.tableTotal.textContent='';
            const list = document.querySelectorAll('.table li');
            list.forEach((item,i)=>{
                if(i!=0) DOMstrings.table.removeChild(item);
            })
            tableData=[];
        })
    }
    
    function addOrder(index) {
        const id=_.uniqueId();
        const html =`<li data-id="${id}">
                        <span class="food">${menuData[index].name}</span>
                        <span class="price">${menuData[index].price}</span>
                        <span class="remove">X</span>
                    </li>`;
        DOMstrings.table.insertAdjacentHTML('beforeend', html);
        const obj = {...menuData[index],id}; // spread operatorius

        tableData.push(obj);
        console.log(tableData);
        getTotal();
    }

    function getTotal() {
        let tableTotal=0;
        tableData.forEach(item=>{
            tableTotal+=item.price
        });
        console.log(tableTotal);
        DOMstrings.tableTotal.textContent=`$${tableTotal.toFixed(2)}`;
        return tableTotal;
    }

    function showMenu() {
        $('.menu h3').click(function () {
            $('.menu ul').slideToggle()
        });
    }

    console.log('App is up and running');

    return {
        init:function () {
            populateMenu();
            showMenu();
        }
    }

})();

App.init();