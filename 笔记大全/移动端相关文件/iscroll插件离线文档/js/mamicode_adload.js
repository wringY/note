function mamicode_adload(ad_id) {
    var str = '';
    if (ad_id == 'top_memu') {
        str = '';
    }
    else if (ad_id == 'title_before') {
        str = '<div class="margintop20">' +
                '    <div class="divfloatleft">'+
                '        <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"><\/script>'+
                '        <!-- mamicode-infodetail-336x280-1 -->'+
                '        <ins class="adsbygoogle" style="display: inline-block; width: 336px; height: 280px"'+
                '            data-ad-client="ca-pub-8616102841876629" data-ad-slot="6851602680"><\/ins>'+
                '        <script>'+
                '            (adsbygoogle = window.adsbygoogle || []).push({});'+
                '        <\/script>'+
                '    <\/div>'+
                '    <div class="divfloatright">' +
                '        <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"><\/script>' +
                '        <!-- mamicode-infodetail-336x280-2 -->' +
                '        <ins class="adsbygoogle" style="display: inline-block; width: 336px; height: 280px"' +
                '            data-ad-client="ca-pub-8616102841876629" data-ad-slot="8328335888"><\/ins>' +
                '        <script>' +
                '            (adsbygoogle = window.adsbygoogle || []).push({});' +
                '        <\/script>' +
                '    <\/div>'+
                '    <div class="divfloatclear">'+
                '    <\/div>'+
                '<\/div>';
    }
    else if (ad_id == 'content_before') {
        str = '';
    }
    else if (ad_id == 'content_after') {
        str = '<div class="margintop20bottom20">' +
                '<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"><\/script>' +
                '<ins class="adsbygoogle"' +
                '     style="display:block; text-align:center;"' +
                '     data-ad-format="fluid"' +
                '     data-ad-layout="in-article"' +
                '     data-ad-client="ca-pub-8616102841876629"' +
                '     data-ad-slot="3249086282"><\/ins>' +
                '<script>' +
                '     (adsbygoogle = window.adsbygoogle || []).push({});' +
                '<\/script>' +
                '<\/div>';
    }
    else if (ad_id == 'content_bottom') {
        str = '';
    }
    else if (ad_id == 'right_top') {
        str = '<div class="paddingbottom10">'+
                '    <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"><\/script>'+
                '    <!-- 1-mamicode-right-300x600 -->'+
                '    <ins class="adsbygoogle" style="display: inline-block; width: 300px; height: 600px"'+
                '        data-ad-client="ca-pub-8616102841876629" data-ad-slot="8947049888"><\/ins>'+
                '    <script>'+
                '        (adsbygoogle = window.adsbygoogle || []).push({});'+
                '    <\/script>'+
                '<\/div>';
    }
    else if (ad_id == 'right_bottom') {
        str = '<div id="xuanting" class="width300px margintop20">'+
                '    <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"><\/script>'+
                '    <!-- mamicode-right-xuanting-300x600 -->'+
                '    <ins class="adsbygoogle" style="display: inline-block; width: 300px; height: 600px"'+
                '        data-ad-client="ca-pub-8616102841876629" data-ad-slot="4406515082"><\/ins>'+
                '    <script>'+
                '        (adsbygoogle = window.adsbygoogle || []).push({});'+
                '    <\/script>'+
                '<\/div>';
    }
    else if (ad_id == 'bottom') {
        str = '';
    }
    document.write(str);
}