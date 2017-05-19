// JavaScript Document
$(function() {
	var video_1 = document.getElementById("video-1");
	video_1.loop = true;
	var video_2 = document.getElementById("video-2");
	video_2.loop = true;
	$('#content-1').mouseenter(function() {
		video_1.play();
		video_1.style.opacity = '1';
	}).mouseleave(function() {
		video_1.pause();
		video_1.style.opacity = '0';
		//video_1_s.setAttribute('src', video_1_s_src + '?r=' + Math.round(Math.random() * 100));
	});
	$('#content-2').mouseenter(function() {
		video_2.play();
		video_2.style.opacity = '1';
	}).mouseleave(function() {
		video_2.pause();
		video_2.style.opacity = '0';
	});
	//var video_1_s = document.getElementById('video-1-s');
	//var video_1_s_src = video_1_s.getAttribute('src');
});