function removeAds(ads_list) {
    var n = ads_list.length;
    for (let i=0; i < n ; i++) {
        console.log(ads_list[i]);
        if (ads_list[i] != undefined) {
            ads_list[i].remove();
        };
    };
}

function removeAllAds() {
    // google対策
    var ads_google1 = document.getElementsByClassName('adsbygoogle');
    removeAds(ads_google1);
    var ads_google2 = document.getElementsByClassName('GoogleCreativeContainerClass');
    removeAds(ads_google2);
    var ads_google3 = document.getElementsByClassName('GoogleActiveViewElement');
    removeAds(ads_google3);
    // adsbyyahoo対策
    var ads_yahoo1 = document.getElementsByClassName('adWrap');
    removeAds(ads_yahoo1);
    var ads_yahoo2 = document.getElementsByClassName('FeedAdItem__ListItem-bMaGJR');
    removeAds(ads_yahoo2);
    // gtmtag対策
    var ads_gtm = document.getElementsByTagName('a');
    var ads_list = [];
    for (let i=0; i<ads_gtm.length; i++) {
        if ("data-gtm-ev" in ads_gtm[i].attributes) {
            ads_list.push(ads_gtm[i]);
        };
        if ("onclick" in ads_gtm[i].attributes) {
            if (ads_gtm[i].attributes.onclick.value.includes("ga")) {
                ads_list.push(ads_gtm[i]);
            };
        };
    };
    removeAds(ads_list);
    
    // iframe 対策
    setTimeout(() => {
        var ads_iframe = document.getElementsByTagName('iframe');
        const n_ads_if = ads_iframe.length;
        var j = 0;
        for (let i=0; i < n_ads_if; i++) {
            var idstr = ads_iframe[j].id;
            var GA = false
            if (ads_iframe[j].contentDocument != null ) {
                if ("cookie" in ads_iframe[j].contentDocument) {
                    GA = ads_iframe[j].contentDocument.cookie.includes("GA");
                };
            };
            if (idstr.includes("rakuten")) {
                console.log(ads_iframe[j])
                ads_iframe[j].remove();
            } else if (idstr.includes("google_ads")) {
                console.log(ads_iframe[j])
                ads_iframe[j].remove();
            } else {
                j = j + 1;
            };
        };
      }, 800)

}

var i = 0;
var timer_id
timerid = setInterval((function(){
    removeAllAds();
    console.log(i);
    i++;
    if (i == 10) {
        clearInterval(timerid);
    }
    }), 3000);
