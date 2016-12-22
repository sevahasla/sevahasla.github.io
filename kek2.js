window.kek = function() {
    gapi.client.setApiKey('AIzaSyBP-X-BY1njanPyYzKxd200IqtS4fOBKXw');
    gapi.client.load('youtube', 'v3', function() {
        search();
    });
}

var randomRight = Math.floor(Math.random()*25);
var randomLeft = Math.floor(Math.random()*25);
var a=/*'qwertyuiopasdfghjklzxcvbnm'.split('')*/['q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m'];
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
        maxResults:'25'
    }).execute(processRequest1);
}
function processRequest1(response) {
    var videoIdLeft = response.items[randomLeft].id.videoId;
    var videoIdRight= response.items[randomRight].id.videoId;
    var iframeRight = createVideoIframer(videoIdRight);
    var iframeLeft = createVideoIframel(videoIdLeft);

    $("div.videosRight").append(iframeRight);
    $("div.videosLeft").append(iframeLeft);

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
    console.log('LEFT:',viewLeft);
    console.log('RIGHT:',viewRight);
}

function createVideoIframer(videoIdRight) {
    return '<iframe width="420" height="315" src="https://www.youtube.com/embed/' + videoIdRight + '"></iframe>';
}

function createVideoIframel(videoIdLeft) {
    return '<iframe width="420" height="315" src="https://www.youtube.com/embed/' + videoIdLeft + '"></iframe>';
}
 var  score = 0;
function guesserRight(){
   // console.log('RIGHT:',viewRight);
    if(viewRight >= viewLeft){
        score++;
    }
    else{
        score=0;
    }
    $('span.scoreNumber').html(score);
    search();
}
function guesserLeft(){
   // console.log('LEFT:',viewLeft);
    if(viewLeft >= viewRight){
        score++;
    }
    else{
        score=0;
    }
    $('span.scoreNumber').html(score);
    search();
}
$('.rightButton').on('click', guesserRight);
$('.leftButton').on('click', guesserLeft);