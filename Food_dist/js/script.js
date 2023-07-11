// 'use strict';

window.addEventListener('DOMContentLoaded',()=>{

    // TABS

    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

       
    function hideTabContent(){
        tabsContent.forEach(item =>{
            // item.style.display = 'none';
            item.classList.add('hide');
            item.classList.remove('show','fade');
        });

        tabs.forEach(tab=>{
            tab.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i=0){
        tabsContent[i].classList.add('show','fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent(0);

    tabsParent.addEventListener('click',(event)=>{
        const target = event.target;
        if(target && target.classList.contains('tabheader__item')){
            tabs.forEach((item,i)=>{
                if(target == item){
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    // TIMER 

    const deadline = '2021-07-05';

    // get time differnce
    function getTimeRemaining(endtime){
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date());

        if(t<=0){
            hours = 0;
            minutes= 0;
            seconds= 0;
            days= 0;
        }else{
            days = Math.floor(t/(1000*60*60*24));
            hours = Math.floor((t/(1000*60*60)%24));
            minutes = Math.floor((t/(1000*60)%60));
            seconds = Math.floor((t/1000)%60);
        }
        return{
            'total':t,
            'days':days,
            'hours': hours,
            'minutes':minutes,
            'seconds':seconds,
        };
    }

    function getZero(num){
        if(num >=0 && num <10){
            console.log(num);
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime){
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

            //default 4 sec.
            updateClock();

        function updateClock(){
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if(t.total <= 0){
                clearInterval(timeInterval);
                if (t.total <= 0) {
                    clearInterval(timeInterval);
                }
            }
        }
    }

    setClock('.timer', deadline);

    //modal window

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        modalClseBtn = document.querySelector('[data-close]');

        modalTrigger.forEach(btn =>{
            btn.addEventListener('click',openModal);
        });

    // modalClseBtn.addEventListener('click',()=>{
    //     modal.classList.add('hide');
    //     modal.classList.remove('show','fade');
    //     document.body.style.overflow = '';
    // });

    function openModal() {
        modal.classList.add('show','fade');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show', 'fade');
        document.body.style.overflow = '';
    }

    modal.addEventListener('click', (e)=>{
        if(e.target === modal || e.target === modalClseBtn){
            closeModal();
        }
    });

    document.addEventListener('keydown', (e)=>{
        if(e.code ==='Escape' && modal.classList.contains('show')){
            closeModal();
        }
    });

    // set timeout for modal

    const modalTimerId = setTimeout(openModal, 5000);

    // remove the modal if it was invoked once
    function showModalByScroll(){
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight-1){
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    // if page is scrolled then showModalByScroll will run in the end of the page
    window.addEventListener('scroll', showModalByScroll);



    // CARDS

    class MenuCard{
        constructor(src,alt,title,descr,price, parentSelector, ...classes){
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer=37;
            this.changeToUAH();
        }

        changeToUAH(){
            this.price*=this.transfer;
        }

        render(){
            const $el=document.createElement('div');
            if(this.classes.length === 0){
                this.classes = "menu__item";
                $el.classList.add(this.classes);
            }else{
                this.classes.forEach(className => $el.classList.add(className));
            }
            
            $el.innerHTML = `

                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
            `;
            this.parent.append($el);
        }
   
    }

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container',
        "menu__item"
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        15,
        '.menu .container',
        "menu__item"
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню Постное',
        "Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
        12,
        '.menu .container',
        "menu__item"
    ).render();

});