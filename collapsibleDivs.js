/**
 * Dynamic Navigation Bars. See [[Wikipedia:NavFrame]]
 *
 * Based on script from en.wikipedia.org, 2008-09-15.
 *
 * @source www.mediawiki.org/wiki/MediaWiki:Gadget-NavFrame.js
 * @maintainer Helder.wiki, 2012–2013
 * @maintainer Krinkle, 2013
 * @maintainer Fantasticfears, 2013-2014
 */
 /**
 * 以上为原版权信息
 */
( function () {
var cd={};
window.collapsibleDivs=cd;

cd.collapseCaption = wgULS('隐藏', '隱藏');
cd.expandCaption = wgULS('显示', '顯示');

cd.navigationBarHide = cd.collapseCaption + '▲';
cd.navigationBarShow = cd.expandCaption + '▼';

cd.clazzName={
    CD_Tag:"NavFrame",
    /*
    Status
    */
    collapsed:"collapsed",
    //uncollapsed:"",
    /*
    Body
    */
    NC:"NavContent",
    NC_TS:"toggleShow",
    NC_TH:"toggleHide",
    /*
    Head
    */
    NH:"NavHead",
    NH_T:"NavToggle",
    NH_TS:"toggleShow",
    NH_TH:"toggleHide",
    /*
    Button
    */
    CD_HS:"toggleHotspot"
}
cd.init=function(){
    var divIndex = 0;
    var NavigationBoxes = new Array();
    var Divs=$("div.",cd.clazzName.CD_Tag);

    Divs.each(function(){
        var $div=$(this);
        var head_match=$div.find("div."+cd.clazzName.NH).first();
        var THS_match=$div.find("."+cd.clazzName.CD_HS).first();
        if(!head_match|!THS_match){
            return;
        }

        var id=(divIndex++);
        $div.attr("id",cd.clazzName.CD_Tag+id);
        
        var customHead=false;
        var customHotspot=false;
        var $openspot,$closespot,$head;
        {//head,hotspot
            var head=$div.find("."+cd.clazzName.NH).first();
            var head_show=$div.find("."+cd.clazzName.NH+">."+cd.clazzName.NH_TS).first();
            var head_hide=$div.find("."+cd.clazzName.NH+">."+cd.clazzName.NH_TH).first();
            var t_customHS=$div.find("."+cd.clazzName.CD_HS).frist();

            if(!head){
                customHead=false;
                $head=head;
            }else{
                customHead=true;
            }

            if(!t_customHS&&(head_show&&head_hide)){
                customHotspot=false;
                $openspot=head_show;
                $closespot=head_hide;
            }else{
                customHotspot=true;
                $openspot=$closespot=t_customHS;
            }
        }
        if(customHead&!customHotspot){
            var navToggle = $( '<span class="NavToggle"></span>' );
            var navShow=$('<span class="toggleShow"></span>').text(cd.navigationBarShow);
            var navHide=$('<span class="toggleHide"></span>').text(cd.navigationBarHide);
            navToogle.append(navShow).append(navHide);
            $head.append(navToogle);
            $openspot=$closespot=$navToogle;
        }
        var clickhandle=cd.createClickHandlerBuilder(id);
        $openspot.bind("click",clickhandle);
        $closespot.bind("click",clickhandle);
        $head.bind("click",clickhandle);

        cd.toggle(id,null);
    });
}

cd.checkCollapsed=function(#div){
    var t_=$div.find(".",cd.clazzName.collapsed);
    return !t_?false:true;
}

cd.createClickHandlerBuilder=function(index){
    return function(event){
        var target = $(e.target);
        var $div=$("div#"+cd.clazzName.CD_Tag+index)   ;
        console.log(target);
        console.log($div);

        var iscollapsed=false;
        var go=false;

        var head=$div.find("."+cd.clazzName.NH).first();
        var head_show=$div.find("."+cd.clazzName.NH+">."+cd.clazzName.NH_TS).first();
        var head_hide=$div.find("."+cd.clazzName.NH+">."+cd.clazzName.NH_TH).first();
        var customHS=$div.find("."+cd.clazzName.CD_HS).frist();

        if(!head&&!customHS){
            var show=target.is(head_show)||target.parents().is(head_show);
            var hide=target.is(head_hide)||target.parents().is(head_hide);

            go=true;
            iscollapsed=show&&!hide?false:true;
        }else{
            if(!customHS&&head){
                var a=target.is(head)||target.parents().is(head);//点击头或者属于头的子类
            }
            if(!head&&customHS){
                var a=target.is(customHS)||target.parents().is(customHS);//自定义热点
            }
            iscollapsed=cd.checkCollapsed($div)
            if(a){
                go=true;
            }
        }

        if(go){cd.toggle(index,iscollapsed);}
    }
};

cd.show=function($block){
    $block.each(function(){$(this).css( 'display', 'block' );});
}

cd.hide=function($block){
    $block.each(function(){$( this ).css( 'display', 'none' );});
}

cd.toggle=function(index,iscollapsed){
    var $div=$("div#"+cd.clazzName.CD_Tag+index);

    if(iscollapsed==null)
    {
        iscollapsed=cd.checkCollapsed($div)
    }

    var customHead=false;
    var customHotspot=false;
    var customBody=false;
    var $openspot,$closespot,$head;
    var $showbody,$hidebody;
    {//head,hotspot
        var head=$div.find("."+cd.clazzName.NH).first();
        var head_show=$div.find("."+cd.clazzName.NH+">."+cd.clazzName.NH_TS).first();
        var head_hide=$div.find("."+cd.clazzName.NH+">."+cd.clazzName.NH_TH).first();
        var t_customHS=$div.find("."+cd.clazzName.CD_HS).frist();

        if(!head){
            customHead=false;
            $head=head;
        }else{
            customHead=true;
        }

        if(!t_customHS&&(head_show&&head_hide)){
            customHotspot=false;
            $openspot=head_show;
            $closespot=head_hide;
        }else{
            customHotspot=true;
            $openspot=$closespot=t_customHS;
        }
    }
    {//body
        var t_body=$div.find("."+cd.clazzName.NC).first();
        var t_showbody=$div.find("."+cd.clazzName.NC_TS).first();
        var t_hidebod=$div.find("."+cd.clazzName.NC_TH).first();

        if(!t_body&&(t_showbody&&t_hidebody)){
            customBody=true;
            $showbody=t_showbody
            $hidebody=t_hidebod
        }else{
            customBody=false;
            $showbody=$hidebody=t_body;
        }
    }
    
    if(iscollapsed){
    
    }else{
    
    }
}

$(cd.init);
}());