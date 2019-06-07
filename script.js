class Table{
    constructor (data){
        this.data = data;
        this.key = [];
        this.i = 0;
        this.step = 10;
        this.currentStep = 0;
        this.keyLegend= [];
        this.keyvisibil = {};
        this.color = {};
        this.listForDelete = [];
        this.keyButtonDelet = true;
    }
    
    getData(){
        return this.data;
    }
    
    getDataLength(){
        return this.data.length;
    }

    getI(){
        return this.i;
    }
    setI(i){
        this.i = this.i+i;
    }
    setCurrentStep(step){
        this.currentStep = step
    }
    getCurrentStep(){
        return this.currentStep
    }
    getStep(){
        return this.step;
    }
    setStep(a){
        this.step = a;
    }

    setKey(kl){
        this.key = Object.keys(this.data[0]);
       
        for(let i = 0; i<this.key.length; i++){
           this.keyLegend[this.key[i]]= this.key[i]+kl[i];
        }
    }
    createKey(){
        this.key.forEach(el =>{
            
        })
    }
    chageKey(a){
        this.key = a
    }
    getkey(){
        return this.keyLegend;
    }
    getkey2(){
        return this.key;
    }
    chageI(){
        this.i = this.i-this.step +1;
    }
   


    createHeaderTable(t, a , select){
        const beforeElement = document.querySelector('table');
        const title = document.createElement("div")
        title.classList.add('title');
        title.innerHTML = a;
        t.insertBefore(title, beforeElement);

        const header = document.createElement('div');
        header.classList.add('header')

        const soritng = document.createElement('div')
        soritng.classList.add('soritng');
        const h4 = document.createElement('h4');
        h4.innerHTML = 'soritng by:';
        soritng.appendChild(h4);
        const spotingTitle = document.createElement('div');
        spotingTitle.classList.add('spotingTitle');
        this.key.forEach(el =>{
            if(el !="id"){
                const span = document.createElement('span');
                span.innerHTML =this.keyLegend[el];
                span.classList.add('sorting')
                span.setAttribute('name', el);
                spotingTitle.appendChild(span);
            }
        })
        soritng.appendChild(spotingTitle);
        header.appendChild(soritng);

        const del = document.createElement('div');
        del.classList.add('delete');
        del.innerHTML = 'Delete';
        header.appendChild(del);

        const step = document.createElement('select')
        step.setAttribute('name', 'step');
        select.forEach(el =>{
            const option = document.createElement('option');
            option.setAttribute('value', el);
            option.innerHTML = el + ' Per Page';
            step.appendChild(option);
        })
        header.appendChild(step);

        const paginator = document.createElement('div');
        paginator.classList.add('paginator');
        const prew = document.createElement('div')
        prew.classList.add('prew')
        prew.innerHTML = "<"
        paginator.appendChild(prew);
        const paginatorWindow = document.createElement('div');
        paginatorWindow.classList.add('paginatorWindow');
        paginatorWindow.innerHTML = "1-"+this.step+' of '+this.data.length;
        paginator.appendChild(paginatorWindow);
        header.appendChild(paginator);
        const next = document.createElement('div');
        next.classList.add('next');
        next.innerHTML = ">";
        paginator.appendChild(next);

        const legend = document.createElement('div');
        legend.classList.add('legend');
        const legendTitle = document.createElement('div');
        legendTitle.classList.add('legendTitle');
        legendTitle.innerHTML = this.key.length + ' columns select';
        legend.appendChild(legendTitle);
        const body = document.createElement('form')
        body.classList.add('body');

        for(let i = -1; i<this.key.length; i++){
            if(i == -1){
                const p = document.createElement('p')
                p.innerHTML = '<input type="checkbox" value="all"  name="legendTable"> Select All';
                body.appendChild(p);
            }else{
                const p = document.createElement('p')
                p.innerHTML = '<input type="checkbox" value="'+this.key[i]+'" checked="checked" name="legendTable">'+this.key[i];
                body.appendChild(p);
            }
            
        }
        legend.appendChild(body);
        header.appendChild(legend);

        t.insertBefore(header, beforeElement)
    }

   

    createTable(t){
        this.listForDelete = [];       
        const table = t.querySelector('tbody')
        for(let i = 1; i>-0.1; i=i-0.1){
            ((i)=>{
                setTimeout(table.style.opacity = i, 100)
            })(i)
        }
        table.innerHTML = "";
        const header = document.createElement("tr");
        for(let i = -1; i<(this.key.length+1); i++){
            if(i==-1){
                const th = document.createElement('th');
                th.setAttribute('align', 'left');
                th.innerHTML = '<input type="checkbox">';           
                header.appendChild(th);
            }
            
            if(this.key[i] != undefined){
                const th = document.createElement('th');
                th.innerHTML = this.keyLegend[this.key[i]];
                th.setAttribute('align', 'left')
                header.appendChild(th);
            }
            
            if(i==this.key.length){
                const th = document.createElement('th');
                th.innerHTML = ''; 
                th.setAttribute('width', '100')
                th.setAttribute('height', '20')
                header.appendChild(th);
            }
        }

        table.appendChild(header)
        
        if(this.currentStep == 0){
            this.currentStep = this.step;
        }
        for(let i = this.i; i<this.currentStep; i++){
            const tr = document.createElement("tr");
            tr.setAttribute('name', 'body');
            if(i%2 == 0){
                tr.setAttribute('bgcolor', '#bfbfbf');
            }else{
                tr.setAttribute('bgcolor', '#f5f5f5');
            } 
            for(let a = -1; a<(this.key.length+1); a++){
                if(a==-1){
                    const td = document.createElement('td');
                    td.innerHTML = '<input type="checkbox" value="'+this.data[i].id+'"  name="deletElement">';           
                    tr.appendChild(td);
                }
                if(this.key[a] != undefined){
                    const td = document.createElement('td');
                    td.setAttribute('data-id', i)
                    td.setAttribute('name', this.key[a])
                    td.innerHTML = this.data[i][this.key[a]];
                    tr.appendChild(td);
                }
                
                if(a==this.key.length){
                    const td = document.createElement('td');
                    td.innerHTML = ''; 
                    tr.appendChild(td);
                }
                this.i = i;
            }


            // this.key.forEach(el =>{
            //     const td = document.createElement("td");
            //     td.innerHTML = this.data[i][el];
            //     tr.appendChild(td);
            //     this.i = i; 
            // })
            table.appendChild(tr);
        }
        
        for(let i = 0; i<1; i=i+0.1){
            ((i)=>{
                setTimeout(table.style.opacity = i, 100)
            })(i)
        }
                
    }

    createSpotingTitle(t){
        const spot = t.querySelector('.spotingTitle');
        spot.innerHTML = '';
        this.key.forEach(el =>{
            if(el !="id"){
                const span = document.createElement('span');
                span.innerHTML =this.keyLegend[el];
                span.classList.add('sorting')
                span.setAttribute('value', el);
                spot.appendChild(span);
            }
        })
    }

    handlers(){
        const tbody = document.querySelector('.containerForTable');
        const deletElement = document.getElementsByName('deletElement');
        const buttonDelet = document.querySelector('.delete');
        const body = document.querySelector('body')
        const paginatorWindow = document.querySelector('.paginatorWindow'); 
        
        deletElement.forEach(el =>{
            el.addEventListener('click', ()=>{
                const tdColor = el.closest('tr');
                const td = el.closest('tr').querySelectorAll('td');
                const del = td[td.length - 1];   
                if(el.checked){
                    this.color[el.value] = tdColor.getAttribute('bgcolor');
                    tdColor.setAttribute('bgcolor', '#dbf7db');
                    del.setAttribute('align', 'center');
                    this.listForDelete.push(parseInt(el.value));
                    buttonDelet.style.backgroundColor = 'green';
                    buttonDelet.style.cursor = 'pointer';
                    buttonDelet.innerHTML = 'Delete ('+this.listForDelete.length+')';
                    const delButton = document.createElement('span');
                    delButton.setAttribute('value', el.value);
                    delButton.classList.add('delButton');
                    delButton.innerHTML = 'Delete'; 
                    del.appendChild(delButton)
                    delButton.addEventListener('click', ()=>{
                        tdColor.setAttribute('bgcolor', '#ff9e9e');
                        const messageBox = document.createElement('div');
                        messageBox.classList.add('messagebox');
                        const h3 = document.createElement('h3')
                        h3.innerHTML = 'Do you want to delete this line?';
                        messageBox.appendChild(h3);
                        const flex = document.createElement('div');
                        flex.classList.add('flex');
                        const ok = document.createElement('div');
                        ok.classList.add('ok');
                        ok.innerHTML = 'Ok';
                        flex.appendChild(ok);
                        const cancel = document.createElement('div');
                        cancel.classList.add('cancel');
                        cancel.innerHTML = 'cancel';
                        flex.appendChild(cancel);
                        messageBox.appendChild(flex);
                        body.appendChild(messageBox);
                        messageBox.style.top = (event.clientY+10)+'px';
                        messageBox.style.left = (event.clientX-120)+'px';
                        del.removeChild(delButton);
                        ok.addEventListener('click', ()=>{
                            for(let i = 0; i<this.data.length; i++){
                                if(this.data[i].id == el.value){
                                    this.data.splice(i, 1);
                                }  
                            }
                            buttonDelet.style.backgroundColor = '#f5f5f5';
                            buttonDelet.style.cursor = 'default';
                            buttonDelet.innerHTML = 'Delete';
                            this.listForDelete = [];
                            body.removeChild(messageBox);
                            this.i = this.i-this.step+1;
                            paginatorWindow.innerHTML = (this.i+1) + '-' + (this.i+this.step) + ' of ' + this.data.length;
                            
                            this.createTable(tbody);
                            this.handlers();
                            
                        })
                        cancel.addEventListener('click', ()=>{
                            body.removeChild(messageBox);
                            el.checked = false;
                            tdColor.setAttribute('bgcolor', this.color);
                        })

                        
                    })
                }else{
                  
                    for(let i = 0; i<this.listForDelete.length; i++){
                        if(this.listForDelete[i] == parseInt(el.value)){
                            this.listForDelete.splice(i, 1);
                        }
                    }
                   
                    tdColor.setAttribute('bgcolor', this.color[el.value]);
                    const td = el.closest('tr').querySelectorAll('td');
                    const del = td[td.length - 1];
                    del.innerHTML = '';
                    buttonDelet.innerHTML = 'Delete ('+this.listForDelete.length+')';
                    if(this.listForDelete.length == 0){
                        buttonDelet.style.backgroundColor = '#f5f5f5';
                        buttonDelet.style.cursor = 'default';
                        buttonDelet.innerHTML = 'Delete';
                    }
                }
            })
        })
        const mainInput = tbody.querySelector('tr').querySelector('input');
        mainInput.addEventListener('click', ()=>{
            if(mainInput.checked){
                deletElement.forEach(el=>{
                    el.click();
                })
            }else{
                buttonDelet.style.backgroundColor = '#f5f5f5';
                buttonDelet.style.cursor = 'default';
                buttonDelet.innerHTML = 'Delete';
                this.listForDelete = [];
                this.i = this.i-this.step+1;
                this.createTable(tbody);
                this.handlers();
            }
           
        })

        
        buttonDelet.addEventListener('click', ()=>{
            if(this.listForDelete.length!=0 && this.keyButtonDelet){
                this.keyButtonDelet = false;    
                const messageBox = document.createElement('div');
                messageBox.classList.add('messagebox');
                const h3 = document.createElement('h3')
                h3.innerHTML = 'Do you want to delete '+this.listForDelete.length+' line?';
                messageBox.appendChild(h3);
                const flex = document.createElement('div');
                flex.classList.add('flex');
                const ok = document.createElement('div');
                ok.classList.add('ok');
                ok.innerHTML = 'Ok';
                flex.appendChild(ok);
                const cancel = document.createElement('div');
                cancel.classList.add('cancel');
                cancel.innerHTML = 'cancel';
                flex.appendChild(cancel);
                messageBox.appendChild(flex);
                body.appendChild(messageBox);
                messageBox.style.top = (event.clientY+25)+'px';
                messageBox.style.left = (event.clientX-140)+'px';
                ok.addEventListener('click', ()=>{
                    body.removeChild(messageBox);
                    this.keyButtonDelet = true;
                    for(let i =0; i<this.data.length; i++){
              
                        this.listForDelete.forEach(el=>{
                            if(this.data[i].id == el){
                                this.data.splice(i, 1);
                            }
                        })
                    }
                    buttonDelet.style.backgroundColor = '#f5f5f5';
                    buttonDelet.style.cursor = 'default';
                    buttonDelet.innerHTML = 'Delete';
                    this.i = this.i-this.step+1;
                    paginatorWindow.innerHTML = (this.i+1) + '-' + (this.i+this.step) + ' of ' + this.data.length;
                    this.createTable(tbody);
                    this.handlers();
                    this.listForDelete = [];
                })
                cancel.addEventListener('click', ()=>{
                    body.removeChild(messageBox);
                    this.keyButtonDelet = true;

                })
            }
        })
        
    }
   
        

}
const tbody = document.querySelector('.containerForTable');
const legend = ['', ' (100g serving)', '', ' (g)',' (g)',' (g)', ' (%)']
const title = 'Table UL'; 
const select = [10, 15, 20]


