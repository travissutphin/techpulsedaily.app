
                

<!DOCTYPE html>
<html dir="ltr" lang="en-US" prefix="og: https://ogp.me/ns#">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="p:domain_verify" content="6606f7f8d5fd45d58461997a838c0b07" />

    <!-- Facebook Domain Verification -->
    <meta name="facebook-domain-verification" content="hr9wri55nf0g2zzuzbqisknng3vccc" />

    <title> How to Host a Node.js app on Cloudways (Step-By-Step Guide) </title>
    <link rel="pingback" href="https://www.cloudways.com/blog/xmlrpc.php">

            <link rel="shortcut icon" href="https://www.cloudways.com/blog/wp-content/themes/cloudways/favico.png">



    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

    <link rel="alternate" hreflang="en" href="https://www.cloudways.com/blog/how-to-host-a-node-js-application/" />
<link rel="alternate" hreflang="x-default" href="https://www.cloudways.com/blog/how-to-host-a-node-js-application/" />

		<!-- All in One SEO 4.6.1.1 - aioseo.com -->
		<meta name="description" content="This in-depth guide covers everything you need, from setting up to launching your Node.js application on cloudways, in five easy steps." />
		<meta name="robots" content="max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
		<link rel="canonical" href="https://www.cloudways.com/blog/how-to-host-a-node-js-application/" />
		<meta name="generator" content="All in One SEO (AIOSEO) 4.6.1.1" />
		<meta property="og:locale" content="en_US" />
		<meta property="og:site_name" content="The Official Cloudways Blog" />
		<meta property="og:type" content="article" />
		<meta property="og:title" content="How to Host a Node.js app on Cloudways (Step-By-Step Guide)" />
		<meta property="og:description" content="This in-depth guide covers everything you need, from setting up to launching your Node.js application on cloudways, in five easy steps." />
		<meta property="og:url" content="https://www.cloudways.com/blog/how-to-host-a-node-js-application/" />
		<meta property="fb:app_id" content="2160236114004865" />
		<meta property="fb:admins" content="143087562453461" />
		<meta property="og:image" content="https://www.cloudways.com/blog/wp-content/uploads/OG-Banner_1200x628-237.jpg" />
		<meta property="og:image:secure_url" content="https://www.cloudways.com/blog/wp-content/uploads/OG-Banner_1200x628-237.jpg" />
		<meta property="og:image:width" content="1200" />
		<meta property="og:image:height" content="628" />
		<meta property="article:published_time" content="2024-09-19T09:09:47+00:00" />
		<meta property="article:modified_time" content="2024-09-19T09:09:47+00:00" />
		<meta name="twitter:card" content="summary_large_image" />
		<meta name="twitter:site" content="@cloudways" />
		<meta name="twitter:title" content="How to Host a Node.js app on Cloudways (Step-By-Step Guide)" />
		<meta name="twitter:description" content="This in-depth guide covers everything you need, from setting up to launching your Node.js application on cloudways, in five easy steps." />
		<meta name="twitter:creator" content="@cloudways" />
		<meta name="twitter:image" content="https://www.cloudways.com/blog/wp-content/uploads/OG-Banner_1200x628-237.jpg" />
		<script type="application/ld+json" class="aioseo-schema">
			{"@context":"https:\/\/schema.org","@graph":[{"@type":"Article","@id":"https:\/\/www.cloudways.com\/blog\/how-to-host-a-node-js-application\/#article","name":"How to Host a Node.js app on Cloudways (Step-By-Step Guide)","headline":"How to Host a Node.js app on Cloudways (Step-By-Step Guide)","author":{"@id":"https:\/\/www.cloudways.com\/blog\/author\/salwa\/#author"},"publisher":{"@id":"https:\/\/www.cloudways.com\/blog\/#organization"},"image":{"@type":"ImageObject","url":"https:\/\/www.cloudways.com\/blog\/wp-content\/uploads\/ThumbImage_352x185-264.jpg","width":352,"height":185,"caption":"host node.js app"},"datePublished":"2024-09-19T11:09:47+02:00","dateModified":"2024-09-19T11:09:47+02:00","inLanguage":"en-US","mainEntityOfPage":{"@id":"https:\/\/www.cloudways.com\/blog\/how-to-host-a-node-js-application\/#webpage"},"isPartOf":{"@id":"https:\/\/www.cloudways.com\/blog\/how-to-host-a-node-js-application\/#webpage"},"articleSection":"Knowledge Center, host node.js app, Optional"},{"@type":"BreadcrumbList","@id":"https:\/\/www.cloudways.com\/blog\/how-to-host-a-node-js-application\/#breadcrumblist","itemListElement":[{"@type":"ListItem","@id":"https:\/\/www.cloudways.com\/blog\/#listItem","position":1,"name":"Home","item":"https:\/\/www.cloudways.com\/blog\/","nextItem":"https:\/\/www.cloudways.com\/blog\/how-to-host-a-node-js-application\/#listItem"},{"@type":"ListItem","@id":"https:\/\/www.cloudways.com\/blog\/how-to-host-a-node-js-application\/#listItem","position":2,"name":"How to Host a Node.js app on Cloudways (Step-By-Step Guide)","previousItem":"https:\/\/www.cloudways.com\/blog\/#listItem"}]},{"@type":"Organization","@id":"https:\/\/www.cloudways.com\/blog\/#organization","name":"The Official Cloudways Blog","url":"https:\/\/www.cloudways.com\/blog\/","sameAs":["https:\/\/twitter.com\/cloudways"]},{"@type":"Person","@id":"https:\/\/www.cloudways.com\/blog\/author\/salwa\/#author","url":"https:\/\/www.cloudways.com\/blog\/author\/salwa\/","name":"Salwa Mujtaba","image":{"@type":"ImageObject","@id":"https:\/\/www.cloudways.com\/blog\/how-to-host-a-node-js-application\/#authorImage","url":"https:\/\/secure.gravatar.com\/avatar\/6e4e31dd8b3a44332aca284ebfd99281?s=96&d=mm&r=g","width":96,"height":96,"caption":"Salwa Mujtaba"}},{"@type":"WebPage","@id":"https:\/\/www.cloudways.com\/blog\/how-to-host-a-node-js-application\/#webpage","url":"https:\/\/www.cloudways.com\/blog\/how-to-host-a-node-js-application\/","name":"How to Host a Node.js app on Cloudways (Step-By-Step Guide)","description":"This in-depth guide covers everything you need, from setting up to launching your Node.js application on cloudways, in five easy steps.","inLanguage":"en-US","isPartOf":{"@id":"https:\/\/www.cloudways.com\/blog\/#website"},"breadcrumb":{"@id":"https:\/\/www.cloudways.com\/blog\/how-to-host-a-node-js-application\/#breadcrumblist"},"author":{"@id":"https:\/\/www.cloudways.com\/blog\/author\/salwa\/#author"},"creator":{"@id":"https:\/\/www.cloudways.com\/blog\/author\/salwa\/#author"},"image":{"@type":"ImageObject","url":"https:\/\/www.cloudways.com\/blog\/wp-content\/uploads\/ThumbImage_352x185-264.jpg","@id":"https:\/\/www.cloudways.com\/blog\/how-to-host-a-node-js-application\/#mainImage","width":352,"height":185,"caption":"host node.js app"},"primaryImageOfPage":{"@id":"https:\/\/www.cloudways.com\/blog\/how-to-host-a-node-js-application\/#mainImage"},"datePublished":"2024-09-19T11:09:47+02:00","dateModified":"2024-09-19T11:09:47+02:00"},{"@type":"WebSite","@id":"https:\/\/www.cloudways.com\/blog\/#website","url":"https:\/\/www.cloudways.com\/blog\/","name":"The Official Cloudways Blog","description":"Robust Managed Cloud Hosting Solutions","inLanguage":"en-US","publisher":{"@id":"https:\/\/www.cloudways.com\/blog\/#organization"}}]}
		</script>
		<!-- All in One SEO -->

