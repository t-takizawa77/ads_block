function removeAds(ads_list) {
    var n = ads_list.length;
    for (let i = 0; i < n; i++) {
        console.log(ads_list[0]);
        ads_list[0].remove();
    };
}

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

// iframe 対策
setTimeout(() => {
    var ads_iframe = document.getElementsByTagName('iframe');
    const n_ads_if = ads_iframe.length;
    var j = 0;
    for (let i = 0; i < n_ads_if; i++) {
        var idstr = ads_iframe[j].id;
        var GA = false
        if (ads_iframe[j].contentDocument != null) {
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
        } else if (GA) {
            console.log(ads_iframe[j])
            ads_iframe[j].remove();
        } else {
            j = j + 1;
        };
    };
}, 800)