window.onload = function(){
    fetch('products.json').then(respon =>{
        return respon.json(); 
    }).then(answer=>{
        const table = new Table (answer);

        table.setKey(legend);
        table.createKey();
        table.createHeaderTable(tbody, title, select);
        table.createSpotingTitle(tbody);
        table.createTable(tbody);
        table.handlers();

        const next = document.querySelector('.next');
        const prew = document.querySelector('.prew');
        const paginatorWindow = document.querySelector('.paginatorWindow');
        const DataLengt =  table.getDataLength()
        const buttonSort = document.querySelector(".soritng").querySelectorAll('span');


        next.addEventListener('click', ()=>{
            const step = table.getStep()+table.getCurrentStep();
            if (step<=DataLengt){
                table.setCurrentStep(step);
                table.setI(1);
                table.createTable(tbody);
                table.handlers();
                paginatorWindow.innerHTML = (table.getI()-table.getStep()+2) + '-' + step + ' of ' + table.getDataLength();
                buttonSort.forEach(el=>{
                    el.style.backgroundColor = "#e6e6e6";
                    el.style.color = 'black';
                })

            }else{
                next.style.opacity = 0.5;
                next.style.cursor = 'not-allowed';
            }
           
        })
        prew.addEventListener('click', ()=>{
            const step = table.getI()-table.getStep()+1;
            if (step>0){
                prew.style.cursor = 'poinrer';
                table.setCurrentStep(step);
                
                table.setI(-1*(table.getStep()*2-1));
     
                table.createTable(tbody);
                table.handlers();
                paginatorWindow.innerHTML = (table.getI()-table.getStep()+2) + '-' + step + ' of ' + table.getDataLength();
                buttonSort.forEach(el=>{
                    el.style.backgroundColor = "#e6e6e6";
                    el.style.color = 'black';
                })

            }else{
                prew.style.opacity = 0.5;
                prew.style.cursor = 'not-allowed';
            }                 
        })

        const selectStep = document.querySelector('select');
        selectStep.addEventListener('change', ()=>{
            
            const option = document.getElementsByTagName('option');
            const step = parseInt(option[selectStep.selectedIndex].value)
            table.setStep(step);
            const a = 0;
            table.setCurrentStep(a);
            table.setI(-1*table.getI());
          
            paginatorWindow.innerHTML = '0-' + step + ' of ' + DataLengt;
            buttonSort.forEach(el=>{
                el.style.backgroundColor = "#e6e6e6";
                el.style.color = 'black';
            })

            table.createTable(tbody);
            table.handlers();
        })

        const bodyForm = document.querySelector('.body');
        bodyForm.addEventListener('change', ()=>{
            const input = bodyForm.getElementsByTagName('input');
            const list = [];
            if(input[0].checked){
                for(let i = 1; i<input.length; i++){
                    input[i].checked = true;
                }
            }
            for(let i = 1; i<input.length; i++){
                if (input[i].checked){
                    const checked = input[i].defaultValue;
                    list.push(checked);
                }
            }
            table.chageKey(list);
            table.setI(-1*(table.getStep()-1))
            buttonSort.forEach(el=>{
                el.style.backgroundColor = "#e6e6e6";
                el.style.color = 'black';
            })
            table.createTable(tbody);
            table.handlers();
        })
        function compare(a, b){
            return b-a;
        }
        buttonSort.forEach(el=>{
            el.addEventListener('click', ()=>{
                buttonSort.forEach(el=>{
                    el.style.backgroundColor = "#e6e6e6";
                    el.style.color = 'black';
                })
                el.style.backgroundColor = "green";
                el.style.color = 'white';
                const t = document.querySelector('.containerForTable');
                const Key = table.getkey2();
                let dataKey = [];
                Key.forEach(val =>{
                    dataKey.push(val);
                })


                for(let a1 = 0; a1<dataKey.length; a1++){
                    if(dataKey[a1] == el.getAttribute('value')){
                        dataKey.splice(a1, 1);
                    }
                }
                dataKey.reverse();
                dataKey.push(el.getAttribute('value'));
                dataKey.reverse();

                table.chageKey(dataKey);
                table.chageI();
                table.createTable(t);
                table.handlers();

                const tr = document.getElementsByName(el.getAttribute('value'))
                let list = [];
                let listKey = {};
                let ListFinal = [];
                tr.forEach(val=>{
                    if (el.getAttribute('value')!= 'product'){
                        list.push(parseFloat(val.innerHTML));
                        listKey[parseFloat(val.innerHTML)] = parseInt(val.getAttribute('data-id'));
                    }else{
                        list.push(val.innerHTML)
                        listKey[val.innerHTML] = parseInt(val.getAttribute('data-id'));
                    }
                })
                list = list.sort(compare)
                list.forEach(el=>{
                    ListFinal.push(listKey[el])
                })

                const tbody = document.querySelector('tbody')
                const trTbody = tbody.querySelectorAll('tr')
                for(let i = 1; i<trTbody.length; i++){
                    tbody.removeChild(trTbody[i]);
                }
                for(let i = 0; i<ListFinal.length; i++){

                    const tr = document.createElement("tr");
                    tr.setAttribute('name', 'body');
                    if(i%2 == 0){
                        tr.setAttribute('bgcolor', '#bfbfbf');
                    }else{
                        tr.setAttribute('bgcolor', '#f5f5f5');
                    } 
                    for(let a = -1; a<(table.getkey2().length+1); a++){
                        if(a==-1){
                            const td = document.createElement('td');
                            td.innerHTML = '<input type="checkbox" value="'+table.getData()[i].id+'"  name="deletElement">';           
                            tr.appendChild(td);
                        }
                        if(table.getkey2()[a] != undefined){
                            const td = document.createElement('td');
                            td.setAttribute('data-id', ListFinal[i])
                            td.setAttribute('name', table.getkey2()[a])
                            td.innerHTML = table.getData()[ListFinal[i]][table.getkey2()[a]];
                            tr.appendChild(td);
                        }
                        
                        if(a==table.getkey2().length){
                            const td = document.createElement('td');
                            td.innerHTML = ''; 
                            tr.appendChild(td);
                        }
                    }
                    tbody.appendChild(tr);
                }
                table.handlers();

                                
                table.chageKey(Key)
            })
        })
    })

}
