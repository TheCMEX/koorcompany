$(function() {

 // определение IE
 function iedetect(v) {

 var r = RegExp('msie' + (!isNaN(v) ? ('\\s' + v) : ''), 'i');
  return r.test(navigator.userAgent);

 }

 // Для мобильных экранов просто покажите изображение под названием 'poster.jpg'. Мобильные
 // экраны не поддерживают автопроигрывание видео, или для IE.
 if(screen.width < 800 || iedetect(8) || iedetect(7) || 'ontouchstart' in window) {

  (adjSize = function() { // Создайте функцию с названием adjSize

 $width = $(window).width(); // Ширина экрана
 $height = $(window).height(); // Высота экрана

 // Соответственно масштабируйте изображение
 $('#phone_video').css({
 'background-image' : 'url(poster.jpg)',
 'background-size' : 'cover',
 'width' : $width+'px',
 'height' : $height+'px'
 });

 // Скройте видео
 $('video').hide();

  })(); // Немедленно запустите

  // Запустите также масштабирование
  $(window).resize(adjSize);
 }
 else {

  // Подождите, пока загрузятся метаданные видео
  $('#phone_video video').on('loadedmetadata', function() {

 var $width, $height, // Ширина и высота экрана
 $vidwidth = this.videoWidth, // Ширина видео (настоящая)
 $vidheight = this.videoHeight, // Высота видео (настоящая)
 $aspectRatio = $vidwidth / $vidheight; // Соотношение высоты и ширины видео

 (adjSize = function() { // Создайте функцию с названием adjSize

 $width = $(window).width(); // Ширина экрана
 $height = $(window).height(); // Высота экрана

 $boxRatio = $width / $height; // Соотношение экрана

 $adjRatio = $aspectRatio / $boxRatio; // Соотношение видео, разделенное на размер экрана

 // Установите контейнер на ширину и высоту экрана
 $('#phone_video').css({'width' : $width+'px', 'height' : $height+'px'});

 if($boxRatio < $aspectRatio) { // Если соотношение экрана меньше соотношения размеров...
 // Установите ширину видео на размер экрана, умноженный на $adjRatio
 $vid = $('#phone_video video').css({'width' : $width*$adjRatio+'px'});
 } else {
 // Еще раз установите видео на ширину экрана/контейнера
 $vid = $('#phone_video video').css({'width' : $width+'px'});
 }

 })(); // Немедленно запустите функцию

 // Запустите функцию также при изменении размера окна.
 $(window).resize(adjSize);

  });
 }

});



// Инициализируем плагин spincrement.js, чтобы анимировать числа
// $(".spincrement").spincrement();

// Скрипт, позволяющий начинать анимацию при прокрутке страницы
	$(function () {
		var target_block = $(".spincrement"); // Ищем блок
		var blockStatus = true;
		$(window).scroll(function() {
			var scrollEvent = ($(window).scrollTop() > (target_block.position().top - $(window).height()));
			if(scrollEvent && blockStatus) {
				blockStatus = false; // Запрещаем повторное выполнение функции до следующей перезагрузки страницы.
				$({numberValue: 0}).animate({numberValue: 1000}, {
					duration: 1200, // Скорость анимации, где 500 - 0.5 одной секунды, то есть 500 миллисекунд
					easing: "linear",
					step: function(val) {
						$(".spincrement").html(Math.ceil(val)); // Блок, где необходимо сделать анимацию
					}
				});
			}
		});
	});