<link rel="alternate" type="application/rss+xml" title="The Official Cloudways Blog &raquo; How to Host a Node.js app on Cloudways (Step-By-Step Guide) Comments Feed" href="https://www.cloudways.com/blog/how-to-host-a-node-js-application/feed/" />
<script type="text/javascript">
/* <![CDATA[ */
window._wpemojiSettings = {"baseUrl":"https:\/\/s.w.org\/images\/core\/emoji\/14.0.0\/72x72\/","ext":".png","svgUrl":"https:\/\/s.w.org\/images\/core\/emoji\/14.0.0\/svg\/","svgExt":".svg","source":{"concatemoji":"https:\/\/www.cloudways.com\/blog\/wp-includes\/js\/wp-emoji-release.min.js?ver=6.4.3"}};
/*! This file is auto-generated */
!function(i,n){var o,s,e;function c(e){try{var t={supportTests:e,timestamp:(new Date).valueOf()};sessionStorage.setItem(o,JSON.stringify(t))}catch(e){}}function p(e,t,n){e.clearRect(0,0,e.canvas.width,e.canvas.height),e.fillText(t,0,0);var t=new Uint32Array(e.getImageData(0,0,e.canvas.width,e.canvas.height).data),r=(e.clearRect(0,0,e.canvas.width,e.canvas.height),e.fillText(n,0,0),new Uint32Array(e.getImageData(0,0,e.canvas.width,e.canvas.height).data));return t.every(function(e,t){return e===r[t]})}function u(e,t,n){switch(t){case"flag":return n(e,"\ud83c\udff3\ufe0f\u200d\u26a7\ufe0f","\ud83c\udff3\ufe0f\u200b\u26a7\ufe0f")?!1:!n(e,"\ud83c\uddfa\ud83c\uddf3","\ud83c\uddfa\u200b\ud83c\uddf3")&&!n(e,"\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc65\udb40\udc6e\udb40\udc67\udb40\udc7f","\ud83c\udff4\u200b\udb40\udc67\u200b\udb40\udc62\u200b\udb40\udc65\u200b\udb40\udc6e\u200b\udb40\udc67\u200b\udb40\udc7f");case"emoji":return!n(e,"\ud83e\udef1\ud83c\udffb\u200d\ud83e\udef2\ud83c\udfff","\ud83e\udef1\ud83c\udffb\u200b\ud83e\udef2\ud83c\udfff")}return!1}function f(e,t,n){var r="undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?new OffscreenCanvas(300,150):i.createElement("canvas"),a=r.getContext("2d",{willReadFrequently:!0}),o=(a.textBaseline="top",a.font="600 32px Arial",{});return e.forEach(function(e){o[e]=t(a,e,n)}),o}function t(e){var t=i.createElement("script");t.src=e,t.defer=!0,i.head.appendChild(t)}"undefined"!=typeof Promise&&(o="wpEmojiSettingsSupports",s=["flag","emoji"],n.supports={everything:!0,everythingExceptFlag:!0},e=new Promise(function(e){i.addEventListener("DOMContentLoaded",e,{once:!0})}),new Promise(function(t){var n=function(){try{var e=JSON.parse(sessionStorage.getItem(o));if("object"==typeof e&&"number"==typeof e.timestamp&&(new Date).valueOf()<e.timestamp+604800&&"object"==typeof e.supportTests)return e.supportTests}catch(e){}return null}();if(!n){if("undefined"!=typeof Worker&&"undefined"!=typeof OffscreenCanvas&&"undefined"!=typeof URL&&URL.createObjectURL&&"undefined"!=typeof Blob)try{var e="postMessage("+f.toString()+"("+[JSON.stringify(s),u.toString(),p.toString()].join(",")+"));",r=new Blob([e],{type:"text/javascript"}),a=new Worker(URL.createObjectURL(r),{name:"wpTestEmojiSupports"});return void(a.onmessage=function(e){c(n=e.data),a.terminate(),t(n)})}catch(e){}c(n=f(s,u,p))}t(n)}).then(function(e){for(var t in e)n.supports[t]=e[t],n.supports.everything=n.supports.everything&&n.supports[t],"flag"!==t&&(n.supports.everythingExceptFlag=n.supports.everythingExceptFlag&&n.supports[t]);n.supports.everythingExceptFlag=n.supports.everythingExceptFlag&&!n.supports.flag,n.DOMReady=!1,n.readyCallback=function(){n.DOMReady=!0}}).then(function(){return e}).then(function(){var e;n.supports.everything||(n.readyCallback(),(e=n.source||{}).concatemoji?t(e.concatemoji):e.wpemoji&&e.twemoji&&(t(e.twemoji),t(e.wpemoji)))}))}((window,document),window._wpemojiSettings);
/* ]]> */
</script>
<link rel='stylesheet' id='group3_css-css' href='https://www.cloudways.com/blog/wp-content/themes/cloudways/template/cache/5454a7dca7789e4b0b317979d516e0e8.css?ver=6.4.3' type='text/css' media='all' />
<style id='wp-emoji-styles-inline-css' type='text/css'>

	img.wp-smiley, img.emoji {
		display: inline !important;
		border: none !important;
		box-shadow: none !important;
		height: 1em !important;
		width: 1em !important;
		margin: 0 0.07em !important;
		vertical-align: -0.1em !important;
		background: none !important;
		padding: 0 !important;
	}
</style>
<link rel='stylesheet' id='wpml-blocks-css' href='https://www.cloudways.com/blog/wp-content/plugins/sitepress-multilingual-cms/dist/css/blocks/styles.css?ver=4.6.9' type='text/css' media='all' />
<link rel='stylesheet' id='wpml-legacy-horizontal-list-0-css' href='https://www.cloudways.com/blog/wp-content/plugins/sitepress-multilingual-cms/templates/language-switchers/legacy-list-horizontal/style.min.css?ver=1' type='text/css' media='all' />
<style id='wpml-legacy-horizontal-list-0-inline-css' type='text/css'>
.wpml-ls-statics-footer a, .wpml-ls-statics-footer .wpml-ls-sub-menu a, .wpml-ls-statics-footer .wpml-ls-sub-menu a:link, .wpml-ls-statics-footer li:not(.wpml-ls-current-language) .wpml-ls-link, .wpml-ls-statics-footer li:not(.wpml-ls-current-language) .wpml-ls-link:link {color:#444444;background-color:#ffffff;}.wpml-ls-statics-footer a, .wpml-ls-statics-footer .wpml-ls-sub-menu a:hover,.wpml-ls-statics-footer .wpml-ls-sub-menu a:focus, .wpml-ls-statics-footer .wpml-ls-sub-menu a:link:hover, .wpml-ls-statics-footer .wpml-ls-sub-menu a:link:focus {color:#000000;background-color:#eeeeee;}.wpml-ls-statics-footer .wpml-ls-current-language > a {color:#444444;background-color:#ffffff;}.wpml-ls-statics-footer .wpml-ls-current-language:hover>a, .wpml-ls-statics-footer .wpml-ls-current-language>a:focus {color:#000000;background-color:#eeeeee;}
</style>
<link rel='stylesheet' id='enlighter-local-css' href='https://www.cloudways.com/blog/wp-content/plugins/enlighter/resources/EnlighterJS.min.css?ver=3.10.0' type='text/css' media='all' />
<script type="text/javascript" id="wpml-cookie-js-extra">
/* <![CDATA[ */
var wpml_cookies = {"wp-wpml_current_language":{"value":"en","expires":1,"path":"\/"}};
var wpml_cookies = {"wp-wpml_current_language":{"value":"en","expires":1,"path":"\/"}};
/* ]]> */
</script>

<script type="text/javascript" src="https://www.cloudways.com/blog/wp-content/themes/cloudways/template/js/jquery-1.11.2-theme.min.js?ver=6.4.3" id="jquery-1.11.2-theme.min.js-js"></script>
<link rel="https://api.w.org/" href="https://www.cloudways.com/blog/wp-json/" /><link rel="alternate" type="application/json" href="https://www.cloudways.com/blog/wp-json/wp/v2/posts/135612" /><link rel='shortlink' href='https://www.cloudways.com/blog/?p=135612' />
<link rel="alternate" type="application/json+oembed" href="https://www.cloudways.com/blog/wp-json/oembed/1.0/embed?url=https%3A%2F%2Fwww.cloudways.com%2Fblog%2Fhow-to-host-a-node-js-application%2F" />
<link rel="alternate" type="text/xml+oembed" href="https://www.cloudways.com/blog/wp-json/oembed/1.0/embed?url=https%3A%2F%2Fwww.cloudways.com%2Fblog%2Fhow-to-host-a-node-js-application%2F&#038;format=xml" />
<meta name="generator" content="WPML ver:4.6.9 stt:1,66,2;" />
      <meta name="onesignal" content="wordpress-plugin"/>
            
<script type="text/javascript">
    window['cw_externalJS'] = window.cw_externalJS || {};
    window['cw_externalJS']['head'] = ["https:\/\/www.cloudways.com\/blog\/wp-content\/plugins\/sitepress-multilingual-cms\/res\/js\/cookies\/language-cookie.js?ver=4.6.9\" id=\"wpml-cookie-js\" defer=\"defer\" data-wp-strategy=\"defer"];
</script><script type="text/javascript">
    window['cw_inlineJS'] = window.cw_inlineJS || {};
    window['cw_inlineJS']['head'] = ["\n\n      window.OneSignal = window.OneSignal || [];\n\n      OneSignal.push( function() {\n        OneSignal.SERVICE_WORKER_UPDATER_PATH = \"OneSignalSDKUpdaterWorker.js.php\";\n                      OneSignal.SERVICE_WORKER_PATH = \"OneSignalSDKWorker.js.php\";\n                      OneSignal.SERVICE_WORKER_PARAM = { scope: \"\/\" };\n        OneSignal.setDefaultNotificationUrl(\"https:\/\/www.cloudways.com\/blog\");\n        var oneSignal_options = {};\n        window._oneSignalInitOptions = oneSignal_options;\n\n        oneSignal_options['wordpress'] = true;\noneSignal_options['appId'] = 'a9621cb9-e468-44a8-a667-ce41b7835469';\noneSignal_options['allowLocalhostAsSecureOrigin'] = true;\noneSignal_options['welcomeNotification'] = { };\noneSignal_options['welcomeNotification']['title'] = \"\";\noneSignal_options['welcomeNotification']['message'] = \"\";\noneSignal_options['path'] = \"https:\/\/www.cloudways.com\/blog\/wp-content\/plugins\/onesignal-free-web-push-notifications\/sdk_files\/\";\noneSignal_options['promptOptions'] = { };\noneSignal_options['promptOptions']['actionMessage'] = \"Cloudways wants to  send notifications:\";\noneSignal_options['promptOptions']['siteName'] = \"Cloudways Blog\";\noneSignal_options['notifyButton'] = { };\noneSignal_options['notifyButton']['enable'] = true;\noneSignal_options['notifyButton']['position'] = 'bottom-left';\noneSignal_options['notifyButton']['theme'] = 'default';\noneSignal_options['notifyButton']['size'] = 'medium';\noneSignal_options['notifyButton']['showCredit'] = true;\noneSignal_options['notifyButton']['text'] = {};\n                OneSignal.init(window._oneSignalInitOptions);\n                OneSignal.showSlidedownPrompt();      });\n\n      function documentInitOneSignal() {\n        var oneSignal_elements = document.getElementsByClassName(\"OneSignal-prompt\");\n\n        var oneSignalLinkClickHandler = function(event) { OneSignal.push(['registerForPushNotifications']); event.preventDefault(); };        for(var i = 0; i < oneSignal_elements.length; i++)\n          oneSignal_elements[i].addEventListener('click', oneSignalLinkClickHandler, false);\n      }\n\n      if (document.readyState === 'complete') {\n           documentInitOneSignal();\n      }\n      else {\n           window.addEventListener(\"load\", function(event){\n               documentInitOneSignal();\n          });\n      }\n    "];
</script>
    <script type="text/javascript">
        var BASE_URL = 'https://www.cloudways.com/blog';
        var THEME_URL = 'https://www.cloudways.com/blog/wp-content/themes/cloudways';
        var PAGE_NAME = '';
        var SITE_URL = BASE_URL;
        var IS_SINGLE = '1';
        var WP_AJAX_URL = 'https://www.cloudways.com/blog/wp-admin/admin-ajax.php';
    </script>

    <script type="text/javascript">
        window.jQuery = window.$;
    </script>

    <script type="text/javascript">
        (function (p, u, s, h) {
            p._pcq = p._pcq || [];
            p._pcq.push(['_currentTime', Date.now()]);
            s = u.createElement('script');
            s.type = 'text/javascript';
            s.async = true;
            s.src = 'https://cdn.pushcrew.com/js/ec22982ce1d63b9637582b3bdc5a7be9.js';
            h = u.getElementsByTagName('script')[0];
            h.parentNode.insertBefore(s, h);
        })(window, document);
    </script>

    <script type="text/javascript">
        var mfq = mfq || [];
        (function () {
            var mf = document.createElement("script");
            mf.type = "text/javascript";
            mf.async = true;
            mf.src = "//cdn.mouseflow.com/projects/c1ee8aef-2c28-4466-a034-958f82361c75.js";
            document.getElementsByTagName("head")[0].appendChild(mf);
        })();
    </script>

    <!-- Google Tag Manager -->
    <script>(function (w, d, s, l, i) {
            w[l] = w[l] || []; w[l].push({
                'gtm.start':
                    new Date().getTime(), event: 'gtm.js'
            }); var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
                    'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', 'GTM-NWBZTT');</script>
    <!-- End Google Tag Manager -->

</head>

<!-- Campaign Module -->

<body data-rsssl=1 class="post-template-default single single-post postid-135612 single-format-standard">

    <script type="text/javascript">
    //window.isEuUser = '';
    //window.isEuUser = true;

    /**
     * CookieConsent class for managing cookie consent
     * @constructor
     */
    CookieConsent.prototype = {
    isEuUser: function (){
        var euUserCookie = this.getCookie('notice_behavior').split(",");
        if(euUserCookie.indexOf('eu') !== -1){
            return true;
        } 
        return false;
    },

    isServiceEnabled: function(service) {
        // Add return true; to disable all cookie settings functionality
        // if (this.isEuUser()){
            // console.log('eu user');
            if ((this.customerRecordedConsent !== "")) {
                // console.log('eu user and consent available' );
                var consentConfig = {
                    "1": { service: 'functional' },
                    "2": { services: ['performance', 'marketing'] }
                };

                for (var consentValue in consentConfig) {
                    var config = consentConfig[consentValue];
                    if (
                        this.customerRecordedConsent.indexOf(consentValue) !== -1 &&
                        (config.services ? config.services.includes(service) : config.service === service)
                    ) {
                        return true;
                    }
                }

                return false; // Default case if no conditions are met

            }else{
                // console.log('eu user and consent not available');
                return false;
            }
        // } 
        // else  {
        //     console.log('Not eu user');
        //     return true
        // }
    },

    // isServiceEnabled: function(service) {
    //     // Add return true; to disable all cookie settings functionality
    //     if ((this.customerRecordedConsent !== "" && this.customerRecordedConsent.consent)) {
    //         return (this.customerRecordedConsent.consent[service] === true);
    //     } else if (!window.isEuUser || this.customerRecordedConsent === "") {
    //         return true;
    //     }
    //     return false;
    // },

    setCustomerRecordedConsent: function() {
        this.customerRecordedConsent = this.getCookie('notice_gdpr_prefs');
        //this.customerRecordedConsent = this.getCookie('cw_chk_consent');
        // if (this.customerRecordedConsent !== "") {
        //     this.customerRecordedConsent = JSON.parse(this.customerRecordedConsent);
        // }
    },

    recordCustomerConsent: function() {
        var expiryDate = this.getExpiryDate(365);
        this.cookieConsent.expiry = expiryDate.getTime();
        //this.createCookie('cw_chk_consent', JSON.stringify(this.cookieConsent), expiryDate);
    },

    /**
     * This will remove cookie by name
     * @param name
     */

    removeCookie: function(name, subdomain) {
        var date = new Date();
        date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();

        var domain = subdomain ? subdomain : "";
        domain += ".cloudways.com";

        document.cookie = name + "=" + '' + expires + ";domain=" + domain + "; path=/";
    },

    /**
     * To get cookie by name
     * @param cname
     * @returns {*}
     */
    getCookie: function(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) == 0) return decodeURIComponent(c.substring(name.length, c.length).replace(/\+/g, ' '));
        }
        return "";
    },

    /**
     * This will create cookie on cloudways domain
     * @param name
     * @param value
     * @param days
     */
    createCookie: function(name, value, expiryDate, subdomain) {
        var expires = (expiryDate) ?
            "; expires=" + expiryDate.toGMTString() :
            '';

        var domain = subdomain ? subdomain : "";
        domain += ".cloudways.com";
        document.cookie = name + "=" + value + expires + ";domain=" + domain + "; path=/";
    },

    getExpiryDate: function(days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        return date;
    },

    getExpiryDateByTime: function(timeStamp) {
        var date = new Date(timeStamp * 1000);
        return date;
    },

    /**
     * update customer recorded consent
     */
    updateCustomerRecordedConsent: function() {
        if (this.subdomain !== false && this.customerRecordedConsent !== "") {
            this.customerRecordedConsent.domains[this.subdomain] = true;
            var expiryDate = this.getExpiryDateByTime(this.customerRecordedConsent.expiry);
            this.createCookie('cw_chk_consent', JSON.stringify(this.customerRecordedConsent), expiryDate);
        }
    },

    /**
     * To remove customer cookie by consent setting
     */
    removeCustomerCookies: function() {
        var serviceMappings = this.getServiceMapping(),
            subdomain = this.subdomain == false ? '' : this.subdomain;
        for (var consentType in this.customerRecordedConsent.consent) {
            var status = this.customerRecordedConsent.consent[consentType];
            if (!status) {
                var serviceMapping = serviceMappings.services[consentType] ? serviceMappings.services[consentType] : [];
                for (var category in serviceMapping) {
                    var cookieMappings = serviceMapping[category];
                    for (var myCookieKey in cookieMappings) {
                        var myCookie = cookieMappings[myCookieKey];
                        if (this.getCookie(myCookie) !== "") {
                            this.removeCookie(myCookie);

                            if (this.subdomain !== false) {
                                this.removeCookie(myCookie, '.'.subdomain);
                            }
                        }
                    }
                }
            }
        }

        this.updateCustomerRecordedConsent();
    },

    getServiceMapping: function() {
        return { "services": { "performance": { "crazyEgg": ["_ceg.s", "_ceg.u"], "googleAnalytics": ["_ga", "_gid", "_gat_UA-24286262-1", "_uetsid", "collect", "___utmvc"], "optimizely": ["optimizelyBuckets", "optimizelyEndUserId", "optimizelySegments", "optimizelyPendingLogEvents", "optimizely_data$$first_session"], "newRelic": ["JSESSIONID"], "omniconvert": ["mktz_optout", "mktz_client", "mktz_survey", "mktz_interaction", "mktz_ab", "mktz_sess"] }, "essential": { "incapsula": ["incap_ses_634_813822", "visid_incap_813821"], "viralLoop": ["virlLoopCookie"], "omniconvert": ["PRLST", "SPSI", "UTGv2", "adOtr", "split", "spcsrf"], "intercom": ["intercom-id-fv5k8i5t", "intercom-session-fv5k8i5t"] }, "functional": { "youtube": ["GPS", "VISITOR_INFO1_LIVE", "YSC"], "optinMonster": ["_omappvp", "_omappvs", "omSessionPageviews", "omSessionStart"], "oneSignal": ["onesignal-pageview-count"], "addThisSocialPlugin": ["__atuvs", "_at.cww", "at-lojson-cache-", "ouid", "at-rand", "bt2", "di2", "loc", "uid", "uvc", "vc", "xtc"], "userVoice": ["uvts", "_uservoice_tz", "_rf", "_uvsid"], "disqus": ["G_ENABLED_IDPS", "disqus_unique", "__jid", "__utma", "__utmb", "__utmc", "__utmt", "__utmtz"], "facebook": ["fr"], "viralLoop": ["key#user", "key#referrer", "key#session_start", "key#last_session_end", "key#distinctId", "key#accessorBox", "vl_guest_checkout"] }, "marketing": { "hubSpot": ["__hssc", "__hssrc", "__hstc", "hubspotutk"] } } };
    }

};

function CookieConsent() {
    this.subdomain = 'platform';
    this.cookieConsent = {
        consent: {
            performance: true,
            functional: true,
            marketing: true
        },
        domains: {
            platform: false,
            blog: false,
            support: false,
            feedback: false,
            developers: false,
            community: false
        },
        expiry: ''
    };

    this.setCustomerRecordedConsent();

    // if (this.customerRecordedConsent !== "" &&
    //     this.subdomain !== false &&
    //     this.customerRecordedConsent.domains[this.subdomain] === false) {
    //     this.removeCustomerCookies();
    // }
}

var cookieConsent = new CookieConsent();

    function CookieConsentInit(){
        var cookieConsent = new CookieConsent();

        if(window.isEuUser && cookieConsent.customerRecordedConsent === "") {
            var visitedPage = document.location.pathname;
            //var visitedPage = visitedPage.substr(1);

            var attrValue = $('#change-settings').attr('href');
            $('#change-settings').attr('href', attrValue + '?from=' + visitedPage);

            jQuery('body').addClass('eu_gdpr');
            if(jQuery(window).width() < 767)
            {
                jQuery('#cookies-bot').show().animate({height: '130px'}, 400, 'linear');
            }else{
                jQuery('#cookies-bot').show().animate({height: '104px'}, 400, 'linear');
            }
        }

        jQuery('#continue-settings').click(function() {
            cookieConsent.recordCustomerConsent();
            jQuery('#cookies-bot').hide();
            jQuery('#cw-content').css('padding', '0');
            jQuery('body').removeClass('eu_gdpr');
            /*$('#cookies-bot').animate({height: '0'}, 400, 'linear');
             window.location.reload();*/
        });
    }
</script>
<div id="cookies-bot">
    <div class="cookies-bot-inr">
        <div class="cookies-bot-lft">
            <h3>This website uses cookies</h3>
            <p>Our website, platform and/or any sub domains use cookies to understand how you use our services, and to improve both your experience and our marketing relevance.</p>
        </div>
        <div class="cookies-bot-rt">
            <a href="javascript:void(0);" id="continue-settings">Continue</a>
            <a href="https://www.cloudways.com/en/consent-review.php" id="change-settings">Change settings</a>
            <a href="https://www.cloudways.com/en/terms.php#cookie" target="_blank" id="more-settings">Find  out more</a>
        </div>
        <div class="clearfix"></div>
    </div>
</div>
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NWBZTT" height="0" width="0"
            style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->
    <!-- BEGIN google tag manager -->
    <!-- <noscript>
        <iframe src="//www.googletagmanager.com/ns.html?id=GTM-NWBZTT" height="0" width="0" style="display:none;visibility:hidden"></iframe>
    </noscript> -->
    <!-- END google tag manager -->


    <!-- Old Blog Header Style Begin -->
    <style type="text/css">
        @media (min-width: 768px) {
            /*.helobar-full{    background: url(https://www.cloudways.com/assets/img/widget/new-year-hb-2017.jpg) no-repeat center top #5d4375;}*/
            /*.hlobar-stiric {position: absolute; color: #fff; left: 41%; top: 19px; text-decoration: none; font-size: 18px; font-weight: bold; z-index: 9;}

            /*hm-bnr-serch {padding-top: 180px;}*/
            /*.blg-main-catg ul li:nth-child(2){display: none;}*/
            /*.cw-inr-blg-top-sec, #blg-catg-sec {
                padding-top: 214px;
            }
            .blg-main-catg{
                top: 159px;
            }
            .blg-main-catg.blg-main-catg-stick{
                top: 130px;
            }
            .stick{
                top: 187px;
            }*/

        }
    </style>
    <!--<div class="hlobar pull-wide hide-xs">
        <a href="https://platform.cloudways.com/signup" class="helobar-full col-xs-12"></a>-->
    <!--<a href="javascript:void(0);" class="hlobar-stiric">*</a>-->
    <!--<div class="container">
            <span class="hlobar-text">
                Avoid the Crowd. Host now on Cloud at 25% OFF for 3 Months.
            </span>
            <a href="https://platform.cloudways.com/signup" class="btn btn-primary gtm-cta-hellobar">HOST NOW</a>
        </div>
    </div>-->
    <!-- Old Blog Header Style End -->

    <a href="https://platform.cloudways.com/signup?utm_source=Website&utm_medium=Hellobar&utm_campaign=BFCM18&utm_content=hellobar_navigation_blog"
        class="cmpg_helobar-full"></a>
    <!-- Header Begin  -->
        <!--  -->
    <!-- <div class="bfcmHellobar24 bfcmAffiliateHellobar24 hellobarTimerOuter">
            <div class="container">
                <div class="hellobarInner hellobarInnerWithTimer">
                    <div class="headingArea">
                        <h3 class="evet">Highest Ever</h3>
                        <h3 class="commission">Commission </h3>
                    </div>

                    <div class="bfcmtimerwrap">
                        <ul class="clounterMainDiv">
                            <li>
                                <div class="counter">
                                    <h3 class="countTxt" id="days">0</h3>
                                    <p class="counterpara">Days</p>
                                </div>
                            </li>
                            <li>
                                <div class="counter">
                                    <h3 class="countTxt" id="hours">0</h3>
                                    <p class="counterpara">Hours</p>
                                </div>
                            </li>
                            <li>
                                <div class="counter">
                                    <h3 class="countTxt" id="minutes">0</h3>
                                    <p class="counterpara">Mints</p>
                                </div>
                            </li>
                            <li class="pulse">
                                <div class="counter">
                                    <h3 class="countTxt" id="seconds">0</h3>
                                    <p class="counterpara">Sec</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="discountArea">
                        <h3>$100/Sale + <div class="pink_wrap">$50 Bonus</div>
                        </h3>
                    </div>
                    <div class="discount_details">
                        <ul>
                            <li>Monthly Payouts</li>
                            <li>Lifetime Commissions</li>
                            <li>Performance Based Slabs</li>
                        </ul>
                    </div>
                    <div class="seperator"></div>
                    <div class="lastArea">
                        <span class="cw_bfcm24_gbl_btn">Become Affiliate Now</span>
                        <p class="promo-text">Promo Code: <strong>BFCM2024</strong> </p>
                    </div>
                </div>
            </div>
        </div> -->
    <!--  -->
   <!-- <div class="bfcmHellobar24 bfcmPopup24 hellobarTimerOuter">
            <a href="https://platform.cloudways.com/signup?coupon=BFCM2024&ref_id=blog_wide_hellobar" class="bfcmHellobarLink" target="_blank" rel="noopener noreferrer"></a>
            <div class="container">
                <div class="hellobarInner hellobarInnerWithTimer">

                    <div class="headingArea">
                        <h3>Peak <span class="perf_hightlight"> Performance.</span></h3>
                        <h3>Limitless <span class="scal_hightlight">Scalability.</span> </h3>
                    </div>

                    <div class="bfcmtimerwrap">
                        <div class="borderAnimate"></div>
                        <ul class="clounterMainDiv">
                            <li>
                                <div class="counter">
                                    <h3 class="countTxt" id="days">0</h3>
                                    <p class="counterpara">Days</p>
                                </div>
                            </li>
                            <li>
                                <div class="counter">
                                    <h3 class="countTxt" id="hours">0</h3>
                                    <p class="counterpara">Hours</p>
                                </div>
                            </li>
                            <li>
                                <div class="counter">
                                    <h3 class="countTxt" id="minutes">0</h3>
                                    <p class="counterpara">Mins</p>
                                </div>
                            </li>
                            <li class="pulse">
                                <div class="counter">
                                    <h3 class="countTxt" id="seconds">0</h3>
                                    <p class="counterpara">Sec</p>
                                </div>
                            </li>
                        </ul>
                    </div>


                    <div class="discountArea">
                        <img src="https://www.cloudways.com/wp-content/uploads/2024/09/bfcm24_discount.png" alt=""
                            class="img-responsive">
                        <h4 class="hide">
                            <span class="purple_highlight">Off For 4 months</span> <br>
                            <span class="pink_highlight">+40 free Migrations</span>
                        </h4>
                        <img src="https://www.cloudways.com/wp-content/uploads/2024/10/bfcmBnrTxt.gif" alt=""
                            class="img-responsive">
                    </div>

                    <div class="lastArea">
                        <a class="cw_bfcm24_gbl_btn btn_large">Claim Now</a>
                    </div>

                </div>
            </div>
        </div> -->

    <!--  -->


    <!--    TODO:  UNCOMMENT this if any Campaign is active -->

    <!-- <div class="cw-hbar-wrap  ">
        <div class="container-fluid">
                </div>
    </div> -->

     <!--  TODO:  COMMENT this if any Campaign is active -->

    <div class="cw-hbar-wrap secondary-header $hide">
        <div class="container-fluid">
            <p class="cw-hbar-txt"> 
                  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="22" viewBox="0 0 26 22" fill="none" style="margin-bottom: -4px;">
            <path
                d="M3.89599 2.09825L4.4729 2.26341H4.46932C4.51232 2.27419 4.54457 2.31727 4.54457 2.36395C4.54457 2.41063 4.5159 2.45012 4.46932 2.46448L3.89241 2.62965C3.36207 2.78045 2.95358 3.18977 2.80308 3.72117L2.63824 4.29925C2.62749 4.34233 2.58449 4.37465 2.53791 4.37465C2.49133 4.37465 2.45191 4.34592 2.43758 4.29925L2.27274 3.72117C2.11866 3.18977 1.71375 2.78045 1.18341 2.62965L0.6065 2.46448C0.5635 2.45371 0.53125 2.41063 0.53125 2.36395C0.53125 2.31727 0.559917 2.27778 0.6065 2.26341L1.18341 2.09825C1.71375 1.94745 2.12224 1.53813 2.27274 1.00673L2.43758 0.428651C2.46624 0.338887 2.61674 0.338887 2.64183 0.428651L2.80666 1.00673C2.96074 1.53813 3.36566 1.94745 3.89599 2.09825Z"
                fill="#FA7DF6" />
            <path
                d="M23.7944 5.41357L23.9073 5.82642C23.9163 5.85787 23.9477 5.88483 23.9837 5.88483C24.0197 5.88483 24.0511 5.86237 24.0601 5.82642L24.1815 5.39953C24.2939 5.00859 24.5952 4.70752 24.9863 4.59519L25.4134 4.47386C25.4449 4.46487 25.4719 4.43342 25.4719 4.39747C25.4719 4.36152 25.4494 4.33007 25.4134 4.32108L24.9863 4.19975C24.5952 4.08741 24.2939 3.78635 24.1815 3.39541L24.0601 2.96852C24.0421 2.90112 23.9297 2.90112 23.9118 2.96852L23.7904 3.39541C23.678 3.78635 23.3767 4.08741 22.9856 4.19975L22.5584 4.32108C22.527 4.33007 22.5 4.36152 22.5 4.39747C22.5 4.43342 22.5225 4.46487 22.5584 4.47386L22.9856 4.59519C23.3767 4.70752 23.678 5.00859 23.7904 5.39953L23.7944 5.41357Z"
                fill="#FFA1A9" />
            <path
                d="M4.09842 19.6107L4.50138 19.7265H4.49808C4.52781 19.7331 4.55093 19.7629 4.55093 19.796C4.55093 19.8291 4.53111 19.8556 4.49808 19.8655L4.09512 19.9814C3.72518 20.0873 3.44113 20.3719 3.33543 20.7426L3.21983 21.1464C3.21322 21.1762 3.18349 21.1994 3.15046 21.1994C3.11743 21.1994 3.09101 21.1795 3.0811 21.1464L2.9655 20.7426C2.8598 20.3719 2.57575 20.0873 2.20581 19.9814L1.80285 19.8655C1.77312 19.8589 1.75 19.8258 1.75 19.796C1.75 19.7662 1.76982 19.7364 1.80285 19.7265L2.20581 19.6107C2.57575 19.5047 2.8598 19.2201 2.9655 18.8494L3.0811 18.4456C3.10092 18.3827 3.20662 18.3827 3.22313 18.4456L3.33873 18.8494C3.44443 19.2201 3.72849 19.5047 4.09842 19.6107Z"
                fill="#B080FF" />
            <path
                d="M13.5657 17.0232L13.5585 17.0184L15.9362 13.5394C16.2814 13.0344 16.8536 12.7324 17.4652 12.7324H22.9012C23.6378 12.7324 24.0795 13.5509 23.6752 14.1666L19.319 20.8006C18.9767 21.322 18.3948 21.636 17.771 21.636H10.4688L13.5657 17.0232Z"
                fill="url(#paint0_linear_4473_2534)" />
            <path
                d="M15.6452 1.76758L13.0015 5.62282L12.5023 6.3014L9.18731 11.0673C8.97115 11.3781 8.96827 11.7859 9.18003 12.0996L12.5105 17.0328L12.7837 17.4242L9.89196 21.6412H9.51136C8.52032 21.6412 7.59202 21.1664 7.02597 20.3699L2.09718 13.4349C1.37664 12.421 1.37362 11.076 2.08961 10.0591L7.02475 3.04958C7.58989 2.2469 8.52198 1.76758 9.51772 1.76758H15.6452Z"
                fill="url(#paint1_linear_4473_2534)" />
            <path
                d="M16.1201 1.77148L13.2973 5.97587L15.9575 9.86808C16.3026 10.3731 16.8748 10.6751 17.4864 10.6751H22.9224C23.6591 10.6751 24.1008 9.85659 23.6964 9.24083L19.3403 2.60692C18.9979 2.0855 18.416 1.77148 17.7922 1.77148H16.1201Z"
                fill="url(#paint2_linear_4473_2534)" />
            <defs>
                <linearGradient id="paint0_linear_4473_2534" x1="24.719" y1="11.433" x2="10.8761" y2="21.6414"
                    gradientUnits="userSpaceOnUse">
                    <stop stop-color="#316FFF" />
                    <stop offset="1" stop-color="#8D7BFF" />
                </linearGradient>
                <linearGradient id="paint1_linear_4473_2534" x1="8.59993" y1="1.76758" x2="8.59993" y2="21.6412"
                    gradientUnits="userSpaceOnUse">
                    <stop stop-color="#FF85E5" />
                    <stop offset="1" stop-color="#937CFF" />
                </linearGradient>
                <linearGradient id="paint2_linear_4473_2534" x1="15.0042" y1="4.85852" x2="22.0015" y2="11.2168"
                    gradientUnits="userSpaceOnUse">
                    <stop stop-color="#FF8CD5" />
                    <stop offset="1" stop-color="#FFB77D" />
                </linearGradient>
            </defs>
        </svg>
        Cloudways Copilot Now in General Availability
         <a href="https://www.cloudways.com/blog/announcing-ai-copilot-general-availability/?ref_id=hello_bar" target="_blank" rel="noopener noreferrer">Learn More<span class="cta_arrow">></span>
        </a>            </p>
        </div>
    </div>
    <!-- END TODO -->

    
    <div class="blog-navs-main-wrap">
        <!-- Main Navigation Begin -->
        <section class="cw-blog-main-nav-wrap hidden-xs">
            <div class="container">
                <nav class="navbar cw-blog-main-nav">
                    <div class="navbar-header cw-blog-main-nav-hdr-mbl">
                        <button type="button" class="navbar-toggle" data-toggle="collapse"
                            data-target="#cw-blog-main-nav-hdr-mbl">
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        <a class="cw-blog-main-nav-brand" href="https://www.cloudways.com/blog"><img
                                src="https://www.cloudways.com/blog/wp-content/themes/cloudways/template/img/cloudways-blog-logo.svg" alt=""
                                class="img-responsive"></a>
                    </div>

                    <div class="collapse navbar-collapse cw-blog-main-nav-links" id="cw-blog-main-nav-hdr-mbl">
                                                <div class="menu-main-menu-container">
                            <ul id="menu-main-menu" class="nav navbar-nav navbar-right">
                                <li class="dropdown">
                                    <a class="dropdown-toggle" data-toggle="dropdown" href="#">Hosting
                                        <span class="caret"></span></a>
                                    <ul class="dropdown-menu">
                                        <li><a href="https://www.cloudways.com/en/wordpress-hosting.php?ref_id=blog_navbar" target="_blank" rel="noopener">WordPress Hosting</a></li>
                                        <li><a href="https://www.cloudways.com/en/woocommerce-hosting.php?ref_id=blog_navbar" target="_blank" rel="noopener">WooCommerce Hosting</a></li>
                                        <li><a href="https://www.cloudways.com/en/magento-hosting.php?ref_id=blog_navbar" target="_blank" rel="noopener">Magento Hosting</a></li>
                                        <li><a href="https://www.cloudways.com/en/php-hosting.php?ref_id=blog_navbar" target="_blank" rel="noopener">PHP Hosting</a></li>
                                        <li><a href="https://www.cloudways.com/en/laravel-hosting?ref_id=blog_navbar" target="_blank" rel="noopener">Laravel Hosting</a></li>
                                        <li><a href="https://www.cloudways.com/en/drupal-hosting?ref_id=blog_navbar" target="_blank" rel="noopener">Drupal Hosting</a></li>
                                        <li><a href="https://www.cloudways.com/en/joomla-cloud?ref_id=blog_navbar" target="_blank" rel="noopener">Joomla Hosting</a></li>
                                        <li><a href="https://www.cloudways.com/en/prestashop-hosting?ref_id=blog_navbar" target="_blank" rel="noopener">PrestaShop Hosting</a></li>
                                        <li><a href="https://www.cloudways.com/en/ecommerce-hosting?ref_id=blog_navbar" target="_blank" rel="noopener">Ecommerce Hosting</a></li>
                                    </ul>
                                </li>
                                <li><a href="https://www.cloudways.com/en/features.php?ref_id=blog_navbar">Features</a>
                                </li>
                                <li><a href="https://www.cloudways.com/en/pricing.php?ref_id=blog_navbar">Pricing</a>
                                </li>
                                <li><a href="https://www.cloudways.com/en/partners.php?ref_id=blog_navbar">Partners</a>
                                </li>
                                <li><a href="https://support.cloudways.com/en/?ref_id=blog_navbar">Support</a></li>
                                                                <li class="item-has-children">
                                    <a href="https://www.cloudways.com/en/contact_us.php?ref_id=blog_navbar">Contact Us
                                        <span class="caret"></span></a>
                                    <ul class="dropdown-menu-wrap dropdown-menu-rht">
                                        <li class="txt_with_icon">
                                            <a href="https://www.cloudways.com/en/contact_us.php?ref_id=blog_navbar">
                                                <i>
                                                    <img src="https://www.cloudways.com/wp-content/uploads/2023/08/product-tour-icon.svg"
                                                        class="img-responsive" alt="Cloudways Support">
                                                </i>
                                                <div class="dropdown_menu_rht_box">
                                                    <strong>Contact Sales</strong>
                                                    <span>Talk to our experts for all your Cloudways inquiries.</span>
                                                </div>
                                            </a>
                                        </li>
                                        <li class="txt_with_icon">
                                            <a href="https://www.cloudways.com/en/platform-demo.php?ref_id=blog_navbar">
                                                <i>
                                                    <img src="https://www.cloudways.com/wp-content/uploads/2023/08/live-demo-icon.svg"
                                                        class="img-responsive" alt="Cloudways Support">
                                                </i>
                                                <div class="dropdown_menu_rht_box">
                                                    <strong>Schedule a Call</strong>
                                                    <span>Explore our hosting platform with a personalized call.</span>
                                                </div>
                                            </a>
                                        </li>
                                        <li class="txt_with_icon">
                                            <a href="https://www.cloudways.com/en/take-tour.php?ref_id=blog_navbar">
                                                <i>
                                                    <img src="https://www.cloudways.com/wp-content/uploads/2023/08/talk-sales-icon.svg"
                                                        class="img-responsive" alt="Cloudways Support">
                                                </i>
                                                <div class="dropdown_menu_rht_box">
                                                    <strong>View Demo</strong>
                                                    <span>See how to easily set up and use Cloudways.</span>
                                                </div>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li class="cw_blog21_menuBtn">
                                    <button class="navbar-toggle" type="button">
                                        <span class="sr-only">Categories</span>
                                        <span class="icon-bar"></span>
                                        <span class="icon-bar"></span>
                                        <span class="icon-bar"></span>
                                    </button>
                                </li>                                <li class="cw-blog-main-nav-cta">
                                    <a href="https://platform.cloudways.com/signup?ref_id=blog_navbar" target="_blank">
                                        Start Free Trial                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </section>
        <!-- Main Navigation End -->


        <!-- Categories Navigation Begin -->
        <section class="cw-blog-category-nav-wrap">
            <div class="container">
                <nav class="navbar cw-blog-catg-nav">
                    <div class="navbar-header cw-blog-catg-nav-hdr-mbl">
                        <button class="navbar-toggle" type="button" data-toggle="collapse"
                            data-target="#cw-blog-catg-nav-mbl">
                            <span class="sr-only">Categories</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        <a class="cw-blog-main-nav-brand visible-xs" href="https://www.cloudways.com/blog"><img
                                src="https://www.cloudways.com/blog/wp-content/themes/cloudways/template/img/cloudways-blog-logo.svg" alt=""
                                class="img-responsive"></a>

                        <div class="cw_blog21_topCta">
                            <a href="https://platform.cloudways.com/signup?ref_id=blog_navbar" class="cw-glb-btn">Start
                                Free Trial</a>
                        </div>
                    </div>

                    <div id="cw-blog-catg-nav-mbl" class="collapse navbar-collapse cw-blog-catg-nav-links">
                        <div class="menu-category-mega-menu-container"><ul id="menu-category-mega-menu" class="nav navbar-nav"><li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-66879" class="menu-item menu-item-type-taxonomy menu-item-object-category cwBlog_catgNav_link menu-item-66879 nav-item cw_updates"><a href="https://www.cloudways.com/blog/updates/?ref_id=navbar" class="dropdown-item">Updates</a></li>
<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-66880" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children cwBlog_catgNav_link dropdown cwBlog_catgNav-dropdown menu-item-66880 nav-item cw_apps"><a href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="dropdown-toggle nav-link" id="menu-item-dropdown-66880">Apps</a>
<ul class="menu-depth-1 dropdown-menu cwBlog_catgNav-dropdownMenu" aria-labelledby="menu-item-dropdown-66880" role="menu">
	<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-66881" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-has-children menu-item-66881 nav-item cw_wordpress cwBlog_catgNav-inrCatg_wrap"><a href="https://www.cloudways.com/blog/wordpress/?ref_id=navbar" class="nav-link">WordPress</a>
	<ul class="menu-depth-2 cwBlog_catgNav-inrCatg_link" aria-labelledby="menu-item-dropdown-66880" role="menu">
		<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-66882" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-66882 nav-item cw_plugins"><a href="https://www.cloudways.com/blog/wordpress/wp-plugins/?ref_id=navbar" class="nav-link">Plugins</a></li>
		<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-66883" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-66883 nav-item cw_themes"><a href="https://www.cloudways.com/blog/wordpress/wp-themes/?ref_id=navbar" class="nav-link">Themes</a></li>
	</ul>
</li>
	<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-66884" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-has-children menu-item-66884 nav-item cw_woocommerce cwBlog_catgNav-inrCatg_wrap"><a href="https://www.cloudways.com/blog/woocommerce/?ref_id=navbar" class="nav-link">WooCommerce</a>
	<ul class="menu-depth-2 cwBlog_catgNav-inrCatg_link" aria-labelledby="menu-item-dropdown-66880" role="menu">
		<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-66885" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-66885 nav-item cw_plugins"><a href="https://www.cloudways.com/blog/wordpress/wp-plugins/?ref_id=navbar" class="nav-link">Plugins</a></li>
		<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-66886" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-66886 nav-item cw_themes"><a href="https://www.cloudways.com/blog/wordpress/wp-themes/?ref_id=navbar" class="nav-link">Themes</a></li>
	</ul>
</li>
	<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-66887" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-has-children menu-item-66887 nav-item cw_magento cwBlog_catgNav-inrCatg_wrap"><a href="https://www.cloudways.com/blog/magento/?ref_id=navbar" class="nav-link">Magento</a>
	<ul class="menu-depth-2 cwBlog_catgNav-inrCatg_link" aria-labelledby="menu-item-dropdown-66880" role="menu">
		<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-66888" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-66888 nav-item cw_magento1"><a href="https://www.cloudways.com/blog/magento/magento-1/?ref_id=navbar" class="nav-link">Magento 1</a></li>
		<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-66889" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-66889 nav-item cw_magento2"><a href="https://www.cloudways.com/blog/magento/magento-2/?ref_id=navbar" class="nav-link">Magento 2</a></li>
	</ul>
</li>
	<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-66899" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-has-children menu-item-66899 nav-item cw_drupal cwBlog_catgNav-inrCatg_wrap"><a href="https://www.cloudways.com/blog/drupal/?ref_id=navbar" class="nav-link">Drupal</a>
	<ul class="menu-depth-2 cwBlog_catgNav-inrCatg_link" aria-labelledby="menu-item-dropdown-66880" role="menu">
		<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-66900" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-66900 nav-item cw_drupal7"><a href="https://www.cloudways.com/blog/drupal/drupal-7/?ref_id=navbar" class="nav-link">Drupal 7</a></li>
		<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-66901" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-66901 nav-item cw_drupal8"><a href="https://www.cloudways.com/blog/drupal/drupal-8/?ref_id=navbar" class="nav-link">Drupal 8</a></li>
	</ul>
</li>
	<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-66890" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-has-children menu-item-66890 nav-item cw_php cwBlog_catgNav-inrCatg_wrap"><a href="https://www.cloudways.com/blog/php/?ref_id=navbar" class="nav-link">PHP</a>
	<ul class="menu-depth-2 cwBlog_catgNav-inrCatg_link" aria-labelledby="menu-item-dropdown-66880" role="menu">
		<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-66891" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-66891 nav-item cw_database"><a href="https://www.cloudways.com/blog/php/database/?ref_id=navbar" class="nav-link">Database</a></li>
		<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-66892" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-66892 nav-item cw_git"><a href="https://www.cloudways.com/blog/php/git/?ref_id=navbar" class="nav-link">Git</a></li>
		<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-66893" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-66893 nav-item cw_symfony"><a href="https://www.cloudways.com/blog/php/symfony/?ref_id=navbar" class="nav-link">Symfony</a></li>
		<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-66894" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-66894 nav-item cw_yii"><a href="https://www.cloudways.com/blog/php/yii/?ref_id=navbar" class="nav-link">Yii</a></li>
		<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-66895" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-66895 nav-item cw_codeigniter"><a href="https://www.cloudways.com/blog/php/codeigniter/?ref_id=navbar" class="nav-link">CodeIgniter</a></li>
	</ul>
</li>
	<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-66896" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-has-children menu-item-66896 nav-item cw_laravel cwBlog_catgNav-inrCatg_wrap"><a href="https://www.cloudways.com/blog/laravel/?ref_id=navbar" class="nav-link">Laravel</a>
	<ul class="menu-depth-2 cwBlog_catgNav-inrCatg_link" aria-labelledby="menu-item-dropdown-66880" role="menu">
		<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-66897" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-66897 nav-item cw_alltopics"><a href="https://www.cloudways.com/blog/laravel/?ref_id=navbar" class="nav-link">All Topics</a></li>
	</ul>
</li>
	<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-66902" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-has-children menu-item-66902 nav-item cw_prestashop cwBlog_catgNav-inrCatg_wrap"><a href="https://www.cloudways.com/blog/prestashop/?ref_id=navbar" class="nav-link">PrestaShop</a>
	<ul class="menu-depth-2 cwBlog_catgNav-inrCatg_link" aria-labelledby="menu-item-dropdown-66880" role="menu">
		<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-66903" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-66903 nav-item cw_alltopics"><a href="https://www.cloudways.com/blog/prestashop/?ref_id=navbar" class="nav-link">All Topics</a></li>
	</ul>
</li>
	<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-66905" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-has-children menu-item-66905 nav-item cw_opencart cwBlog_catgNav-inrCatg_wrap"><a href="https://www.cloudways.com/blog/opencart/?ref_id=navbar" class="nav-link">Opencart</a>
	<ul class="menu-depth-2 cwBlog_catgNav-inrCatg_link" aria-labelledby="menu-item-dropdown-66880" role="menu">
		<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-66904" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-66904 nav-item cw_alltopics"><a href="https://www.cloudways.com/blog/opencart/?ref_id=navbar" class="nav-link">All Topics</a></li>
	</ul>
</li>
	<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-66906" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-has-children menu-item-66906 nav-item cw_joomla cwBlog_catgNav-inrCatg_wrap"><a href="https://www.cloudways.com/blog/joomla/?ref_id=navbar" class="nav-link">Joomla</a>
	<ul class="menu-depth-2 cwBlog_catgNav-inrCatg_link" aria-labelledby="menu-item-dropdown-66880" role="menu">
		<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-66907" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-66907 nav-item cw_alltopics"><a href="https://www.cloudways.com/blog/joomla/?ref_id=navbar" class="nav-link">All Topics</a></li>
	</ul>
</li>
</ul>
</li>
<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-66908" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-has-children cwBlog_catgNav_link dropdown cwBlog_catgNav-dropdown menu-item-66908 nav-item cw_ecommerce"><a href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="dropdown-toggle nav-link" id="menu-item-dropdown-66908">Ecommerce</a>
<ul class="menu-depth-1 dropdown-menu cwBlog_catgNav-dropdownMenu" aria-labelledby="menu-item-dropdown-66908" role="menu">
	<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-66914" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-66914 nav-item cw_alltopics cwBlog_catgNav-inrCatg_wrap"><a href="https://www.cloudways.com/blog/ecommerce/?ref_id=navbar" class="nav-link">All Topics</a>
	<ul class="menu-depth-2 cwBlog_catgNav-inrCatg_link" aria-labelledby="menu-item-dropdown-66908" role="menu">
		<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-66910" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-66910 nav-item cw_dropshipping"><a href="https://www.cloudways.com/blog/ecommerce/dropshipping/?ref_id=navbar" class="nav-link">Dropshipping</a></li>
		<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-66911" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-66911 nav-item cw_ecommercemarketing"><a href="https://www.cloudways.com/blog/ecommerce/marketing-hacks/?ref_id=navbar" class="nav-link">Ecommerce Marketing</a></li>
		<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-66913" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-66913 nav-item cw_ecommercetutorials"><a href="https://www.cloudways.com/blog/ecommerce/tips-tutorials/?ref_id=navbar" class="nav-link">Ecommerce Tutorials</a></li>
		<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-66912" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-66912 nav-item cw_successstories"><a href="https://www.cloudways.com/blog/ecommerce/success-stories/?ref_id=navbar" class="nav-link">Success Stories</a></li>
	</ul>
</li>
</ul>
</li>
<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-66916" class="menu-item menu-item-type-taxonomy menu-item-object-category cwBlog_catgNav_link menu-item-66916 nav-item cw_agencies"><a href="https://www.cloudways.com/blog/agencies/?ref_id=navbar" class="dropdown-item">Agencies</a></li>
<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-66917" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-has-children cwBlog_catgNav_link dropdown cwBlog_catgNav-dropdown menu-item-66917 nav-item cw_startups"><a href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="dropdown-toggle nav-link" id="menu-item-dropdown-66917">Startups</a>
<ul class="menu-depth-1 dropdown-menu cwBlog_catgNav-dropdownMenu" aria-labelledby="menu-item-dropdown-66917" role="menu">
	<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-66922" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-66922 nav-item cw_alltopics cwBlog_catgNav-inrCatg_wrap"><a href="https://www.cloudways.com/blog/startups/?ref_id=navbar" class="nav-link">All Topics</a>
	<ul class="menu-depth-2 cwBlog_catgNav-inrCatg_link" aria-labelledby="menu-item-dropdown-66917" role="menu">
		<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-66921" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-66921 nav-item cw_"><a href="https://www.cloudways.com/blog/startups/tips-hacks/?ref_id=navbar" class="nav-link">Startup Tips &amp; Hacks</a></li>
		<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-66920" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-66920 nav-item cw_startupmarketing&amp;growth"><a href="https://www.cloudways.com/blog/startups/marketing-strategies-hacks/?ref_id=navbar" class="nav-link">Startup Marketing &amp; Growth</a></li>
		<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-66919" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-66919 nav-item cw_startupinspotlight"><a href="https://www.cloudways.com/blog/startups/success-story/?ref_id=navbar" class="nav-link">Startup in Spotlight</a></li>
	</ul>
</li>
</ul>
</li>
<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-66924" class="menu-item menu-item-type-taxonomy menu-item-object-category cwBlog_catgNav_link menu-item-66924 nav-item cw_affiliate"><a href="https://www.cloudways.com/blog/marketing/affiliate-marketing/?ref_id=navbar" class="dropdown-item">Affiliate</a></li>
<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-187114" class="cw_ecommerce menu-item menu-item-type-taxonomy menu-item-object-category menu-item-has-children cwBlog_catgNav_link dropdown cwBlog_catgNav-dropdown menu-item-187114 nav-item cw_ai&amp;ml"><a href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="dropdown-toggle nav-link" id="menu-item-dropdown-187114">AI &amp; ML</a>
<ul class="menu-depth-1 dropdown-menu cwBlog_catgNav-dropdownMenu" aria-labelledby="menu-item-dropdown-187114" role="menu">
	<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-187269" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-187269 nav-item cw_alltopics cwBlog_catgNav-inrCatg_wrap"><a href="https://www.cloudways.com/blog/ai-ml/?ref_id=navbar" class="nav-link">All Topics</a>
	<ul class="menu-depth-2 cwBlog_catgNav-inrCatg_link" aria-labelledby="menu-item-dropdown-187114" role="menu">
		<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-187115" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-187115 nav-item cw_"><a href="https://www.cloudways.com/blog/ai-ml/ai-applications/?ref_id=navbar" class="nav-link">AI Applications</a></li>
		<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-187116" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-187116 nav-item cw_"><a href="https://www.cloudways.com/blog/ai-ml/research-and-trends/?ref_id=navbar" class="nav-link">Research and Trends</a></li>
		<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-187265" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-187265 nav-item cw_"><a href="https://www.cloudways.com/blog/ai-ml/tools-development/?ref_id=navbar" class="nav-link">Tools &amp; Development</a></li>
	</ul>
</li>
</ul>
</li>
<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-66927" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-has-children cwBlog_catgNav_link dropdown cwBlog_catgNav-dropdown menu-item-66927 nav-item cw_interviews"><a href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="dropdown-toggle nav-link" id="menu-item-dropdown-66927">Interviews</a>
<ul class="menu-depth-1 dropdown-menu cwBlog_catgNav-dropdownMenu" aria-labelledby="menu-item-dropdown-66927" role="menu">
	<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-66932" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-66932 nav-item cw_alltopics cwBlog_catgNav-inrCatg_wrap"><a href="https://www.cloudways.com/blog/interviews/?ref_id=navbar" class="nav-link">All Topics</a>
	<ul class="menu-depth-2 cwBlog_catgNav-inrCatg_link" aria-labelledby="menu-item-dropdown-66927" role="menu">
		<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-66929" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-66929 nav-item cw_wordpressinterviews"><a href="https://www.cloudways.com/blog/interviews/wordpress-interviews/?ref_id=navbar" class="nav-link">WordPress Interviews</a></li>
		<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-66925" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-66925 nav-item cw_magentointerviews"><a href="https://www.cloudways.com/blog/interviews/magento-interviews/?ref_id=navbar" class="nav-link">Magento Interviews</a></li>
		<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-66931" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-66931 nav-item cw_phpinterviews"><a href="https://www.cloudways.com/blog/interviews/php-interviews/?ref_id=navbar" class="nav-link">PHP Interviews</a></li>
		<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-66928" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-66928 nav-item cw_marketersinterviews"><a href="https://www.cloudways.com/blog/interviews/marketers-interviews/?ref_id=navbar" class="nav-link">Marketers Interviews</a></li>
		<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-66926" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-66926 nav-item cw_drupalinterviews"><a href="https://www.cloudways.com/blog/interviews/drupal-interviews/?ref_id=navbar" class="nav-link">Drupal Interviews</a></li>
		<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-66930" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-66930 nav-item cw_"><a href="https://www.cloudways.com/blog/interviews/startup-interviews/?ref_id=navbar" class="nav-link">Startup &amp; Entrepreneur Interviews</a></li>
	</ul>
</li>
</ul>
</li>
<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-66933" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children cwBlog_catgNav_link dropdown cwBlog_catgNav-dropdown menu-item-66933 nav-item cw_others"><a href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="dropdown-toggle nav-link" id="menu-item-dropdown-66933">Others</a>
<ul class="menu-depth-1 dropdown-menu cwBlog_catgNav-dropdownMenu" aria-labelledby="menu-item-dropdown-66933" role="menu">
	<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-66934" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-has-children menu-item-66934 nav-item cw_digitalmarketing cwBlog_catgNav-inrCatg_wrap"><a href="https://www.cloudways.com/blog/marketing/?ref_id=navbar" class="nav-link">Digital Marketing</a>
	<ul class="menu-depth-2 cwBlog_catgNav-inrCatg_link" aria-labelledby="menu-item-dropdown-66933" role="menu">
		<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-66935" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-66935 nav-item cw_seo"><a href="https://www.cloudways.com/blog/marketing/seo/?ref_id=navbar" class="nav-link">SEO</a></li>
		<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-66936" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-66936 nav-item cw_socialmedia"><a href="https://www.cloudways.com/blog/marketing/social-media/?ref_id=navbar" class="nav-link">Social Media</a></li>
	</ul>
</li>
	<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-74753" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-74753 nav-item cw_resources cwBlog_catgNav-inrCatg_wrap"><a target="_blank" href="https://www.cloudways.com/en/resources.php?ref_id=navbar" class="nav-link">Resources</a>
	<ul class="menu-depth-2 cwBlog_catgNav-inrCatg_link" aria-labelledby="menu-item-dropdown-66933" role="menu">
		<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-74754" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-74754 nav-item cw_ebooks"><a target="_blank" href="https://www.cloudways.com/en/ebooks.php?ref_id=navbar" class="nav-link">Ebooks</a></li>
		<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-74755" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-74755 nav-item cw_casestudies"><a target="_blank" href="https://www.cloudways.com/en/case-studies.php?ref_id=navbar" class="nav-link">Case Studies</a></li>
	</ul>
</li>
	<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-66937" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-has-children menu-item-66937 nav-item cw_api cwBlog_catgNav-inrCatg_wrap"><a href="https://www.cloudways.com/blog/api/?ref_id=navbar" class="nav-link">API</a>
	<ul class="menu-depth-2 cwBlog_catgNav-inrCatg_link" aria-labelledby="menu-item-dropdown-66933" role="menu">
		<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-66938" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-66938 nav-item cw_alltopics"><a href="https://www.cloudways.com/blog/api/?ref_id=navbar" class="nav-link">All Topics</a></li>
	</ul>
</li>
	<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-66944" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-has-children menu-item-66944 nav-item cw_designanddev cwBlog_catgNav-inrCatg_wrap"><a href="https://www.cloudways.com/blog/dev-design/?ref_id=navbar" class="nav-link">Design and Dev</a>
	<ul class="menu-depth-2 cwBlog_catgNav-inrCatg_link" aria-labelledby="menu-item-dropdown-66933" role="menu">
		<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-66941" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-66941 nav-item cw_alltopics"><a href="https://www.cloudways.com/blog/dev-design/?ref_id=navbar" class="nav-link">All Topics</a></li>
	</ul>
</li>
	<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-66942" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-has-children menu-item-66942 nav-item cw_ cwBlog_catgNav-inrCatg_wrap"><a href="https://www.cloudways.com/blog/miscellaneous/?ref_id=navbar" class="nav-link">Miscellaneous</a>
	<ul class="menu-depth-2 cwBlog_catgNav-inrCatg_link" aria-labelledby="menu-item-dropdown-66933" role="menu">
		<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-66943" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-66943 nav-item cw_"><a href="https://www.cloudways.com/blog/miscellaneous/events-meetups/?ref_id=navbar" class="nav-link">Events and Meetups</a></li>
	</ul>
</li>
	<li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-87485" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-87485 nav-item cw_iaas cwBlog_catgNav-inrCatg_wrap"><a href="https://www.cloudways.com/blog/cloud-infrastructures/?ref_id=navbar" class="nav-link">IaaS</a></li>
</ul>
</li>
</ul></div>
                        <ul class="nav navbar-nav navbar-right">
                            <li>
                                <form action="https://www.cloudways.com/blog/" method="get" id="searchform-modal"
                                    class="cw-blog-catg-nav-form">

                                    <input autocomplete="off" value="" name="s" id="s-modal" type="search"
                                        placeholder="Search Cloudways Blog"
                                        class="form-control search_form cw-blog-catg-nav-search"
                                        data-value="cw-blog-search" />
                                    <div class="errorBox">Invalid Character</div>
                                    <div id="datafetch" class="datafetch" style="display: none;">
                                        <div class="blog-dict_srchBox"></div>
                                    </div>

                                </form>
                            </li>
                        </ul>
                    </div><!-- /.nav-collapse -->
                </nav>
            </div>
        </section>
        <!-- Categories Navigation End -->

    </div>

<section class="cw-inr-blg-top-sec" style="('')">


    <!--category Navigation-->
    <!--    <div  class="pull-wide blg-main-catg m-b-none hidden-sm hidden-xs">-->
    <!--        <div class="container n-p-l-r-mob">-->
    <!--            -->    <!--        </div>-->
    <!--    </div>-->
    <!--category Navigation-->

    <div class="blg-catg-select-wrap  hidden-md hidden-lg">
        <button class="blg-catg-select-btn" type="button" data-toggle="modal" data-target="#blg-catg-mb-nav">Select Category</button>
    </div>
    <!--previously category calling data code is in category page
    <div  class="pull-wide blg-main-catg"></div>-->


    <div class="clearfix"></div>



                <div class="container">
                <div class="row">
                    <div class="col-xs-12 col-md-8 col-md-offset-2">
                        <div class="cw-inr-blg-ttl-wrap" id="cw_postBlog_ttlWrap">
                            <div class="post_catgList_wrap">
                                <!--Category Heading-->

                                
            <div class="blg-app-ttl blg-cat-dot-549">
                <a href="https://www.cloudways.com/blog/learning-center/">
                Knowledge Center
                </a>
            </div>
                                    </div>
                            <h1 class="post_title" title="How to Host a Node.js app on Cloudways (Step-By-Step Guide) "> How to Host a Node.js app on Cloudways (Step-By-Step Guide) </h1>

                            <div class="cw-inr-bnr-auth-wrap">
                                <div class="cwBlg_athrTop_imgBox">
                                    <img alt='' src='https://secure.gravatar.com/avatar/6e4e31dd8b3a44332aca284ebfd99281?s=128&#038;d=mm&#038;r=g' srcset='https://secure.gravatar.com/avatar/6e4e31dd8b3a44332aca284ebfd99281?s=256&#038;d=mm&#038;r=g 2x' class='avatar avatar-128 photo class-custom class-custom-2' height='128' width='128' decoding='async'/>                                    <a href="https://www.cloudways.com/blog/author/salwa/">Salwa Mujtaba </a>
                                </div>
                                <div class="cwBlg_rtimeBox">
                                                                        <p>
                                        <span>
                                            Updated on
                                            September 10, 2024                                        </span>
                                    </p>
                                    <span class="span-reading-time rt-reading-time"><span class="rt-label rt-prefix"></span> <span class="rt-time"> 7</span> <span class="rt-label rt-postfix">Min Read</span></span>                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="srch-wrap hide">
                    <form action="https://www.cloudways.com/blog/" method="get" id="searchform-modal">
                        <div class="form-group">
                            <input value="" name="s" id="s-modal" type="text" placeholder="Search" class="form-control search_form" />
                            <i class="fa fa-search"></i>
                        </div>
                    </form>

                </div>
            </div>
</section>

<section class="cw-inr-blg-post">

    <!--custom social icon-->
    <div class="post_shrBtn_topBox">
        
        <ul>
            <li><a title="Share post" rel="nofollow" onclick="popitup('https://www.facebook.com/sharer/sharer.php?u=https://www.cloudways.com/blog/how-to-host-a-node-js-application/',400,500)" href="javascript:void(0);"><i class="fa fa-facebook"></i></a></li>
            <li><a rel="nofollow" href="https://twitter.com/intent/tweet?text=How to Host a Node.js app on Cloudways (Step-By-Step Guide),&amp;url=https://www.cloudways.com/blog/how-to-host-a-node-js-application/&amp;via=cloudways"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 1200 1227" fill="none">
                                            <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" fill="#fff"></path>
                                        </svg></a></li>
            <li><a rel="nofollow" title="Share post" onclick="popitup('http://pinterest.com/pin/create/button/?url=https://www.cloudways.com/blog/how-to-host-a-node-js-application/=&description=So, you built a Node.js app and want to share it but are unsure how to take it live? Don&#8217;t worry. You&#8217;ve landed in the right place. As this in-depth blog shares all the steps from setting up to hosting your Node.js application on Cloudways. But why Cloudways? Because it&#8217;s the most trusted platform by [&hellip;]',400,500)" href="javascript:void(0);"><i class="fa fa-pinterest"></i></a></li>
            <li><a rel="nofollow" title="Share post" onclick="popitup('https://www.linkedin.com/shareArticle?mini=true&url=https://www.cloudways.com/blog/how-to-host-a-node-js-application/&title=How to Host a Node.js app on Cloudways (Step-By-Step Guide)&summary=So, you built a Node.js app and want to share it but are unsure how to take it live? Don&#8217;t worry. You&#8217;ve landed in the right place. As this in-depth blog shares all the steps from setting up to hosting your Node.js application on Cloudways. But why Cloudways? Because it&#8217;s the most trusted platform by [&hellip;]',400,500)" href="javascript:void(0);"><i class="fa fa-linkedin"></i></a></li>
            <li><a rel="nofollow" title="Share post" onclick="popitup('https://www.reddit.com/submit?url=https://www.cloudways.com/blog/how-to-host-a-node-js-application/&title=How to Host a Node.js app on Cloudways (Step-By-Step Guide)',400,500)" href="javascript:void(0);"><i class="fa fa-reddit"></i></a></li>
        </ul>
    </div>
    <!--custom social icon-->

    <!--Main content-->
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-md-8 col-md-offset-2">
                <!--<a class="blg-inr-left-lnk" href="#cl-hst-sec">  </a>-->
                <div class="post_content blg-inr-left-wrpr" id="post_content">

                    <div class="ftrd-img">
                                                    <img src="https://www.cloudways.com/blog/wp-content/uploads/Main-Image_750x394-289.jpg" alt="host node.js" />
                                            </div>

                    <div class="cw_scl_cont_btn_wrap">
                        <div class="cw_scl_cont_btn">
                            <div class="fb-like" data-href="https://www.facebook.com/cloudways/" data-layout="button_count" data-action="like" data-size="small" data-show-faces="true" data-share="false"></div>
                        </div>
                        <div class="cw_scl_cont_btn">
                            <a class="twitter-follow-button" href="https://twitter.com/Cloudways">Follow @Cloudways</a>
                        </div>
                    </div>

                    <p>So, you built a Node.js app and want to share it but are unsure how to take it live? Don&#8217;t worry. You&#8217;ve landed in the right place. As this in-depth blog shares all the steps from setting up to hosting your Node.js application on Cloudways.</p>
<p>But why Cloudways? Because it&#8217;s the most trusted platform by <a href="https://www.cloudways.com/en/dev-hosting.php" target="_blank" rel="noopener">developers to host their apps on the cloud</a>. And on Cloudways, every function (no matter how technical) is just a click away.</p>
<p>So, even if you&#8217;re a seasoned developer or just someone starting out with Node.js, this guide covers everything you need to launch your app in five easy steps.</p>
<div class="cw_blog_toc-wrap">
<div class="cw_blog_toc-head"><a data-toggle="collapse" data-target="#cw_blog_toc">Table of Content</a></div>
<div id="cw_blog_toc" class="collapse in cw_blog_toc_list">
<ul>
<li><a href="#overview">What Is Node.js? (An Overview)</a></li>
<li><a href="#npm-understanding">Understanding for NPM</a></li>
<li><a href="#why-choose-cloudways">Why Choose Cloudways for Hosting Node.js Apps?</a></li>
<li><a href="#how-to-host">How to Hosting Your Node.js Application on Cloudways (Easy Steps)</a></li>
<li><a href="#Wrapping-up">Wrapping Up</a></li>
<li><a href="#Frequently-Asked-Questions">Frequently Asked Questions</a></li>
</ul>
</div>
</div>
<h2 id="overview"><b>What Is Node.js? (An Overview)</b></h2>
<p>Before directly jumping to the setup steps, let’s first understand what Node.js is. Know already? Directly move to the setup steps. Others, get to know it below:</p>
<p>Node.js is a runtime environment that helps you execute JavaScript code independently of a web browser, especially on servers and other devices. This means that, instead of only making web pages dynamic, JavaScript can also be used to develop the backend of websites and applications.</p>
<p>Also, thanks to its asynchronous, event-driven architecture, Node.js is known for its speed and ability to handle multiple tasks simultaneously.</p>
<p>It is based on <a href="https://v8.dev/" target="_blank" rel="nofollow noopener">Chrome’s V8 JavaScript engine</a>, which helps in quick and effective code execution. With Node.js, you also get <a href="https://www.cloudways.com/blog/installing-npm-based-projects/" target="_blank" rel="noopener">NPM</a>, a package manager that provides a large library of pre-built modules and tools, making development faster and easier.</p>
<p>Simply put, Node.js gives developers a unified way to create web apps by enabling them to use JavaScript across the board for both client-side and server-side.</p>
<h2 id="npm-understanding"><b>Understanding for NPM</b></h2>
<p>Working with Node.js requires the use of NPM, or Node Package Manager. It allows developers to easily manage the numerous pieces of code (known as packages) required by their projects. NPM allows you to rapidly install and update these packages without manually downloading and configuring them.</p>
<p>When developing a website, you might need features like date management or database connections. Using NPM, you may find ready-made packages that fulfill your requirements rather than having to write all the code yourself.</p>
<h2 id="why-choose-cloudways"><b>Why Choose Cloudways for Hosting Node.js Apps?</b></h2>
<p>Cloudways provides a user-friendly environment for managing cloud infrastructure, allowing you to focus on creating your application and business.</p>
<p>It’s an excellent choice for hosting apps like Node.js, considering its features such as automatic backups, effective caching, one-click installations, user-friendly dashboard, and, of course, its 24/7 support to help you at all times.</p>
<p>So, with a managed host like Cloudways, hosting Node.js apps is not only easier but also fruitful. Because you can manage all your apps and servers with quick 1-click operations, saving you time and streamlining all your operations.</p>
<section class="blogInlineCtaNewSec inline-cta-v3">
<div class="mainWrap">
<div class="txt">
<h2>Deploy Your Node.js Application with Cloudways Today!</h2>
<p>Take advantage of Cloudways <strong>3-day free trial</strong> and discover the power of managed PHP hosting for your Node.js application! With no credit card required, you can explore all the features Cloudways has to offer, including one-click application deployment, automated backups, and 24/7 expert support.</p>
</div>
<div class="cta"><a class="om-trigger-alt-conversion" href="https://www.cloudways.com/en/php-hosting.php?ref_id=blog_howtohostanodejsapplication_phphosting_inlineCTA1" target="_blank" rel="noopener">Sign up Now!</a></div>
</div>
</section>
<h2 id="how-to-host"><b>How to Hosting Your Node.js Application on Cloudways (Easy Steps)</b></h2>
<p>Now that you know the basics of Node.js app and why you should host it on Cloudways, let’s tackle the “how.” This section covers the 6 easy steps to host your Node.js apps on Cloudways.</p>
<h3>1. Log in on Cloudways</h3>
<ul>
<li><span style="font-weight: 400;">The first and foremost step is to sign in with your credentials on the Cloudways Platform. If you’re not a Cloudways user, </span><a href="https://platform.cloudways.com/"><span style="font-weight: 400;">sign up here</span></a><span style="font-weight: 400;"> to get your 3-day FREE trial, without even entering your credit card details.</span></li>
</ul>
<h3>2. Launch a PHP Application</h3>
<ul>
<li style="font-weight: 400;">Now, to set up your Node.js application, start by installing a <a href="https://www.cloudways.com/blog/deploy-php-application/" target="_blank" rel="noopener">PHP Application on the Cloudways</a> Platform with a single -click setup.</li>
<li style="font-weight: 400;">Add your application’s name and other details and then click Launch Now.</li>
</ul>
<p><img fetchpriority="high" decoding="async" class="lazy cw_postFancy_img aligncenter wp-image-135614 size-full" src="https://www.cloudways.com/blog/wp-content/themes/cloudways/template/img/grey.gif" data-original="https://www.cloudways.com/blog/wp-content/uploads/Launch-a-PHP-Application.png" alt="Launch a PHP Application" width="1784" height="816" /><noscript><img decoding="async" class="cw_postFancy_img aligncenter wp-image-135614 size-full" src="https://www.cloudways.com/blog/wp-content/uploads/Launch-a-PHP-Application.png" alt="Launch a PHP Application" width="1784" height="816" srcset="https://www.cloudways.com/blog/wp-content/uploads/Launch-a-PHP-Application.png 1784w, https://www.cloudways.com/blog/wp-content/uploads/Launch-a-PHP-Application-300x137.png 300w, https://www.cloudways.com/blog/wp-content/uploads/Launch-a-PHP-Application-1024x468.png 1024w, https://www.cloudways.com/blog/wp-content/uploads/Launch-a-PHP-Application-768x351.png 768w, https://www.cloudways.com/blog/wp-content/uploads/Launch-a-PHP-Application-1536x703.png 1536w" sizes="(max-width: 1784px) 100vw, 1784px" /></noscript></p>
<ul>
<li style="font-weight: 400;">Once the application is installed, you can access it using f SSH/SFTP to upload your application data or you can also create your Node application from scratch.</li>
<li style="font-weight: 400;">Access the Node.JS via the SSH terminal provided on the Cloudways platform. For SFTP, you can use any SFTP client, such as FileZilla, PuTTY, etc.</li>
</ul>
<ul>
<li style="font-weight: 400;">You can also use Git to manage your Node.js application. This method lets you pull changes directly from your GitHub repository, simplifying the process. For more detailed setup instructions, check out our <a href="https://support.cloudways.com/en/articles/5124087-deploy-code-to-your-application-using-git">guide on deploying code</a> to your application using Git on Cloudways.</li>
</ul>
<h3>3. Set Up your Node Application</h3>
<ul>
<li style="font-weight: 400;">Once you access the application with SSH/SFTP, navigate to the<b> public_html </b>folder, where you’ll see a defaul<b>t index.php file</b>.</li>
<li style="font-weight: 400;">Here, we have created a new file named “<b>myApp.js</b>” to add the test code for setting up the Node application.</li>
<li style="font-weight: 400;">Copy the test code as shared below:</li>
</ul>
<p><img loading="lazy" decoding="async" class="lazy cw_postFancy_img aligncenter wp-image-135621 size-full" src="https://www.cloudways.com/blog/wp-content/themes/cloudways/template/img/grey.gif" data-original="https://www.cloudways.com/blog/wp-content/uploads/Set-Up-your-Node-Application.png" alt="" width="955" height="148" /><noscript><img loading="lazy" decoding="async" class="cw_postFancy_img aligncenter wp-image-135621 size-full" src="https://www.cloudways.com/blog/wp-content/uploads/Set-Up-your-Node-Application.png" alt="" width="955" height="148" srcset="https://www.cloudways.com/blog/wp-content/uploads/Set-Up-your-Node-Application.png 955w, https://www.cloudways.com/blog/wp-content/uploads/Set-Up-your-Node-Application-300x46.png 300w, https://www.cloudways.com/blog/wp-content/uploads/Set-Up-your-Node-Application-768x119.png 768w" sizes="(max-width: 955px) 100vw, 955px" /></noscript></p>
<p><img loading="lazy" decoding="async" class="lazy cw_postFancy_img aligncenter wp-image-135616 size-full" src="https://www.cloudways.com/blog/wp-content/themes/cloudways/template/img/grey.gif" data-original="https://www.cloudways.com/blog/wp-content/uploads/Disabled-DirectoryIndex.png" alt="" width="650" height="159" /><noscript><img loading="lazy" decoding="async" class="cw_postFancy_img aligncenter wp-image-135616 size-full" src="https://www.cloudways.com/blog/wp-content/uploads/Disabled-DirectoryIndex.png" alt="" width="650" height="159" srcset="https://www.cloudways.com/blog/wp-content/uploads/Disabled-DirectoryIndex.png 650w, https://www.cloudways.com/blog/wp-content/uploads/Disabled-DirectoryIndex-300x73.png 300w" sizes="(max-width: 650px) 100vw, 650px" /></noscript></p>
<p><b>myApp.js code</b></p>
<pre class="EnlighterJSRAW" data-enlighter-language="null">// myApp.js
const express = require('express');
const app = express();

// Route to display a message
app.get('/', (req, res) =&gt; {
    res.send('&lt;h1&gt;Hello, your Node.js app is running on Cloudways!&lt;/h1&gt;');
});

// Start the server
app.listen(process.env.PORT || 3000, () =&gt; {
    console.log('Server is running');
});
</pre>
<ul>
<li style="font-weight: 400;">Next, we will install basic package.json to be set under public_html folder along with the Express framework.</li>
</ul>
<h4>Why Express Framework?</h4>
<p>Many of us know that installing Express is important because it improves Node.js by providing a better framework for building web applications. It simplifies routing, and allows for cleaner and more organized code when dealing with different endpoints.</p>
<p>Express also supports middleware, allowing you to quickly integrate services like logging and authentication. Additionally, it simplifies request and response handling, improves security, and provides access to a rich ecosystem of plugins and community support, making development faster and more efficient.</p>
<p>We can install Express by simply running the following commands:</p>
<pre class="EnlighterJSRAW" data-enlighter-language="null">npm init -y
npm install express</pre>
<p>&nbsp;</p>
<p><img loading="lazy" decoding="async" class="lazy cw_postFancy_img aligncenter wp-image-135620 size-full" src="https://www.cloudways.com/blog/wp-content/themes/cloudways/template/img/grey.gif" data-original="https://www.cloudways.com/blog/wp-content/uploads/install-Express-Framework.png" alt="" width="969" height="673" /><noscript><img loading="lazy" decoding="async" class="cw_postFancy_img aligncenter wp-image-135620 size-full" src="https://www.cloudways.com/blog/wp-content/uploads/install-Express-Framework.png" alt="" width="969" height="673" srcset="https://www.cloudways.com/blog/wp-content/uploads/install-Express-Framework.png 969w, https://www.cloudways.com/blog/wp-content/uploads/install-Express-Framework-300x208.png 300w, https://www.cloudways.com/blog/wp-content/uploads/install-Express-Framework-768x533.png 768w" sizes="(max-width: 969px) 100vw, 969px" /></noscript></p>
<h3>4. htaccess Redirection Rule</h3>
<ul>
<li style="font-weight: 400;">Next,  we’ll configure the .htaccess file within the public_html directory to route our app to port 3000.</li>
</ul>
<p><b>Note:</b> <i>The above step is </i><i>necessary o</i><i>n Cloudways. </i></p>
<ul>
<li style="font-weight: 400;">We have removed the default index.php file from the public_html folder and disabled the <b>DirectoryIndex</b> through the .htaccess file to run the app using it.</li>
<li style="font-weight: 400;">You can adjust this configuration as per your needs, but for our test purposes, we’ll use the approach outlined below:</li>
</ul>
<p><img loading="lazy" decoding="async" class="lazy cw_postFancy_img aligncenter wp-image-135616 size-full" src="https://www.cloudways.com/blog/wp-content/themes/cloudways/template/img/grey.gif" data-original="https://www.cloudways.com/blog/wp-content/uploads/Disabled-DirectoryIndex.png" alt="" width="650" height="159" /><noscript><img loading="lazy" decoding="async" class="cw_postFancy_img aligncenter wp-image-135616 size-full" src="https://www.cloudways.com/blog/wp-content/uploads/Disabled-DirectoryIndex.png" alt="" width="650" height="159" srcset="https://www.cloudways.com/blog/wp-content/uploads/Disabled-DirectoryIndex.png 650w, https://www.cloudways.com/blog/wp-content/uploads/Disabled-DirectoryIndex-300x73.png 300w" sizes="(max-width: 650px) 100vw, 650px" /></noscript></p>
<p><b>.htaccess code:</b></p>
<pre class="EnlighterJSRAW" data-enlighter-language="null">DirectoryIndex disabled
# Redirect traffic to your port 3000
RewriteEngine On
RewriteBase /
RewriteRule ^(.*)?$ http://127.0.0.1:3000/$1 [P,L]
</pre>
<ul>
<li style="font-weight: 400;">Before testing the application,  make sure that mod_proxy is enabled on your server. For this, you will need to connect with Cloudways support &amp; they will help you enable it in no time.</li>
<li style="font-weight: 400;">If mod_proxy is not enabled, you may see similar errors in the logs, and the application will not work because imod_proxy is disabled by default on Cloudways servers.</li>
</ul>
<p><img loading="lazy" decoding="async" class="lazy cw_postFancy_img aligncenter wp-image-135624 size-full" src="https://www.cloudways.com/blog/wp-content/themes/cloudways/template/img/grey.gif" data-original="https://www.cloudways.com/blog/wp-content/uploads/imod_proxy.png" alt="" width="1800" height="201" /><noscript><img loading="lazy" decoding="async" class="cw_postFancy_img aligncenter wp-image-135624 size-full" src="https://www.cloudways.com/blog/wp-content/uploads/imod_proxy.png" alt="" width="1800" height="201" srcset="https://www.cloudways.com/blog/wp-content/uploads/imod_proxy.png 1800w, https://www.cloudways.com/blog/wp-content/uploads/imod_proxy-300x34.png 300w, https://www.cloudways.com/blog/wp-content/uploads/imod_proxy-1024x114.png 1024w, https://www.cloudways.com/blog/wp-content/uploads/imod_proxy-768x86.png 768w, https://www.cloudways.com/blog/wp-content/uploads/imod_proxy-1536x172.png 1536w" sizes="(max-width: 1800px) 100vw, 1800px" /></noscript></p>
<p><img loading="lazy" decoding="async" class="lazy cw_postFancy_img aligncenter wp-image-135619 size-full" src="https://www.cloudways.com/blog/wp-content/themes/cloudways/template/img/grey.gif" data-original="https://www.cloudways.com/blog/wp-content/uploads/imod_proxy-is-disabled-2-e1725993147713.png" alt="" width="1607" height="366" /><noscript><img loading="lazy" decoding="async" class="cw_postFancy_img aligncenter wp-image-135619 size-full" src="https://www.cloudways.com/blog/wp-content/uploads/imod_proxy-is-disabled-2-e1725993147713.png" alt="" width="1607" height="366" srcset="https://www.cloudways.com/blog/wp-content/uploads/imod_proxy-is-disabled-2-e1725993147713.png 1607w, https://www.cloudways.com/blog/wp-content/uploads/imod_proxy-is-disabled-2-e1725993147713-300x68.png 300w, https://www.cloudways.com/blog/wp-content/uploads/imod_proxy-is-disabled-2-e1725993147713-1024x233.png 1024w, https://www.cloudways.com/blog/wp-content/uploads/imod_proxy-is-disabled-2-e1725993147713-768x175.png 768w, https://www.cloudways.com/blog/wp-content/uploads/imod_proxy-is-disabled-2-e1725993147713-1536x350.png 1536w" sizes="(max-width: 1607px) 100vw, 1607px" /></noscript></p>
<ul>
<li style="font-weight: 400;">Once your mod_proxy is enabled, we are good to go and test the application to check the output along with the configuration test.</li>
</ul>
<h3>5. Configuration Test</h3>
<ul>
<li style="font-weight: 400;">Now that everything is set up, we can proceed to run our application and test it. For this,  run the command<b> “node myApp.js”</b> via the CLI to start the application.</li>
</ul>
<p><img loading="lazy" decoding="async" class="lazy cw_postFancy_img aligncenter wp-image-135615 size-full" src="https://www.cloudways.com/blog/wp-content/themes/cloudways/template/img/grey.gif" data-original="https://www.cloudways.com/blog/wp-content/uploads/Configuration-Test.png" alt="" width="590" height="80" /><noscript><img loading="lazy" decoding="async" class="cw_postFancy_img aligncenter wp-image-135615 size-full" src="https://www.cloudways.com/blog/wp-content/uploads/Configuration-Test.png" alt="" width="590" height="80" srcset="https://www.cloudways.com/blog/wp-content/uploads/Configuration-Test.png 590w, https://www.cloudways.com/blog/wp-content/uploads/Configuration-Test-300x41.png 300w" sizes="(max-width: 590px) 100vw, 590px" /></noscript></p>
<p><img loading="lazy" decoding="async" class="lazy cw_postFancy_img aligncenter wp-image-135618 size-full" src="https://www.cloudways.com/blog/wp-content/themes/cloudways/template/img/grey.gif" data-original="https://www.cloudways.com/blog/wp-content/uploads/Node.js-app-launched-e1725993236661.png" alt="" width="1338" height="178" /><noscript><img loading="lazy" decoding="async" class="cw_postFancy_img aligncenter wp-image-135618 size-full" src="https://www.cloudways.com/blog/wp-content/uploads/Node.js-app-launched-e1725993236661.png" alt="" width="1338" height="178" srcset="https://www.cloudways.com/blog/wp-content/uploads/Node.js-app-launched-e1725993236661.png 1338w, https://www.cloudways.com/blog/wp-content/uploads/Node.js-app-launched-e1725993236661-300x40.png 300w, https://www.cloudways.com/blog/wp-content/uploads/Node.js-app-launched-e1725993236661-1024x136.png 1024w, https://www.cloudways.com/blog/wp-content/uploads/Node.js-app-launched-e1725993236661-768x102.png 768w" sizes="(max-width: 1338px) 100vw, 1338px" /></noscript></p>
<ul>
<li style="font-weight: 400;">Perfect! The application is running as expected. Now, let’s set it up with PM2.</li>
</ul>
<h4>Why Use PM2?</h4>
<p>PM2 is necessary because if you close your SSH session, the application will stop running. To keep it running in the background, you can use a process manager like PM2.</p>
<h4>PM2 Installation</h4>
<p>Run the following commands to install PM2 with your master user:</p>
<pre class="EnlighterJSRAW" data-enlighter-language="null">cd  &amp;&amp; echo "export PATH='$PATH:/home/master/bin/npm'" &gt;&gt; .bash_aliases
cd ~ &amp;&amp; echo "export NODE_PATH='$NODE_PATH:/home/master/bin/npm/lib/node_modules'" &gt;&gt; .bash_aliases
npm config set prefix "/home/master/bin/npm/lib/node_modules"
cd  &amp;&amp; echo "alias pm2='/home/master/bin/npm/lib/node_modules/bin/pm2'" &gt;&gt; .bash_aliases
npm install pm2@latest -g
source ~/.bashrc
pm2 -v
</pre>
<p><img loading="lazy" decoding="async" class="lazy cw_postFancy_img aligncenter wp-image-135617 size-full" src="https://www.cloudways.com/blog/wp-content/themes/cloudways/template/img/grey.gif" data-original="https://www.cloudways.com/blog/wp-content/uploads/PM2-Installation.png" alt="" width="1345" height="303" /><noscript><img loading="lazy" decoding="async" class="cw_postFancy_img aligncenter wp-image-135617 size-full" src="https://www.cloudways.com/blog/wp-content/uploads/PM2-Installation.png" alt="" width="1345" height="303" srcset="https://www.cloudways.com/blog/wp-content/uploads/PM2-Installation.png 1345w, https://www.cloudways.com/blog/wp-content/uploads/PM2-Installation-300x68.png 300w, https://www.cloudways.com/blog/wp-content/uploads/PM2-Installation-1024x231.png 1024w, https://www.cloudways.com/blog/wp-content/uploads/PM2-Installation-768x173.png 768w" sizes="(max-width: 1345px) 100vw, 1345px" /></noscript></p>
<p><img loading="lazy" decoding="async" class="lazy cw_postFancy_img aligncenter wp-image-135623 size-full" src="https://www.cloudways.com/blog/wp-content/themes/cloudways/template/img/grey.gif" data-original="https://www.cloudways.com/blog/wp-content/uploads/PM2-Installation-2.png" alt="" width="1069" height="962" /><noscript><img loading="lazy" decoding="async" class="cw_postFancy_img aligncenter wp-image-135623 size-full" src="https://www.cloudways.com/blog/wp-content/uploads/PM2-Installation-2.png" alt="" width="1069" height="962" srcset="https://www.cloudways.com/blog/wp-content/uploads/PM2-Installation-2.png 1069w, https://www.cloudways.com/blog/wp-content/uploads/PM2-Installation-2-300x270.png 300w, https://www.cloudways.com/blog/wp-content/uploads/PM2-Installation-2-1024x922.png 1024w, https://www.cloudways.com/blog/wp-content/uploads/PM2-Installation-2-768x691.png 768w" sizes="(max-width: 1069px) 100vw, 1069px" /></noscript></p>
<p>PM2 is now installed, and you’re all set to start your Node app with it. Execute the command to run it with PM2, and your application will continue running smoothly in the background.</p>
<p><img loading="lazy" decoding="async" class="lazy aligncenter size-full wp-image-135622" src="https://www.cloudways.com/blog/wp-content/themes/cloudways/template/img/grey.gif" data-original="https://www.cloudways.com/blog/wp-content/uploads/PM2-installed.png" alt="" width="1724" height="319" /><noscript><img loading="lazy" decoding="async" class="aligncenter size-full wp-image-135622" src="https://www.cloudways.com/blog/wp-content/uploads/PM2-installed.png" alt="" width="1724" height="319" srcset="https://www.cloudways.com/blog/wp-content/uploads/PM2-installed.png 1724w, https://www.cloudways.com/blog/wp-content/uploads/PM2-installed-300x56.png 300w, https://www.cloudways.com/blog/wp-content/uploads/PM2-installed-1024x189.png 1024w, https://www.cloudways.com/blog/wp-content/uploads/PM2-installed-768x142.png 768w, https://www.cloudways.com/blog/wp-content/uploads/PM2-installed-1536x284.png 1536w" sizes="(max-width: 1724px) 100vw, 1724px" /></noscript></p>
<h2 id="summary"><b>Wrapping Up!</b></h2>
<p>Using Cloudways to host your Node.js application helps you smoothly use JavaScript&#8217;s capabilities on both the client and server sides.</p>
<p>With Cloudways’ powerful infrastructure, user-friendly UI, and support for widely used frameworks like Express, it improves your PHP application’s speed and ease the deployment process. By following the instructions provided in this guide, you can quickly set up your Node.js application, manage your files, and ensure your project functions properly.</p>
<p>Regardless of your experience level, Cloudways offers the resources and adaptability required to make your web apps a reality. And with Cloudways, you can make the most of Node.js&#8217; potential and take your work to the next level!</p>
<div class="cw_blog_toc-wrap">
<div class="cw_blog_toc-head"><a data-target="#cw_blog_faq" data-toggle="collapse" aria-expanded="true">Frequently Asked Questions</a></div>
<div id="cw_blog_faq" class="collapse in cw_blog_faq">
<h3>Q. Where can I deploy my Node.js app for free?</h3>
<p>You can deploy your Node. js app for free on the Cloudways platform, it has a 3 days trial period to work for free. This lets you configure your new app without being billed and you can test its functionality or performance before paying for any plan.</p>
<h3>Q. How to host a Node.js application locally?</h3>
<p>Installing Node.js on your system is the first step towards hosting a Node.js application locally. Make sure to create a project directory and write your code in an app.js file. Utilizing the command node app.js, launch your application and see it in your browser at http://localhost:3000. For better reliability in production, consider adopting a managed service such as Cloudways.</p>
<h3>Q. What is the best place to host a Node.js app in 2024?</h3>
<p>Cloudways is among the top hosts for Node.js apps in 2024. With features like advanced caching, automatic backups, and 24/7 support assistance, it provides an easy-to-use platform that makes sure your application works efficiently.</p>
</div>
</div>

                    <div class="cmnt-now-wrap">
                        <span>Share your opinion in the comment section.</span>
                        <a class="javascript:;">COMMENT NOW</a>
                    </div>

                    <div class="post_shrBtn_btmWrap" id="post_shrBtn_btmWrap">
                        <h3>Share This Article</h3>
                        <div class="post_shrBtn_ulBox">
                            
                            <ul>
                                <li><a rel="nofollow" title="Share post" onclick="popitup('https://www.facebook.com/sharer/sharer.php?u=https://www.cloudways.com/blog/how-to-host-a-node-js-application/',400,500)" href="javascript:void(0);"><i class="fa fa-facebook"></i></a></li>
                                <li><a rel="nofollow" href="https://twitter.com/intent/tweet?text=How to Host a Node.js app on Cloudways (Step-By-Step Guide),&amp;url=https://www.cloudways.com/blog/how-to-host-a-node-js-application/&amp;via=cloudways"><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 1200 1227" fill="none">
                                            <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" fill="#fff"></path>
                                        </svg></a></li>
                                <li><a rel="nofollow" title="Share post" onclick="popitup('http://pinterest.com/pin/create/button/?url=https://www.cloudways.com/blog/how-to-host-a-node-js-application/=&description=So, you built a Node.js app and want to share it but are unsure how to take it live? Don&#8217;t worry. You&#8217;ve landed in the right place. As this in-depth blog shares all the steps from setting up to hosting your Node.js application on Cloudways. But why Cloudways? Because it&#8217;s the most trusted platform by [&hellip;]',400,500)" href="javascript:void(0);"><i class="fa fa-pinterest"></i></a></li>
                                <li><a rel="nofollow" title="Share post" onclick="popitup('https://www.linkedin.com/shareArticle?mini=true&url=https://www.cloudways.com/blog/how-to-host-a-node-js-application/&title=How to Host a Node.js app on Cloudways (Step-By-Step Guide)&summary=So, you built a Node.js app and want to share it but are unsure how to take it live? Don&#8217;t worry. You&#8217;ve landed in the right place. As this in-depth blog shares all the steps from setting up to hosting your Node.js application on Cloudways. But why Cloudways? Because it&#8217;s the most trusted platform by [&hellip;]',400,500)" href="javascript:void(0);"><i class="fa fa-linkedin"></i></a></li>
                                <li><a rel="nofollow" title="Share post" onclick="popitup('https://www.reddit.com/submit?url=https://www.cloudways.com/blog/how-to-host-a-node-js-application/&title=How to Host a Node.js app on Cloudways (Step-By-Step Guide)',400,500)" href="javascript:void(0);"><i class="fa fa-reddit"></i></a></li>
                            </ul>
                            <span></span>
                        </div>

                    </div>

                    <div class="blg-inr-sbsc-box" id="blg_btm_signupCta">
                        
                        
                            <div class="custom_footer_banner">
<h4>👉 Join the <span style="color: #FBD808;">Cloudways Reddit Community</span>, It’s Built for You!</h4>
<p>Get Managed Hosting Insights, Troubleshooting Tips, Discussion, Q&A – Directly from Cloudways Users and Experts.</p>
</div>
                            
                            
                            <div class="blg-inr-sbsc-lnk-box">
                                <a href="https://bit.ly/CloudwaysbyDO" target="_blank">
                                    Join Us on Reddit                                </a>
                            </div>
                            <div class="clearfix"></div>

                        
                    </div>

                    <div id="cw_blg_athr_sec">
                        <div class="blg-abt-athr-box">
                                                        <div class="cw-inr-blg-athr-img-box img-circle" style="height: auto; width: auto;overflow: hidden;">
                                <img alt='' src='https://secure.gravatar.com/avatar/6e4e31dd8b3a44332aca284ebfd99281?s=128&#038;d=mm&#038;r=g' srcset='https://secure.gravatar.com/avatar/6e4e31dd8b3a44332aca284ebfd99281?s=256&#038;d=mm&#038;r=g 2x' class='avatar avatar-128 photo class-custom class-custom-2' height='128' width='128' loading='lazy' decoding='async'/>                            </div>

                            <div class="athr-desc-box">
                                <h4> <a href="https://www.cloudways.com/blog/author/salwa/">Salwa Mujtaba </a></h4>
                                <p> Salwa Mujtaba is a Technical Content Writer at Cloudways. With a strong background in Computer Science and prior experience as a team lead in Cloudways Operations, she brings a deep understanding of the Cloudways Platform to her writing. Salwa creates content that simplifies complex concepts, making them accessible and engaging for readers. When she's not writing, you can find her enjoying good music, reading a book, or spending quality time with her family. </p>
                                <div class="abt-athr-sc-box">
                                    <span>Get Connected on:</span>
                                    <a class="auth-bnr-btn-twt" href="" target="_blank">
                                        <i class="fa fa-twitter"></i> Twitter
                                    </a>
                                    <a class="auth-bnr-btn-cf hide" href="https://www.facebook.com/groups/CloudwaysUsers" target="_blank">
                                        <i class="fa fa-comments"></i> Community Forum
                                    </a>
                                </div>
                            </div>
                            <div class="clearfix"></div>
                        </div>
                    </div>
                </div>

                <div class="clearfix"></div>



                
                <div class="clearfix"></div>

                <!-- <div id="inrblog_btm_scrbBar" class="inrblog_btm_scrbBar hide">
                    <span id="close_inrblog_btm_scrbBar" class="close_inrblog_btm_scrbBar">&times;</span>
                                        <div class="thankWrap">
                        <h2>Thankyou for Subscribing Us!</h2>
                    </div>
                </div> -->

                <div id="glh_popUp_mainBox" class="hide">
                    <div class="agn_btm_sideBar_wrap_old hide">
                        <span id="close_inrblog_btm_scrbBar" class="close_inrblog_btm_scrbBar">&times;</span>
                        <div class="agn_btm_sideBar_formBox">
                            <h3>Webinar: How to Get 100% Scores on Core Web Vitals</h3>
                            <p>Join Joe Williams & Aleksandar Savkovic on 29th of March, 2021.</p>
                            <form role="form" class="blg-inr-form">
                                <div class="form-group">
                                    <input type="email" class="form-control text-center" name="sidebar_email" id="sidebar_email" placeholder="Email Address" required>
                                    <input type="hidden" name="cat" id="sidebar_nl_type" value="popup-page-experience-tool" />

                                    <label for="sidebar_checkbox_consent" class="checkbox_consent_sidebar">
                                        <input type="checkbox" required name="sidebar_checkbox_consent" class="" id="sidebar_checkbox_consent" checked="true">
                                        I agree to the Cloudways <a href="https://www.cloudways.com/en/terms.php">Terms of Service</a> & <a href="https://www.cloudways.com/en/terms.php#privacy">Privacy Policy</a>
                                    </label>

                                    <div class="blg-slide-disc-wrap">
                                        <a href="javascript:void(0);" id="sidebar_go1_old" class="btn btn-success blg-inr-lnk-cnt">Reserve My Spot</a>
                                    </div>
                                </div>
                                <div id="sidebar_error-messages"></div>
                                <div id="sidebar_success-messages"></div>
                                <div id="consent_error-messages"></div>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="clearfix"></div>

                <section class="blogFeedback_sideWrap hide">
                    <div class="blg_fbck_asideBox" id="blg_fbck_main_box">
                        <div class="blg_fbck_wrap">
                            <h4>Do you like what you read?</h4>
                            <div class="blg_fbck_rateBox">
                                <a href="javascript:void(0);" id="blg_fbck_btn_yes"><i class="fa fa-thumbs-up"></i></a>
                                <a href="javascript:void(0);" id="blg_fbck_btn_no"><i class="fa fa-thumbs-down"></i></a>
                            </div>
                        </div>
                    </div>

                    <div class="blg_fbck_asideBox" id="blg_fbck_yes">
                        <div class="blg_fbck_wrap">
                            <h4>Get the Latest Updates</h4>
                            <div class="blg_fbck_formBox">
                                <form role="form">
                                    <div class="form-group">
                                        <input type="email" class="form-control" name="" id="sm_email" placeholder="Email Address" required="">
                                    </div>
                                    <label for="checkbox_consent" class="checkbox_consent_sidebar">
                                        <input type="checkbox" required="" name="checkbox_consent" class="" id="checkbox_consent" checked="true">
                                        I agree to the Cloudways <a href="https://www.cloudways.com/en/terms.php">Terms of Service</a> &amp; <a href="https://www.cloudways.com/en/terms.php#privacy">Privacy Policy</a>
                                    </label>
                                    <input type="button" value="Subscribe Now" class="btn btn-default" id="smFeedbackBtn2">
                                    <div class="blg_fbck_emailerror"></div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div class="blg_fbck_asideBox" id="blg_fbck_no">
                        <div class="blg_fbck_wrap">
                            <h4>Share Your Feedback</h4>
                            <div class="blg_fbck_formBox">
                                <form role="form">
                                    <textarea placeholder="Help us to serve you better" name="cw_feedback" id="smFeedback"></textarea>
                                    <input type="button" value="Submit" class="btn btn-default" id="smFeedbackBtn">
                                    <div id="blg_fbck_error_msg">Please insert Content</div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div class="blg_fbck_asideBox" id="blg_fbck_thx">
                        <div class="blg_fbck_wrap">
                            <h4>Thank you for your feedback!</h4>
                        </div>
                    </div>
                </section>
            </div>

            <div class="col-md-4 col-xs-12 hide">

                <div class="blg-inr-rgt-top" style="height: 1px;"></div>
                <!--Right Sticky bar-->
                <div class="blg-inr-rgt-wrpr">

                    <!--check-->
                    <!--bool(false)
-->
                    <!--check-->

                    <!--Sticky banner-->
                                        <!--subscrib form-->
                    <div class="clearfix"></div>
                    <div class="blg_fbck_asideBox" id="blg_fbck_main_box">
                        <div class="blg_fbck_wrap">
                            <h4>Do you like what you read?</h4>
                            <div class="blg_fbck_rateBox">
                                <a href="javascript:void(0);" id="blg_fbck_btn_yes"><i class="fa fa-thumbs-up"></i></a>
                                <a href="javascript:void(0);" id="blg_fbck_btn_no"><i class="fa fa-thumbs-down"></i></a>
                            </div>
                        </div>
                    </div>

                    <div class="blg_fbck_asideBox" id="blg_fbck_yes">
                        <div class="blg_fbck_wrap">
                            <h4>Get the Latest Updates</h4>
                            <div class="blg_fbck_formBox">
                                <form role="form">
                                    <div class="form-group">
                                        <input type="email" class="form-control" name="" id="sm_email" placeholder="Email Address" required="">
                                    </div>
                                    <label for="checkbox_consent" class="checkbox_consent_sidebar">
                                        <input type="checkbox" required="" name="checkbox_consent" class="" id="checkbox_consent">
                                        I agree to the Cloudways <a href="https://www.cloudways.com/en/terms.php">Terms of Service</a> &amp; <a href="https://www.cloudways.com/en/terms.php#privacy">Privacy Policy</a>
                                    </label>
                                    <input type="button" value="Subscribe Now" class="btn btn-default" id="smFeedbackBtn2">
                                    <div class="blg_fbck_emailerror"></div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div class="blg_fbck_asideBox" id="blg_fbck_no">
                        <div class="blg_fbck_wrap">
                            <h4>Share Your Feedback</h4>
                            <div class="blg_fbck_formBox">
                                <form role="form">
                                    <textarea placeholder="Help us to serve you better" name="cw_feedback" id="smFeedback"></textarea>
                                    <input type="button" value="Submit" class="btn btn-default" id="smFeedbackBtn">
                                    <div id="blg_fbck_error_msg">Please insert Content</div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div class="blg_fbck_asideBox" id="blg_fbck_thx">
                        <div class="blg_fbck_wrap">
                            <h4>Thank you for your feedback!</h4>
                        </div>
                    </div>

                </div>
                <!--Right Sticky bar-->

            </div>
        </div>
    </div>
    <!--Main content-->

    <!-- Side Banner -->
    <!--Promotional Strip-->



        <!-- Side Banner -->
    <!-- Modal -->
    <div class="modal newTstml_video_playBox fade" id="tstml_videoBox" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog opacity-animate3 modal-dialog-centered">
            <div class="modal-content">

                <div class="modal-body" id="yt-player">
                    <div class="embed-responsive embed-responsive-16by9">
                        <iframe class="tstml_youtube_video" width="560" height="315" src="javascript:void(0);" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <!-- Modal -->

    <!-- Modal -->
    <div class="modal newTstml_video_playBox fade" id="tstml_videoBox2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog opacity-animate3 modal-dialog-centered">
            <div class="modal-content">

                <div class="modal-body" id="yt-player">
                    <div class="embed-responsive embed-responsive-16by9">
                        <video class="modal-embeded-video" id="videoPlayer" poster="" controls="">
                            <source src="https://cloudways-static-content.s3.amazonaws.com/Images/Videos/how-to-video-edited-cut.mp4" type="video/mp4">
                            <source src="movie.ogg" type="video/ogg">
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <!-- Modal -->
</section>
<section class="blg-new-full-wid-cta notActiv">
    <div class="container">
        <div class="main-wrap">
            <div class="leftBox">
                                <h2>Want to Experience the Cloudways Platform in Its Full Glory?</h2>
                <p>Take a FREE guided tour of Cloudways and see for yourself how easily you can manage your server & apps on the leading cloud-hosting platform.</p>
                                <a href="https://www.cloudways.com/en/hosting-plan-quiz.php?ref_id=blog_CTAfoldDemo">Start my tour</a>
            </div>
            <div class="rightBox">
                <svg width="595" height="430" viewBox="0 0 595 430" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_d_935_1561)">
                <path d="M571.593 11.3545H23.4068C15.5634 11.3545 9.20508 17.709 9.20508 25.5478V449.456C9.20508 457.295 15.5634 463.649 23.4068 463.649H571.593C579.437 463.649 585.795 457.295 585.795 449.456V25.5478C585.795 17.709 579.437 11.3545 571.593 11.3545Z" fill="white"/>
                </g>
                <path d="M23.4068 0H571.593C575.36 0 578.972 1.49534 581.635 4.15711C584.299 6.81888 585.795 10.429 585.795 14.1934V26.4943H9.20508V14.1934C9.20508 10.429 10.7013 6.81888 13.3646 4.15711C16.028 1.49534 19.6403 0 23.4068 0Z" fill="#F3F3F3"/>
                <path d="M36.4253 18.5089C38.8599 18.5089 40.8335 16.5365 40.8335 14.1033C40.8335 11.6702 38.8599 9.69772 36.4253 9.69772C33.9907 9.69772 32.0171 11.6702 32.0171 14.1033C32.0171 16.5365 33.9907 18.5089 36.4253 18.5089Z" fill="#E7E4E4"/>
                <path d="M46.8696 18.5089C49.3042 18.5089 51.2779 16.5365 51.2779 14.1033C51.2779 11.6702 49.3042 9.69772 46.8696 9.69772C44.4351 9.69772 42.4614 11.6702 42.4614 14.1033C42.4614 16.5365 44.4351 18.5089 46.8696 18.5089Z" fill="#E7E4E4"/>
                <path d="M58.2749 18.4948C60.7016 18.4948 62.6689 16.5287 62.6689 14.1034C62.6689 11.6781 60.7016 9.71191 58.2749 9.71191C55.8481 9.71191 53.8809 11.6781 53.8809 14.1034C53.8809 16.5287 55.8481 18.4948 58.2749 18.4948Z" fill="#E7E4E4"/>
                <g filter="url(#filter1_d_935_1561)">
                <path d="M538.454 384.97H55.5957C50.3668 384.97 46.1279 389.206 46.1279 394.432V437.959C46.1279 443.184 50.3668 447.421 55.5957 447.421H538.454C543.683 447.421 547.922 443.184 547.922 437.959V394.432C547.922 389.206 543.683 384.97 538.454 384.97Z" fill="white"/>
                </g>
                <path d="M528.514 414.303H66.4846C65.7003 414.303 65.0645 414.939 65.0645 415.722C65.0645 416.506 65.7003 417.142 66.4846 417.142H528.514C529.298 417.142 529.934 416.506 529.934 415.722C529.934 414.939 529.298 414.303 528.514 414.303Z" fill="#F0F0F0"/>
                <path d="M185.779 414.303H66.4846C65.7003 414.303 65.0645 414.939 65.0645 415.722C65.0645 416.506 65.7003 417.142 66.4846 417.142H185.779C186.563 417.142 187.199 416.506 187.199 415.722C187.199 414.939 186.563 414.303 185.779 414.303Z" fill="#39DCB1"/>
                <path d="M191.902 423.203C195.906 423.203 199.151 419.96 199.151 415.959C199.151 411.958 195.906 408.715 191.902 408.715C187.899 408.715 184.654 411.958 184.654 415.959C184.654 419.96 187.899 423.203 191.902 423.203Z" fill="#39DCB1"/>
                <path d="M108.853 423.174C112.84 423.174 116.072 419.944 116.072 415.959C116.072 411.974 112.84 408.744 108.853 408.744C104.865 408.744 101.633 411.974 101.633 415.959C101.633 419.944 104.865 423.174 108.853 423.174Z" fill="#39DCB1"/>
                <path d="M273.193 423.189C277.188 423.189 280.427 419.952 280.427 415.959C280.427 411.966 277.188 408.729 273.193 408.729C269.197 408.729 265.958 411.966 265.958 415.959C265.958 419.952 269.197 423.189 273.193 423.189Z" fill="#F0F0F0"/>
                <path d="M367.397 423.189C371.393 423.189 374.632 419.952 374.632 415.959C374.632 411.966 371.393 408.729 367.397 408.729C363.402 408.729 360.163 411.966 360.163 415.959C360.163 419.952 363.402 423.189 367.397 423.189Z" fill="#F0F0F0"/>
                <path d="M461.883 423.202C465.886 423.202 469.131 419.959 469.131 415.959C469.131 411.959 465.886 408.716 461.883 408.716C457.88 408.716 454.635 411.959 454.635 415.959C454.635 419.959 457.88 423.202 461.883 423.202Z" fill="#F0F0F0"/>
                <path d="M56.7256 366.411C56.6721 365.959 56.4551 365.608 56.0745 365.358C55.6939 365.109 55.2271 364.984 54.6741 364.984C54.2697 364.984 53.9159 365.049 53.6126 365.18C53.3123 365.311 53.0775 365.491 52.908 365.72C52.7415 365.949 52.6582 366.209 52.6582 366.5C52.6582 366.744 52.7162 366.954 52.8322 367.129C52.9511 367.302 53.1027 367.446 53.2871 367.562C53.4714 367.675 53.6647 367.768 53.8669 367.843C54.069 367.914 54.2549 367.972 54.4243 368.017L55.352 368.266C55.5899 368.329 55.8545 368.415 56.1459 368.525C56.4402 368.635 56.7212 368.785 56.9888 368.975C57.2593 369.163 57.4823 369.404 57.6578 369.698C57.8332 369.992 57.9209 370.354 57.9209 370.782C57.9209 371.275 57.7916 371.721 57.5329 372.12C57.2772 372.518 56.9026 372.835 56.409 373.07C55.9184 373.305 55.3223 373.422 54.6206 373.422C53.9665 373.422 53.4001 373.316 52.9214 373.105C52.4456 372.894 52.071 372.6 51.7975 372.222C51.5269 371.845 51.3738 371.406 51.3381 370.907H52.4798C52.5096 371.251 52.6255 371.537 52.8277 371.763C53.0329 371.986 53.2915 372.152 53.6037 372.262C53.9189 372.369 54.2578 372.423 54.6206 372.423C55.0428 372.423 55.4219 372.355 55.7578 372.218C56.0938 372.078 56.3599 371.885 56.5562 371.638C56.7524 371.388 56.8505 371.097 56.8505 370.764C56.8505 370.461 56.7658 370.214 56.5963 370.024C56.4268 369.833 56.2038 369.679 55.9273 369.56C55.6508 369.441 55.352 369.337 55.0309 369.248L53.907 368.926C53.1934 368.721 52.6285 368.428 52.2122 368.048C51.796 367.667 51.5878 367.169 51.5878 366.554C51.5878 366.042 51.7261 365.596 52.0026 365.216C52.2821 364.832 52.6567 364.535 53.1265 364.324C53.5993 364.11 54.127 364.003 54.7098 364.003C55.2985 364.003 55.8218 364.108 56.2797 364.319C56.7375 364.527 57.1003 364.813 57.3679 365.176C57.6384 365.538 57.7811 365.95 57.796 366.411H56.7256ZM62.4689 373.404C61.8088 373.404 61.2394 373.258 60.7607 372.967C60.285 372.673 59.9178 372.262 59.6591 371.736C59.4034 371.207 59.2756 370.591 59.2756 369.89C59.2756 369.188 59.4034 368.57 59.6591 368.034C59.9178 367.496 60.2776 367.077 60.7384 366.777C61.2023 366.473 61.7434 366.322 62.3618 366.322C62.7186 366.322 63.0709 366.381 63.4188 366.5C63.7667 366.619 64.0833 366.812 64.3688 367.08C64.6542 367.345 64.8817 367.695 65.0511 368.133C65.2206 368.57 65.3054 369.108 65.3054 369.747V370.193H60.0248V369.283H64.235C64.235 368.897 64.1577 368.552 64.0031 368.248C63.8514 367.945 63.6344 367.706 63.3519 367.53C63.0724 367.355 62.7424 367.267 62.3618 367.267C61.9426 367.267 61.5799 367.371 61.2736 367.58C60.9703 367.785 60.7369 368.052 60.5734 368.382C60.4099 368.712 60.3281 369.066 60.3281 369.444V370.05C60.3281 370.568 60.4173 371.006 60.5957 371.366C60.7771 371.723 61.0283 371.995 61.3494 372.182C61.6705 372.366 62.0437 372.459 62.4689 372.459C62.7454 372.459 62.9951 372.42 63.2181 372.343C63.4441 372.262 63.6388 372.143 63.8024 371.986C63.9659 371.825 64.0923 371.626 64.1815 371.388L65.1983 371.674C65.0913 372.019 64.9114 372.322 64.6587 372.584C64.4059 372.842 64.0938 373.044 63.7221 373.19C63.3504 373.333 62.9327 373.404 62.4689 373.404ZM66.9065 373.261V366.411H67.9233V367.446H67.9947C68.1195 367.107 68.3455 366.832 68.6726 366.621C68.9996 366.41 69.3683 366.304 69.7786 366.304C69.8559 366.304 69.9526 366.305 70.0685 366.308C70.1845 366.311 70.2722 366.316 70.3317 366.322V367.392C70.296 367.383 70.2142 367.37 70.0864 367.352C69.9615 367.331 69.8292 367.321 69.6894 367.321C69.3564 367.321 69.0591 367.391 68.7974 367.53C68.5388 367.667 68.3336 367.858 68.182 368.101C68.0333 368.342 67.959 368.617 67.959 368.926V373.261H66.9065ZM77.3894 366.411L74.8562 373.261H73.7858L71.2526 366.411H72.3943L74.2853 371.87H74.3567L76.2477 366.411H77.3894ZM81.4056 373.404C80.7455 373.404 80.1761 373.258 79.6974 372.967C79.2217 372.673 78.8545 372.262 78.5958 371.736C78.3401 371.207 78.2123 370.591 78.2123 369.89C78.2123 369.188 78.3401 368.57 78.5958 368.034C78.8545 367.496 79.2143 367.077 79.6751 366.777C80.1389 366.473 80.6801 366.322 81.2985 366.322C81.6553 366.322 82.0076 366.381 82.3555 366.5C82.7034 366.619 83.02 366.812 83.3055 367.08C83.5909 367.345 83.8184 367.695 83.9878 368.133C84.1573 368.57 84.242 369.108 84.242 369.747V370.193H78.9615V369.283H83.1717C83.1717 368.897 83.0944 368.552 82.9398 368.248C82.7881 367.945 82.5711 367.706 82.2886 367.53C82.0091 367.355 81.6791 367.267 81.2985 367.267C80.8793 367.267 80.5166 367.371 80.2103 367.58C79.907 367.785 79.6736 368.052 79.5101 368.382C79.3466 368.712 79.2648 369.066 79.2648 369.444V370.05C79.2648 370.568 79.354 371.006 79.5324 371.366C79.7138 371.723 79.965 371.995 80.2861 372.182C80.6072 372.366 80.9804 372.459 81.4056 372.459C81.6821 372.459 81.9318 372.42 82.1548 372.343C82.3808 372.262 82.5755 372.143 82.7391 371.986C82.9026 371.825 83.029 371.626 83.1182 371.388L84.135 371.674C84.028 372.019 83.8481 372.322 83.5954 372.584C83.3426 372.842 83.0304 373.044 82.6588 373.19C82.2871 373.333 81.8694 373.404 81.4056 373.404ZM85.8432 373.261V366.411H86.86V367.446H86.9314C87.0562 367.107 87.2822 366.832 87.6093 366.621C87.9363 366.41 88.305 366.304 88.7153 366.304C88.7926 366.304 88.8893 366.305 89.0052 366.308C89.1212 366.311 89.2089 366.316 89.2683 366.322V367.392C89.2327 367.383 89.1509 367.37 89.0231 367.352C88.8982 367.331 88.7659 367.321 88.6261 367.321C88.2931 367.321 87.9958 367.391 87.7341 367.53C87.4755 367.667 87.2703 367.858 87.1187 368.101C86.97 368.342 86.8957 368.617 86.8957 368.926V373.261H85.8432ZM99.186 366.411C99.1325 365.959 98.9155 365.608 98.5349 365.358C98.1543 365.109 97.6875 364.984 97.1345 364.984C96.7301 364.984 96.3763 365.049 96.073 365.18C95.7727 365.311 95.5378 365.491 95.3684 365.72C95.2019 365.949 95.1186 366.209 95.1186 366.5C95.1186 366.744 95.1766 366.954 95.2925 367.129C95.4115 367.302 95.5631 367.446 95.7475 367.562C95.9318 367.675 96.1251 367.768 96.3272 367.843C96.5294 367.914 96.7152 367.972 96.8847 368.017L97.8124 368.266C98.0502 368.329 98.3149 368.415 98.6062 368.525C98.9006 368.635 99.1816 368.785 99.4492 368.975C99.7197 369.163 99.9427 369.404 100.118 369.698C100.294 369.992 100.381 370.354 100.381 370.782C100.381 371.275 100.252 371.721 99.9933 372.12C99.7376 372.518 99.3629 372.835 98.8694 373.07C98.3788 373.305 97.7826 373.422 97.081 373.422C96.4268 373.422 95.8604 373.316 95.3817 373.105C94.906 372.894 94.5314 372.6 94.2578 372.222C93.9873 371.845 93.8342 371.406 93.7985 370.907H94.9402C94.9699 371.251 95.0859 371.537 95.2881 371.763C95.4932 371.986 95.7519 372.152 96.0641 372.262C96.3793 372.369 96.7182 372.423 97.081 372.423C97.5032 372.423 97.8823 372.355 98.2182 372.218C98.5542 372.078 98.8203 371.885 99.0166 371.638C99.2128 371.388 99.3109 371.097 99.3109 370.764C99.3109 370.461 99.2262 370.214 99.0567 370.024C98.8872 369.833 98.6642 369.679 98.3877 369.56C98.1112 369.441 97.8124 369.337 97.4913 369.248L96.3674 368.926C95.6538 368.721 95.0889 368.428 94.6726 368.048C94.2564 367.667 94.0482 367.169 94.0482 366.554C94.0482 366.042 94.1865 365.596 94.463 365.216C94.7425 364.832 95.1171 364.535 95.5869 364.324C96.0596 364.11 96.5874 364.003 97.1702 364.003C97.7589 364.003 98.2822 364.108 98.74 364.319C99.1979 364.527 99.5607 364.813 99.8282 365.176C100.099 365.538 100.242 365.95 100.256 366.411H99.186ZM102.057 373.261V366.411H103.11V373.261H102.057ZM102.592 365.269C102.387 365.269 102.21 365.199 102.062 365.06C101.916 364.92 101.843 364.752 101.843 364.556C101.843 364.359 101.916 364.191 102.062 364.052C102.21 363.912 102.387 363.842 102.592 363.842C102.797 363.842 102.973 363.912 103.119 364.052C103.267 364.191 103.342 364.359 103.342 364.556C103.342 364.752 103.267 364.92 103.119 365.06C102.973 365.199 102.797 365.269 102.592 365.269ZM104.841 373.261V372.459L108.73 367.464V367.392H104.966V366.411H110.086V367.249L106.304 372.209V372.28H110.211V373.261H104.841ZM114.508 373.404C113.848 373.404 113.279 373.258 112.8 372.967C112.324 372.673 111.957 372.262 111.698 371.736C111.443 371.207 111.315 370.591 111.315 369.89C111.315 369.188 111.443 368.57 111.698 368.034C111.957 367.496 112.317 367.077 112.778 366.777C113.241 366.473 113.783 366.322 114.401 366.322C114.758 366.322 115.11 366.381 115.458 366.5C115.806 366.619 116.122 366.812 116.408 367.08C116.693 367.345 116.921 367.695 117.09 368.133C117.26 368.57 117.344 369.108 117.344 369.747V370.193H112.064V369.283H116.274C116.274 368.897 116.197 368.552 116.042 368.248C115.891 367.945 115.673 367.706 115.391 367.53C115.112 367.355 114.782 367.267 114.401 367.267C113.982 367.267 113.619 367.371 113.313 367.58C113.009 367.785 112.776 368.052 112.613 368.382C112.449 368.712 112.367 369.066 112.367 369.444V370.05C112.367 370.568 112.456 371.006 112.635 371.366C112.816 371.723 113.067 371.995 113.389 372.182C113.71 372.366 114.083 372.459 114.508 372.459C114.784 372.459 115.034 372.42 115.257 372.343C115.483 372.262 115.678 372.143 115.841 371.986C116.005 371.825 116.131 371.626 116.221 371.388L117.237 371.674C117.13 372.019 116.951 372.322 116.698 372.584C116.445 372.842 116.133 373.044 115.761 373.19C115.39 373.333 114.972 373.404 114.508 373.404Z" fill="#5A6880"/>
                <g filter="url(#filter2_d_935_1561)">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M55.5957 228.986H538.454C540.965 228.986 543.373 229.983 545.149 231.758C546.925 233.532 547.922 235.939 547.922 238.449V320.77C547.922 323.28 546.925 325.686 545.149 327.461C543.373 329.235 540.965 330.232 538.454 330.232H55.5957C53.0847 330.232 50.6766 329.235 48.901 327.461C47.1255 325.686 46.1279 323.28 46.1279 320.77V238.449C46.1279 235.939 47.1255 233.532 48.901 231.758C50.6766 229.983 53.0847 228.986 55.5957 228.986Z" fill="white"/>
                </g>
                <g class="apps app6">
                    <rect x="64.1172" y="242.376" width="141.374" height="75.7425" rx="11.3614" fill="#F2F4F5"/>
                    <g clip-path="url(#clip0_935_1561)">
                        <path d="M135.125 299.732V292.177C143.122 292.177 149.33 284.246 146.259 275.829C145.132 272.714 142.636 270.218 139.521 269.091C131.104 266.042 123.173 272.228 123.173 280.225H115.64C115.64 267.478 127.967 257.537 141.333 261.712C147.165 263.546 151.826 268.185 153.638 274.017C157.813 287.405 147.894 299.732 135.125 299.732Z" fill="#0080FF"/>
                        <path d="M135.148 292.199H127.637V284.688H135.148V292.199Z" fill="#0080FF"/>
                        <path d="M127.636 297.987H121.848V292.199H127.636V297.987Z" fill="#0080FF"/>
                        <path d="M121.847 292.199H117.009V287.361H121.847V292.199Z" fill="#0080FF"/>
                    </g>
                </g>
                <g class="apps app7">
                    <rect x="226.964" y="242.376" width="141.374" height="75.7425" rx="11.3614" fill="#F2F4F5"/>
                    <g clip-path="url(#clip1_935_1561)">
                        <path d="M285.993 276.153C285.993 276.768 286.06 277.268 286.178 277.634C286.312 278 286.48 278.4 286.716 278.833C286.8 278.966 286.834 279.099 286.834 279.216C286.834 279.382 286.733 279.548 286.514 279.715L285.455 280.414C285.303 280.514 285.152 280.564 285.017 280.564C284.849 280.564 284.681 280.481 284.513 280.331C284.277 280.081 284.076 279.815 283.907 279.548C283.739 279.266 283.571 278.949 283.386 278.566C282.074 280.098 280.426 280.864 278.442 280.864C277.029 280.864 275.902 280.464 275.078 279.665C274.254 278.866 273.833 277.801 273.833 276.469C273.833 275.054 274.338 273.905 275.364 273.04C276.39 272.174 277.752 271.741 279.484 271.741C280.056 271.741 280.645 271.791 281.267 271.874C281.889 271.958 282.528 272.091 283.201 272.241V271.025C283.201 269.76 282.932 268.878 282.411 268.362C281.872 267.846 280.964 267.596 279.669 267.596C279.081 267.596 278.475 267.663 277.853 267.813C277.231 267.962 276.625 268.146 276.037 268.379C275.768 268.495 275.566 268.562 275.448 268.595C275.33 268.628 275.246 268.645 275.179 268.645C274.943 268.645 274.826 268.478 274.826 268.129V267.313C274.826 267.047 274.859 266.847 274.943 266.731C275.028 266.614 275.179 266.497 275.414 266.381C276.003 266.081 276.709 265.832 277.533 265.632C278.357 265.415 279.232 265.316 280.157 265.316C282.158 265.316 283.622 265.765 284.563 266.664C285.488 267.563 285.959 268.928 285.959 270.759V276.153H285.993ZM279.165 278.683C279.72 278.683 280.292 278.583 280.897 278.383C281.502 278.183 282.041 277.817 282.495 277.318C282.764 277.002 282.966 276.652 283.066 276.252C283.167 275.853 283.235 275.37 283.235 274.804V274.105C282.747 273.988 282.226 273.889 281.687 273.822C281.149 273.755 280.628 273.722 280.107 273.722C278.98 273.722 278.156 273.939 277.601 274.388C277.046 274.837 276.777 275.47 276.777 276.302C276.777 277.085 276.978 277.667 277.399 278.067C277.803 278.483 278.391 278.683 279.165 278.683ZM292.669 280.481C292.367 280.481 292.165 280.431 292.03 280.314C291.896 280.214 291.778 279.981 291.677 279.665L287.725 266.797C287.624 266.464 287.574 266.248 287.574 266.131C287.574 265.865 287.708 265.715 287.977 265.715H289.625C289.945 265.715 290.164 265.765 290.281 265.882C290.416 265.981 290.517 266.215 290.618 266.531L293.443 277.551L296.067 266.531C296.151 266.198 296.252 265.981 296.386 265.882C296.521 265.782 296.756 265.715 297.059 265.715H298.404C298.724 265.715 298.942 265.765 299.077 265.882C299.212 265.981 299.329 266.215 299.397 266.531L302.054 277.684L304.963 266.531C305.064 266.198 305.182 265.981 305.3 265.882C305.434 265.782 305.653 265.715 305.956 265.715H307.52C307.789 265.715 307.94 265.848 307.94 266.131C307.94 266.215 307.923 266.298 307.906 266.398C307.89 266.497 307.856 266.631 307.789 266.814L303.736 279.682C303.635 280.015 303.517 280.231 303.382 280.331C303.248 280.431 303.029 280.497 302.743 280.497H301.297C300.977 280.497 300.759 280.447 300.624 280.331C300.49 280.214 300.372 279.998 300.305 279.665L297.698 268.928L295.108 279.648C295.024 279.981 294.923 280.198 294.788 280.314C294.654 280.431 294.419 280.481 294.116 280.481H292.669ZM314.28 280.93C313.406 280.93 312.531 280.83 311.69 280.631C310.85 280.431 310.194 280.214 309.756 279.965C309.487 279.815 309.302 279.648 309.235 279.499C309.168 279.349 309.134 279.182 309.134 279.032V278.183C309.134 277.834 309.269 277.667 309.521 277.667C309.622 277.667 309.723 277.684 309.824 277.717C309.925 277.751 310.076 277.817 310.244 277.884C310.816 278.134 311.438 278.333 312.094 278.466C312.767 278.6 313.423 278.666 314.095 278.666C315.155 278.666 315.979 278.483 316.551 278.117C317.123 277.751 317.425 277.218 317.425 276.535C317.425 276.069 317.274 275.686 316.971 275.37C316.668 275.054 316.097 274.771 315.273 274.505L312.834 273.755C311.606 273.373 310.698 272.807 310.143 272.057C309.588 271.325 309.302 270.509 309.302 269.644C309.302 268.945 309.454 268.329 309.756 267.796C310.059 267.263 310.463 266.797 310.967 266.431C311.472 266.048 312.044 265.765 312.716 265.565C313.389 265.366 314.095 265.282 314.835 265.282C315.205 265.282 315.592 265.299 315.962 265.349C316.349 265.399 316.702 265.465 317.055 265.532C317.392 265.615 317.711 265.698 318.014 265.798C318.317 265.898 318.552 265.998 318.72 266.098C318.956 266.231 319.124 266.364 319.225 266.514C319.326 266.647 319.376 266.83 319.376 267.063V267.846C319.376 268.195 319.242 268.379 318.989 268.379C318.855 268.379 318.636 268.312 318.35 268.179C317.392 267.746 316.315 267.53 315.121 267.53C314.163 267.53 313.406 267.679 312.885 267.996C312.363 268.312 312.094 268.795 312.094 269.477C312.094 269.943 312.262 270.343 312.599 270.659C312.935 270.975 313.557 271.292 314.449 271.575L316.837 272.324C318.048 272.707 318.922 273.239 319.443 273.922C319.965 274.604 320.217 275.387 320.217 276.252C320.217 276.968 320.066 277.617 319.78 278.183C319.477 278.749 319.073 279.249 318.552 279.648C318.031 280.065 317.409 280.364 316.685 280.581C315.928 280.814 315.138 280.93 314.28 280.93Z" fill="#252F3E"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M317.459 289.02C311.926 293.066 303.887 295.213 296.975 295.213C287.288 295.213 278.559 291.667 271.967 285.774C271.445 285.308 271.916 284.676 272.538 285.042C279.669 289.137 288.465 291.617 297.563 291.617C303.702 291.617 310.446 290.352 316.652 287.755C317.577 287.339 318.367 288.355 317.459 289.02Z" fill="#FF9900"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M319.764 286.423C319.058 285.524 315.089 285.99 313.289 286.207C312.751 286.273 312.667 285.807 313.155 285.458C316.317 283.26 321.513 283.893 322.119 284.625C322.724 285.375 321.95 290.518 318.991 292.982C318.536 293.365 318.099 293.165 318.301 292.666C318.974 291.018 320.471 287.306 319.764 286.423Z" fill="#FF9900"/>
                    </g>
                </g>
                <g class="apps app8">
                    <rect x="389.81" y="242.376" width="141.374" height="75.7425" rx="11.3614" fill="#F2F4F5"/>
                    <path d="M466.584 272.198H467.907L471.68 268.61L471.865 267.086C464.843 261.192 454.127 261.829 447.929 268.506C446.207 270.359 444.959 272.567 444.276 274.956C444.695 274.792 445.162 274.765 445.599 274.881L453.145 273.697C453.145 273.697 453.528 273.092 453.728 273.13C457.084 269.624 462.733 269.215 466.61 272.198H466.584Z" fill="#EA4335"/>
                    <path d="M477.055 274.956C476.187 271.918 474.408 269.188 471.933 267.101L466.638 272.136C468.874 273.873 470.148 276.492 470.093 279.237V280.132C472.696 280.132 474.806 282.138 474.806 284.614C474.806 287.089 472.696 289.096 470.093 289.096H460.667L459.726 290.003V295.379L460.667 296.274H470.093C476.862 296.323 482.393 291.145 482.446 284.708C482.477 280.798 480.453 277.141 477.055 274.956Z" fill="#4285F4"/>
                    <path d="M451.228 296.217H460.655V289.041H451.228C450.556 289.041 449.894 288.902 449.282 288.637L447.958 289.029L444.16 292.616L443.829 293.875C445.957 295.406 448.558 296.229 451.228 296.217Z" fill="#34A853"/>
                    <path d="M451.228 272.941C444.456 272.978 439.003 278.229 439.042 284.668C439.066 288.263 440.83 291.648 443.828 293.838L449.295 288.64C446.924 287.622 445.869 284.965 446.939 282.711C448.01 280.456 450.803 279.453 453.174 280.471C454.219 280.919 455.055 281.717 455.53 282.711L460.996 277.513C458.672 274.619 455.055 272.926 451.228 272.941Z" fill="#FBBC05"/>
                </g>
                <path d="M56.7256 210.88C56.6721 210.428 56.4551 210.077 56.0745 209.827C55.6939 209.577 55.2271 209.453 54.6741 209.453C54.2697 209.453 53.9159 209.518 53.6126 209.649C53.3123 209.78 53.0775 209.959 52.908 210.188C52.7415 210.417 52.6582 210.678 52.6582 210.969C52.6582 211.213 52.7162 211.422 52.8322 211.598C52.9511 211.77 53.1027 211.914 53.2871 212.03C53.4714 212.143 53.6647 212.237 53.8669 212.311C54.069 212.383 54.2549 212.441 54.4243 212.485L55.352 212.735C55.5899 212.797 55.8545 212.884 56.1459 212.994C56.4402 213.104 56.7212 213.254 56.9888 213.444C57.2593 213.631 57.4823 213.872 57.6578 214.167C57.8332 214.461 57.9209 214.822 57.9209 215.25C57.9209 215.744 57.7916 216.19 57.5329 216.588C57.2772 216.987 56.9026 217.303 56.409 217.538C55.9184 217.773 55.3223 217.891 54.6206 217.891C53.9665 217.891 53.4001 217.785 52.9214 217.574C52.4456 217.363 52.071 217.069 51.7975 216.691C51.5269 216.313 51.3738 215.875 51.3381 215.375H52.4798C52.5096 215.72 52.6255 216.006 52.8277 216.232C53.0329 216.455 53.2915 216.621 53.6037 216.731C53.9189 216.838 54.2578 216.892 54.6206 216.892C55.0428 216.892 55.4219 216.823 55.7578 216.686C56.0938 216.547 56.3599 216.353 56.5562 216.107C56.7524 215.857 56.8505 215.566 56.8505 215.233C56.8505 214.929 56.7658 214.683 56.5963 214.492C56.4268 214.302 56.2038 214.147 55.9273 214.028C55.6508 213.909 55.352 213.805 55.0309 213.716L53.907 213.395C53.1934 213.19 52.6285 212.897 52.2122 212.516C51.796 212.136 51.5878 211.638 51.5878 211.022C51.5878 210.511 51.7261 210.065 52.0026 209.684C52.2821 209.301 52.6567 209.004 53.1265 208.792C53.5993 208.578 54.127 208.471 54.7098 208.471C55.2985 208.471 55.8218 208.577 56.2797 208.788C56.7375 208.996 57.1003 209.282 57.3679 209.644C57.6384 210.007 57.7811 210.419 57.796 210.88H56.7256ZM62.4689 217.873C61.8088 217.873 61.2394 217.727 60.7607 217.436C60.285 217.141 59.9178 216.731 59.6591 216.205C59.4034 215.676 59.2756 215.06 59.2756 214.358C59.2756 213.657 59.4034 213.038 59.6591 212.503C59.9178 211.965 60.2776 211.546 60.7384 211.245C61.2023 210.942 61.7434 210.791 62.3618 210.791C62.7186 210.791 63.0709 210.85 63.4188 210.969C63.7667 211.088 64.0833 211.281 64.3688 211.549C64.6542 211.813 64.8817 212.164 65.0511 212.601C65.2206 213.038 65.3054 213.576 65.3054 214.216V214.662H60.0248V213.752H64.235C64.235 213.365 64.1577 213.02 64.0031 212.717C63.8514 212.414 63.6344 212.175 63.3519 211.999C63.0724 211.824 62.7424 211.736 62.3618 211.736C61.9426 211.736 61.5799 211.84 61.2736 212.048C60.9703 212.253 60.7369 212.521 60.5734 212.851C60.4099 213.181 60.3281 213.535 60.3281 213.912V214.519C60.3281 215.036 60.4173 215.475 60.5957 215.835C60.7771 216.191 61.0283 216.463 61.3494 216.651C61.6705 216.835 62.0437 216.927 62.4689 216.927C62.7454 216.927 62.9951 216.889 63.2181 216.811C63.4441 216.731 63.6388 216.612 63.8024 216.455C63.9659 216.294 64.0923 216.095 64.1815 215.857L65.1983 216.142C65.0913 216.487 64.9114 216.791 64.6587 217.052C64.4059 217.311 64.0938 217.513 63.7221 217.659C63.3504 217.801 62.9327 217.873 62.4689 217.873ZM67.959 208.596V217.73H66.9065V208.596H67.959ZM72.7589 217.873C72.0989 217.873 71.5295 217.727 71.0508 217.436C70.5751 217.141 70.2079 216.731 69.9492 216.205C69.6935 215.676 69.5657 215.06 69.5657 214.358C69.5657 213.657 69.6935 213.038 69.9492 212.503C70.2079 211.965 70.5677 211.546 71.0285 211.245C71.4923 210.942 72.0335 210.791 72.6519 210.791C73.0087 210.791 73.361 210.85 73.7089 210.969C74.0568 211.088 74.3734 211.281 74.6589 211.549C74.9443 211.813 75.1717 212.164 75.3412 212.601C75.5107 213.038 75.5954 213.576 75.5954 214.216V214.662H70.3149V213.752H74.5251C74.5251 213.365 74.4478 213.02 74.2931 212.717C74.1415 212.414 73.9245 212.175 73.642 211.999C73.3625 211.824 73.0325 211.736 72.6519 211.736C72.2327 211.736 71.8699 211.84 71.5637 212.048C71.2604 212.253 71.027 212.521 70.8635 212.851C70.7 213.181 70.6182 213.535 70.6182 213.912V214.519C70.6182 215.036 70.7074 215.475 70.8858 215.835C71.0672 216.191 71.3184 216.463 71.6395 216.651C71.9606 216.835 72.3338 216.927 72.7589 216.927C73.0355 216.927 73.2852 216.889 73.5082 216.811C73.7342 216.731 73.9289 216.612 74.0925 216.455C74.256 216.294 74.3823 216.095 74.4715 215.857L75.4884 216.142C75.3814 216.487 75.2015 216.791 74.9488 217.052C74.696 217.311 74.3838 217.513 74.0122 217.659C73.6405 217.801 73.2228 217.873 72.7589 217.873ZM79.9795 217.873C79.3373 217.873 78.7843 217.721 78.3204 217.418C77.8566 217.115 77.4998 216.697 77.2501 216.165C77.0003 215.632 76.8754 215.024 76.8754 214.341C76.8754 213.645 77.0033 213.031 77.259 212.499C77.5176 211.963 77.8774 211.546 78.3383 211.245C78.8021 210.942 79.3432 210.791 79.9617 210.791C80.4433 210.791 80.8774 210.88 81.264 211.058C81.6505 211.237 81.9671 211.486 82.2139 211.807C82.4607 212.128 82.6138 212.503 82.6733 212.931H81.6207C81.5405 212.619 81.3621 212.343 81.0856 212.102C80.812 211.858 80.4433 211.736 79.9795 211.736C79.5692 211.736 79.2094 211.843 78.9002 212.057C78.594 212.268 78.3546 212.567 78.1822 212.954C78.0127 213.337 77.928 213.788 77.928 214.305C77.928 214.834 78.0112 215.295 78.1777 215.687C78.3472 216.08 78.585 216.385 78.8913 216.602C79.2005 216.819 79.5633 216.927 79.9795 216.927C80.253 216.927 80.5013 216.88 80.7243 216.785C80.9473 216.689 81.1361 216.553 81.2907 216.374C81.4453 216.196 81.5553 215.982 81.6207 215.732H82.6733C82.6138 216.136 82.4666 216.501 82.2318 216.825C81.9998 217.146 81.6921 217.402 81.3086 217.592C80.928 217.779 80.485 217.873 79.9795 217.873ZM87.1912 210.88V211.772H83.6411V210.88H87.1912ZM84.6758 209.238H85.7283V215.768C85.7283 216.065 85.7714 216.288 85.8576 216.437C85.9468 216.582 86.0598 216.681 86.1966 216.731C86.3363 216.779 86.4835 216.802 86.6381 216.802C86.7541 216.802 86.8492 216.796 86.9236 216.785C86.9979 216.77 87.0574 216.758 87.102 216.749L87.316 217.694C87.2447 217.721 87.1451 217.748 87.0172 217.775C86.8894 217.804 86.7273 217.819 86.5311 217.819C86.2338 217.819 85.9424 217.755 85.6569 217.628C85.3745 217.5 85.1396 217.305 84.9523 217.043C84.7679 216.782 84.6758 216.452 84.6758 216.053V209.238ZM91.6644 208.596H92.931L95.4642 212.86H95.5713L98.1045 208.596H99.3711L96.0708 213.966V217.73H94.9647V213.966L91.6644 208.596ZM102.473 217.873C101.855 217.873 101.312 217.726 100.845 217.431C100.381 217.137 100.019 216.725 99.7569 216.196C99.4982 215.667 99.3689 215.048 99.3689 214.341C99.3689 213.627 99.4982 213.004 99.7569 212.472C100.019 211.94 100.381 211.526 100.845 211.232C101.312 210.938 101.855 210.791 102.473 210.791C103.091 210.791 103.633 210.938 104.096 211.232C104.563 211.526 104.926 211.94 105.185 212.472C105.446 213.004 105.577 213.627 105.577 214.341C105.577 215.048 105.446 215.667 105.185 216.196C104.926 216.725 104.563 217.137 104.096 217.431C103.633 217.726 103.091 217.873 102.473 217.873ZM102.473 216.927C102.943 216.927 103.329 216.807 103.633 216.566C103.936 216.325 104.16 216.009 104.306 215.616C104.452 215.224 104.525 214.798 104.525 214.341C104.525 213.883 104.452 213.456 104.306 213.061C104.16 212.665 103.936 212.346 103.633 212.102C103.329 211.858 102.943 211.736 102.473 211.736C102.003 211.736 101.617 211.858 101.313 212.102C101.01 212.346 100.786 212.665 100.64 213.061C100.494 213.456 100.421 213.883 100.421 214.341C100.421 214.798 100.494 215.224 100.64 215.616C100.786 216.009 101.01 216.325 101.313 216.566C101.617 216.807 102.003 216.927 102.473 216.927ZM111.501 214.929V210.88H112.553V217.73H111.501V216.571H111.43C111.269 216.918 111.019 217.214 110.68 217.458C110.341 217.699 109.913 217.819 109.396 217.819C108.968 217.819 108.587 217.726 108.254 217.538C107.921 217.348 107.659 217.063 107.469 216.682C107.279 216.298 107.184 215.815 107.184 215.233V210.88H108.236V215.161C108.236 215.661 108.376 216.059 108.655 216.356C108.938 216.654 109.298 216.802 109.735 216.802C109.996 216.802 110.263 216.736 110.533 216.602C110.807 216.468 111.036 216.263 111.22 215.986C111.407 215.71 111.501 215.357 111.501 214.929ZM114.481 217.73V210.88H115.498V211.914H115.569C115.694 211.575 115.92 211.3 116.247 211.089C116.574 210.878 116.943 210.773 117.353 210.773C117.431 210.773 117.527 210.774 117.643 210.777C117.759 210.78 117.847 210.785 117.906 210.791V211.861C117.871 211.852 117.789 211.839 117.661 211.821C117.536 211.8 117.404 211.79 117.264 211.79C116.931 211.79 116.634 211.859 116.372 211.999C116.114 212.136 115.908 212.326 115.757 212.57C115.608 212.811 115.534 213.086 115.534 213.395V217.73H114.481ZM127.824 210.88C127.771 210.428 127.554 210.077 127.173 209.827C126.792 209.577 126.326 209.453 125.773 209.453C125.368 209.453 125.014 209.518 124.711 209.649C124.411 209.78 124.176 209.959 124.006 210.188C123.84 210.417 123.757 210.678 123.757 210.969C123.757 211.213 123.815 211.422 123.931 211.598C124.05 211.77 124.201 211.914 124.386 212.03C124.57 212.143 124.763 212.237 124.965 212.311C125.167 212.383 125.353 212.441 125.523 212.485L126.45 212.735C126.688 212.797 126.953 212.884 127.244 212.994C127.539 213.104 127.82 213.254 128.087 213.444C128.358 213.631 128.581 213.872 128.756 214.167C128.932 214.461 129.019 214.822 129.019 215.25C129.019 215.744 128.89 216.19 128.631 216.588C128.376 216.987 128.001 217.303 127.507 217.538C127.017 217.773 126.421 217.891 125.719 217.891C125.065 217.891 124.498 217.785 124.02 217.574C123.544 217.363 123.169 217.069 122.896 216.691C122.625 216.313 122.472 215.875 122.437 215.375H123.578C123.608 215.72 123.724 216.006 123.926 216.232C124.131 216.455 124.39 216.621 124.702 216.731C125.017 216.838 125.356 216.892 125.719 216.892C126.141 216.892 126.52 216.823 126.856 216.686C127.192 216.547 127.458 216.353 127.655 216.107C127.851 215.857 127.949 215.566 127.949 215.233C127.949 214.929 127.864 214.683 127.695 214.492C127.525 214.302 127.302 214.147 127.026 214.028C126.749 213.909 126.45 213.805 126.129 213.716L125.005 213.395C124.292 213.19 123.727 212.897 123.311 212.516C122.894 212.136 122.686 211.638 122.686 211.022C122.686 210.511 122.825 210.065 123.101 209.684C123.381 209.301 123.755 209.004 124.225 208.792C124.698 208.578 125.225 208.471 125.808 208.471C126.397 208.471 126.92 208.577 127.378 208.788C127.836 208.996 128.199 209.282 128.466 209.644C128.737 210.007 128.88 210.419 128.894 210.88H127.824ZM133.567 217.873C132.907 217.873 132.338 217.727 131.859 217.436C131.383 217.141 131.016 216.731 130.758 216.205C130.502 215.676 130.374 215.06 130.374 214.358C130.374 213.657 130.502 213.038 130.758 212.503C131.016 211.965 131.376 211.546 131.837 211.245C132.301 210.942 132.842 210.791 133.46 210.791C133.817 210.791 134.169 210.85 134.517 210.969C134.865 211.088 135.182 211.281 135.467 211.549C135.753 211.813 135.98 212.164 136.15 212.601C136.319 213.038 136.404 213.576 136.404 214.216V214.662H131.123V213.752H135.333C135.333 213.365 135.256 213.02 135.102 212.717C134.95 212.414 134.733 212.175 134.45 211.999C134.171 211.824 133.841 211.736 133.46 211.736C133.041 211.736 132.678 211.84 132.372 212.048C132.069 212.253 131.835 212.521 131.672 212.851C131.508 213.181 131.427 213.535 131.427 213.912V214.519C131.427 215.036 131.516 215.475 131.694 215.835C131.876 216.191 132.127 216.463 132.448 216.651C132.769 216.835 133.142 216.927 133.567 216.927C133.844 216.927 134.094 216.889 134.317 216.811C134.543 216.731 134.737 216.612 134.901 216.455C135.064 216.294 135.191 216.095 135.28 215.857L136.297 216.142C136.19 216.487 136.01 216.791 135.757 217.052C135.504 217.311 135.192 217.513 134.821 217.659C134.449 217.801 134.031 217.873 133.567 217.873ZM138.005 217.73V210.88H139.022V211.914H139.093C139.218 211.575 139.444 211.3 139.771 211.089C140.098 210.878 140.467 210.773 140.877 210.773C140.954 210.773 141.051 210.774 141.167 210.777C141.283 210.78 141.371 210.785 141.43 210.791V211.861C141.394 211.852 141.313 211.839 141.185 211.821C141.06 211.8 140.928 211.79 140.788 211.79C140.455 211.79 140.158 211.859 139.896 211.999C139.637 212.136 139.432 212.326 139.28 212.57C139.132 212.811 139.057 213.086 139.057 213.395V217.73H138.005ZM148.488 210.88L145.955 217.73H144.884L142.351 210.88H143.493L145.384 216.339H145.455L147.346 210.88H148.488ZM152.504 217.873C151.844 217.873 151.275 217.727 150.796 217.436C150.32 217.141 149.953 216.731 149.694 216.205C149.439 215.676 149.311 215.06 149.311 214.358C149.311 213.657 149.439 213.038 149.694 212.503C149.953 211.965 150.313 211.546 150.774 211.245C151.237 210.942 151.779 210.791 152.397 210.791C152.754 210.791 153.106 210.85 153.454 210.969C153.802 211.088 154.118 211.281 154.404 211.549C154.689 211.813 154.917 212.164 155.086 212.601C155.256 213.038 155.34 213.576 155.34 214.216V214.662H150.06V213.752H154.27C154.27 213.365 154.193 213.02 154.038 212.717C153.887 212.414 153.67 212.175 153.387 211.999C153.108 211.824 152.778 211.736 152.397 211.736C151.978 211.736 151.615 211.84 151.309 212.048C151.005 212.253 150.772 212.521 150.609 212.851C150.445 213.181 150.363 213.535 150.363 213.912V214.519C150.363 215.036 150.452 215.475 150.631 215.835C150.812 216.191 151.063 216.463 151.385 216.651C151.706 216.835 152.079 216.927 152.504 216.927C152.781 216.927 153.03 216.889 153.253 216.811C153.479 216.731 153.674 216.612 153.838 216.455C154.001 216.294 154.127 216.095 154.217 215.857L155.233 216.142C155.126 216.487 154.947 216.791 154.694 217.052C154.441 217.311 154.129 217.513 153.757 217.659C153.386 217.801 152.968 217.873 152.504 217.873ZM156.942 217.73V210.88H157.958V211.914H158.03C158.155 211.575 158.381 211.3 158.708 211.089C159.035 210.878 159.403 210.773 159.814 210.773C159.891 210.773 159.988 210.774 160.104 210.777C160.22 210.78 160.307 210.785 160.367 210.791V211.861C160.331 211.852 160.249 211.839 160.122 211.821C159.997 211.8 159.864 211.79 159.725 211.79C159.392 211.79 159.094 211.859 158.833 211.999C158.574 212.136 158.369 212.326 158.217 212.57C158.068 212.811 157.994 213.086 157.994 213.395V217.73H156.942Z" fill="#5A6880"/>
                <g filter="url(#filter3_d_935_1561)">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M55.5957 76.4919H538.454C540.965 76.4919 543.373 77.4889 545.149 79.2634C546.925 81.0379 547.922 83.4446 547.922 85.9542V168.276C547.922 170.785 546.925 173.192 545.149 174.966C543.373 176.741 540.965 177.738 538.454 177.738H55.5957C53.0847 177.738 50.6766 176.741 48.901 174.966C47.1255 173.192 46.1279 170.785 46.1279 168.276V85.9542C46.1279 83.4446 47.1255 81.0379 48.901 79.2634C50.6766 77.4889 53.0847 76.4919 55.5957 76.4919Z" fill="white"/>
                </g>
                <g class="apps app1">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M73.585 89.7489H136.689C139.2 89.7489 141.608 90.7457 143.384 92.5202C145.159 94.2947 146.157 96.7016 146.157 99.2111V154.452C146.157 156.961 145.159 159.368 143.384 161.142C141.608 162.917 139.2 163.914 136.689 163.914H73.585C71.074 163.914 68.6658 162.917 66.8902 161.142C65.1147 159.368 64.1172 156.961 64.1172 154.452V99.2111C64.1172 96.7016 65.1147 94.2947 66.8902 92.5202C68.6658 90.7457 71.074 89.7489 73.585 89.7489Z" fill="#F2F4F5"/>
                    <path d="M86.1846 126.898C86.1846 134.372 90.5306 140.831 96.8326 143.892L87.8203 119.214C86.772 121.562 86.1846 124.161 86.1846 126.898Z" fill="#464342"/>
                    <path d="M117.833 125.945C117.833 123.612 116.994 121.996 116.274 120.738C115.317 119.182 114.419 117.865 114.419 116.31C114.419 114.574 115.736 112.959 117.592 112.959C117.675 112.959 117.755 112.969 117.836 112.974C114.475 109.896 109.997 108.017 105.078 108.017C98.4777 108.017 92.6707 111.401 89.2925 116.528C89.7357 116.541 90.1535 116.55 90.5083 116.55C92.4845 116.55 95.5435 116.311 95.5435 116.311C96.5619 116.251 96.682 117.746 95.6646 117.866C95.6646 117.866 94.6411 117.986 93.5022 118.046L100.382 138.499L104.517 126.106L101.573 118.045C100.556 117.986 99.5922 117.865 99.5922 117.865C98.5741 117.806 98.6934 116.25 99.7115 116.31C99.7115 116.31 102.832 116.55 104.688 116.55C106.664 116.55 109.723 116.31 109.723 116.31C110.742 116.25 110.862 117.745 109.844 117.865C109.844 117.865 108.819 117.986 107.682 118.045L114.51 138.343L116.394 132.049C117.211 129.438 117.833 127.562 117.833 125.945Z" fill="#464342"/>
                    <path d="M105.409 128.55L99.7402 145.012C101.433 145.509 103.223 145.781 105.077 145.781C107.278 145.781 109.387 145.401 111.351 144.711C111.301 144.63 111.255 144.544 111.217 144.451L105.409 128.55Z" fill="#464342"/>
                    <path d="M121.655 117.839C121.736 118.441 121.782 119.086 121.782 119.781C121.782 121.697 121.424 123.851 120.345 126.544L114.574 143.22C120.191 139.946 123.969 133.865 123.969 126.899C123.969 123.616 123.13 120.529 121.655 117.839Z" fill="#464342"/>
                    <path d="M105.077 104.889C92.9339 104.889 83.0537 114.762 83.0537 126.899C83.0537 139.037 92.9339 148.91 105.077 148.91C117.221 148.91 127.102 139.037 127.102 126.899C127.102 114.762 117.221 104.889 105.077 104.889ZM105.077 147.901C93.4907 147.901 84.0635 138.479 84.0635 126.899C84.0635 115.319 93.4904 105.898 105.077 105.898C116.664 105.898 126.09 115.319 126.09 126.899C126.09 138.479 116.664 147.901 105.077 147.901Z" fill="#464342"/>
                </g>
                <g class="apps app2">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M168.262 89.7489H231.365C233.876 89.7489 236.284 90.7457 238.059 92.5202C239.835 94.2947 240.833 96.7016 240.833 99.2111V154.452C240.833 156.961 239.835 159.368 238.059 161.142C236.284 162.917 233.876 163.914 231.365 163.914H168.262C165.751 163.914 163.343 162.917 161.567 161.142C159.791 159.368 158.794 156.961 158.794 154.452V99.2111C158.794 96.7016 159.791 94.2947 161.567 92.5202C163.343 90.7457 165.751 89.7489 168.262 89.7489Z" fill="#F2F4F5"/>
                    <path d="M199.962 105.835L218.442 116.337V137.315L213.167 140.317L213.204 119.335L199.999 111.831L186.794 119.335V140.308L181.518 137.315V116.319L199.962 105.835Z" fill="#F26322"/>
                    <path d="M197.455 140.534L199.974 142.072L202.507 140.549V119.144L207.545 122.201L207.537 143.596L199.979 148.182L192.412 143.596V122.201L197.455 119.144V140.534Z" fill="#F26322"/>
                </g>
                <g class="apps app3">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M264.835 89.8918H327.907C330.418 89.8918 332.826 90.8886 334.602 92.6631C336.377 94.4376 337.375 96.8445 337.375 99.354V154.595C337.375 157.104 336.377 159.511 334.602 161.285C332.826 163.06 330.418 164.057 327.907 164.057H264.835C262.324 164.057 259.916 163.06 258.14 161.285C256.365 159.511 255.367 157.104 255.367 154.595V99.354C255.367 96.8445 256.365 94.4376 258.14 92.6631C259.916 90.8886 262.324 89.8918 264.835 89.8918Z" fill="#F2F4F5"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M313.795 114.493H278.344C276.101 114.493 274.285 116.301 274.302 118.494V131.829C274.302 134.04 276.119 135.83 278.362 135.83H295.152L302.827 140.041L301.082 135.83H313.795C316.038 135.83 317.854 134.04 317.854 131.829V118.494C317.854 116.283 316.038 114.493 313.795 114.493ZM277.596 117.581C277.098 117.617 276.724 117.792 276.475 118.125C276.225 118.441 276.136 118.845 276.19 119.301C277.24 125.881 278.22 130.32 279.128 132.619C279.484 133.461 279.893 133.865 280.374 133.83C281.122 133.777 282.012 132.759 283.063 130.777C283.615 129.654 284.469 127.969 285.627 125.723C286.588 129.039 287.906 131.531 289.562 133.198C290.025 133.672 290.505 133.882 290.968 133.847C291.378 133.812 291.698 133.602 291.912 133.216C292.09 132.882 292.161 132.496 292.126 132.057C292.019 130.461 292.179 128.232 292.624 125.372C293.087 122.424 293.657 120.301 294.351 119.038C294.494 118.775 294.547 118.511 294.529 118.196C294.494 117.792 294.316 117.459 293.977 117.195C293.639 116.932 293.265 116.809 292.856 116.844C292.339 116.88 291.948 117.125 291.68 117.617C290.577 119.599 289.793 122.81 289.33 127.267C288.654 125.583 288.084 123.6 287.639 121.266C287.443 120.231 286.962 119.74 286.179 119.792C285.644 119.827 285.199 120.178 284.843 120.845L280.944 128.162C280.303 125.618 279.697 122.512 279.146 118.845C279.021 117.932 278.505 117.511 277.596 117.581ZM311.907 118.845C313.172 119.108 314.115 119.775 314.756 120.88C315.326 121.828 315.611 122.968 315.611 124.337C315.611 126.144 315.148 127.794 314.222 129.303C313.154 131.057 311.765 131.935 310.038 131.935C309.735 131.935 309.415 131.9 309.076 131.829C307.812 131.566 306.868 130.9 306.227 129.794C305.658 128.829 305.373 127.671 305.373 126.32C305.373 124.512 305.836 122.863 306.762 121.372C307.848 119.617 309.237 118.74 310.946 118.74C311.249 118.74 311.569 118.775 311.907 118.845ZM311.16 128.338C311.818 127.759 312.263 126.899 312.513 125.741C312.584 125.337 312.637 124.898 312.637 124.442C312.637 123.933 312.53 123.389 312.317 122.845C312.05 122.161 311.694 121.793 311.266 121.705C310.625 121.582 310.002 121.933 309.415 122.793C308.934 123.46 308.631 124.161 308.471 124.881C308.382 125.285 308.346 125.723 308.346 126.162C308.346 126.671 308.453 127.215 308.667 127.759C308.934 128.443 309.29 128.811 309.717 128.899C310.162 128.987 310.643 128.794 311.16 128.338ZM303.592 120.88C302.951 119.775 301.99 119.108 300.743 118.845C300.405 118.775 300.085 118.74 299.782 118.74C298.073 118.74 296.684 119.617 295.598 121.372C294.672 122.863 294.209 124.512 294.209 126.32C294.209 127.671 294.494 128.829 295.063 129.794C295.704 130.9 296.648 131.566 297.912 131.829C298.251 131.9 298.571 131.935 298.874 131.935C300.601 131.935 301.99 131.057 303.058 129.303C303.984 127.794 304.447 126.144 304.447 124.337C304.447 122.968 304.162 121.828 303.592 120.88ZM301.349 125.741C301.099 126.899 300.654 127.759 299.995 128.338C299.479 128.794 298.998 128.987 298.553 128.899C298.126 128.811 297.77 128.443 297.503 127.759C297.289 127.215 297.182 126.671 297.182 126.162C297.182 125.723 297.218 125.285 297.307 124.881C297.467 124.161 297.77 123.46 298.251 122.793C298.838 121.933 299.461 121.582 300.102 121.705C300.53 121.793 300.886 122.161 301.153 122.845C301.367 123.389 301.473 123.933 301.473 124.442C301.473 124.898 301.438 125.337 301.349 125.741Z" fill="#7F54B3"/>
                </g>
                <g class="apps app4">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M361.406 89.8917H424.475C425.719 89.8906 426.95 90.1346 428.1 90.6097C429.249 91.0848 430.293 91.7818 431.172 92.6606C432.052 93.5395 432.749 94.5831 433.225 95.7316C433.7 96.8801 433.944 98.111 433.943 99.354V154.594C433.944 155.837 433.7 157.068 433.225 158.217C432.749 159.365 432.052 160.409 431.172 161.288C430.293 162.167 429.249 162.864 428.1 163.339C426.95 163.814 425.719 164.058 424.475 164.057H361.406C358.895 164.057 356.487 163.06 354.712 161.285C352.936 159.511 351.938 157.104 351.938 154.594V99.354C351.938 96.8444 352.936 94.4376 354.712 92.6631C356.487 90.8885 358.895 89.8917 361.406 89.8917Z" fill="#F2F4F5"/>
                    <g clip-path="url(#clip2_935_1561)">
                    <path d="M373.515 120.773H380.239C382.213 120.79 383.643 121.359 384.529 122.479C385.416 123.6 385.709 125.13 385.408 127.071C385.291 127.957 385.031 128.827 384.63 129.68C384.245 130.533 383.71 131.302 383.024 131.988C382.188 132.858 381.293 133.41 380.339 133.644C379.386 133.879 378.399 133.996 377.379 133.996H374.368L373.415 138.763H369.927L373.515 120.773ZM376.451 123.633L374.945 131.16C375.046 131.177 375.146 131.185 375.246 131.185C375.363 131.185 375.481 131.185 375.598 131.185C377.203 131.202 378.542 131.043 379.612 130.709C380.682 130.358 381.402 129.137 381.77 127.046C382.071 125.289 381.77 124.277 380.866 124.01C379.98 123.742 378.868 123.617 377.529 123.633C377.329 123.65 377.137 123.659 376.952 123.659C376.785 123.659 376.61 123.659 376.425 123.659L376.451 123.633Z" fill="#5D5BC1"/>
                    <path d="M389.38 115.981H392.842L391.863 120.773H394.975C396.681 120.807 397.952 121.158 398.788 121.827C399.641 122.496 399.892 123.768 399.541 125.641L397.86 133.996H394.347L395.953 126.017C396.12 125.181 396.07 124.587 395.802 124.236C395.535 123.885 394.958 123.709 394.071 123.709L391.286 123.684L389.229 133.996H385.767L389.38 115.981Z" fill="#5D5BC1"/>
                    <path d="M403.258 120.773H409.982C411.956 120.79 413.386 121.359 414.273 122.479C415.159 123.6 415.452 125.13 415.151 127.071C415.034 127.957 414.774 128.827 414.373 129.68C413.988 130.533 413.453 131.302 412.767 131.988C411.931 132.858 411.036 133.41 410.083 133.644C409.129 133.879 408.142 133.996 407.122 133.996H404.111L403.158 138.763H399.67L403.258 120.773ZM406.194 123.633L404.688 131.16C404.789 131.177 404.889 131.185 404.989 131.185C405.106 131.185 405.224 131.185 405.341 131.185C406.946 131.202 408.285 131.043 409.355 130.709C410.425 130.358 411.145 129.137 411.513 127.046C411.814 125.289 411.513 124.277 410.61 124.01C409.723 123.742 408.611 123.617 407.273 123.633C407.072 123.65 406.88 123.659 406.696 123.659C406.528 123.659 406.353 123.659 406.169 123.659L406.194 123.633Z" fill="#5D5BC1"/>
                    </g>
                </g>
                <g class="apps app5">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M457.977 89.8918H521.051C523.562 89.8918 525.97 90.8886 527.746 92.6631C529.521 94.4376 530.519 96.8445 530.519 99.354V154.595C530.519 157.104 529.521 159.511 527.746 161.285C525.97 163.06 523.562 164.057 521.051 164.057H457.977C455.466 164.057 453.057 163.06 451.282 161.285C449.506 159.511 448.509 157.104 448.509 154.595V99.354C448.509 96.8445 449.506 94.4376 451.282 92.6631C453.057 90.8886 455.466 89.8918 457.977 89.8918Z" fill="#F2F4F5"/>
                    <g clip-path="url(#clip3_935_1561)">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M506.021 117.407C506.032 117.452 506.038 117.498 506.039 117.544V124.736C506.039 124.828 506.015 124.919 505.969 124.999C505.924 125.079 505.858 125.145 505.78 125.191L499.851 128.666V135.554C499.851 135.742 499.753 135.915 499.593 136.009L487.217 143.263C487.189 143.279 487.158 143.29 487.127 143.301C487.116 143.305 487.105 143.312 487.093 143.315C487.006 143.338 486.915 143.338 486.829 143.315C486.814 143.311 486.802 143.303 486.788 143.298C486.76 143.288 486.73 143.278 486.703 143.263L474.33 136.009C474.251 135.963 474.186 135.897 474.14 135.817C474.095 135.737 474.071 135.647 474.071 135.554V113.979C474.071 113.932 474.077 113.886 474.089 113.841C474.093 113.826 474.102 113.813 474.107 113.798C474.117 113.77 474.126 113.742 474.14 113.716C474.149 113.699 474.164 113.685 474.175 113.67C474.19 113.649 474.203 113.627 474.221 113.609C474.236 113.594 474.255 113.583 474.272 113.569C474.29 113.554 474.307 113.537 474.328 113.524L480.516 109.898C480.594 109.852 480.683 109.828 480.774 109.828C480.864 109.828 480.953 109.852 481.031 109.898L487.218 113.524H487.219C487.24 113.537 487.257 113.554 487.276 113.569C487.293 113.582 487.311 113.594 487.326 113.608C487.344 113.627 487.357 113.649 487.373 113.67C487.384 113.685 487.398 113.699 487.407 113.716C487.422 113.743 487.431 113.77 487.441 113.798C487.446 113.813 487.455 113.826 487.459 113.842C487.471 113.887 487.477 113.933 487.477 113.979V127.455L492.633 124.432V117.544C492.633 117.498 492.639 117.451 492.651 117.407C492.655 117.391 492.663 117.378 492.669 117.363C492.679 117.335 492.688 117.307 492.702 117.281C492.712 117.264 492.726 117.251 492.737 117.235C492.752 117.214 492.765 117.192 492.783 117.174C492.798 117.159 492.817 117.148 492.833 117.135C492.853 117.119 492.869 117.102 492.89 117.089L499.078 113.463C499.157 113.417 499.245 113.392 499.336 113.392C499.426 113.392 499.515 113.417 499.593 113.463L505.78 117.089C505.802 117.102 505.819 117.119 505.838 117.134C505.854 117.147 505.873 117.159 505.888 117.173C505.906 117.192 505.919 117.214 505.934 117.235C505.946 117.251 505.96 117.264 505.969 117.281C505.984 117.307 505.992 117.335 506.003 117.363C506.008 117.378 506.017 117.391 506.021 117.407ZM505.007 124.432V118.452L502.842 119.721L499.851 121.474V127.455L505.008 124.432H505.007ZM498.82 135.251V129.267L495.878 130.977L487.476 135.859V141.9L498.82 135.251ZM475.102 114.887V135.251L486.445 141.899V135.86L480.519 132.446L480.517 132.444L480.515 132.443C480.495 132.431 480.478 132.414 480.459 132.4C480.443 132.387 480.425 132.376 480.41 132.362L480.409 132.36C480.392 132.343 480.381 132.323 480.367 132.305C480.354 132.287 480.338 132.272 480.328 132.253L480.327 132.252C480.316 132.232 480.309 132.208 480.3 132.186C480.292 132.166 480.281 132.148 480.276 132.127C480.269 132.102 480.268 132.075 480.266 132.05C480.263 132.03 480.258 132.01 480.258 131.991V131.989V117.909L477.267 116.155L475.102 114.887ZM480.774 110.958L475.619 113.979L480.773 117L485.927 113.978L480.773 110.958H480.774ZM483.455 129.812L486.445 128.059V114.887L484.28 116.156L481.289 117.909V131.082L483.455 129.812ZM499.336 114.523L494.182 117.544L499.336 120.565L504.49 117.544L499.336 114.523ZM498.82 121.474L495.829 119.721L493.664 118.452V124.432L496.654 126.185L498.82 127.455V121.474ZM486.96 134.951L494.52 130.557L498.299 128.361L493.149 125.342L487.219 128.818L481.814 131.986L486.96 134.951Z" fill="#FF2D20"/>
                    </g>
                </g>
                <path d="M56.7256 58.138C56.6721 57.6861 56.4551 57.3353 56.0745 57.0855C55.6939 56.8358 55.2271 56.7109 54.6741 56.7109C54.2697 56.7109 53.9159 56.7763 53.6126 56.9071C53.3123 57.0379 53.0775 57.2178 52.908 57.4468C52.7415 57.6757 52.6582 57.9359 52.6582 58.2272C52.6582 58.471 52.7162 58.6807 52.8322 58.8561C52.9511 59.0285 53.1027 59.1727 53.2871 59.2887C53.4714 59.4017 53.6647 59.4953 53.8669 59.5697C54.069 59.641 54.2549 59.699 54.4243 59.7436L55.352 59.9934C55.5899 60.0558 55.8545 60.142 56.1459 60.252C56.4402 60.362 56.7212 60.5122 56.9888 60.7025C57.2593 60.8898 57.4823 61.1306 57.6578 61.425C57.8332 61.7193 57.9209 62.0806 57.9209 62.5087C57.9209 63.0023 57.7916 63.4483 57.5329 63.8467C57.2772 64.2451 56.9026 64.5618 56.409 64.7967C55.9184 65.0315 55.3223 65.149 54.6206 65.149C53.9665 65.149 53.4001 65.0434 52.9214 64.8323C52.4456 64.6212 52.071 64.3269 51.7975 63.9493C51.5269 63.5717 51.3738 63.1331 51.3381 62.6336H52.4798C52.5096 62.9785 52.6255 63.2639 52.8277 63.4899C53.0329 63.7129 53.2915 63.8794 53.6037 63.9894C53.9189 64.0965 54.2578 64.15 54.6206 64.15C55.0428 64.15 55.4219 64.0816 55.7578 63.9448C56.0938 63.8051 56.3599 63.6118 56.5562 63.365C56.7524 63.1153 56.8505 62.8239 56.8505 62.4909C56.8505 62.1876 56.7658 61.9408 56.5963 61.7506C56.4268 61.5603 56.2038 61.4057 55.9273 61.2867C55.6508 61.1678 55.352 61.0637 55.0309 60.9745L53.907 60.6534C53.1934 60.4483 52.6285 60.1554 52.2122 59.7748C51.796 59.3942 51.5878 58.8962 51.5878 58.2808C51.5878 57.7694 51.7261 57.3234 52.0026 56.9428C52.2821 56.5592 52.6567 56.2619 53.1265 56.0508C53.5993 55.8367 54.127 55.7297 54.7098 55.7297C55.2985 55.7297 55.8218 55.8353 56.2797 56.0464C56.7375 56.2545 57.1003 56.5399 57.3679 56.9027C57.6384 57.2654 57.7811 57.6772 57.796 58.138H56.7256ZM62.4689 65.1312C61.8088 65.1312 61.2394 64.9855 60.7607 64.6941C60.285 64.3997 59.9178 63.9894 59.6591 63.4632C59.4034 62.9339 59.2756 62.3184 59.2756 61.6168C59.2756 60.9151 59.4034 60.2966 59.6591 59.7614C59.9178 59.2233 60.2776 58.8041 60.7384 58.5038C61.2023 58.2005 61.7434 58.0488 62.3618 58.0488C62.7186 58.0488 63.0709 58.1083 63.4188 58.2272C63.7667 58.3462 64.0833 58.5394 64.3688 58.807C64.6542 59.0716 64.8817 59.4225 65.0511 59.8596C65.2206 60.2966 65.3054 60.8348 65.3054 61.474V61.92H60.0248V61.0102H64.235C64.235 60.6237 64.1577 60.2788 64.0031 59.9755C63.8514 59.6722 63.6344 59.4329 63.3519 59.2575C63.0724 59.0821 62.7424 58.9943 62.3618 58.9943C61.9426 58.9943 61.5799 59.0984 61.2736 59.3065C60.9703 59.5117 60.7369 59.7793 60.5734 60.1093C60.4099 60.4393 60.3281 60.7932 60.3281 61.1708V61.7773C60.3281 62.2947 60.4173 62.7332 60.5957 63.093C60.7771 63.4498 61.0283 63.7218 61.3494 63.9091C61.6705 64.0935 62.0437 64.1857 62.4689 64.1857C62.7454 64.1857 62.9951 64.147 63.2181 64.0697C63.4441 63.9894 63.6388 63.8705 63.8024 63.7129C63.9659 63.5523 64.0923 63.3531 64.1815 63.1153L65.1983 63.4007C65.0913 63.7456 64.9114 64.0489 64.6587 64.3105C64.4059 64.5692 64.0938 64.7714 63.7221 64.9171C63.3504 65.0598 62.9327 65.1312 62.4689 65.1312ZM67.959 55.8546V64.9884H66.9065V55.8546H67.959ZM72.7589 65.1312C72.0989 65.1312 71.5295 64.9855 71.0508 64.6941C70.5751 64.3997 70.2079 63.9894 69.9492 63.4632C69.6935 62.9339 69.5657 62.3184 69.5657 61.6168C69.5657 60.9151 69.6935 60.2966 69.9492 59.7614C70.2079 59.2233 70.5677 58.8041 71.0285 58.5038C71.4923 58.2005 72.0335 58.0488 72.6519 58.0488C73.0087 58.0488 73.361 58.1083 73.7089 58.2272C74.0568 58.3462 74.3734 58.5394 74.6589 58.807C74.9443 59.0716 75.1717 59.4225 75.3412 59.8596C75.5107 60.2966 75.5954 60.8348 75.5954 61.474V61.92H70.3149V61.0102H74.5251C74.5251 60.6237 74.4478 60.2788 74.2931 59.9755C74.1415 59.6722 73.9245 59.4329 73.642 59.2575C73.3625 59.0821 73.0325 58.9943 72.6519 58.9943C72.2327 58.9943 71.8699 59.0984 71.5637 59.3065C71.2604 59.5117 71.027 59.7793 70.8635 60.1093C70.7 60.4393 70.6182 60.7932 70.6182 61.1708V61.7773C70.6182 62.2947 70.7074 62.7332 70.8858 63.093C71.0672 63.4498 71.3184 63.7218 71.6395 63.9091C71.9606 64.0935 72.3338 64.1857 72.7589 64.1857C73.0355 64.1857 73.2852 64.147 73.5082 64.0697C73.7342 63.9894 73.9289 63.8705 74.0925 63.7129C74.256 63.5523 74.3823 63.3531 74.4715 63.1153L75.4884 63.4007C75.3814 63.7456 75.2015 64.0489 74.9488 64.3105C74.696 64.5692 74.3838 64.7714 74.0122 64.9171C73.6405 65.0598 73.2228 65.1312 72.7589 65.1312ZM79.9795 65.1312C79.3373 65.1312 78.7843 64.9795 78.3204 64.6762C77.8566 64.373 77.4998 63.9552 77.2501 63.423C77.0003 62.8908 76.8754 62.2828 76.8754 61.5989C76.8754 60.9032 77.0033 60.2892 77.259 59.757C77.5176 59.2218 77.8774 58.8041 78.3383 58.5038C78.8021 58.2005 79.3432 58.0488 79.9617 58.0488C80.4433 58.0488 80.8774 58.138 81.264 58.3164C81.6505 58.4948 81.9671 58.7446 82.2139 59.0657C82.4607 59.3868 82.6138 59.7614 82.6733 60.1896H81.6207C81.5405 59.8774 81.3621 59.6009 81.0856 59.3601C80.812 59.1162 80.4433 58.9943 79.9795 58.9943C79.5692 58.9943 79.2094 59.1014 78.9002 59.3155C78.594 59.5266 78.3546 59.8254 78.1822 60.2119C78.0127 60.5954 77.928 61.0459 77.928 61.5632C77.928 62.0925 78.0112 62.5533 78.1777 62.9458C78.3472 63.3383 78.585 63.643 78.8913 63.8601C79.2005 64.0771 79.5633 64.1857 79.9795 64.1857C80.253 64.1857 80.5013 64.1381 80.7243 64.0429C80.9473 63.9478 81.1361 63.811 81.2907 63.6326C81.4453 63.4542 81.5553 63.2402 81.6207 62.9904H82.6733C82.6138 63.3948 82.4666 63.759 82.2318 64.0831C81.9998 64.4042 81.6921 64.6599 81.3086 64.8502C80.928 65.0375 80.485 65.1312 79.9795 65.1312ZM87.1912 58.138V59.03H83.6411V58.138H87.1912ZM84.6758 56.4968H85.7283V63.0261C85.7283 63.3234 85.7714 63.5464 85.8576 63.6951C85.9468 63.8408 86.0598 63.9389 86.1966 63.9894C86.3363 64.037 86.4835 64.0608 86.6381 64.0608C86.7541 64.0608 86.8492 64.0548 86.9236 64.0429C86.9979 64.0281 87.0574 64.0162 87.102 64.0073L87.316 64.9528C87.2447 64.9795 87.1451 65.0063 87.0172 65.033C86.8894 65.0628 86.7273 65.0776 86.5311 65.0776C86.2338 65.0776 85.9424 65.0137 85.6569 64.8859C85.3745 64.758 85.1396 64.5633 84.9523 64.3016C84.7679 64.04 84.6758 63.7099 84.6758 63.3115V56.4968ZM91.6644 55.8546H92.931L95.4642 60.1182H95.5713L98.1045 55.8546H99.3711L96.0708 61.2243V64.9884H94.9647V61.2243L91.6644 55.8546ZM102.473 65.1312C101.855 65.1312 101.312 64.984 100.845 64.6896C100.381 64.3953 100.019 63.9835 99.7569 63.4542C99.4982 62.925 99.3689 62.3066 99.3689 61.5989C99.3689 60.8853 99.4982 60.2624 99.7569 59.7302C100.019 59.198 100.381 58.7847 100.845 58.4904C101.312 58.196 101.855 58.0488 102.473 58.0488C103.091 58.0488 103.633 58.196 104.096 58.4904C104.563 58.7847 104.926 59.198 105.185 59.7302C105.446 60.2624 105.577 60.8853 105.577 61.5989C105.577 62.3066 105.446 62.925 105.185 63.4542C104.926 63.9835 104.563 64.3953 104.096 64.6896C103.633 64.984 103.091 65.1312 102.473 65.1312ZM102.473 64.1857C102.943 64.1857 103.329 64.0652 103.633 63.8244C103.936 63.5836 104.16 63.2669 104.306 62.8744C104.452 62.482 104.525 62.0568 104.525 61.5989C104.525 61.141 104.452 60.7144 104.306 60.3189C104.16 59.9235 103.936 59.6039 103.633 59.3601C103.329 59.1162 102.943 58.9943 102.473 58.9943C102.003 58.9943 101.617 59.1162 101.313 59.3601C101.01 59.6039 100.786 59.9235 100.64 60.3189C100.494 60.7144 100.421 61.141 100.421 61.5989C100.421 62.0568 100.494 62.482 100.64 62.8744C100.786 63.2669 101.01 63.5836 101.313 63.8244C101.617 64.0652 102.003 64.1857 102.473 64.1857ZM111.501 62.1876V58.138H112.553V64.9884H111.501V63.8289H111.43C111.269 64.1767 111.019 64.4726 110.68 64.7164C110.341 64.9572 109.913 65.0776 109.396 65.0776C108.968 65.0776 108.587 64.984 108.254 64.7967C107.921 64.6064 107.659 64.3209 107.469 63.9404C107.279 63.5568 107.184 63.0737 107.184 62.4909V58.138H108.236V62.4195C108.236 62.919 108.376 63.3175 108.655 63.6148C108.938 63.9121 109.298 64.0608 109.735 64.0608C109.996 64.0608 110.263 63.9939 110.533 63.8601C110.807 63.7263 111.036 63.5211 111.22 63.2446C111.407 62.9681 111.501 62.6158 111.501 62.1876ZM114.481 64.9884V58.138H115.498V59.1727H115.569C115.694 58.8338 115.92 58.5588 116.247 58.3477C116.574 58.1366 116.943 58.031 117.353 58.031C117.431 58.031 117.527 58.0325 117.643 58.0355C117.759 58.0384 117.847 58.0429 117.906 58.0488V59.1192C117.871 59.1103 117.789 59.0969 117.661 59.0791C117.536 59.0583 117.404 59.0479 117.264 59.0479C116.931 59.0479 116.634 59.1177 116.372 59.2575C116.114 59.3942 115.908 59.5845 115.757 59.8283C115.608 60.0692 115.534 60.3442 115.534 60.6534V64.9884H114.481ZM123.204 64.9884H122.044L125.398 55.8546H126.54L129.893 64.9884H128.734L126.004 57.2996H125.933L123.204 64.9884ZM123.632 61.4205H128.306V62.4017H123.632V61.4205ZM131.173 67.5573V58.138H132.19V59.2263H132.315C132.393 59.1073 132.5 58.9557 132.636 58.7713C132.776 58.584 132.975 58.4175 133.234 58.2718C133.496 58.1232 133.849 58.0488 134.295 58.0488C134.872 58.0488 135.381 58.193 135.821 58.4815C136.261 58.7699 136.604 59.1787 136.851 59.7079C137.098 60.2372 137.221 60.8615 137.221 61.5811C137.221 62.3066 137.098 62.9354 136.851 63.4676C136.604 63.9969 136.262 64.4072 135.825 64.6985C135.388 64.9869 134.884 65.1312 134.313 65.1312C133.873 65.1312 133.521 65.0583 133.256 64.9126C132.992 64.764 132.788 64.596 132.645 64.4086C132.503 64.2184 132.393 64.0608 132.315 63.9359H132.226V67.5573H131.173ZM132.208 61.5632C132.208 62.0806 132.284 62.537 132.436 62.9324C132.587 63.3249 132.809 63.6326 133.1 63.8556C133.392 64.0756 133.748 64.1857 134.171 64.1857C134.611 64.1857 134.978 64.0697 135.272 63.8378C135.569 63.6029 135.792 63.2877 135.941 62.8923C136.093 62.4939 136.169 62.0509 136.169 61.5632C136.169 61.0816 136.094 60.6475 135.946 60.261C135.8 59.8715 135.578 59.5637 135.281 59.3378C134.987 59.1088 134.617 58.9943 134.171 58.9943C133.742 58.9943 133.383 59.1029 133.091 59.3199C132.8 59.534 132.58 59.8343 132.431 60.2208C132.282 60.6044 132.208 61.0518 132.208 61.5632ZM138.827 67.5573V58.138H139.843V59.2263H139.968C140.046 59.1073 140.153 58.9557 140.289 58.7713C140.429 58.584 140.628 58.4175 140.887 58.2718C141.149 58.1232 141.503 58.0488 141.949 58.0488C142.525 58.0488 143.034 58.193 143.474 58.4815C143.914 58.7699 144.257 59.1787 144.504 59.7079C144.751 60.2372 144.874 60.8615 144.874 61.5811C144.874 62.3066 144.751 62.9354 144.504 63.4676C144.257 63.9969 143.915 64.4072 143.478 64.6985C143.041 64.9869 142.537 65.1312 141.966 65.1312C141.526 65.1312 141.174 65.0583 140.909 64.9126C140.645 64.764 140.441 64.596 140.298 64.4086C140.156 64.2184 140.046 64.0608 139.968 63.9359H139.879V67.5573H138.827ZM139.861 61.5632C139.861 62.0806 139.937 62.537 140.089 62.9324C140.24 63.3249 140.462 63.6326 140.753 63.8556C141.045 64.0756 141.401 64.1857 141.824 64.1857C142.264 64.1857 142.631 64.0697 142.925 63.8378C143.223 63.6029 143.446 63.2877 143.594 62.8923C143.746 62.4939 143.822 62.0509 143.822 61.5632C143.822 61.0816 143.747 60.6475 143.599 60.261C143.453 59.8715 143.232 59.5637 142.934 59.3378C142.64 59.1088 142.27 58.9943 141.824 58.9943C141.396 58.9943 141.036 59.1029 140.744 59.3199C140.453 59.534 140.233 59.8343 140.084 60.2208C139.936 60.6044 139.861 61.0518 139.861 61.5632ZM147.532 55.8546V64.9884H146.48V55.8546H147.532ZM149.46 64.9884V58.138H150.513V64.9884H149.46ZM149.995 56.9963C149.79 56.9963 149.613 56.9264 149.465 56.7867C149.319 56.647 149.246 56.479 149.246 56.2827C149.246 56.0865 149.319 55.9185 149.465 55.7788C149.613 55.639 149.79 55.5691 149.995 55.5691C150.2 55.5691 150.376 55.639 150.522 55.7788C150.67 55.9185 150.745 56.0865 150.745 56.2827C150.745 56.479 150.67 56.647 150.522 56.7867C150.376 56.9264 150.2 56.9963 149.995 56.9963ZM155.223 65.1312C154.581 65.1312 154.028 64.9795 153.564 64.6762C153.101 64.373 152.744 63.9552 152.494 63.423C152.244 62.8908 152.119 62.2828 152.119 61.5989C152.119 60.9032 152.247 60.2892 152.503 59.757C152.762 59.2218 153.121 58.8041 153.582 58.5038C154.046 58.2005 154.587 58.0488 155.206 58.0488C155.687 58.0488 156.121 58.138 156.508 58.3164C156.894 58.4948 157.211 58.7446 157.458 59.0657C157.705 59.3868 157.858 59.7614 157.917 60.1896H156.865C156.784 59.8774 156.606 59.6009 156.329 59.3601C156.056 59.1162 155.687 58.9943 155.223 58.9943C154.813 58.9943 154.453 59.1014 154.144 59.3155C153.838 59.5266 153.599 59.8254 153.426 60.2119C153.257 60.5954 153.172 61.0459 153.172 61.5632C153.172 62.0925 153.255 62.5533 153.422 62.9458C153.591 63.3383 153.829 63.643 154.135 63.8601C154.444 64.0771 154.807 64.1857 155.223 64.1857C155.497 64.1857 155.745 64.1381 155.968 64.0429C156.191 63.9478 156.38 63.811 156.535 63.6326C156.689 63.4542 156.799 63.2402 156.865 62.9904H157.917C157.858 63.3948 157.711 63.759 157.476 64.0831C157.244 64.4042 156.936 64.6599 156.552 64.8502C156.172 65.0375 155.729 65.1312 155.223 65.1312ZM161.472 65.149C161.038 65.149 160.644 65.0672 160.29 64.9037C159.936 64.7372 159.655 64.4978 159.447 64.1857C159.239 63.8705 159.135 63.4899 159.135 63.0439C159.135 62.6515 159.212 62.3333 159.367 62.0895C159.521 61.8427 159.728 61.6495 159.987 61.5097C160.245 61.37 160.531 61.2659 160.843 61.1975C161.158 61.1262 161.475 61.0697 161.793 61.0281C162.209 60.9745 162.547 60.9344 162.805 60.9076C163.067 60.8779 163.257 60.8288 163.376 60.7605C163.498 60.6921 163.559 60.5731 163.559 60.4037V60.368C163.559 59.9279 163.439 59.586 163.198 59.3422C162.96 59.0984 162.599 58.9765 162.114 58.9765C161.611 58.9765 161.218 59.0865 160.932 59.3065C160.647 59.5266 160.446 59.7614 160.33 60.0112L159.331 59.6544C159.509 59.2381 159.747 58.9141 160.045 58.6821C160.345 58.4473 160.672 58.2837 161.026 58.1916C161.383 58.0964 161.733 58.0488 162.078 58.0488C162.298 58.0488 162.551 58.0756 162.836 58.1291C163.125 58.1797 163.403 58.2852 163.67 58.4458C163.941 58.6063 164.166 58.8487 164.344 59.1727C164.522 59.4968 164.612 59.9309 164.612 60.475V64.9884H163.559V64.0608H163.505C163.434 64.2094 163.315 64.3685 163.149 64.538C162.982 64.7075 162.761 64.8517 162.484 64.9706C162.208 65.0895 161.87 65.149 161.472 65.149ZM161.632 64.2035C162.049 64.2035 162.399 64.1217 162.685 63.9582C162.973 63.7947 163.19 63.5836 163.336 63.3249C163.485 63.0662 163.559 62.7942 163.559 62.5087V61.5454C163.514 61.5989 163.416 61.648 163.265 61.6926C163.116 61.7342 162.944 61.7714 162.747 61.8041C162.554 61.8338 162.365 61.8606 162.181 61.8844C161.999 61.9052 161.852 61.923 161.739 61.9379C161.466 61.9735 161.21 62.0315 160.972 62.1118C160.737 62.1891 160.547 62.3066 160.401 62.4641C160.259 62.6187 160.187 62.8298 160.187 63.0974C160.187 63.4632 160.323 63.7397 160.593 63.927C160.867 64.1113 161.213 64.2035 161.632 64.2035ZM169.512 58.138V59.03H165.962V58.138H169.512ZM166.996 56.4968H168.049V63.0261C168.049 63.3234 168.092 63.5464 168.178 63.6951C168.267 63.8408 168.38 63.9389 168.517 63.9894C168.657 64.037 168.804 64.0608 168.959 64.0608C169.075 64.0608 169.17 64.0548 169.244 64.0429C169.319 64.0281 169.378 64.0162 169.423 64.0073L169.637 64.9528C169.565 64.9795 169.466 65.0063 169.338 65.033C169.21 65.0628 169.048 65.0776 168.852 65.0776C168.554 65.0776 168.263 65.0137 167.978 64.8859C167.695 64.758 167.46 64.5633 167.273 64.3016C167.089 64.04 166.996 63.7099 166.996 63.3115V56.4968ZM171.095 64.9884V58.138H172.148V64.9884H171.095ZM171.63 56.9963C171.425 56.9963 171.248 56.9264 171.1 56.7867C170.954 56.647 170.881 56.479 170.881 56.2827C170.881 56.0865 170.954 55.9185 171.1 55.7788C171.248 55.639 171.425 55.5691 171.63 55.5691C171.835 55.5691 172.011 55.639 172.157 55.7788C172.305 55.9185 172.38 56.0865 172.38 56.2827C172.38 56.479 172.305 56.647 172.157 56.7867C172.011 56.9264 171.835 56.9963 171.63 56.9963ZM176.858 65.1312C176.24 65.1312 175.697 64.984 175.231 64.6896C174.767 64.3953 174.404 63.9835 174.142 63.4542C173.884 62.925 173.754 62.3066 173.754 61.5989C173.754 60.8853 173.884 60.2624 174.142 59.7302C174.404 59.198 174.767 58.7847 175.231 58.4904C175.697 58.196 176.24 58.0488 176.858 58.0488C177.477 58.0488 178.018 58.196 178.482 58.4904C178.949 58.7847 179.311 59.198 179.57 59.7302C179.832 60.2624 179.962 60.8853 179.962 61.5989C179.962 62.3066 179.832 62.925 179.57 63.4542C179.311 63.9835 178.949 64.3953 178.482 64.6896C178.018 64.984 177.477 65.1312 176.858 65.1312ZM176.858 64.1857C177.328 64.1857 177.715 64.0652 178.018 63.8244C178.321 63.5836 178.546 63.2669 178.691 62.8744C178.837 62.482 178.91 62.0568 178.91 61.5989C178.91 61.141 178.837 60.7144 178.691 60.3189C178.546 59.9235 178.321 59.6039 178.018 59.3601C177.715 59.1162 177.328 58.9943 176.858 58.9943C176.389 58.9943 176.002 59.1162 175.699 59.3601C175.396 59.6039 175.171 59.9235 175.025 60.3189C174.88 60.7144 174.807 61.141 174.807 61.5989C174.807 62.0568 174.88 62.482 175.025 62.8744C175.171 63.2669 175.396 63.5836 175.699 63.8244C176.002 64.0652 176.389 64.1857 176.858 64.1857ZM182.622 60.8675V64.9884H181.569V58.138H182.586V59.2084H182.675C182.836 58.8605 183.08 58.5811 183.407 58.37C183.734 58.1559 184.156 58.0488 184.673 58.0488C185.137 58.0488 185.543 58.144 185.891 58.3343C186.239 58.5216 186.509 58.807 186.702 59.1906C186.896 59.5712 186.992 60.0528 186.992 60.6356V64.9884H185.94V60.7069C185.94 60.1688 185.8 59.7495 185.521 59.4493C185.241 59.146 184.858 58.9943 184.37 58.9943C184.034 58.9943 183.734 59.0672 183.469 59.2129C183.207 59.3586 183.001 59.5712 182.849 59.8506C182.697 60.1301 182.622 60.4691 182.622 60.8675Z" fill="#5A6880"/>

                <defs>
                <filter id="filter0_d_935_1561" x="0.526882" y="5.51661" width="593.946" height="469.651" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="2.84034"/>
                <feGaussianBlur stdDeviation="4.3391"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_935_1561"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_935_1561" result="shape"/>
                </filter>
                <filter id="filter1_d_935_1561" x="37.4497" y="379.132" width="519.15" height="79.8071" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="2.84034"/>
                <feGaussianBlur stdDeviation="4.3391"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_935_1561"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_935_1561" result="shape"/>
                </filter>
                <filter id="filter2_d_935_1561" x="37.4497" y="223.148" width="519.15" height="118.602" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="2.84034"/>
                <feGaussianBlur stdDeviation="4.3391"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_935_1561"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_935_1561" result="shape"/>
                </filter>
                <filter id="filter3_d_935_1561" x="37.4497" y="70.6541" width="519.15" height="118.602" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="2.84034"/>
                <feGaussianBlur stdDeviation="4.3391"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_935_1561"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_935_1561" result="shape"/>
                </filter>
                <clipPath id="clip0_935_1561">
                <rect width="39.7648" height="39.7648" fill="white" transform="translate(115.243 260.365)"/>
                </clipPath>
                <clipPath id="clip1_935_1561">
                <rect width="51.1262" height="30.297" fill="white" transform="translate(271.461 265.099)"/>
                </clipPath>
                <clipPath id="clip2_935_1561">
                <rect width="47.3391" height="23.6695" fill="white" transform="translate(369.928 115.508)"/>
                </clipPath>
                <clipPath id="clip3_935_1561">
                <rect width="32.1906" height="34.0841" fill="white" transform="translate(474.071 109.828)"/>
                </clipPath>
                </defs>
                </svg>
            </div>
        </div>
    </div>
