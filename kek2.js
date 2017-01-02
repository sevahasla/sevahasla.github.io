window.kek = function() {
    gapi.client.setApiKey('AIzaSyBP-X-BY1njanPyYzKxd200IqtS4fOBKXw');
    gapi.client.load('youtube', 'v3', function() {
        search();
    });
}

var randomRight = Math.floor(Math.random()*40);
var randomLeft = Math.floor(Math.random()*40);
var a=/*'qwertyuiopasdfghjklzxcvbnm'.split('')*/['q','w','e','r','t','y',
'u','i','o','p','a','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m','minecraft'];
Array.prototype.getRandomElement=function(){
    var random=Math.floor(Math.random()*this.length);
    return this[random];
}
var randomString= [1,2,3].map(function(){
    return a.getRandomElement();
}).join();

function search() {
    var randomString= [1,2,3].map(function(){
    return a.getRandomElement();
}).join();
    var q = randomString;
    var videos;
    
    gapi.client.youtube.search.list({
        q: q,
        part:['snippet','statistics'],
        order: 'viewCount',
        type: 'video',
        maxResults:'40'
    }).execute(processRequest1);
}
function processRequest1(response) {
    console.log(response);
    var videoIdLeft = response.items[randomLeft].id.videoId;
    var videoIdRight= response.items[randomRight].id.videoId;
    var iframeRight = createVideoIframer(videoIdRight);
    var iframeLeft = createVideoIframel(videoIdLeft);

    $("div.videosRight")./*append*/html(iframeRight);
    $("div.videosLeft")./*append*/html(iframeLeft);

    // Getting vidoes stats
    var ids = response.items.map(function(item, index, array) {
        return item.id.videoId;
    });


    gapi.client.youtube.videos.list({
        id: ids.join(','),
        part: 'statistics'
    }).execute(processRequest2);
}

function processRequest2(response2) {
    console.info(response2);
    window.viewRight=response2.items[randomRight].statistics.viewCount;
    window.viewLeft=response2.items[randomLeft].statistics.viewCount;   
    console.log('LEFT:   ',viewLeft);
    console.log('RIGHT:  ',viewRight);
}

function createVideoIframer(videoIdRight) {
    return '<iframe width="420" height="315" src="https://www.youtube.com/embed/' + videoIdRight + '"></iframe>';
}

function createVideoIframel(videoIdLeft) {
    return '<iframe width="420" height="315" src="https://www.youtube.com/embed/' + videoIdLeft + '"></iframe>';
}
var score=parseInt(localStorage.getItem('score'));
if (isNaN(score)){
    score=0;
}
$('span.scoreNumber').html(score);
function win() {
    score++;
    localStorage.setItem('score',score);
    $('span.scoreNumber').html(score);
}
function lose() {
    score = 0;
    localStorage.setItem('score',score);
    $('span.scoreNumber').html(score);
}
function guesserRight(){
    if(viewRight >= viewLeft){
        win();
    }
    else{
        lose();
    }
    search();
}
function guesserLeft(){
    if(viewLeft >= viewRight){
        win();
    }
    else{
        lose();
    }
    search();
}
$('.rightButton').on('click', guesserRight);
$('.leftButton').on('click', guesserLeft);
