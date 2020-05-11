/*Функція для  кнопки меню,яка створює новий клас і анімацію*/
$('.menu-btn').on('click', function(e){
	e.preventDefault()
	$(this).toggleClass('menu-btn_active');
	$('.menu-nav__link').toggleClass('menu-nav__link_active');
})
document.addEventListener("DOMContentLoaded", function() { // событие загрузки страницы form
    document.querySelectorAll('textarea, input').forEach(function(e) {
        if(e.value === '') e.value = window.sessionStorage.getItem(e.name, e.value);
        e.addEventListener('input', function() {
            window.sessionStorage.setItem(e.name, e.value);
        })
    })

});