</section>

<div class="clearfix"></div>

<section class="cw-blg-inr-rlt-artcl-sec text-uppercase text-center" id="cwBlg_rltdArtcl_sec">
    <div class="container">
        <div class="row">
            <h2>THERE’S MORE TO READ.</h2>

            
                
                <div class="col-sm-4">
                    <div class="blg-artc-img-box">
                        <a href="https://www.cloudways.com/blog/improve-time-to-interactive/">
                            <img src="https://www.cloudways.com/blog/wp-content/uploads/ThumbImage_352x185-115.jpg" class="img-responsive">
                        </a>
                    </div>
                    <!--                        <p><a href="-->                    <!--">-->                    <!--</a></p>-->

                    <article class="blg-ctg-cntnt">
                        <!--Category Heading-->
                        <div class="blg-cat-wrap">
                            <div class="cw-inr-blg-ttl-wrap">
                                
                                <div class="blg-app-ttl blg-cat-dot-549">
                                    <a href="https://www.cloudways.com/blog/learning-center/">
                                    Knowledge Center
                                    </a>
                                </div>
                                                        </div>
                            <span class="span-reading-time rt-reading-time"><span class="rt-label rt-prefix"></span> <span class="rt-time"> 11</span> <span class="rt-label rt-postfix">Min Read</span></span>                        </div>

                        <h2>
                            <a href="https://www.cloudways.com/blog/improve-time-to-interactive/">How to Reduce Time to Interactive (TTI) on WordPress?</a>
                        </h2>

                        <div class="blg-cat-btm">
                            <a href="https://www.cloudways.com/blog/author/inshal/" class="author-avtr">
                                <img alt='' src='https://secure.gravatar.com/avatar/78c03c5f54f7db630deb308fb42accaf?s=42&#038;d=mm&#038;r=g' srcset='https://secure.gravatar.com/avatar/78c03c5f54f7db630deb308fb42accaf?s=84&#038;d=mm&#038;r=g 2x' class='avatar avatar-42 photo class-custom class-custom-2' height='42' width='42' loading='lazy' decoding='async'/>                            </a>

                            <a href="https://www.cloudways.com/blog/author/inshal/">
                                <span>Inshal Ali</span>
                                <span>Published on  28th September</span>
                            </a>
                        </div>
                    </article>

                    <!--                    <div class="blg-inr-artcl-cta"><a href="-->                    <!--"> read more </a></div>-->
                </div>
            
                
                <div class="col-sm-4">
                    <div class="blg-artc-img-box">
                        <a href="https://www.cloudways.com/blog/fix-err-network-changed-error/">
                            <img src="https://www.cloudways.com/blog/wp-content/uploads/ThumbImage_352x185-461.jpg" class="img-responsive">
                        </a>
                    </div>
                    <!--                        <p><a href="-->                    <!--">-->                    <!--</a></p>-->

                    <article class="blg-ctg-cntnt">
                        <!--Category Heading-->
                        <div class="blg-cat-wrap">
                            <div class="cw-inr-blg-ttl-wrap">
                                
                                <div class="blg-app-ttl blg-cat-dot-549">
                                    <a href="https://www.cloudways.com/blog/learning-center/">
                                    Knowledge Center
                                    </a>
                                </div>
                                                        </div>
                            <span class="span-reading-time rt-reading-time"><span class="rt-label rt-prefix"></span> <span class="rt-time"> 9</span> <span class="rt-label rt-postfix">Min Read</span></span>                        </div>

                        <h2>
                            <a href="https://www.cloudways.com/blog/fix-err-network-changed-error/">How to Fix the ERR_NETWORK_CHANGED Error (Chrome, Edge &#038;...</a>
                        </h2>

                        <div class="blg-cat-btm">
                            <a href="https://www.cloudways.com/blog/author/arehman/" class="author-avtr">
                                <img alt='' src='https://secure.gravatar.com/avatar/d61611e76cab1ec20180eeeea81d8b9d?s=42&#038;d=mm&#038;r=g' srcset='https://secure.gravatar.com/avatar/d61611e76cab1ec20180eeeea81d8b9d?s=84&#038;d=mm&#038;r=g 2x' class='avatar avatar-42 photo class-custom class-custom-2' height='42' width='42' loading='lazy' decoding='async'/>                            </a>

                            <a href="https://www.cloudways.com/blog/author/arehman/">
                                <span>Abdul Rehman</span>
                                <span>Published on  3rd September</span>
                            </a>
                        </div>
                    </article>

                    <!--                    <div class="blg-inr-artcl-cta"><a href="-->                    <!--"> read more </a></div>-->
                </div>
            
                
                <div class="col-sm-4">
                    <div class="blg-artc-img-box">
                        <a href="https://www.cloudways.com/blog/how-scalable-is-cloud-hosting/">
                            <img src="https://www.cloudways.com/blog/wp-content/uploads/ThumbImage_352x185-6-1.jpg" class="img-responsive">
                        </a>
                    </div>
                    <!--                        <p><a href="-->                    <!--">-->                    <!--</a></p>-->

                    <article class="blg-ctg-cntnt">
                        <!--Category Heading-->
                        <div class="blg-cat-wrap">
                            <div class="cw-inr-blg-ttl-wrap">
                                
                                <div class="blg-app-ttl blg-cat-dot-549">
                                    <a href="https://www.cloudways.com/blog/learning-center/">
                                    Knowledge Center
                                    </a>
                                </div>
                                                        </div>
                            <span class="span-reading-time rt-reading-time"><span class="rt-label rt-prefix"></span> <span class="rt-time"> 5</span> <span class="rt-label rt-postfix">Min Read</span></span>                        </div>

                        <h2>
                            <a href="https://www.cloudways.com/blog/how-scalable-is-cloud-hosting/">How Scalable Is Cloud Hosting?</a>
                        </h2>

                        <div class="blg-cat-btm">
                            <a href="https://www.cloudways.com/blog/author/jamil/" class="author-avtr">
                                <img alt='' src='https://secure.gravatar.com/avatar/faae4a5f9fb990ff55f0f4d46b328e8a?s=42&#038;d=mm&#038;r=g' srcset='https://secure.gravatar.com/avatar/faae4a5f9fb990ff55f0f4d46b328e8a?s=84&#038;d=mm&#038;r=g 2x' class='avatar avatar-42 photo class-custom class-custom-2' height='42' width='42' loading='lazy' decoding='async'/>                            </a>

                            <a href="https://www.cloudways.com/blog/author/jamil/">
                                <span>Jamil Ali Ahmed</span>
                                <span>Published on  21st August</span>
                            </a>
                        </div>
                    </article>

                    <!--                    <div class="blg-inr-artcl-cta"><a href="-->                    <!--"> read more </a></div>-->
                </div>
            
            <div class="clearfix"></div>

                    </div>
    </div>
    <div class="clearfix"></div>
</section>

<div class="clearfix"></div>

<!--comment section-->
<section class="cw-inr-blg-post cw-innr-blg-cmnts-wrap" id="cl-hst-sec">
    <div class="container">

        
<div id="disqus_thread"></div>
<script>
    var embedVars = {"disqusConfig":{"integration":"wordpress 3.1.1"},"disqusIdentifier":"135612 https:\/\/www.cloudways.com\/blog\/?p=135612","disqusShortname":"cloudways","disqusTitle":"How to Host a Node.js app on Cloudways (Step-By-Step Guide)","disqusUrl":"https:\/\/www.cloudways.com\/blog\/how-to-host-a-node-js-application\/","postId":135612};
    var disqus_url = embedVars.disqusUrl;
var disqus_identifier = embedVars.disqusIdentifier;
var disqus_container_id = 'disqus_thread';
var disqus_shortname = embedVars.disqusShortname;
var disqus_title = embedVars.disqusTitle;
var disqus_config_custom = window.disqus_config;
var disqus_config = function () {
    /*
    All currently supported events:
    onReady: fires when everything is ready,
    onNewComment: fires when a new comment is posted,
    onIdentify: fires when user is authenticated
    */
    var dsqConfig = embedVars.disqusConfig;
    this.page.integration = dsqConfig.integration;
    this.page.remote_auth_s3 = dsqConfig.remote_auth_s3;
    this.page.api_key = dsqConfig.api_key;
    this.sso = dsqConfig.sso;
    this.language = dsqConfig.language;

    if (disqus_config_custom)
        disqus_config_custom.call(this);
};

(function() {
    // Adds the disqus_thread id to the comment section if site is using a WP block theme
    var commentsBlock = document.querySelector('.wp-block-comments');
    if (commentsBlock) {
        commentsBlock.id = 'disqus_thread';
    }
    if (document.getElementById(disqus_container_id)) {
        var dsq = document.createElement('script');
        dsq.type = 'text/javascript';
        dsq.async = true;
        dsq.src = 'https://' + disqus_shortname + '.disqus.com/embed.js';
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    } else {
        console.error("Could not find 'disqus_thread' container to load DISQUS.  This is usually the result of a WordPress theme conflicting with the DISQUS plugin.  Try switching your site to a Classic Theme, or contact DISQUS support for help.");
    }
})();
</script>
    </div>
</section>
<!--comment section-->

<!--ProgressBar Section-->
<div id="cw-innr-prgrs-bar"></div>
<!--ProgressBar Section-->

<!--ProgressBar Section-->
<div id="cwBlog-btmToTop">
    <i class="fa fa-caret-up"></i>
</div>
<!--ProgressBar Section-->


<script type="text/javascript" async src="https://platform.twitter.com/widgets.js"></script>
<script type="text/javascript" src="https://www.cloudways.com/blog/wp-content/themes/cloudways/template/js/quoteShare.js"></script>
<script type="text/javascript">
    // On Selection Tweet
    /*jQuery('#post_content p').quoteShare({
        background: '#29c5f6',
        twitterColor : '#ffffff',
        minLength : 20,
        maxLength : 100,
    });*/
</script>

<!--Plugin files included here because it was not working, when we were adding in browser by ajax for speed -->
<script type="text/javascript" src="https://www.cloudways.com/blog/wp-content/plugins/enlighter/resources/mootools-core-yc.js?ver=3.9.0"></script>
<script type="text/javascript" src="https://www.cloudways.com/blog/wp-content/plugins/enlighter/resources/EnlighterJS.min.js?ver=3.9.0"></script>
<script type="text/javascript">
    /* <![CDATA[ */
    EnlighterJS_Config = {
        "selector": {
            "block": "pre.EnlighterJSRAW",
            "inline": "code.EnlighterJSRAW"
        },
        "language": "generic",
        "theme": "enlighter",
        "indent": 2,
        "hover": "hoverEnabled",
        "showLinenumbers": true,
        "rawButton": true,
        "infoButton": true,
        "windowButton": true,
        "rawcodeDoubleclick": false,
        "grouping": true,
        "cryptex": {
            "enabled": false,
            "email": "mail@example.tld"
        }
    };
    ! function() {
        var a = function(a) {
            var b = "Enlighter Error: ";
            console.error ? console.error(b + a) : console.log && console.log(b + a)
        };
        return window.addEvent ? "undefined" == typeof EnlighterJS ? void a("Javascript Resources not loaded yet!") : "undefined" == typeof EnlighterJS_Config ? void a("Configuration not loaded yet!") : void window.addEvent("domready", function() {
            EnlighterJS.Util.Init(EnlighterJS_Config.selector.block, EnlighterJS_Config.selector.inline, EnlighterJS_Config)
        }) : void a("MooTools Framework not loaded yet!")
    }();; /* ]]> */
</script>

<div id="fb-root"></div>
<script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v3.2"></script>


<!-- Footer Begin -->
<div class="clearfix"></div>
<footer id="cw-footer" class="uplift-footer-nav">
    <div id="footer-container" class="container">

        <div class="footerContainerWrap ">
            <div class="footer_badges_card">
                <div class="card_inner_content">
                    <h4>The Managed Cloud Hosting <span class="gradient_text">Leader</span> on G2</h4>

                </div>
                <div class="newFtr_adrs_reviewBadges">

                    <div class="badgeBox">
                        <img src="https://www.cloudways.com/wp-content/uploads/2025/09/BestEstimatedROI.svg"
                            class='img-responsive' />
                    </div>
                    <div class="badgeBox">
                        <img src="https://www.cloudways.com/wp-content/uploads/2025/09/Hosting-50.svg"
                            class='img-responsive' />
                    </div>
                    <div class="badgeBox">
                        <img src="https://www.cloudways.com/wp-content/uploads/2025/09/BestResults_Small-Business_Total.svg"
                            class="img-responsive " />
                    </div>
                    <div class="badgeBox">
                        <img src="https://www.cloudways.com/wp-content/uploads/2025/09/FastestImplementation_Mid-Market_GoLiveTime.svg"
                            class='img-responsive' />
                    </div>
                    <div class="badgeBox">
                        <img src="https://www.cloudways.com/wp-content/uploads/2025/09/HighPerformer_Mid-Market_HighPerformer.svg"
                            class='img-responsive' />
                    </div>
                    <div class="badgeBox">
                        <img src="https://www.cloudways.com/wp-content/uploads/2025/09/EaseOfDoingBusinessWith.svg"
                            class="img-responsive " />
                    </div>
                </div>
            </div>
            <div class="footerNavWrap ">

                <!-- BEGIN Products  navigation -->
                <div class="footer-nav">
                    <a class="footer-nav-heading pull-wide collapsed" href="#footer_nav_products" data-toggle="collapse"
                        aria-expanded="false" aria-controls="footer_nav_products">
                                                Products                    </a>
                    <!-- BEGIN Footer navigation -->
                    <div id="footer_nav_products" class="footer-nav_content pull-wide collapse"><ul id="menu-products_menu_uplift" class="nav nav-pills nav-stacked"><li id="menu-item-196856" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-196856"><a href="https://www.cloudways.com/en/flexible-hosting-tour.php?ref_id=Blog_footer">Cloudways Flexible</a></li>
<li id="menu-item-196857" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-196857"><a href="https://www.cloudways.com/en/autonomous.php?ref_id=Blog_footer">Cloudways Autonomous</a></li>
<li id="menu-item-196936" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-196936"><a href="https://www.cloudways.com/en/cloudways-ai-copilot.php?ref_id=Blog_footer">Cloudways Copilot</a></li>
</ul></div>                    <!-- End Footer navigation -->
                </div>
                <!-- END Products navigation -->

                <!-- BEGIN cloudInfrastructures navigation -->
                <div class="footer-nav">
                    <a class="footer-nav-heading pull-wide collapsed" data-toggle="collapse"
                        href="#footer_nav_cloudInfrastructures" aria-expanded="false"
                        aria-controls="footer_nav_cloudInfrastructures">
                                                Cloud Providers
                    </a>
                    <!-- BEGIN Footer navigation -->
                    <div id="footer_nav_cloudInfrastructures" class="footer-nav_content pull-wide collapse"><ul id="menu-cloud-infrastructures-menu-uplift" class="nav nav-pills nav-stacked"><li id="menu-item-196841" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-196841"><a href="https://www.cloudways.com/en/digital-ocean-cloud-hosting.php?ref_id=Blog_footer">DigitalOcean Managed Hosting</a></li>
<li id="menu-item-196842" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-196842"><a href="https://www.cloudways.com/en/vultr-hosting.php?ref_id=Blog_footer">Vultr Managed Hosting</a></li>
<li id="menu-item-196843" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-196843"><a href="https://www.cloudways.com/en/linode-hosting.php?ref_id=Blog_footer">Linode Managed Hosting</a></li>
<li id="menu-item-196844" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-196844"><a href="https://www.cloudways.com/en/amazon-cloud-hosting.php?ref_id=Blog_footer">AWS Managed Hosting</a></li>
<li id="menu-item-196845" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-196845"><a href="https://www.cloudways.com/en/managed-google-compute-engine.php?ref_id=Blog_footer">Google Cloud Managed Hosting</a></li>
</ul></div>                    <!-- End Footer navigation -->
                    <br class="clearfix">
                </div>
                <!-- END cloudInfrastructures navigation -->

                <!-- BEGIN applications navigation -->
                <div class="footer-nav">
                    <a class="footer-nav-heading pull-wide collapsed" data-toggle="collapse"
                        href="#footer_nav_applications" aria-expanded="false" aria-controls="footer_nav_applications">
                                                Application Hosting
                    </a>
                    <!-- BEGIN Footer navigation -->
                    <div id="footer_nav_applications" class="footer-nav_content pull-wide collapse"><ul id="menu-applications-menu-uplift" class="nav nav-pills nav-stacked"><li id="menu-item-196836" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-196836"><a href="https://www.cloudways.com/en/wordpress-hosting.php?ref_id=Blog_footer">Hosting for WordPress</a></li>
<li id="menu-item-196837" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-196837"><a href="https://www.cloudways.com/en/woocommerce-hosting.php?ref_id=Blog_footer">Hosting for WooCommerce</a></li>
<li id="menu-item-196838" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-196838"><a href="https://www.cloudways.com/en/laravel-hosting?ref_id=Blog_footer">Laravel Hosting</a></li>
<li id="menu-item-196839" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-196839"><a href="https://www.cloudways.com/en/magento-hosting.php?ref_id=Blog_footer">Magento Hosting</a></li>
<li id="menu-item-196840" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-196840"><a href="https://www.cloudways.com/en/php-hosting.php?ref_id=Blog_footer">PHP Hosting</a></li>
<li id="menu-item-197169" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-197169"><a href="https://www.cloudways.com/en/wordpress-multisite-hosting.php?ref_id=Blog_footer">WordPress Multisite Hosting</a></li>
</ul></div>                    <!-- End Footer navigation -->
                    <br class="clearfix">
                </div>
                <!-- END applications navigation -->

                <!-- BEGIN solutions navigation -->
                <div class="footer-nav">
                    <a class="footer-nav-heading footerNavFeatures-heading pull-wide collapsed" data-toggle="collapse"
                        href="#footer_nav_solutions" aria-expanded="false" aria-controls="footer_nav_solutions">
                                                Solutions
                    </a>
                    <!-- BEGIN Footer navigation -->
                    <div id="footer_nav_solutions" class="footer-nav_content pull-wide collapse"><ul id="menu-solutions-menu-uplift" class="nav nav-pills nav-stacked"><li id="menu-item-196876" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-196876"><a href="https://www.cloudways.com/en/hosting-for-agencies.php?ref_id=Blog_footer">Hosting for Agencies</a></li>
<li id="menu-item-196877" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-196877"><a href="https://www.cloudways.com/en/ecommerce-hosting?ref_id=Blog_footer">Ecommerce Hosting</a></li>
<li id="menu-item-196878" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-196878"><a href="https://www.cloudways.com/en/smb-hosting.php?ref_id=Blog_footer">SMBs Hosting</a></li>
<li id="menu-item-196879" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-196879"><a href="https://www.cloudways.com/en/dev-hosting.php?ref_id=Blog_footer">Hosting for Developers</a></li>
<li id="menu-item-196880" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-196880"><a href="https://www.cloudways.com/en/hosting-for-bloggers.php?ref_id=Blog_footer">Bloggers Hosting</a></li>
</ul></div>                    <!-- End Footer navigation -->
                    <div class="clearfix"></div>
                </div>
                <!-- END solutions navigation -->

                <!-- BEGIN program content -->
                <div class="footer-nav">
                    <a class="footer-nav-heading pull-wide collapsed" data-toggle="collapse" href="#footer_nav_program"
                        aria-expanded="false" aria-controls="footer_nav_program">
                                                Program
                    </a>
                    <!-- BEGIN Footer navigation -->
                    <div id="footer_nav_program" class="footer-nav_content pull-wide collapse"><ul id="menu-program-menu-uplift" class="nav nav-pills nav-stacked"><li id="menu-item-196858" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-196858"><a href="https://www.cloudways.com/en/web-hosting-affiliate-program.php?ref_id=Blog_footer">Cloudways Affiliate Program</a></li>
<li id="menu-item-196859" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-196859"><a href="https://www.cloudways.com/en/agency-partner-program.php?ref_id=Blog_footer">Agency Partner Program</a></li>
<li id="menu-item-196860" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-196860"><a href="https://www.cloudways.com/en/referral-program.php?ref_id=Blog_footer">Cloudways Referral Program</a></li>
<li id="menu-item-196861" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-196861"><a href="https://www.cloudways.com/en/partners.php?ref_id=Blog_footer">Partners</a></li>
</ul></div>                    <!-- End Footer navigation -->
                    <br class="clearfix">
                </div>
                <!-- END program navigation -->

                <!-- BEGIN support navigation -->
                <div class="footer-nav">
                    <a class="footer-nav-heading pull-wide collapsed" data-toggle="collapse" href="#footer_nav_support"
                        aria-expanded="false" aria-controls="footer_nav_support">
                                                Support
                    </a>
                    <!-- BEGIN Footer navigation -->
                    <div id="footer_nav_support" class="footer-nav_content pull-wide collapse"><ul id="menu-support-menu-uplift" class="nav nav-pills nav-stacked"><li id="menu-item-196882" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-196882"><a href="https://www.cloudways.com/en/support.php?ref_id=Blog_footer">Our Support</a></li>
<li id="menu-item-196883" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-196883"><a href="https://support.cloudways.com/en/?ref_id=Blog_footer">Knowledge Base</a></li>
<li id="menu-item-196885" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-196885"><a href="https://status.cloudways.com/?ref_id=Blog_footer">System Status</a></li>
<li id="menu-item-196887" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-196887"><a href="https://www.cloudways.com/en/free-website-migration-service.php?ref_id=Blog_footer">Free Web Migration</a></li>
</ul></div>                    <!-- End Footer navigation -->
                    <br class="clearfix">
                </div>
                <!-- END support navigation -->

                <!-- BEGIN Resources navigation -->
                <div class="footer-nav">
                    <a class="footer-nav-heading pull-wide collapsed" data-toggle="collapse"
                        href="#footer_nav_resources" aria-expanded="false" aria-controls="footer_nav_resources">
                                                Resources
                    </a>
                    <!-- BEGIN Footer navigation -->
                    <div id="footer_nav_resources" class="footer-nav_content pull-wide collapse"><ul id="menu-resources-menu-uplift" class="nav nav-pills nav-stacked"><li id="menu-item-196866" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-196866"><a href="https://www.cloudways.com/blog/?ref_id=Blog_footer">Blog</a></li>
<li id="menu-item-196867" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-196867"><a href="https://www.cloudways.com/en/resources/case-studies?ref_id=Blog_footer">Case Studies</a></li>
<li id="menu-item-196871" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-196871"><a href="https://feedback.cloudways.com/?ref_id=Blog_footer">Customer Voice</a></li>
<li id="menu-item-196873" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-196873"><a href="https://www.cloudways.com/en/video-library.php?ref_id=Blog_footer">Video Library</a></li>
<li id="menu-item-196874" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-196874"><a href="https://www.cloudways.com/en/glossary.php?ref_id=Blog_footer">Glossary</a></li>
<li id="menu-item-197159" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-197159"><a href="https://www.facebook.com/groups/CloudwaysUsers/?ref_id=Blog_footer">Cloudways User Group</a></li>
<li id="menu-item-197089" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-197089"><a href="https://www.cloudways.com/en/promo-code.php?ref_id=Blog_footer">Promo Code</a></li>
</ul></div>                    <!-- End Footer navigation -->
                    <br class="clearfix">
                </div>
                <!-- END Resources navigation -->

                <!-- BEGIN Addons navigation -->
                <div class="footer-nav">
                    <a class="footer-nav-heading pull-wide collapsed" data-toggle="collapse" href="#footer_nav_addons"
                        aria-expanded="false" aria-controls="footer_nav_addons">
                                                Addons
                    </a>
                    <!-- BEGIN Footer navigation -->
                    <div id="footer_nav_addons" class="footer-nav_content pull-wide collapse"><ul id="menu-addons-menu-uplift" class="nav nav-pills nav-stacked"><li id="menu-item-196831" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-196831"><a href="https://www.cloudways.com/en/cloudflare.php?ref_id=Blog_footer">Cloudflare CDN</a></li>
<li id="menu-item-196832" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-196832"><a href="https://www.cloudways.com/en/safeupdates.php?ref_id=Blog_footer">SafeUpdates</a></li>
<li id="menu-item-196833" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-196833"><a href="https://www.cloudways.com/en/malware-protection.php?ref_id=Blog_footer">Malware Protection</a></li>
<li id="menu-item-196834" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-196834"><a href="https://www.cloudways.com/en/client-billing.php?ref_id=Blog_footer">Client Billing &#038; Reporting</a></li>
<li id="menu-item-196835" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-196835"><a href="https://www.cloudways.com/en/dns-made-easy.php?ref_id=Blog_footer">DNS Made Easy</a></li>
</ul></div>                    <!-- End Footer navigation -->
                    <br class="clearfix">
                </div>
                <!-- END Addons navigation -->

                <!-- BEGIN compare cloudways navigation -->
                <div class="footer-nav">
                    <a class="footer-nav-heading pull-wide collapsed" data-toggle="collapse" href="#footer_nav_compare"
                        aria-expanded="false" aria-controls="footer_nav_compare">
                                                Compare Cloudways
                    </a>
                    <!-- BEGIN Footer navigation -->
                    <div id="footer_nav_compare" class="footer-nav_content pull-wide collapse"><ul id="menu-comparision-menu-uplift" class="nav nav-pills nav-stacked"><li id="menu-item-196851" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-196851"><a href="https://www.cloudways.com/en/wpengine-alternative.php?ref_id=Blog_footer">Cloudways vs WP Engine</a></li>
<li id="menu-item-196852" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-196852"><a href="https://www.cloudways.com/en/kinsta-alternative.php?ref_id=Blog_footer">Cloudways vs Kinsta</a></li>
<li id="menu-item-196853" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-196853"><a href="https://www.cloudways.com/en/hostinger-alternative.php?ref_id=Blog_footer">Cloudways vs Hostinger</a></li>
<li id="menu-item-196854" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-196854"><a href="https://www.cloudways.com/en/siteground-alternative.php?ref_id=Blog_footer">Cloudways vs SiteGround</a></li>
<li id="menu-item-196855" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-196855"><a href="https://www.cloudways.com/en/alternatives.php?ref_id=Blog_footer">Compare More</a></li>
</ul></div>                    <!-- End Footer navigation -->
                    <br class="clearfix">
                </div>
                <!-- END compare cloudways navigation -->

                <!-- BEGIN Company navigation -->
                <div class="footer-nav">
                    <a class="footer-nav-heading pull-wide collapsed" data-toggle="collapse" href="#footer_nav_company"
                        aria-expanded="false" aria-controls="footer_nav_company">
                                                Company
                    </a>
                    <!-- BEGIN Footer navigation -->
                    <div id="footer_nav_company" class="footer-nav_content pull-wide collapse"><ul id="menu-company-menu-uplift" class="nav nav-pills nav-stacked"><li id="menu-item-196846" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-196846"><a href="https://www.cloudways.com/en/about_us.php?ref_id=Blog_footer">About Us</a></li>
<li id="menu-item-196847" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-196847"><a href="https://www.cloudways.com/en/cloudways-reviews.php?ref_id=Blog_footer">Customer Reviews</a></li>
<li id="menu-item-196848" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-196848"><a href="https://www.cloudways.com/en/media-kit.php?ref_id=Blog_footer">Media Kit</a></li>
<li id="menu-item-196849" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-196849"><a href="https://www.cloudways.com/en/sitemap.php?ref_id=Blog_footer">Sitemap</a></li>
<li id="menu-item-196850" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-196850"><a href="https://www.digitalocean.com/careers?ref_id=Blog_footer">Careers</a></li>
</ul></div>                    <!-- End Footer navigation -->
                    <br class="clearfix">
                </div>
                <!-- END Company navigation -->
            </div>

            <div class="seperator"></div>

            <div class="footerBrandInfoWrap">
                <div class="newFtr_right_wrap">
                    <div class="newFtr_adrs_imgBox">
                        <a href="https://www.cloudways.com/blog/" class="footer-nav_logo"></a>
                    </div>
                    <div id="cw_ml_swtch" class="">
                        <div class="dropdown dropup">
                            <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">
                                <i class="fa fa-globe"></i>
                                <span>English</span>
                                <i class="fa fa-angle-down"></i>
                            </button>
                            <ul class="dropdown-menu">
                                <li class="cw_lang_actv"><a href="https://www.cloudways.com/blog/how-to-host-a-node-js-application/"><img src=" https://www.cloudways.com/blog/wp-content/plugins/sitepress-multilingual-cms/res/flags/en.svg " class="cw_lang_flag" alt=" English "/>English</a></li>                            </ul>
                        </div>
                    </div>
                </div>
                <div class="newFtr_left_wrap">
                    <p class="left_wrap cookie_pref" id="teconsent">Cookies Preferences</p>
                    <p class="left_wrap center_txt">
                        <a href="/en/terms.php?ref_id=web_footer">Terms & Conditions</a>
                    </p>
                    <p class="newFtr_cprtBox">© 2025 Cloudways, LLC</p>
                    <div class="newFtr_scl_iconBox">
                        <ul>
                            <li>
                                <a href="https://www.facebook.com/cloudways" class="footer-nav_icon_facebook"
                                    target="_blank" rel="nofollow noopener">
                                    <img src="https://www.cloudways.com/wp-content/uploads/2025/09/ic-facebook.svg"
                                        alt="">
                                </a>
                            </li>
                            <li>
                                <a href="https://www.linkedin.com/company/cloudways" class="footer-nav_icon_linked"
                                    target="_blank" rel="nofollow noopener">
                                    <img src="https://www.cloudways.com/wp-content/uploads/2025/09/ic-linkedin.svg"
                                        alt=""></a>
                            </li>
                            <li>
                                <a href="https://www.instagram.com/cloudways_official/?hl=en" class="footer-nav_icon_instagram"
                                    target="_blank" rel="nofollow noopener">
                                    <img src="https://www.cloudways.com/wp-content/uploads/2025/09/instagram_icon-1.svg"
                                        alt="">
                                </a>
                            </li>
                            <li>
                                <a href="https://twitter.com/cloudways" class="footer-nav_icon_twitter" target="_blank"
                                    rel="nofollow noopener">
                                    <img src="https://www.cloudways.com/wp-content/uploads/2025/09/ic-twitter.svg"
                                        alt="">
                                </a>
                            </li>
                            <!-- <li>
                                    <a href="https://www.cloudways.com/blog/updates/" class="footer-nav_icon_news" target="_blank" rel="nofollow noopener"><i class="fa fa-newspaper-o"></i></a>
                                </li> -->
                            <li>
                                <a href="https://www.youtube.com/@Cloudways" class="footer-nav_icon_youtube"
                                    target="_blank" rel="nofollow noopener">
                                    <img src="https://www.cloudways.com/wp-content/uploads/2025/09/ic-youtube.svg"
                                        alt="">
                                </a>
                            </li>
                            <li>
                                <a href="https://www.reddit.com/r/CloudwaysbyDO/" class="footer-nav_icon_reddit"
                                    target="_blank" rel="nofollow noopener">
                                    <img src="https://www.cloudways.com/wp-content/uploads/2025/09/ic-reddit.svg"
                                        alt="">
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>


        </div>
    </div>


</footer>
<!-- Footer End -->
    <!-- <div class="bfcm2024Popupsec withTimer">
        <a href="javascript:void(0);" class="close_btn"> <img
                src="https://www.cloudways.com/wp-content/uploads/2024/10/close-btn.png" alt="" class="img-responsive"></a>
        <div class="popupInnerWrap">
            <a class="bfcmpopupLink" href="https://platform.cloudways.com/signup?coupon=BFCM2024&ref_id=blog_wide_popon" target="_blank" rel="noopener noreferrer"></a>
            <div class="headingArea headingAreaWithTimer">
                <h3>Peak  <span class="perf_hightlight"> Performance.</span></h3>
                <h3>Limitless <span class="scal_hightlight">Scalability.</span> </h3>
            </div>

            <div class="bfcmtimerwrap">
                <div class="borderAnimate"></div>

                <ul class="clounterMainDiv">
                    <li>
                        <div class="counter">
                            <h3 class="countTxt" id="dayz">0</h3>
                            <p class="counterpara">Days</p>
                        </div>
                    </li>
                    <li>
                        <div class="counter">
                            <h3 class="countTxt" id="hourz">0</h3>
                            <p class="counterpara">Hours</p>
                        </div>
                    </li>
                    <li>
                        <div class="counter">
                            <h3 class="countTxt" id="minutez">0</h3>
                            <p class="counterpara">Mins</p>
                        </div>
                    </li>
                    <li class="pulse">
                        <div class="counter">
                            <h3 class="countTxt" id="secondz">0</h3>
                            <p class="counterpara">Sec</p>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="discountArea">
                <img src="https://www.cloudways.com/wp-content/uploads/2024/10/bfcm_discount.svg" alt="">

            </div>

            <div class="lastArea">
                <h4 class="hide">
                    <span class="purple_highlight">Off For 4 months</span> <br>
                    <span class="pink_highlight">+40 free Migrations</span>
                </h4>


                <img src="https://www.cloudways.com/wp-content/uploads/2024/10/popuptxt.gif" alt="" class="img-responsive">

                <a class="cw_bfcm24_gbl_btn">Claim Now</a>
            </div>
        </div>
    </div> -->

<!-- Modal -->
<div class="modal fade" id="blg-catg-mb-nav" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                        aria-hidden="true">&times;</span></button>
            </div>
            <div class="modal-body">
                <a href="#" class="close"></a>
                <div class="container">
                    <div class="pull-wide blg-sub-catg mobile-nav"></div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- End Mobile Nav -->
<div id="mobile_scubscribe">

    <div class="modal fade subs-modl-wrpr" id="modal-1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">×</span></button>
                </div>
                <div class="blg-inr-sbsc-box text-center">
                                        <h4> Choose the best Managed Cloud Hosting experience for your business! </h4>
                    <p> Join over 1 million designers who get our content first Join over 1 million <br> designers who
                        get our content first. </p>
                    <form role="form" class="form-inline blg-inr-subsc-form col-sm-12 col-md-10 col-md-offset-1">
                        <div class="form-group blg-inr-rgt-emil-box">
                            <input type="email" name="mobile_email" class="form-control" id="mobile_email"
                                placeholder="Email address...">
                            <input type="hidden" name="mobile_cat" id="mobile_nl_type" value="learning-center" />
                            <!--<input type="hidden" name="cat" id="nl_type" value="" />-->
                        </div>
                        <div class="blg-inr-form-subs-box text-capitalize">
                            <button id="submit_m_subscribe"
                                class="btn btn-success blg-inr-lnk-cnt text-uppercase">Subscribe</button>
                        </div>
                        <!--<div class="blg-inr-no-crd col-sm-5 col-sm-offset-7"> No Credit Card Required </div>-->
                        <div class="clearfix"></div>
                        <div id="mobile_subscribe_error-messages"></div>
                        <div id="mobile_success-messages"></div>
                    </form>
                    <div class="clearfix"></div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade subs-modl-wrpr" id="modal-2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog-wrpr pull-wide">
            <div class="modal-dialog" role="document">
                <div class="modal-content srch-madal-box pull-wide">
                    <div class="col-xs-2 col-sm-1 srch-madal-icon">
                        <button id="search_button"><span class="nav-src-img-box"></span></button>
                    </div>
                    <div class="col-xs-8 col-sm-10 srch-madal-input">
                        <form action="https://www.cloudways.com/blog/" method="get" id="searchform-modal">
                            <input value="" name="s" id="s-modal1" type="text" class="form-control search_form" />
                        </form>
                    </div>
                    <div class="col-xs-2 col-sm-1 srch-madal-clos">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">×</span></button>
                    </div>
                </div>
                <div class="clearfix"></div>

            </div>
        </div>
    </div>
</div>




	            
<div class="wpml-ls-statics-footer wpml-ls wpml-ls-legacy-list-horizontal">
	<ul><li class="wpml-ls-slot-footer wpml-ls-item wpml-ls-item-en wpml-ls-current-language wpml-ls-first-item wpml-ls-last-item wpml-ls-item-legacy-list-horizontal">
				<a href="https://www.cloudways.com/blog/how-to-host-a-node-js-application/" class="wpml-ls-link">
                                                        <img
            class="wpml-ls-flag"
            src="https://www.cloudways.com/blog/wp-content/plugins/sitepress-multilingual-cms/res/flags/en.svg"
            alt=""
            width=18
            height=12
    /><span class="wpml-ls-native">English</span></a>
			</li></ul>
</div>
<script type="text/javascript" src="https://www.cloudways.com/blog/wp-includes/js/comment-reply.min.js?ver=6.4.3" id="comment-reply-js" async="async" data-wp-strategy="async"></script>
<script type="text/javascript" src="https://www.cloudways.com/blog/wp-content/themes/cloudways/template/cache/f3587010048ce5cad3ffbce6f24a43b8.js?ver=6.4.3" id="group2_js-js"></script>


<script type="text/javascript" id="wpil-frontend-script-js-extra">
/* <![CDATA[ */
var wpilFrontend = {"ajaxUrl":"\/blog\/wp-admin\/admin-ajax.php","postId":"135612","postType":"post","openInternalInNewTab":"0","openExternalInNewTab":"0","disableClicks":"0","openLinksWithJS":"0","trackAllElementClicks":"0","clicksI18n":{"imageNoText":"Image in link: No Text","imageText":"Image Title: ","noText":"No Anchor Text Found"}};
/* ]]> */
</script>




<script type="text/javascript">
    window['cw_externalJS'] = window.cw_externalJS || {};
    window['cw_externalJS']['footer'] = ["https:\/\/www.cloudways.com\/blog\/wp-content\/plugins\/disqus-comment-system\/public\/js\/comment_count.js?ver=3.1.1\" id=\"disqus_count-js","https:\/\/www.cloudways.com\/blog\/wp-content\/plugins\/link-whisper-premium\/js\/frontend.min.js?ver=1747308046\" id=\"wpil-frontend-script-js","https:\/\/www.cloudways.com\/blog\/wp-content\/plugins\/enlighter\/resources\/mootools-core-yc.js?ver=3.10.0\" id=\"mootools-local-js","https:\/\/www.cloudways.com\/blog\/wp-content\/plugins\/enlighter\/resources\/EnlighterJS.min.js?ver=3.10.0\" id=\"enlighter-local-js","https:\/\/cdn.onesignal.com\/sdks\/OneSignalSDK.js?ver=1.0.0\" id=\"remote_sdk-js\" async=\"async\" data-wp-strategy=\"async"];
</script><script type="text/javascript">
    window['cw_inlineJS'] = window.cw_inlineJS || {};
    window['cw_inlineJS']['footer'] = ["\n\t            \t\/**\n\t            \t* We define our custom disqus configs here. This function is invoked from:\n\t            \t* \/disqus-comment-system\/public\/js\/comment_embed.js by variable `disqus_config_custom`\n\t\t\t\t\t*\/\n\t                var disqus_config = function () {\n\t                \tthis.language = \"en\";\n\t                };\n\t            ","\n\/* <![CDATA[ *\/\nvar countVars = {\"disqusShortname\":\"cloudways\"};\n\/* ]]> *\/\n","\/* <![CDATA[ *\/EnlighterJS_Config = {\"selector\":{\"block\":\"pre.EnlighterJSRAW\",\"inline\":\"code.EnlighterJSRAW\"},\"language\":\"generic\",\"theme\":\"enlighter\",\"indent\":2,\"hover\":\"hoverEnabled\",\"showLinenumbers\":true,\"rawButton\":true,\"infoButton\":true,\"windowButton\":true,\"rawcodeDoubleclick\":false,\"grouping\":true,\"cryptex\":{\"enabled\":false,\"email\":\"mail@example.tld\"}};!function(){var a=function(a){var b=\"Enlighter Error: \";console.error?console.error(b+a):console.log&&console.log(b+a)};return window.addEvent?\"undefined\"==typeof EnlighterJS?void a(\"Javascript Resources not loaded yet!\"):\"undefined\"==typeof EnlighterJS_Config?void a(\"Configuration not loaded yet!\"):void window.addEvent(\"domready\",function(){EnlighterJS.Util.Init(EnlighterJS_Config.selector.block,EnlighterJS_Config.selector.inline,EnlighterJS_Config)}):void a(\"MooTools Framework not loaded yet!\")}();;\/* ]]> *\/"];
</script>
<input type="hidden" id="expires" value="Thu, 01 Jan 2026 15:17:25 GMT" /><input type="hidden" id="page_url" value="https://www.cloudways.com/blog/how-to-host-a-node-js-application/" />
<script>(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'989576243ce1b022',t:'MTc1OTU4OTExMC4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();</script></body>

</html>