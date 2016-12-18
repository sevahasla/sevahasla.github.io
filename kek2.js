window.kek = function() {
    gapi.client.setApiKey('AIzaSyBP-X-BY1njanPyYzKxd200IqtS4fOBKXw');
    gapi.client.load('youtube', 'v3', function() {
        search();
    });
}
 

 var a='qwertyuiopasdfghjklzxcvbnm'.split('');
Array.prototype.getRandomElement=function(){
    var random=Math.floor(Math.random()*this.length);
    return this[random];
}
var randomString= [1,2,3].map(function(){
    return a.getRandomElement();
}).join();

function search() {
    var q = randomString;
    var videos;
    
    gapi.client.youtube.search.list({
        q: q,
        part:['snippet','statistics'],
        order: 'viewCount',
        type: 'video',
        maxResults:'10'
    }).execute(function(response) {
       // console.log(response);

        //было так response.items.forEach(function(item,index,array) {

            var videoId = response.items.id.videoId;
            var iframe = createVideoIframe(videoId);

            $("div.videos").append(iframe);
        //было так});

        // Getting vidoes stats
        var ids = response.items.map(function(item, index, array) {
            //var view = item.statistics.viewCount;
            return item.id.videoId;
        
        });

        gapi.client.youtube.videos.list({
            id: ids.join(','),
            part: 'statistics'
        }).execute(function(response) {
            console.info(response);
        
        });
    });
}

function createVideoIframe(videoId) {
    return '<iframe width="420" height="315" src="https://www.youtube.com/embed/' + videoId + '"></iframe>';
}
